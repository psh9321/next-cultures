"use client"

import { SearchAlert } from 'lucide-react';

export const ExhibitionEmpty = () => {
    return (
        <li className='w-full mt-[150px] text-basic-color text-center [@media(max-width:499px)]:mt-[70px]'>
            <SearchAlert className='inline-block' size={45}/>
            <h3 className='mt-[15px] text-[2rem] [@media(max-width:499px)]:text-[1.4rem]'>게시물이 없습니다.</h3>
        </li>
    )
}