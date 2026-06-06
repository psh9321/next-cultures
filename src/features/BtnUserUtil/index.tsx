"use client"

import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useEffect, useState } from "react";

import { CircleUserRound, Settings } from "lucide-react"

import { useSessionHook } from "@/shared/hook/useSessionHook"

import { BtnLogout } from '@/entities/auth/ui/BtnLogout';

import { UpdateUserForm } from "./UpdateUserForm";
import { BtnUserDelete } from "./BtnUserDelete";
import { Portal } from '@/shared/ui/Portal';

const BeforeLogin = dynamic(() => import("@/features/BeforeLogin").then(m => m.BeforeLogin));

export const BtnUserUtilSideMenu = () => {
    const [isMenu, SetIsMenu] = useState(false);

    const [ isUserForm, SetIsUserForm ] = useState(false);

    function ToggleMenuCallback() { 
        if(isUserForm) SetIsUserForm(false);
        SetIsMenu(!isMenu) 
    };

    return (
        <>
            <button onClick={ToggleMenuCallback} className="inline-block">
                <Settings size={22}  className="stroke-basic-color"/>
            </button>        
            
            {
                isMenu &&
                <>
                    <div className="absolute bottom-[100px] left-[200px] w-[300px] py-[10px] text-basic-color font-bold bg-[#0e131d] border border-[2px] border-border-color rounded-[10px] shadow-[4px_4px_4px_#31333A] z-[999999999]">
                        {
                            isUserForm ? 
                            <UpdateUserForm cancelCallback={() => SetIsUserForm(false)}/>
                            :
                            <ul className="space-y-[10px] [&>li]:w-full [&>li>button]:block [&>li]:px-[15px] [&>li>button]:w-full [&>li>button]:p-[5px_10px] [&>li>button]:text-left [&>li>button]:text-[1.2rem] [&>li>button]:rounded-[5px] [&>li>button:hover]:text-[#fff] [&>li>button:hover]:bg-main-color">
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
                        }
                    </div>
                    <div onClick={ToggleMenuCallback} className="fixed top-0 left-0 block w-full h-full z-[1]"></div>
                </>
            }
        </>
    )
}

export const BtnUserUtilFooter = () => {

    const { isLogin, user } = useSessionHook();
    const profileImgSrc = `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg${user?.profileImgVersion ? `?v=${user.profileImgVersion}` : ""}`;

    const [ isMenu, SetIsMenu ] = useState(false);
    
    const [ isUserForm, SetIsUserForm ] = useState(false);

    function ToggleMenuCallback() { 
        SetIsMenu(!isMenu) 
    };

    useEffect(() => {
        return () => {
            console.log("clean")
        }
    },[])
    
    return (
        <>
            <button onClick={ToggleMenuCallback} className='relative flex flex-col justify-center items-center gap-[5px] h-full text-basic-color font-bold [&>svg]:size-[40px] [&>svg]:p-[5px]'>
                {
                    user?.isProfileImg ? <Image className="size-[40px] border-[2px] border-basic-color rounded-[100%]" src={profileImgSrc} alt={`${user?.name} 프로필 이미지`} width={40} height={40} unoptimized loading="eager" /> :
                    <CircleUserRound className="inline-block size-[36px] stroke-basic-color" size={36}/>
                }
                { isLogin ? user?.name : "내정보" }
            </button>

            {
                isMenu && 
                <Portal>
                    <div className='fixed bottom-[100px] left-1/2 -translate-x-1/2 w-[260px] p-[20px] text-basic-color bg-[#0e131d] border border-[2px] border-border-color rounded-[10px] shadow-[4px_4px_4px_#31333A] z-[9]'>
                        {
                            isLogin ? 
                            <>
                            {
                                isUserForm ? 
                                <UpdateUserForm cancelCallback={() => SetIsUserForm(false)}/>
                                :
                                <ul className="space-y-[10px] [&>li]:w-full [&>li>button]:block [&>li]:px-[15px] [&>li>button]:w-full [&>li>button]:p-[5px_10px] [&>li>button]:text-left [&>li>button]:text-[1.2rem] [&>li>button]:rounded-[5px] [&>li>button:hover]:text-[#fff] [&>li>button:hover]:bg-main-color">
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
                            }
                            </>

                            :
                            <BeforeLogin/>
                        }
                    </div>
                    <div onClick={ToggleMenuCallback} className='fixed top-0 left-0 w-full h-full z-5'></div>
                </Portal>
            }            
        </>
    )
}
