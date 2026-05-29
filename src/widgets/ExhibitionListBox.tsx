"use client"

import { ExhibitionList } from "@/features/ExhibitionList"

export const ExhibitionListBox = () => {
    return (
        <section className="flex justify-center">
            <h2 className="sr-only">전시 목록</h2>
            <ExhibitionList/>
        </section>
    )
}