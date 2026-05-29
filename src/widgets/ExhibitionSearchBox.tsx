"use client"

import { ExhibitionSearch } from "@/features/ExhibitionSearch"

export const ExhibitionSearchBox = () => {
    return (
        <section>
            <h2 className="sr-only">전시 검색 박스</h2>
            <ExhibitionSearch/>
        </section>
    )
}