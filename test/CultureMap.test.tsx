import {
    act,
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
    within,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CultureInfoMap } from "@/features/CultureInfoMap";

/** 현 지도 영역 검색, 확대·축소 제한, 좌표별 마커 목록 및 선택한 전시의 상세페이지 이동 검증 */

const mocks = vi.hoisted(() => ({ api: vi.fn(), push: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("@/entities/culture/map/api/api.client.culture.info.map", () => ({
    API_CLIENT_CULTURE_INFO_MAP: mocks.api,
}));
vi.mock("@/entities/culture/map/hook/useGeolocationHook", () => ({
    useGeolocationHook: () => ({ isLoad: true, nx: 127, ny: 37.5 }),
}));

const initialBounds = { fromY: 37.4, fromX: 126.9, toY: 37.6, toX: 127.1 };
const movedBounds = { fromY: 35, fromX: 128, toY: 36, toX: 129 };
class LatLng {
    constructor(
        private lat: number,
        private lng: number,
    ) {}
    getLat() {
        return this.lat;
    }
    getLng() {
        return this.lng;
    }
}
// SDK 외부 경계만 대체한다. 실제 지도 컴포넌트, React Query와 마커 UI를 함께 실행한다.
class TestMap {
    static current: TestMap;
    bounds = { ...initialBounds };
    listeners: Record<string, () => void> = {};
    level: number;
    constructor(
        public container: HTMLElement,
        options: { level: number },
    ) {
        this.level = options.level;
        TestMap.current = this;
    }
    getBounds() {
        return {
            getSouthWest: () =>
                new LatLng(this.bounds.fromY, this.bounds.fromX),
            getNorthEast: () => new LatLng(this.bounds.toY, this.bounds.toX),
        };
    }
    getLevel() {
        return this.level;
    }
    setLevel = vi.fn((level: number) => {
        this.level = level;
        this.bounds = {
            ...initialBounds,
            toY: initialBounds.toY + level / 100,
        };
        this.listeners.zoom_changed?.();
    });
    setMinLevel = vi.fn();
    setMaxLevel = vi.fn();
    setDisableDoubleClickZoom = vi.fn();
}
class TestOverlay {
    static instances: TestOverlay[] = [];
    constructor(public options: { content: HTMLElement; position: LatLng }) {
        TestOverlay.instances.push(this);
    }
    setMap(map: TestMap | null) {
        if (map) map.container.append(this.options.content);
        else this.options.content.remove();
    }
}
function item(
    seq: string,
    title: string,
    gpsX = "127",
    gpsY = "37.5",
): CULTURE_ITEM {
    return {
        seq,
        title,
        gpsX,
        gpsY,
        place: "테스트 미술관",
        thumbnail: "https://example.com/image.jpg",
        startDate: "20261001",
        endDate: "20261031",
        area: "서울",
        serviceName: "공연/전시",
        realmName: "전시",
        sigungu: "종로구",
    };
}
const exhibitions = [
    item("101", "첫 번째 전시"),
    item("102", "두 번째 전시"),
    item("103", "다른 지역 전시", "129", "35.5"),
];
function mount(props: Parameters<typeof CultureInfoMap>[0] = {}) {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return render(
        <QueryClientProvider client={client}>
            <CultureInfoMap {...props} />
        </QueryClientProvider>,
    );
}
beforeEach(() => {
    const portal = document.createElement("div");
    portal.id = "portal-root";
    document.body.append(portal);
    mocks.api.mockReset();
    mocks.api.mockResolvedValue({
        page: 1,
        total: exhibitions.length,
        isNextPage: false,
        list: exhibitions,
    });
    TestOverlay.instances = [];
    vi.stubGlobal("kakao", {
        maps: {
            load: (callback: () => void) => callback(),
            LatLng,
            Map: TestMap,
            CustomOverlay: TestOverlay,
            event: {
                addListener: (
                    map: TestMap,
                    event: string,
                    callback: () => void,
                ) => {
                    map.listeners[event] = callback;
                },
            },
        },
    });
});
afterEach(async () => {
    cleanup();
    // 지도 마커는 별도의 React root이며 컴포넌트에서 타이머로 unmount한다.
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 110));
    });
    document.getElementById("portal-root")?.remove();
    vi.unstubAllGlobals();
});

