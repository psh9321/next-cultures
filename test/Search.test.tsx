import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CultureInfoSearch } from "@/features/CultureInfoSearch";

/** 검색어 디바운스, 카테고리·지역 검색, 필터 조합 및 해제 검증 */

const mocks = vi.hoisted(() => ({
    replace: vi.fn(),
    params: new URLSearchParams(),
}));
vi.mock("next/navigation", () => ({
    useRouter: () => ({ replace: mocks.replace }),
    useSearchParams: () => mocks.params,
}));
beforeEach(() => {
    vi.useFakeTimers();
    mocks.params = new URLSearchParams();
});
afterEach(() => vi.useRealTimers());
function lastParams() {
    return new URLSearchParams(mocks.replace.mock.calls.at(-1)?.[0]);
}
describe("검색 UI", () => {
    it("검색어를 디바운스하고 다른 필터를 유지한다", () => {
        mocks.params = new URLSearchParams({
            searchType: "B",
            searchArea: "서울",
        });
        render(<CultureInfoSearch />);
        fireEvent.input(screen.getByPlaceholderText("전시 제목, 장소 검색"), {
            target: { value: "미" },
        });
        act(() => vi.advanceTimersByTime(300));
        fireEvent.input(screen.getByPlaceholderText("전시 제목, 장소 검색"), {
            target: { value: "미술" },
        });
        act(() => vi.advanceTimersByTime(499));
        expect(mocks.replace).not.toHaveBeenCalled();
        act(() => vi.advanceTimersByTime(1));
        expect(mocks.replace).toHaveBeenCalledTimes(1);
        expect(Object.fromEntries(lastParams())).toEqual({
            searchType: "B",
            searchArea: "서울",
            searchKeyword: "미술",
        });
    });
    it("검색어를 비우면 검색 조건에서 제거한다", () => {
        mocks.params = new URLSearchParams({
            searchKeyword: "미술",
            searchArea: "서울",
        });
        render(<CultureInfoSearch />);
        fireEvent.input(screen.getByPlaceholderText("전시 제목, 장소 검색"), {
            target: { value: "" },
        });
        act(() => vi.advanceTimersByTime(500));
        expect(Object.fromEntries(lastParams())).toEqual({
            searchArea: "서울",
        });
    });
    it.each([
        ["행사/축제", "B"],
        ["교육/체험", "C"],
        ["공연/전시", null],
    ])("카테고리 %s를 검색한다", (name, value) => {
        mocks.params = new URLSearchParams({
            searchKeyword: "미술",
            searchArea: "서울",
            searchType: "B",
        });
        render(<CultureInfoSearch />);
        fireEvent.click(screen.getByRole("button", { name }));
        act(() => vi.advanceTimersByTime(1000));
        expect(lastParams().get("searchType")).toBe(value);
        expect(lastParams().get("searchKeyword")).toBe("미술");
        expect(lastParams().get("searchArea")).toBe("서울");
    });
    it("지역을 선택하고 전체 지역으로 해제한다", () => {
        mocks.params = new URLSearchParams({
            searchKeyword: "미술",
            searchType: "C",
        });
        const { rerender } = render(<CultureInfoSearch />);
        fireEvent.click(screen.getByRole("button", { name: "지역 전체" }));
        fireEvent.click(screen.getByRole("button", { name: "서울" }));
        expect(Object.fromEntries(lastParams())).toEqual({
            searchKeyword: "미술",
            searchType: "C",
            searchArea: "서울",
        });
        mocks.params = lastParams();
        rerender(<CultureInfoSearch />);
        fireEvent.click(screen.getByRole("button", { name: "서울" }));
        fireEvent.click(screen.getByRole("button", { name: "지역 전체" }));
        expect(lastParams().has("searchArea")).toBe(false);
        expect(lastParams().get("searchType")).toBe("C");
    });
});
