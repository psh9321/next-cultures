"use client"

import Image from "next/image"

import { useRef, useState } from "react"

import { CircleUserRound, NotebookPen, PencilOff } from 'lucide-react';

import { TextArea } from "@/shared/ui/TextArea";

import { DateFormat } from "@/shared/util/dateFormat";
import { useUpdateReviewHook } from "@/entities/review/update/hook/useUpdateReviewHook";

import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";
import { LogoutCallback } from "@/entities/auth/util/logout";
import { BtnReviewDelete } from "@/features/ReviewList/components/BtnReviewDelete";

interface REVIEW_ITEM {
    item : REVIEW_DATA,
    userId : string,
    isLogin : boolean,
}

export const ReviewItem = ({ item, userId, isLogin } : REVIEW_ITEM) => {

    const { ToastAlert, InitAlert } = useToastHook()

    const [ isUpdate, SetIsUpdate ] = useState(false);

    const [ value, SetValue ] = useState<string>(item["contents"]);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { mutateAsync } = useUpdateReviewHook(item["_id"], item["seq"]);

    function ToggleUpdateCallback() { 
        if(textareaRef["current"]) textareaRef["current"].value = value;
        SetIsUpdate(!isUpdate);
    };

    async function EditSubmitCallback() {
        try {
            if(!textareaRef["current"]) return
            if(!textareaRef["current"].value) return

            const reviewContents = textareaRef["current"].value;

            if(reviewContents === value) return

            const { resultCode } = await mutateAsync({itemId : item["_id"], reviewContents});

            if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"],LogoutCallback);

            SetIsUpdate(!isUpdate);
            SetValue(reviewContents);
        }
        catch(err) {
            console.log("ReviewItem EditSubmitCallback error",err);
            alert("알수 없는 에러");
        }
    }

    return (
        <>

            <ToastAlert />

            <li className="relative flex flex-wrap gap-[8px] py-[10px] text-basic-color font-bold [&:after]:content-[''][&:after]:absolute[&:after]:bottom-[0][&:after]:left-1/2[&:after]:-translate-1/2[&:after]:block[&:after]:w-[90%][&:after]:h-[2px][&:after]:bg-border-color
            [&:nth-child(n+2)]">
                <div className="relative block size-[40px]">
                    
                {
                    item.writerIsProfileImg ? 
                    <Image className="rounded-[100%]" src={`${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${item.writerId}/profile.jpeg`} alt={`${item.writerName} 프로필 이미지`} fill sizes="100vw" unoptimized loading="eager" /> :
                    <CircleUserRound className="inline-block size-[36px] stroke-basic-color" size={36}/>
                }
                </div>
                <dl className="w-[calc(100%-50px)] mb-[10px] text-[0.85rem]">
                    <dt>{item["writerName"]}</dt>
                    <dd>{DateFormat(item["updatedAt"], true)}</dd>
                </dl>
                {
                    (isLogin && userId === item["writerId"]) &&
                    <ul className="absolute top-[20px] right-[20px] flex gap-[6px]">
                        <li>
                            <button onClick={ToggleUpdateCallback}>
                                { isUpdate ? <PencilOff/> : <NotebookPen/> }
                            </button>
                        </li>
                        <li><BtnReviewDelete seq={item["seq"]} itemId={item["_id"]} /></li>
                    </ul>
                }
                <TextArea ref={textareaRef} isDisabled={!isLogin || userId !== item["writerId"] || !isUpdate} value={item["contents"]} />
                {
                    (isLogin && isUpdate) &&
                    <ul className="flex justify-end gap-[10px] w-full mt-[25px] pb-[10px] [&>li>button]:p-[5px_20px] [&>li>button]:border [&>li>button]:rounded-[5px]">
                        <li><button onClick={ToggleUpdateCallback}>취소</button></li>
                        <li><button onClick={EditSubmitCallback}>수정</button></li>
                    </ul>
                }
            </li>
        </>
    )
}
