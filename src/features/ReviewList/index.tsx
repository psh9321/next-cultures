"use client"

import { useParams } from "next/navigation"

import { ReviewItem } from "@/features/ReviewList/components/ReviewItem"

import { useSessionHook } from "@/shared/hook/useSessionHook"
import { useReviewListHook } from "@/entities/review/list/hook/useReviewListHook"

import { BtnAddReview } from "@/entities/review/add/ui/BtnAddReview"
import { PeanutLoader } from "@/shared/ui/PeanutLoader"

export const ReviewList = () => {

    const { seq } = useParams<{seq : string}>();

    const { isLogin, user } = useSessionHook();

    const { data, reviewTotal, isFetching, isLoading } = useReviewListHook(seq, false);

    return (
        <article className="relative min-h-[150px]">
            <h3 className="mb-[15px] text-[#fff] text-[1.4rem] font-bold [@media(max-width:499px)]:text-[1rem]">해당 전시 등록된 후기 {reviewTotal > 0 && <span className="text-main-color text-[1rem]">( {reviewTotal} )</span> }</h3>

            {
                isFetching && 
                <>
                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.1)] rounded-[10px]"></div>
                    <PeanutLoader className={`fixed bottom-[20px] left-1/2 -translate-1/2`}/>                   
                </>
            }
            
            <ol className="space-y-[35px]">
                {
                    reviewTotal === 0 ?
                    <li className="text-basic-color text-center">
                        <dl className="mt-[70px] mb-[20px] font-bold">
                            <dt className="text-[1.05rem]">등록된 후기가없습니다.</dt>
                            <dd className="mt-[5px] text-[1.4rem]">첫 후기를 등록 해 보세요.</dd>
                        </dl>
                        <BtnAddReview/>
                    </li>
                    :
                    data?.pages.map(page => {
                        if(!page) return <></>
                        const list = (page as REVIEW_LIST)["list"];
                        return list.map((el, i) => <ReviewItem userId={user?.id as string} isLogin={isLogin} item={el} key={`해당전시리뷰-${i}-${el?.["contents"]}`}/>)
                    })
                }
            </ol>
        </article>
    )
}