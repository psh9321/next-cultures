"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Heart, TicketCheck, Tickets } from 'lucide-react'
import { useFavoriteListHook } from '@/entities/favorite/list/hook/useFavoriteListHook';

interface BTN_NAVI extends LAYOUT_CHILD {
    href : string,
}

export const BtnSideMenuNavi = ({ children, href } : BTN_NAVI) => {

    const pathname = usePathname();
    
    return (
        <Link className={`relative flex gap-[10px]
            items-center
            text-basic-color
            text-[1.2rem]
            duration-200
            [&>span]:block
            [&>span]:size-[28px]
            [&>span]:leading-[28px]
            [&>span]:text-center
            [&>span]:text-[#F5F3FF] 
            [&>span]:text-[0.8rem]
            [&>span]:text-center
            [&>span]:bg-gradient-to-r 
            [&>span]:from-[#6D3DF5] 
            [&>span]:to-[#4B1FD1] 
            [&>span]:rounded-[100%]
            [&.active]:rounded-[16px]
            [&.active]:bg-gradient-to-r
            [&.active]:from-[#6D3DF5]
            [&.active]:to-[#4B1FD1]
            [&.active]:px-[14px]
            [&.active]:py-[10px]
            [&.active]:text-[#F5F3FF]
            [&.active]:shadow-[0_0_12px_rgba(109,61,245,0.45)]
            [&.active>a:hover]:from-[#7B52FF]
            [&.active>a:hover]:to-[#5A2EF0]
            [&.active>a:hover]:shadow-[0_0_18px_rgba(123,82,255,0.6)]
            [&.active>a:active]:scale-[0.98]
            ${pathname === href && "active"}

        `} href={href}>{children}</Link>
    )
}

export const BtnFooterNavi = ({ children, href } : BTN_NAVI) => {
    
    const pathname = usePathname();
    
    return (
        <Link className={`
            relative
            flex
            flex-col
            justify-center
            items-center
            gap-[5px]
            h-full
            text-basic-color
            font-bold

            [&>span]:absolute
            [&>span]:bottom-[35px]
            [&>span]:right-[-18px]
            [&>span]:size-[30px]
            [&>span]:leading-[30px]
            [&>span]:text-[#F5F3FF] 
            [&>span]:text-[0.8rem]
            [&>span]:text-center
            [&>span]:bg-gradient-to-r 
            [&>span]:from-[#6D3DF5] 
            [&>span]:to-[#4B1FD1] 
            [&>span]:rounded-[100%]
            [&>span]:z-[-1]
            
            [&>svg]:size-[40px]
            [&>svg]:p-[5px]
            [&.active>svg]:stroke-[#F5F3FF]
            [&.active>svg]:bg-gradient-to-r 
            [&.active>svg]:from-[#6D3DF5] 
            [&.active>svg]:to-[#4B1FD1] 
            [&.active>svg]:shadow-[0_0_12px_rgba(109,61,245,0.45)]
            [&.active>svg]:rounded-[100%]
            ${pathname === href && "active"}  
            
        `} href={href}>
            {children}
        </Link>
    )
}

export const BtnSideMenuNaviHome = () => {
    return (
    <BtnSideMenuNavi href='/'>
        <Tickets/> 전시 찾기
    </BtnSideMenuNavi>
    )
}

export const BtnSideMenuNaviFavorite = () => {

    const { favoriteTotal } = useFavoriteListHook();

    return (
        <BtnSideMenuNavi href='/favorite'>
            <Heart/> 좋아요
            {
                favoriteTotal > 0 && <span>{favoriteTotal}</span>
            }
        </BtnSideMenuNavi>
    )
}

export const BtnFooterNaviHome = () => {
    return (
        <BtnFooterNavi href='/'>
              <Tickets/> 전시 찾기
        </BtnFooterNavi>
    )
}

export const BtnFooterNaviFavorite = () => {

    const { favoriteTotal } = useFavoriteListHook();

    return (
        <BtnFooterNavi href='/favorite'>
            <Heart/> 좋아요
            {
                favoriteTotal > 0 && <span>{favoriteTotal}</span>
            }
        </BtnFooterNavi>
    )
}