describe("문화정보 지도", () => {
    it("최초 지도 영역을 조회하고 이동한 현 지도에서 검색한다", async () => {
        mount();
        await screen.findByTitle("첫 번째 전시 외 2개 전시");
        expect(mocks.api).toHaveBeenCalledWith({
            offset: 1,
            limit: 20,
            ...initialBounds,
        });
        const search = screen.getByRole("button", {
            name: "현재 지도 영역 문화정보 검색",
        });
        expect(search).toBeDisabled();
        act(() => {
            TestMap.current.bounds = { ...movedBounds };
            TestMap.current.listeners.idle();
        });
        expect(search).toBeEnabled();
        expect(mocks.api).toHaveBeenCalledTimes(1);
        fireEvent.click(search);
        await waitFor(() => expect(mocks.api).toHaveBeenCalledTimes(2));
        expect(mocks.api).toHaveBeenLastCalledWith({
            offset: 1,
            limit: 20,
            ...movedBounds,
        });
        expect(search).toBeDisabled();
        fireEvent.click(search);
        expect(mocks.api).toHaveBeenCalledTimes(2);
    });

    it("지도 축소와 확대를 적용하고 허용 범위에서 버튼을 비활성화한다", async () => {
        mount({ minZoomLevel: 3, maxZoomLevel: 5, initialZoomLevel: 4 });
        await screen.findByTitle("첫 번째 전시 외 2개 전시");
        const zoomIn = screen.getByRole("button", { name: "지도 확대" });
        const zoomOut = screen.getByRole("button", { name: "지도 축소" });
        fireEvent.click(zoomOut);
        expect(TestMap.current.getLevel()).toBe(5);
        expect(zoomOut).toBeDisabled();
        fireEvent.click(zoomOut);
        expect(TestMap.current.setLevel).toHaveBeenCalledTimes(1);
        fireEvent.click(zoomIn);
        fireEvent.click(zoomIn);
        expect(TestMap.current.getLevel()).toBe(3);
        expect(zoomIn).toBeDisabled();
        fireEvent.click(zoomIn);
        expect(TestMap.current.setLevel).toHaveBeenCalledTimes(3);
        expect(
            screen.getByRole("button", {
                name: "현재 지도 영역 문화정보 검색",
            }),
        ).toBeEnabled();
        expect(mocks.api).toHaveBeenCalledTimes(1);
        fireEvent.click(
            screen.getByRole("button", {
                name: "현재 지도 영역 문화정보 검색",
            }),
        );
        await waitFor(() => expect(mocks.api).toHaveBeenCalledTimes(2));
        expect(mocks.api).toHaveBeenLastCalledWith({
            offset: 1,
            limit: 20,
            ...TestMap.current.bounds,
        });
    });

    it("같은 좌표의 전시를 한 마커로 묶고 클릭하면 해당 전시 목록만 표시한다", async () => {
        mount();
        const marker = await screen.findByTitle("첫 번째 전시 외 2개 전시");
        expect(TestOverlay.instances).toHaveLength(2);
        expect(
            screen.queryByRole("heading", { name: "지역별 전시 박스" }),
        ).not.toBeInTheDocument();
        fireEvent.click(marker);
        expect(
            screen.getByRole("heading", { name: "지역별 전시 박스" }),
        ).toBeInTheDocument();
        const list = screen.getByRole("list");
        expect(within(list).getAllByRole("listitem")).toHaveLength(2);
        expect(within(list).getAllByText("첫 번째 전시")).toHaveLength(2);
        expect(within(list).getAllByText("두 번째 전시")).toHaveLength(2);
        expect(
            within(list).queryByText("다른 지역 전시"),
        ).not.toBeInTheDocument();
        expect(mocks.push).not.toHaveBeenCalled();
    });

    it("마커 목록에서 선택한 전시의 상세페이지로 이동한다", async () => {
        mount();
        fireEvent.click(await screen.findByTitle("첫 번째 전시 외 2개 전시"));
        fireEvent.click(
            within(screen.getByRole("list")).getByText("두 번째 전시", {
                selector: "dt",
            }),
        );
        expect(mocks.push).toHaveBeenCalledExactlyOnceWith("/culture/102");
    });
});
