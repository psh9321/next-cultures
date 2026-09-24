"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"

import { useEffect, useState } from "react"

import { Menu, Search, UserRoundKey } from "lucide-react"

import useMediaQuery from "@parksuhyun9321/use-media-query"

import { NavBox } from "@/features/NavBox"
import { UserBox } from "@/features/UserBox"

import { useSessionHook } from "@/entities/users/(post)/hook/useSessionHook"

import { BackgroundLayer } from "@/shared/ui/BackgroundLayer"
import { BodyScrollLock } from "@/shared/util/bodyScrollLock"

import { HeaderWrapper, HeaderInner, HeaderLogo, HeaderBtnList, UserBoxWrapper, SideMenu, NaviContainer } from "./_html"

export const Header = () => {
    const [ isSearch, SetIsSearch ] = useState<boolean>(false);

    const [ isUserBox, SetIsUserBox ] = useState<boolean>(false);

    const [ isNav, SetIsNav ] = useState<boolean>(false);

    const [ isSideMenu, SetIsSideMenu ] = useState<boolean>(false);

    const { isResize } = useMediaQuery(800);

    const { isLogin, user } = useSessionHook();

    function OnClickToggleSideMenu() {
        const is = !isSideMenu;
        SetIsSideMenu(is);

        BodyScrollLock(is)
    }

    useEffect(() => {
        SetIsNav(!isResize);
    },[isResize]);
    
    return (
        <>
            <HeaderWrapper>
                <HeaderInner>
                    <HeaderLogo>
                        Discover <br/> Cultures
                    </HeaderLogo>
                    {
                        isNav && <NaviContainer><NavBox/></NaviContainer>
                    }
                    <HeaderBtnList>
                        { 
                            !isNav &&<li>
                                <button onClick={OnClickToggleSideMenu}><Menu/></button>
                            </li> 
                        }
                        <li>
                            <button onClick={() => SetIsUserBox(true)}>
                                {
                                    // Image
                                    isLogin ? 
                                        <Image style={{borderRadius : "100%"}} sizes="100vw" loading="eager" width={30} height={30} src={user?.profileImg as string} alt={`${user?.name} 의 프로필 이미지`} /> : <UserRoundKey/>
                                }
                            </button>
                            {
                                isUserBox && 
                                <>
                                    <UserBoxWrapper>
                                        <UserBox/>
                                    </UserBoxWrapper>
                                    <BackgroundLayer onClick={() => SetIsUserBox(false)}/>              
                                </>
                            }
                        </li>
                    </HeaderBtnList>
                </HeaderInner>
            </HeaderWrapper>

            <SideMenu className={`${isSideMenu && "on"}`}>
                <NavBox isColumn={true}/>
            </SideMenu>       
            {
                isSideMenu && <BackgroundLayer onClick={OnClickToggleSideMenu}/>
            }

        </>

    )
}