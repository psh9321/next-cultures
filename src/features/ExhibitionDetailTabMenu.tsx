"use client"

import { useEffect } from "react";
import { useShallow } from "zustand/shallow"

import { useExhibitionDetailTabMenuStore } from "@/entities/exhibition/detail/store/useExhibitionDetailTabMenuStore"
import { useReviewAddStore } from "@/entities/review/add/store/useReviewAddStore";

const tabs: { title: string; value: TAB_MENU_STATUS }[] = [
    {title : "전시 정보", value : "info"},
    {title : "지도", value : "map"},
    {title : "후기", value : "review"},
];

export const ExhibitionDetailTabMenu = () => {

    const { currentTab, SetCurrentTab } = useExhibitionDetailTabMenuStore(useShallow(state => ({
        currentTab : state.currentTab,
        SetCurrentTab : state.SetCurrentTab
    })));

    const { isAdd, SetIsAddReview } = useReviewAddStore(useShallow(state => ({
        isAdd : state.isAdd,
        SetIsAddReview : state.SetIsAddReview
    })))

    function SelectTabCallback(target : TAB_MENU_STATUS) {
        if(window.scrollY > 0) window.scrollTo(0,0);
        
        SetCurrentTab(target);
        if(isAdd) SetIsAddReview(false);
    }

    useEffect(() => {
        return () => {
            if(currentTab !== "info") SetCurrentTab("info");
            if(isAdd) SetIsAddReview(false);
        }
    },[])

    return (
        <section className="flex items-center w-full">
            <h2 className="sr-only">텝 메뉴</h2>
            <ul className="flex w-full text-basic-color border-b border-b-[2px] border-b-border-color
            ">
                {
                    tabs.map((el,i) => {
                        return <li key={`전시상세페이지-텝메뉴-${el["title"]}-${el["value"]}-${i}`}>
                            <button onClick={() => SelectTabCallback(el["value"])} className={`relative p-[10px_15px] text-[1.3rem]  [&:after]:content-[''] [&:after]:absolute [&:after]:bottom-[-2px] [&:after]:left-0 [&:after]:hidden [&:after]:w-full [&:after]:h-[3px] [&:after]:bg-main-color
                            [&.active:after]:z-1
                            [&.active:after]:block 
                            ${currentTab === el["value"] && "active"}
                            `}
                            >{el["title"]}</button>
                        </li>
                    })
                }
            </ul>
        </section>
    )
}
