"use client"

import Link from "next/link"

import { HeartX } from "lucide-react"

export const FavoriteEmpty = () => {

    return (
        <div className='w-full mt-[150px] text-basic-color text-center'>
            <HeartX className='inline-block' size={45}/>
            <dl className="mt-[15px] font-bold">
                <dt className="text-[1rem]">좋아요 한 문화정보가 없습니다.</dt>
                <dd className="mt-[10px] text-[2rem] [@media(max-width:499px)]:text-[1.4rem]">{`" 문화정보를 찾아보세요. "`}</dd>
            </dl>
            <Link href={"/"} className="inline-block mt-[25px] p-[10px_15px] text-[#fff] bg-main-color rounded-[10px]">문화정보 찾기</Link>
        </div>
    )
}