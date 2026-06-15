"use client"

import { useRouter } from "next/navigation";

import { useEffect, useMemo } from "react";

import { LogoutCallback } from "@/entities/users/(post)/util/logout";

import { useFavoriteListHook } from "@/entities/favorite/list/hook/useFavoriteListHook";

import { FavoriteItem } from "@/entities/favorite/list/ui/FavoriteItem";
import { FavoriteEmpty } from "@/entities/favorite/list/ui/FavoriteEmpty";

import { toastOpts } from "@/shared/util/toastOps";
import { useToastHook } from "@/shared/hook/useToastHook";

import { List, FavoriteListBox } from "./_html"

export const FavoriteList = () => {
    
    const { data, favoriteTotal, isUnauthorized, isSuccess } = useFavoriteListHook();

    const { ToastAlert, InitAlert } = useToastHook();

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

    useEffect(() => {
        if(isUnauthorized) {
            InitAlert(toastOpts["unAuthorized"], () => {
                LogoutCallback();
            })
        }
    },[isSuccess])

    return (
        <>
            <ToastAlert/>

            {
                favoriteTotal === 0 ?
                <FavoriteEmpty/>
                :
                favorites.map(([exhibitionArea, list]) => (
                    <FavoriteListBox key={`좋아요한전시-${exhibitionArea}`} className="w-full">
                        <h2 className="hidden">{exhibitionArea} 좋아요 한 전시</h2>
                        <p>{exhibitionArea}</p>
                        <List>
                            {
                                list.map((el, i) => <FavoriteItem item={el} key={`좋아요한전시-${exhibitionArea}-${i}-${el?.["exhibitionTitle"]}`}/>)
                            }
                        </List>
                    </FavoriteListBox>
                ))
            }
        </>
    )
}