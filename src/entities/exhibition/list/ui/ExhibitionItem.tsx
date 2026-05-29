"use client"

import Link from "next/link";

import Image from "next/image";

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { ImageError } from "@/shared/util/imgError";


export const ExhibitionItem = ({ item } : { item: EXHIBITION_ITEM }) => {

    if(!item) return <></>

    return (
        <li className="block w-[calc(25%-15px)] shadow-[5px_5px_5px_rgba(0,0,0,0.8)] rounded-[10px] overflow-hidden
        [@media(max-width:920px)_and_(min-width:640px)]:w-[calc(33%-8px)]
        [@media(max-width:640px)]:w-[calc(50%-8px)]
        ">
            <Link href={`/exhibition/${item["seq"]}`} className="block">
                <div className="relative w-full h-[300px] 
                [@media(max-width:640px)]:h-[50vw]
                ">
                    <Image
                        className="w-full h-full"
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="eager"
                        src={SrcHttpToHttps(item["thumbnail"])}
                        alt={`${decode(item["title"])} 썸네일 이미지
                        `}
                        onError={ImageError}
                    />
                </div>
                <dl className="block w-full p-[15px_20px] text-left text-basic-color font-bold bg-[#222226] [@media(max-width:499px)]:p-[10px_15px]">
                    <dt className="h-[55px] mb-[10px] text-[1.15rem] overflow-hidden text-ellipsis break-keep [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [@media(max-width:499px)]:h-[38px] [@media(max-width:499px)]:mb-[20px] [@media(max-width:499px)]:text-[0.8rem]">{decode(item["title"])}</dt>
                    <dd className="block w-full text-[0.9rem] [@media(max-width:499px)]:text-[0.7rem] truncate">{decode(item["place"])}</dd>
                    <dd className="date text-[0.9rem] [@media(max-width:499px)]:text-[0.5rem]">{`${ExhibitionDateFormat(item["startDate"])} ~ ${ExhibitionDateFormat(item["endDate"])}`}</dd>
                    <dd className="inline-block mt-[40px] p-[5px_10px] text-[#7f7f7e] text-[0.8rem] font-bold bg-[#302d2d] rounded-[10px] [@media(max-width:499px)]:mt-[20px] [@media(max-width:499px)]:text-[0.6rem]">{item["area"]}</dd>
                </dl>
            </Link>
        </li>
    )
}
