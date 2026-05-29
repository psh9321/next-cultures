"use client"

import { useEffect, useRef } from "react"
import { useReviewAddStore } from "../entities/review/add/store/useReviewAddStore";
import { useAddReviewHook } from "@/entities/review/add/hook/useAddReviewHook";
import { useParams } from "next/navigation";
import { useSessionHook } from "@/shared/hook/useSessionHook";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";
import { LogoutCallback } from "@/entities/auth/util/logout";

export const ReviewAddForm = () => {

    const { seq } = useParams<{seq : string}>();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { isLogin, user } = useSessionHook();

    const { mutateAsync } = useAddReviewHook(seq);

    const SetIsAddReview = useReviewAddStore(state => state.SetIsAddReview);

    function AddCancelCallback() { SetIsAddReview(false) };

    const { InitAlert, ToastAlert } = useToastHook();

    async function AddSubmitCallback() {
        if(!isLogin) return
        if(!textareaRef["current"]) return 
        if(!textareaRef["current"].value) return 

        const param : ADD_REVIEW_PARAMS = {
            exhibitionSeq : seq, 
            reviewContents : textareaRef["current"].value,
            writerName : user?.name??""
        }

        const { resultCode } = await mutateAsync(param);

        if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"],LogoutCallback);

        SetIsAddReview(false)
    }

    useEffect(() => {
        if(!textareaRef["current"]) return

        const textarea = textareaRef["current"];

        textarea.focus();

        const end = textarea.value.length;
        textarea.setSelectionRange(end, end);

        textarea.scrollIntoView({block : "start", behavior : "smooth"})
    },[])

    return (
        <>
            <ToastAlert/>

            <article>
                <h2 className="sr-only">리뷰 폼</h2>
                
                <textarea ref={textareaRef} className="scrollbar w-full p-[10px_15px] text-[#fff] border border-dotted border-border-color border-[4px] rounded-[10px]"></textarea>
                
                <ul className="flex text-basic-color justify-end gap-[10px] w-full mt-[25px] pb-[10px] [&>li>button]:p-[5px_20px] [&>li>button]:border [&>li>button]:rounded-[5px] [@media(max-width:499px)]:mt-[10px]">
                    <li><button onClick={AddCancelCallback}>취소</button></li>
                    <li><button onClick={AddSubmitCallback}>등록</button></li>
                </ul>
            </article>        
        </>

    )
}