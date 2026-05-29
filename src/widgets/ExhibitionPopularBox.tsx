"use client"

import { ExhibitionPopularList } from "@/features/ExhibitionPopularList"

export const ExhibitionPopularBox = () => {
    return (
        <section className="relative block w-full p-[20px_10px] bg-[#222226] border border-border-color rounded-[10px] shadow-[3px_3px_3px_rgba(0,0,0,0.8)]">
            <h3 className="mb-[15px] text-[#fff] text-[1.2rem] font-bold">인기있는 전시</h3>
            <ExhibitionPopularList/>
        </section>
    )
}
