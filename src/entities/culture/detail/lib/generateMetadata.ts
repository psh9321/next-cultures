import type { Metadata } from "next";
import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";

import { GetCultureInfoDetail } from "../api/api.server.culture.detail";

export async function generateCultureMetadata(seq : string) : Promise<Metadata> {
    const detail = await GetCultureInfoDetail(seq).catch(() => null);

    if (!detail) return {};

    const title = decode(detail.title);
    const place = decode(detail.place || "");
    const description = `${title}${place ? ` · ${place}` : ""}의 일정, 장소와 상세 정보를 확인하세요.`;
    const url = `/culture/${encodeURIComponent(seq)}`;
    const image = detail.imgUrl || detail.thumbnail;
    const images = image ? [{ url: SrcHttpToHttps(image), alt: title }] : undefined;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            locale: "ko_KR",
            siteName: "Discover Cultures",
            title,
            description,
            url,
            images,
        },
        twitter: {
            card: image ? "summary_large_image" : "summary",
            title,
            description,
            images,
        },
    };
}
