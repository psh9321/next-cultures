"use client"

import Image from "next/image"
import { LogOut } from "lucide-react"

import { LogoutCallback } from "@/entities/users/(post)/util/logout"

import { useSessionHook } from "@/entities/users/(post)/hook/useSessionHook"

import { AfterLoginBox, BtnLogout, ImgBox, UserName, Container } from "./_html"

export const AfterLogin = () => {

    const { user } = useSessionHook();

    return (
        <AfterLoginBox>
            <h2 className="hidden">유저 프로필 박스</h2>
            <ImgBox>
                <Image sizes="100vw" fill unoptimized loading="lazy" src={user?.profileImg as string} alt={`${user?.name} 의 프로필 이미지`} />
            </ImgBox>
            <Container>
                <UserName>{user?.name}</UserName>
                <BtnLogout onClick={LogoutCallback}>
                    <LogOut/> 로그아웃 
                </BtnLogout>
            </Container>
        </AfterLoginBox>
    )
}