"use client"

import { ExhibitionListBox } from "@/widgets/ExhibitionListBox"
import { ExhibitionSearchBox } from "@/widgets/ExhibitionSearchBox"

const IndexPageView = () => {

    return (
        <div className="">
            <h1 className="sr-only">메인 페이지 (전시목록)</h1>
            <div className="sticky top-[0] flex w-full min-h-[130px] p-[20px] bg-[#11151E] z-[1] [@media(max-width:800px)]:flex-col [@media(max-width:800px)]:gap-[20px]">
                <h3 className="block mr-[30px] text-[#fff] text-[2rem] font-bold [@media(max-width:800px)]:text-[1.4rem]">
                    새로운 문화정보를 <br/>
                    <span className="relative text-main-color border-b border-b-[3px]">발견</span>해보세요
                </h3>
                <ExhibitionSearchBox/>
            </div>
            <main className="flex justify-center max-w-[980px] mx-auto px-[20px]">
                <ExhibitionListBox/>
            </main>
        </div>
    )
}

export default IndexPageView
