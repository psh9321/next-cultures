import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BtnToggleFavorite } from "@/features/CultureInfoDetailBtnList/components/BtnToggleFavorite";

/** 좋아요 등록·해제 UI, 상세 캐시 갱신, 목록 무효화, 비로그인·세션 만료 검증 */

const mocks = vi.hoisted(() => ({
    api: vi.fn(),
    isLogin: true,
    alert: vi.fn(),
}));
vi.mock("@/entities/favorite/toggle/api/api.client.favorite.toggle", () => ({
    API_CLIENT_TOGGLE_FAVORITE_EXHIBITION: mocks.api,
}));
vi.mock("@/entities/users/(post)/hook/useSessionHook", () => ({
    useSessionHook: () => ({ isLogin: mocks.isLogin }),
}));
vi.mock("@/entities/culture/detail/hook/useCultureInfoDetailHook", () => ({
    useCultureInfoDetailHook: () => ({
        seq: "123",
        title: "테스트 전시",
        imgSrc: "https://example.com/a.jpg",
        startDate: "20261001",
        endDate: "20261031",
        area: "서울",
        isFavorite: false,
    }),
}));
vi.mock("@/shared/hook/useToastHook", () => ({
    useToastHook: () => ({ InitAlert: mocks.alert, ToastAlert: () => null }),
}));
vi.mock("@/entities/users/(post)/util/logout", () => ({
    LogoutCallback: vi.fn(),
}));
function mount() {
    const client = new QueryClient({
        defaultOptions: { mutations: { retry: false } },
    });
    client.setQueryData(["cultureInfo", "detail", "123"], {
        title: "테스트 전시",
        isFavorite: false,
    });
    client.setQueryData(["favorite", "list"], { pages: [] });
    render(
        <QueryClientProvider client={client}>
            <BtnToggleFavorite />
        </QueryClientProvider>,
    );
    return client;
}
beforeEach(() => {
    mocks.api.mockReset();
    mocks.isLogin = true;
});
describe("좋아요 등록 / 해제", () => {
    it("등록과 해제 후 버튼, 상세 캐시와 좋아요 목록을 갱신한다", async () => {
        mocks.api
            .mockResolvedValueOnce({
                resultCode: 200,
                data: { toggleStatus: true },
            })
            .mockResolvedValueOnce({
                resultCode: 200,
                data: { toggleStatus: false },
            });
        const client = mount();
        fireEvent.click(screen.getByTitle("테스트 전시 좋아요"));
        await waitFor(() =>
            expect(
                screen.getByTitle("테스트 전시 좋아요 해제"),
            ).toBeInTheDocument(),
        );
        expect(mocks.api.mock.calls[0][0]).toEqual({
            seq: "123",
            title: "테스트 전시",
            imgUrl: "https://example.com/a.jpg",
            startDate: "20261001",
            endDate: "20261031",
            area: "서울",
        });
        expect(
            client.getQueryData(["cultureInfo", "detail", "123"]),
        ).toMatchObject({ isFavorite: true });
        expect(client.getQueryState(["favorite", "list"])?.isInvalidated).toBe(
            true,
        );
        fireEvent.click(screen.getByTitle("테스트 전시 좋아요 해제"));
        await waitFor(() =>
            expect(screen.getByTitle("테스트 전시 좋아요")).toBeInTheDocument(),
        );
        expect(
            client.getQueryData(["cultureInfo", "detail", "123"]),
        ).toMatchObject({ isFavorite: false });
    });
    it("비로그인 시 API 호출 없이 로그인 안내를 표시한다", () => {
        mocks.isLogin = false;
        mount();
        fireEvent.click(screen.getByTitle("테스트 전시 좋아요"));
        expect(mocks.api).not.toHaveBeenCalled();
        expect(mocks.alert).toHaveBeenCalledWith(
            expect.objectContaining({ title: "로그인 후 이용 가능" }),
        );
    });
    it("세션 만료 응답에서는 로그인 안내를 표시한다", async () => {
        mocks.api.mockResolvedValue({ resultCode: -999 });
        mount();
        await act(async () =>
            fireEvent.click(screen.getByTitle("테스트 전시 좋아요")),
        );
        expect(mocks.alert).toHaveBeenCalledWith(
            expect.objectContaining({ title: "로그인 후 이용 가능" }),
            expect.any(Function),
        );
        expect(screen.getByTitle("테스트 전시 좋아요")).toBeInTheDocument();
    });
});
