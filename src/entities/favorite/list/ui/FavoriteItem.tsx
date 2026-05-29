"use client"

import Link from "next/link";

import Image from "next/image";

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { ImageError } from "@/shared/util/imgError";
import { ExhibitionStatus } from "@/entities/exhibition/detail/util/exhibitionStatus";

export const FavoriteItem = ({ item } : { item : FAVORITE_ITEM }) => {

    const currentExhibitionStatus = ExhibitionStatus(item?.["exhibitionStartDate"]??"", item?.["exhibitionEndDate"]??"");

    const title = decode(item?.["exhibitionTitle"]);

    const statusBgClass = (() => {
        switch (currentExhibitionStatus) {
            case "전시 중" : return "main-color"
            case "전시 예정" : return "[#10B981]"
            case "전시 종료" : return "[#52525B]"
        
            default: return ""
        }
    })();
    return (
        <li className="block w-[calc(50%-15px)] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] rounded-[10px] overflow-hidden
        [@media(max-width:1010px)]:w-full
        ">
            <Link href={`/exhibition/${item?.["exhibitionSeq"]}`} className="flex">
                <div className="relative block w-[200px] h-[250px] 
                [@media(max-width:499px)]:w-[120px]
                [@media(max-width:499px)]:h-[170px]
                ">
                    <Image
                        className="w-full h-full"
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="eager"
                        src={SrcHttpToHttps(item?.["exhibitionImg"])}
                        alt={`${title} 썸네일 이미지`}
                        onError={ImageError}
                    />
                </div>
                <dl className="block w-[calc(100%-200px)] p-[15px_20px] text-left text-basic-color bg-[#222226] 
                [@media(max-width:1010px)]:w-[calc(100%-150px)]
                [@media(max-width:499px)]:w-[calc(100%-120px)]
                ">
                    <dt className="h-[55px] mb-[10px] text-[1.15rem] break-keep overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]
                    [@media(max-width:499px)]:h-[45px]
                    [@media(max-width:499px)]:text-[0.9rem]
                    ">{title}</dt>
                    <dd className="mb-[10px] text-[0.9rem] [@media(max-width:499px)]:text-[0.7rem]">{item?`${ExhibitionDateFormat(item?.["exhibitionStartDate"])} ~ ${ExhibitionDateFormat(item?.["exhibitionEndDate"])}` : ""}</dd>
                    <dd className={`inline-block p-[5px_10px] text-[0.8rem] font-bold rounded-[10px] border text-[#fff] bg-${statusBgClass} border-${statusBgClass}`}>{currentExhibitionStatus}</dd>
                </dl>
            </Link>
        </li>
    )
}