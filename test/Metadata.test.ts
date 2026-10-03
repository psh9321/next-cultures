import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateCultureMetadata } from "@/entities/culture/detail/lib/generateMetadata";

/** 전시별 제목·설명·canonical·OG·Twitter 메타데이터 및 조회 실패 검증 */

const api = vi.hoisted(() => vi.fn());
vi.mock("@/entities/culture/detail/api/api.server.culture.detail", () => ({
    GetCultureInfoDetail: api,
}));
beforeEach(() => {
    api.mockReset();
});
describe("상세페이지 동적 메타데이터", () => {
    it("전시 제목, 설명, canonical, OG 및 Twitter 이미지를 생성한다", async () => {
        api.mockResolvedValue({
            title: "미술 &amp; 공연",
            place: "서울 &amp; 갤러리",
            imgUrl: "http://example.com/poster.jpg",
        });
        const metadata = await generateCultureMetadata("123");
        expect(api).toHaveBeenCalledWith("123");
        expect(metadata.title).toBe("미술 & 공연");
        expect(metadata.description).toBe(
            "미술 & 공연 · 서울 & 갤러리의 일정, 장소와 상세 정보를 확인하세요.",
        );
        expect(metadata.alternates).toEqual({ canonical: "/culture/123" });
        expect(metadata.openGraph).toMatchObject({
            title: metadata.title,
            description: metadata.description,
            url: "/culture/123",
            images: [
                { url: "https://example.com/poster.jpg", alt: "미술 & 공연" },
            ],
        });
        expect(metadata.twitter).toMatchObject({
            card: "summary_large_image",
            title: metadata.title,
        });
    });
    it("상세 이미지가 없으면 썸네일을 사용하고 경로를 인코딩한다", async () => {
        api.mockResolvedValue({
            title: "전시",
            thumbnail: "https://example.com/thumb.jpg",
        });
        expect(await generateCultureMetadata("a/b")).toMatchObject({
            alternates: { canonical: "/culture/a%2Fb" },
            openGraph: { images: [{ url: "https://example.com/thumb.jpg" }] },
        });
    });
    it("이미지가 없으면 기본 Twitter 카드를 사용한다", async () => {
        api.mockResolvedValue({ title: "전시" });
        expect(await generateCultureMetadata("1")).toMatchObject({
            twitter: { card: "summary", images: undefined },
        });
    });
    it.each(["없는 전시", "조회 실패"])(
        "없는 전시와 조회 실패에서 빈 메타데이터를 반환한다: %s",
        async (value) => {
            if (value === "조회 실패") api.mockRejectedValue(new Error(value));
            else api.mockResolvedValue(null);
            expect(await generateCultureMetadata("404")).toEqual({});
        },
    );
});
