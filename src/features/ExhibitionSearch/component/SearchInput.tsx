"use client"

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef } from 'react';

import { useShallow } from 'zustand/shallow';

import { Search, CircleX } from "lucide-react"

import { useLoadingStore } from '@/shared/store/useLoadingStore';

const key = "keyword";

export const SearchInput = () => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const { SetLoadingStatus, loadingStatus } = useLoadingStore(useShallow(state => ({
        SetLoadingStatus : state.SetLoadingStatus,
        loadingStatus : state.loadingStatus
    })));

    const currentKeyword = searchParams.get(key) as string;

    function OnInputCallback(e : React.InputEvent<HTMLInputElement>) {

        const value = e.currentTarget.value.replace(/ /g, '');

        if(value === currentKeyword) return

        if(debounceTimer["current"]) {
            clearTimeout(debounceTimer["current"]);
            debounceTimer["current"] = null;
        }

        debounceTimer["current"] = setTimeout(() => {
            
            const params = new URLSearchParams(searchParams.toString());

            if(value) {
                SetLoadingStatus("전시검색");
                params.set(key, value);   
            }
            else {
                if(!params.has(key)) return

                params.delete(key);
            }

            setTimeout(() => router.replace(`?${params.toString()}`), 1000)
        }, 500);
    }

    function InputClearCallback() {

        if(!inputRef["current"]) return

        const input = inputRef["current"];

        input.value = "";

        const params = new URLSearchParams(searchParams.toString());

        if(!params.has(key)) return

        params.delete(key);

        // SetLoadingStatus("검색 초기화");

        router.replace(`?${params.toString()}`)
    }

    useEffect(() => {
        if(loadingStatus) SetLoadingStatus("");
    },[currentKeyword])

    return (
        <div className="relative inline-flex items-center w-[450px] h-[45px] p-[10px] text-[#7F8080] bg-[#242425] rounded-[10px] [@media(max-width:800px)]:w-full">
            <Search size={25}/>
            <input ref={inputRef} defaultValue={currentKeyword??""} onInput={OnInputCallback} type="text" className="w-full h-full ml-[5px] text-[1.3rem] outline-none [@media(max-width:640px)]:text-[1rem]" placeholder="전시 제목, 장소 검색" />

            {searchParams.get("keyword") && <button onClick={InputClearCallback} className="ml-[10px]"><CircleX/></button>}
        </div>
    )
}
