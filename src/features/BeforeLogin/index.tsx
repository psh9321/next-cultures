"use client"

import { twMerge } from "tailwind-merge";

import { NaverLogo, KakaoLogo, GoogleLogo } from "@/shared/ui/svg/SSOLogo";

import { BtnSSO } from "./BtnSSO";

export const BeforeLogin = ({ className } : COMPONENT_CLASS_NAME) => {

    return (
        <div className={twMerge('space-y-[15px]', className??"")}>
            <BtnSSO type="kakao" className="text-[#181701] bg-[#F7EB05]">
                <KakaoLogo/>            
                카카오 로그인
            </BtnSSO>
            <BtnSSO type="naver" className="text-[#fff] bg-[#03C75A]">
                <NaverLogo/>            
                네이버 로그인
            </BtnSSO>
            <BtnSSO type="google" className="text-[#000] bg-[#F2F2F2]">
                <GoogleLogo/>            
                구글 로그인
            </BtnSSO>
        </div>
    )
}