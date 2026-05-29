"use client"

import { useReviewAddStore } from "@/entities/review/add/store/useReviewAddStore";

import { ReviewAddForm } from "@/features/ReviewAddForm"

export const AddReviewFormBox = () => {
    
    const isAdd = useReviewAddStore(state => state.isAdd);

    return (
        <>
            { 
                isAdd && <section className="mt-[20px]">
                    <h3 className="inline-block mb-[10px] text-[#fff] text-[1.4rem] font-bold [@media(max-width:499px)]:text-[1.1rem]">후기 등록 하기</h3>
                    <ReviewAddForm/>
                </section>
            }
        </>
    )
}