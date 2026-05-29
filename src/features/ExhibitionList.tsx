"use client"

import { useSearchParams } from "next/navigation"

import { useEffect } from "react";

import { useExhibitionListHook } from "@/entities/exhibition/list/hook/useExhibitionListHook"
import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { ExhibitionItem } from "@/entities/exhibition/list/ui/ExhibitionItem";
import { ExhibitionEmpty } from "@/entities/exhibition/list/ui/ExhibitionEmpty";
import { useInterSectionObserver } from "@/shared/hook/useInterSectionObserver";

import { BodyScrollLock } from "@/shared/util/bodyScrollLock";

export const ExhibitionList = () => {

    const searchParams = useSearchParams();

    const type = searchParams.get("type") as SERVICE_TYPE;

    const keyword = searchParams.get("keyword") as string;

    const area = searchParams.get("area") as DISTRICT;

    const { data, isFetching, isLoading, fetchNextPage, hasNextPage } = useExhibitionListHook(type, keyword, area);

    const { ref, isView } = useInterSectionObserver<HTMLLIElement>({
        threshold : 0
    });

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    const total = data?.pages.at(-1)?.total??0;

    useEffect(() => {
        if(!isView) return;
        if(isLoading) return;
        if(isFetching) return;
        if(!hasNextPage) return;

        fetchNextPage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isView]);

    useEffect(() => {
        if(isFetching) {
            BodyScrollLock(true);
            SetLoadingStatus("전시정보불러오기");
        }
        else {
            BodyScrollLock(false);
            SetLoadingStatus("");
        }
    },[isFetching])
    
    return (
        <ol className="flex flex-wrap gap-[20px] [@media(max-width:920px)]:gap-[15px]">
            {
                total === 0 ?
                <ExhibitionEmpty/>
                :
                data?.pages.map(page => {
                    if(!page) return <></>

                    const list = (page as INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>)["list"];

                    return list.map((el, i) => <ExhibitionItem key={`전시목록-${i}-${el["title"]}`} item={el} />)
                })
            }

            <li ref={ref} style={{height : "1px"}}></li>
        </ol>
    )
}
