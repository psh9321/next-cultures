"use client"

import Link from "next/link";

import { useExhibitionDetailHook } from "@/entities/exhibition/detail/hook/useExhibitionDetailHook"
import { ExhibitionDateFormat } from "@/shared/util/dateFormat";

export const InfoTabContents = () => {

    const data = useExhibitionDetailHook();

    return (
        <article>
            <h3 className="mb-[15px] text-[#fff] text-[1.4rem] font-bold [@media(max-width:499px)]:text-[1rem]">전시 정보</h3>
            <ul className="[&>li]:p-[10px] [&>li]:border-t [&>li]:border-t-border-color [&>li]:border-t-[#f0f] [&>li>dl]:flex [&>li>dl]:text-basic-color [&>li>dl]:text-[1.1rem] [&>li>dl]:font-bold [&>li>dl>dt]:w-[100px] [&>li>dl>dt]:text-[#5D6268] [&>li>dl>dd]:w-[calc(100%-100px)] [&>li>dl>dd]:break-all
            
            [@media(max-width:499px)]:[&>li>dl]:text-[0.8rem]
            ">
                <li>
                    <dl>
                        <dt>장소</dt>
                        <dd>{data?.["place"]}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>관람 기간</dt>
                        {
                            (data?.["startDate"] && data?.["endDate"])
                            && 
                            <dd>{ExhibitionDateFormat(data?.["startDate"])} ~ {ExhibitionDateFormat(data?.["endDate"])}</dd>
                        }
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>관람 요금</dt>
                        <dd>{data?.["price"] ? data?.["price"] : "무료"}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>문의</dt>
                        <dd>{data?.["phone"]}</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt>웹사이트</dt>
                        <dd>
                            {
                                data?.["url"] && 
                                <Link className="underline" target="_blank" href={data?.["url"]}>{data?.["url"]}</Link>
                            }
                        </dd>
                    </dl>
                </li>
            </ul>
        </article>
    )
}