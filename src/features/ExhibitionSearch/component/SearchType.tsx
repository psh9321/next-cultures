"use client"

import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { twMerge } from "tailwind-merge"
import { useShallow } from "zustand/shallow";

const key = "type";

const types = [
    { title : "공연/전시", value : "" },
    { title : "행사/축제", value : "B" },
    { title : "교육/체험", value : "C" },
]

export const SearchType = ({ className } : COMPONENT_CLASS_NAME) => {

    const router = useRouter();

    const searchParams = useSearchParams();

    const currentType = searchParams.get(key) as SERVICE_TYPE; 

    const { SetLoadingStatus, loadingStatus } = useLoadingStore(useShallow(state => ({
        SetLoadingStatus : state.SetLoadingStatus,
        loadingStatus : state.loadingStatus
    })));

    function SearchTypeCallback(value : SERVICE_TYPE) {

        const params = new URLSearchParams(searchParams.toString());

        if(value) params.set(key, value); 
        else params.delete(key);

        SetLoadingStatus("전시검색");

        setTimeout(() => router.replace(`?${params.toString()}`), 1000)
    }

    useEffect(() => {
        if(loadingStatus) SetLoadingStatus("");
    },[currentType])

    return (
        <ul className={twMerge("flex gap-[10px]", className??"")} >
            {
                types.map((el, i) => {
                    return (
                        <li key={`서비스타입-${el["title"]}-${el["value"]}-${i}`}>
                            <button className={`h-[35px] px-[10px] text-basic-color text-[0.9rem] font-bold whitespace-nowrap border border-[2px] border-basic-color rounded-[10px] [&.active]:text-[#dedae6] [&.active]:bg-main-color [&.active]:border-main-color [@media(max-width:640px)]:text-[0.8rem] ${currentType ? currentType === el["value"] && "active" : i === 0 && "active"}`} onClick={() => SearchTypeCallback(el["value"] as SERVICE_TYPE)}>{el["title"]}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}
