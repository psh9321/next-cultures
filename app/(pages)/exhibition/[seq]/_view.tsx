"use client"

import { useResizeHook } from "@/shared/hook/useResizeHook";

import { ExhibitionDetailTabMenu } from "@/features/ExhibitionDetailTabMenu";

import { LatestReview } from "@/features/LatestReview";
import { ExhibitionDetailTabBox } from "@/widgets/ExhibitionDetailTabBox";
import { ExhibitionBannerInfo } from "@/features/ExhibitionBannerInfo";

import { AddReviewFormBox } from "@/features/AddReviewFormBox";

const ExhibitionDetailPageView = () => {

    const isResize = useResizeHook(1050);

    return (
        <div className={`flex justify-center ${isResize && "px-[20px]"}`}>
            <h1 className="sr-only">전시 상세 정보</h1>

            <main className="w-[670px]">
                <div className="sticky top-0 z-[1] bg-[#11151E] [@media(max-width:499px)]:relative">
                    <ExhibitionBannerInfo />
                    <ExhibitionDetailTabMenu/>
                    <AddReviewFormBox/>                     
                </div>
                <div className="mt-[20px]">
                    <ExhibitionDetailTabBox/>
                </div>
            </main>
            {
                !isResize && <div className="w-[300px] mt-[20px] ml-[30px]"><div className="mt-[20px]"><LatestReview/></div></div>
            }
        </div>
    )
}

export default ExhibitionDetailPageView