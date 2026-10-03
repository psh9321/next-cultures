import {
    act,
    render,
    renderHook,
    screen,
    waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CultureInfoList } from "@/features/CultureInfoList";
import { useExhibitionListHook } from "@/entities/culture/list/hook/useCultureListHook";

/** 실제 React Query로 최초 조회, 페이지 누적, 마지막 페이지 종료, 검색 조건 변경, 조회 오류 및 목록 UI의 스크롤 추가 조회 조건과 빈 목록 검증 */

const mocks = vi.hoisted(() => ({
    api: vi.fn(),
    params: new URLSearchParams(),
}));
vi.mock("next/navigation", () => ({ useSearchParams: () => mocks.params }));
vi.mock("@/entities/culture/list/api/api.client.culture.info.list", () => ({
    API_CLIENT_CULTURE_INFO_LIST: mocks.api,
}));
const scrollMocks = vi.hoisted(() => ({
    enabled: false,
    visible: false,
    fetch: vi.fn(),
    loading: false,
    fetching: false,
    hasNext: true,
    pages: [
        {
            total: 2,
            list: [
                { seq: "1", title: "첫 번째 전시" },
                { seq: "2", title: "두 번째 전시" },
            ],
        },
    ],
}));
vi.mock(
    "@/entities/culture/list/hook/useCultureListHook",
    async (importOriginal) => {
        const actual =
            await importOriginal<
                typeof import("@/entities/culture/list/hook/useCultureListHook")
            >();
        return {
            ...actual,
            useExhibitionListHook: () =>
                scrollMocks.enabled
                    ? {
                          data: { pages: scrollMocks.pages },
                          isLoading: scrollMocks.loading,
                          isFetching: scrollMocks.fetching,
                          hasNextPage: scrollMocks.hasNext,
                          fetchNextPage: scrollMocks.fetch,
                      }
                    : actual.useExhibitionListHook(),
        };
    },
);
vi.mock("@/shared/hook/useInterSectionObserver", () => ({
    useInterSectionObserver: () => ({ ref: null, isView: scrollMocks.visible }),
}));
vi.mock("@/entities/culture/list/ui/CultureInfoListItem", () => ({
    CultureInfoListItem: ({ item }: { item: { title: string } }) => (
        <li>{item.title}</li>
    ),
}));
vi.mock("@/entities/culture/list/ui/CultureInfoListEmpty", () => ({
    CultureInfoListEmpty: () => <p>전시 없음</p>,
}));
function mount() {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    return renderHook(useExhibitionListHook, { wrapper });
}
beforeEach(() => {
    mocks.params = new URLSearchParams();
    mocks.api.mockReset();
    scrollMocks.enabled = false;
});
describe("전시 목록 조회", () => {
    it("첫 페이지 이후 다음 페이지를 누적하고 마지막 페이지에서 종료한다", async () => {
        mocks.api
            .mockResolvedValueOnce({
                page: 1,
                total: 2,
                isNextPage: true,
                list: [{ seq: "1" }],
            })
            .mockResolvedValueOnce({
                page: 2,
                total: 2,
                isNextPage: false,
                list: [{ seq: "2" }],
            });
        const { result } = mount();
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(mocks.api).toHaveBeenNthCalledWith(1, { offset: 1, limit: 20 });
        await act(async () => {
            await result.current.fetchNextPage();
        });
        await waitFor(() => expect(result.current.hasNextPage).toBe(false));
        expect(mocks.api).toHaveBeenNthCalledWith(2, { offset: 2, limit: 20 });
        expect(
            result.current.data?.pages.flatMap((page) => page?.list),
        ).toEqual([{ seq: "1" }, { seq: "2" }]);
        await act(async () => {
            await result.current.fetchNextPage();
        });
        expect(mocks.api).toHaveBeenCalledTimes(2);
    });
    it("검색 조건이 바뀌면 첫 페이지부터 새 목록을 조회한다", async () => {
        mocks.api.mockResolvedValue({
            page: 1,
            total: 0,
            isNextPage: false,
            list: [],
        });
        const { result, rerender } = mount();
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        mocks.params = new URLSearchParams({
            searchKeyword: "미술",
            searchType: "B",
            searchArea: "서울",
        });
        rerender();
        await waitFor(() => expect(mocks.api).toHaveBeenCalledTimes(2));
        expect(mocks.api).toHaveBeenLastCalledWith({
            offset: 1,
            limit: 20,
            searchKeyword: "미술",
            searchType: "B",
            searchArea: "서울",
        });
        await waitFor(() => expect(result.current.data?.pages).toHaveLength(1));
        expect(result.current.hasNextPage).toBe(false);
    });
    it("조회 실패를 오류 상태로 제공한다", async () => {
        mocks.api.mockRejectedValue(new Error("조회 실패"));
        const { result } = mount();
        await waitFor(() => expect(result.current.isError).toBe(true));
    });
});

describe("무한 스크롤 목록", () => {
    beforeEach(() => {
        scrollMocks.enabled = true;
        scrollMocks.visible = false;
        scrollMocks.loading = false;
        scrollMocks.fetching = false;
        scrollMocks.hasNext = true;
        scrollMocks.pages = [
            {
                total: 2,
                list: [
                    { seq: "1", title: "첫 번째 전시" },
                    { seq: "2", title: "두 번째 전시" },
                ],
            },
        ];
    });
    it("목록을 표시하고 감시 영역이 보일 때 다음 페이지를 요청한다", () => {
        const { rerender } = render(<CultureInfoList />);
        expect(screen.getByText("첫 번째 전시")).toBeInTheDocument();
        expect(screen.getByText("두 번째 전시")).toBeInTheDocument();
        expect(scrollMocks.fetch).not.toHaveBeenCalled();
        scrollMocks.visible = true;
        rerender(<CultureInfoList />);
        expect(scrollMocks.fetch).toHaveBeenCalledOnce();
    });
    it.each(["loading", "fetching", "last"] as const)(
        "%s 상태에서는 추가 조회하지 않는다",
        (state) => {
            if (state === "last") scrollMocks.hasNext = false;
            else if (state === "loading") scrollMocks.loading = true;
            else scrollMocks.fetching = true;
            scrollMocks.visible = true;
            render(<CultureInfoList />);
            expect(scrollMocks.fetch).not.toHaveBeenCalled();
        },
    );
    it("결과가 없으면 빈 목록 안내를 표시한다", () => {
        scrollMocks.pages = [{ total: 0, list: [] }];
        render(<CultureInfoList />);
        expect(screen.getByText("전시 없음")).toBeInTheDocument();
    });
});
