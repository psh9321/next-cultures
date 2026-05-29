"use client"

import { forwardRef, useEffect, useLayoutEffect, useRef } from "react"
import { twMerge } from "tailwind-merge";

interface TEXT_AREA {
    isDisabled : boolean;
    value?: string;
    className? : string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TEXT_AREA>(({ isDisabled, value, className }, ref) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function ResizeTextArea(textarea: HTMLTextAreaElement) {
        if(!textarea) return
        /** 백스페이스 시 높이 조절을 위해 먼저 auto 처리 */
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        
    }

    function HandleTextAreaCallback(e: React.InputEvent<HTMLTextAreaElement>) { ResizeTextArea(e.currentTarget) };

    useLayoutEffect(() => {
        if(!textareaRef["current"]) return 
        ResizeTextArea(textareaRef["current"]);
    },[]);

    useEffect(() => {
        
        if(!textareaRef["current"]) return
        if(isDisabled) return

        const textarea = textareaRef["current"];

        textarea.focus();

        const end = textarea.value.length;
        textarea.setSelectionRange(end, end);
    },[isDisabled])

    return (
        <textarea className={twMerge(`w-full p-[10px_15px] text-[#fff] rounded-[10px] ${!isDisabled && "border border-dotted border-border-color border-[4px]"}`, className??"")} disabled={isDisabled} onInput={HandleTextAreaCallback} ref={textarea => {
            textareaRef["current"] = textarea;
            if(typeof ref === "function") ref(textarea);
            else if(ref) ref["current"] = textarea
        }} defaultValue={value??""}></textarea>
    )
})