"use client"

import { useFavoriteListHook } from "../hook/useFavoriteListHook";

export const FavoriteTotal = () => {

    const { favoriteTotal } = useFavoriteListHook();

    return (
        <p className="sticky top-[0] py-[20px] text-basic-color text-[1.3rem] font-bold bg-[#11151e] z-2">좋아요 <span className="text-[1rem] text-main-color">( {favoriteTotal} )</span></p>
    )
}