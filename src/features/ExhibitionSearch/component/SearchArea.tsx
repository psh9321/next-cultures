"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import { ChevronsUpDown } from 'lucide-react';

import { useLoadingStore } from '@/shared/store/useLoadingStore';

const areaData = [
    "지역 전체","서울", "경기", "세종", "대전", "대구", "부산", "광주", "제주", "강원", "경남", "경북", "울산", "인천", "전남", "전북", "충남", "충북"
].map(el => ({
    key : el,
    value : el === "지역 전체" ? "" : el.replace(/ /g, '')
}));

const key = "area";

export const SearchArea = () => {

    const [ isSelect, SetIsSelect ] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();

    const currentArea = searchParams.get(key) as DISTRICT;

    function ToggleSelect() { SetIsSelect(!isSelect) }

    const selectRef = useRef<HTMLUListElement>(null);

    const { SetLoadingStatus, loadingStatus } = useLoadingStore(useShallow(state => ({
        SetLoadingStatus : state.SetLoadingStatus,
        loadingStatus : state.loadingStatus
    })));

    function BtnScrollCallback() {
        if(!selectRef["current"]) return
        
        const select = selectRef["current"];

        const isScrollEnd = select.clientHeight + select.scrollTop === select.scrollHeight;

        select.scrollTo({
            top : isScrollEnd ? 0 : select.scrollHeight,
            behavior : "smooth"
        });
    }

    function SearchAreaCallback(value : DISTRICT) {
        const params = new URLSearchParams(searchParams.toString());

        if(value) params.set(key, value); 
        else params.delete(key);

        SetLoadingStatus("전시검색");

        setTimeout(() => router.replace(`?${params.toString()}`), 1000)
    }

    useEffect(() => {
        if(loadingStatus) SetLoadingStatus("");
    },[currentArea])

    return (
        <div className="relative w-[110px] text-basic-color text-[0.9rem] font-bold ">
            <button onClick={ToggleSelect} className="w-full h-[35px] bg-[#1E222A] border-[2px] border-basic-color rounded-[10px]">{currentArea??"지역 전체"}</button>

            {
                isSelect && 
                <>
                    <div className="absolute top-[0] left-[120px] w-full py-[10px] bg-[#1E222A] border-[2px] border-basic-color shadow-[3px_3px_3px_rgba(0,0,0,0.8)] rounded-[10px] z-4 [@media(max-width:640px)]:left-auto [@media(max-width:640px)]:right-0 [@media(max-width:480px)]:top-[45px] [@media(max-width:480px)]:left-0">
                        <ul ref={selectRef} className='h-[250px] overflow-y-auto'>
                            {
                                areaData.map((el, i) => {
                                    return (
                                        <li key={`지역선택-${el["key"]}-${i}`} className='p-[6px_10px]'>
                                            <button onClick={() => SearchAreaCallback(el["value"] as DISTRICT)} className={`block w-full pl-[5px] text-left text-[1.1rem] rounded-[5px] [&:hover]:bg-main-color [&:hover]:text-[#fff] [&.active]:bg-main-color [&.active]:text-[#fff] ${el["value"] === currentArea && 'active'}`}>{el["key"]}</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className='w-full h-[30px] leading-[30px] mt-[5px] text-center'>
                            <button onClick={BtnScrollCallback}>
                                <ChevronsUpDown size={20} className='inline-block'/>
                            </button>
                        </div>

                        
                    </div>

                    {/* background layer */}
                    <div onClick={ToggleSelect} className='fixed top-0 left-0 w-full h-full z-3 bg-transparent'></div>                
                </>

            }
        </div>
    )
}
