"use client"

import { BtnFooterNaviHome, BtnFooterNaviFavorite } from "@/features/BtnNavi"

import { BtnUserUtilFooter } from '@/features/BtnUserUtil';

export const Footer = () => {

    return (
        <footer className="fixed bottom-0 block w-full h-[90px] bg-[#11151e] border-t-border-color border-t-[2px]">
            <nav className="flex justify-center items-center gap-[50px] h-full">
                <BtnFooterNaviHome/>
                <BtnFooterNaviFavorite/>
                <BtnUserUtilFooter/>
            </nav>
        </footer>        
    )
}