"use client"

import Image from "next/image";

import { useState } from 'react';

import { CircleUserRound } from "lucide-react";

import { BtnUserUtilSideMenu } from "../BtnUserUtil";
import { useSessionHook } from "@/shared/hook/useSessionHook";
import { GoogleLogo, KakaoLogo, NaverLogo } from "../../shared/ui/svg/SSOLogo";

import { BtnUserDelete } from '@/features/BtnUserUtil/BtnUserDelete';
import { UpdateUserForm } from '@/features/BtnUserUtil/UpdateUserForm';
import { BtnLogout } from '@/entities/auth/ui/BtnLogout';

export const AfterLoginSideMenu = () => {

    const { user } = useSessionHook();
    const profileImgSrc = `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg${user?.profileImgVersion ? `?v=${user.profileImgVersion}` : ""}`;

    return (
        <div className={"relative flex justify-between items-start h-[90px] p-[15px] px-[20px] border border-t-[2px] border-t-[#31333A]"}>
            <div className="relative size-[36px]">
                {
                user?.isProfileImg ? <Image className="rounded-[100%]" src={profileImgSrc} alt={`${user?.name} 프로필 이미지`} fill sizes="100vw" unoptimized loading="eager" /> :
                <CircleUserRound className="inline-block size-[36px] stroke-basic-color" size={36}/>
                }
            </div>
            <dl className="w-[calc(100%-70px)] text-basic-color">
                <dt className="w-full text-[1.05rem] font-bold">{user?.name}</dt>
                <dd className="mt-[5px]">
                    {
                        user?.type === "kakao" && <KakaoLogo size={25} />
                    }
                    {
                        
                        user?.type === "naver" && <NaverLogo size={25} />
                    }
                    {
                        user?.type === "google" && <GoogleLogo />
                    }
                </dd>
            </dl>
            <BtnUserUtilSideMenu/>
        </div>
    )    
}

export const AfterLoginFooter = () => {

    const [ isUserForm, SetIsUserForm ] = useState(false);

    const [ isMenu, SetIsMenu ] = useState(false);

    function ToggleMenuCallback() { 
        if(isUserForm) SetIsUserForm(false);
        SetIsMenu(!isMenu) 
    };

    return (
        <>
            <ul className="p-[15px] space-y-[10px] [&>li]:w-full [&>li>button]:block [&>li>button]:w-full [&>li>button]:p-[5px_10px] [&>li>button]:text-left [&>li>button]:text-[1.2rem] [&>li>button]:rounded-[5px] [&>li>button:hover]:text-[#fff] [&>li>button:hover]:bg-main-color">
                <li>
                    <button onClick={() => SetIsUserForm(true)}>유저 정보 수정</button>
                </li>
                <li>
                    <BtnUserDelete/>
                </li>
                <li>
                    <BtnLogout/>
                </li>
            </ul>
        </>
    )
}
