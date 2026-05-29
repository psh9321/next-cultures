"use client"

import { useMemo } from "react";

import { useFavoriteListHook } from "@/entities/favorite/list/hook/useFavoriteListHook";
import { FavoriteEmpty } from "@/entities/favorite/list/ui/FavoriteEmpty";

import { FavoriteItem } from "@/entities/favorite/list/ui/FavoriteItem";

export const FavoriteList = () => {

    const { data, favoriteTotal } = useFavoriteListHook();

    const favorites = useMemo(() => {
        const map = new Map<FAVORITE_ITEM["exhibitionArea"], FAVORITE_ITEM[]>();

        data?.forEach(item => {
            if(!item) return;

            const area = item.exhibitionArea;
            const prevList = map.get(area)??[];

            map.set(area, [...prevList, item]);
        })

        return Array.from(map);
    }, [data]);

    return (
        <article className="flex flex-col items-center gap-[40px] w-[980px] mx-auto [@media(max-width:1010px)]:w-[450px]
        [@media(max-width:499px)]:w-full
        ">
            {
                favoriteTotal === 0 ?
                <FavoriteEmpty/>
                :
                favorites.map(([exhibitionArea, list]) => (
                    <div key={`좋아요한전시-${exhibitionArea}`} className="w-full">
                        <h3 className="relative flex items-center mb-[20px] text-[1.25rem] font-bold text-main-color 
                        [&:before]:content-['']
                        [&:before]:block
                        [&:before]:w-[3px]
                        [&:before]:h-[20px]
                        [&:before]:mr-[10px]
                        [&:before]:bg-main-color
                        ">{exhibitionArea}</h3>
                        <ol className="flex flex-wrap gap-[20px]">
                            {
                                list.map((el, i) => (
                                    <FavoriteItem item={el} key={`좋아요한전시-${exhibitionArea}-${i}-${el?.["exhibitionTitle"]}`}/>
                                ))
                            }
                        </ol>
                    </div>
                ))
            }
        </article>
    )
}
