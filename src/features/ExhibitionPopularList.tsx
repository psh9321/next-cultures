"use client"

import Image from "next/image";
import Link from "next/link";

import { decode } from "he";

import { useExhibitionPopular } from "@/entities/exhibition/popular/hook/useExhibitionPopular"
import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";
import { ImageError } from "@/shared/util/imgError";

export const ExhibitionPopularList = () => {

    const { data } = useExhibitionPopular();

    

    return (
        <ol className="w-full space-y-[15px]">
            {
                data?.map((el, i) => {
                    return (
                        <li key={`인기있는전시-${el.exhibitionTitle}-${i}`}>
                            <Link className="flex gap-[10px]" href={`/exhibition/${el.exhibitionSeq}`}>
                                <div className="relative w-[80px] h-[110px]">
                                    <Image className="rounded-[10px]" fill src={SrcHttpToHttps(el.exhibitionImg)} alt={`인기있는 전시 ${decode(el.exhibitionTitle)} 썸네일`} unoptimized loading="eager"                   onError={ImageError}/>
                                </div>
                                <dl className="block w-[calc(100%-90px)] text-basic-color font-bold [&>*]:truncate [&>dd]:text-[0.8rem]">
                                    <dt>{decode(el.exhibitionTitle)}</dt>
                                    <dd>{`${ExhibitionDateFormat(el.exhibitionStartDate)} ~ ${ExhibitionDateFormat(el.exhibitionEndDate)}`}</dd>
                                    <dd>전시 지역 : {el.exhibitionArea}</dd>
                                </dl>
                            </Link>
                        </li>
                    )
                })
            }
        </ol>
    )
}