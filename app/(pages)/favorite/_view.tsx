"use client"

import { FavoriteTotal } from "@/entities/favorite/list/ui/FavoriteTotal";

import { FavoriteListBox } from "@/widgets/FavoriteListBox";

const FavoritePageView = () => {
    
    return (
        <div className="max-w-[1440px] mx-auto px-[20px] pb-[20px] 
        ">
            <h1 className="sr-only">관심있는 전시 페이지</h1>
            <FavoriteTotal/>
            <FavoriteListBox/>
        </div>
    )
}

export default FavoritePageView