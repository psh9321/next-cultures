import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useSessionHook } from "@/entities/users/(post)/hook/useSessionHook";
import { LogoutCallback } from "@/entities/users/(post)/util/logout";
import { BeforeLogin } from "@/features/UserBox/ui/BeforeLogin";

/** 소셜 로그인 팝업 URL, 세션 상태 전환, 쿠키 삭제 및 로그아웃 검증 */

const mocks = vi.hoisted(() => ({
    session: {
        data: null as null | { user: { name: string } },
        status: "unauthenticated",
        update: vi.fn(),
    },
    signOut: vi.fn(),
    deleteCookies: vi.fn(),
}));
vi.mock("next-auth/react", () => ({
    useSession: () => mocks.session,
    signOut: mocks.signOut,
}));
vi.mock("@/shared/lib/cookies", () => ({ DeleteCookies: mocks.deleteCookies }));
beforeEach(() => {
    mocks.session.data = null;
    mocks.session.status = "unauthenticated";
    mocks.deleteCookies.mockReset();
    mocks.signOut.mockReset();
});
describe("로그인 / 로그아웃", () => {
    it.each([
        ["네이버", "naver"],
        ["카카오", "kakao"],
        ["구글", "google"],
    ])("%s 로그인 팝업에 provider와 콜백 URL을 전달한다", (name, provider) => {
        const open = vi.spyOn(window, "open").mockReturnValue(null);
        render(<BeforeLogin />);
        fireEvent.click(screen.getByTitle(`${name} 로그인`));
        const url = new URL(
            open.mock.calls[0][0] as string,
            window.location.origin,
        );
        expect(url.pathname).toBe("/auth/login-redirect");
        expect(url.searchParams.get("provider")).toBe(provider);
        expect(url.searchParams.get("callbackUrl")).toBe(
            `${window.location.origin}/auth/popup-callback`,
        );
        open.mockRestore();
    });
    it("비로그인 → 로그인 로딩 → 로그인 → 로그아웃 상태를 반영한다", () => {
        const { result, rerender } = renderHook(useSessionHook);
        expect(result.current.isLogin).toBe(false);
        mocks.session.status = "loading";
        rerender();
        expect(result.current.isLoginLoading).toBe(true);
        mocks.session = {
            ...mocks.session,
            data: { user: { name: "테스터" } },
            status: "authenticated",
        };
        rerender();
        expect(result.current.isLogin).toBe(true);
        expect(result.current.user?.name).toBe("테스터");
        mocks.session.data = null;
        mocks.session.status = "unauthenticated";
        rerender();
        expect(result.current.isLogin).toBe(false);
    });
    it("쿠키를 삭제한 후 로그아웃한다", async () => {
        await LogoutCallback();
        expect(mocks.deleteCookies).toHaveBeenCalledOnce();
        expect(mocks.signOut).toHaveBeenCalledOnce();
        expect(mocks.deleteCookies.mock.invocationCallOrder[0]).toBeLessThan(
            mocks.signOut.mock.invocationCallOrder[0],
        );
    });
    it("쿠키 삭제 실패에도 로그아웃한다", async () => {
        mocks.deleteCookies.mockRejectedValue(new Error("쿠키 삭제 실패"));
        await expect(LogoutCallback()).rejects.toThrow("쿠키 삭제 실패");
        expect(mocks.signOut).toHaveBeenCalledOnce();
    });
});
