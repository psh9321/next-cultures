import {
    fireEvent,
    render,
    renderHook,
    screen,
    waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { useCultureInfoDetailHook } from "@/entities/culture/detail/hook/useCultureInfoDetailHook";
import { SessionProvider, useSession } from "next-auth/react";
import { BtnCultureInfoShare } from "@/features/CultureInfoDetailBtnList/components/BtnCultureInfoShare";

/** 서버 prefetch 캐시가 있는 상세페이지의 조회 및 정보 갱신, 로그인 상태의 카카오톡 공유 데이터·링크 검증 */

afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
});
const api = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({
    useParams: () => ({ seq: "123" }),
    usePathname: () => "/culture/123",
}));
vi.mock("@/entities/culture/detail/api/api.client.culture.detail", () => ({
    API_CLIENT_CULTURE_INFO_DETAIL: api,
}));
it("상세페이지는 URL의 전시 번호로 조회하고 서버에서 받은 정보를 표시한다", async () => {
    const initial = {
        seq: "123",
        title: "초기 전시",
        startDate: "20261001",
        endDate: "20261031",
        imgUrl: "http://example.com/a.jpg",
        place: "서울",
        isFavorite: false,
    };
    api.mockResolvedValue({
        ...initial,
        title: "미술 &amp; 공연",
        isFavorite: true,
        price: "무료",
    });
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    // 실제 상세페이지는 서버 prefetch로 상세 캐시를 채운 뒤 렌더링한다.
    client.setQueryData(["cultureInfo", "detail", "123"], initial);
    const wrapper = ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(useCultureInfoDetailHook, { wrapper });
    await waitFor(() => expect(result.current.title).toBe("미술 & 공연"));
    expect(api).toHaveBeenCalledWith("123");
    expect(result.current).toMatchObject({
        seq: "123",
        imgSrc: "https://example.com/a.jpg",
        place: "서울",
        price: "무료",
        isFavorite: true,
    });
});

it.each(["https://culture.example.com", "https://culture.example.com/"])(
    "로그인 상태에서 상세 전시를 올바른 링크로 공유한다 (서비스 도메인: %s)",
    async (domain) => {
        const detail = {
            seq: "123",
            title: "미술 &amp; 공연",
            startDate: "20261001",
            endDate: "20261031",
            imgUrl: "http://example.com/poster.jpg",
            place: "서울 미술관",
            contents1: "전시 소개",
            isFavorite: false,
        };
        api.mockResolvedValue(detail);
        vi.stubEnv("NEXT_PUBLIC_SERVICE_DOMAIN", domain);
        const sendDefault = vi.fn();
        vi.stubGlobal("Kakao", { Share: { sendDefault } });
        const client = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
        client.setQueryData(["cultureInfo", "detail", "123"], detail);
        render(
            <SessionProvider
                session={{
                    expires: "2099-01-01T00:00:00.000Z",
                    user: {
                        id: "test-user",
                        name: "테스터",
                        type: "kakao",
                        createDate: "2026-10-01",
                        profileImg: "https://example.com/profile.jpg",
                    },
                }}
                refetchOnWindowFocus={false}
            >
                <QueryClientProvider client={client}>
                    <LoggedInShare />
                </QueryClientProvider>
            </SessionProvider>,
        );
        expect(screen.getByText("authenticated")).toBeInTheDocument();
        expect(sendDefault).not.toHaveBeenCalled();
        fireEvent.click(
            screen.getByRole("button", {
                name: "미술 & 공연 카카오톡 공유 하기",
            }),
        );
        expect(sendDefault).toHaveBeenCalledExactlyOnceWith({
            objectType: "feed",
            content: {
                title: "미술 & 공연",
                description:
                    "장소 : 서울 미술관\n날짜 : 2026.10.01 ~ 2026.10.31\n전시 소개",
                imageUrl: "https://example.com/poster.jpg",
                link: {
                    mobileWebUrl: "https://culture.example.com/culture/123",
                    webUrl: "https://culture.example.com/culture/123",
                },
            },
        });
    },
);

function LoggedInShare() {
    const { status } = useSession();
    return (
        <>
            <span>{status}</span>
            <BtnCultureInfoShare />
        </>
    );
}
