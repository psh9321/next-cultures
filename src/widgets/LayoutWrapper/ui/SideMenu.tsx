"use client"

import dynamic from 'next/dynamic';

import { useSessionHook } from '@/shared/hook/useSessionHook';

import { BtnSideMenuNaviHome, BtnSideMenuNaviFavorite } from "@/features/BtnNavi"

const BeforeLogin = dynamic(() => import("@/features/BeforeLogin").then(m => m.BeforeLogin));

const AfterLoginSideMenu = dynamic(() => import("@/features/AfterLogin").then(m => m.AfterLoginSideMenu));

export const SideMenu = () => {

    const { isLogin } = useSessionHook();

    return (
        <aside className="sticky top-0 flex flex-col w-[240px] h-dvh pt-[20px] border border-r-[2px] border-r-[#31333A] z-[2]">
            <h3 className="leading-[1.3] px-[20px] text-main-color text-[1.5rem]">Discover <br/> Exhibitions</h3>
            <nav className='mt-[30px] px-[20px] space-y-[25px]'>
                <BtnSideMenuNaviHome/>
                <BtnSideMenuNaviFavorite/>
            </nav>
            <div className='mt-auto'>
                { isLogin ? <AfterLoginSideMenu /> : <BeforeLogin className='px-[20px] pb-[20px]'/> }
            </div>
        </aside>
    )
}