"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";

import { Tickets, MapPinned, TicketCheck } from 'lucide-react';

import { useSessionHook } from "@/entities/users/(post)/hook/useSessionHook";
import { useToastHook } from "@/shared/hook/useToastHook";

import { toastOpts } from "@/shared/util/toastOps";

import { Nav } from "./_html"

interface NAV_BOX {
    isColumn? : boolean
}

export const NavBox = ({ isColumn } : NAV_BOX) => {

    const pathname = usePathname();

    const { ToastAlert, InitAlert } = useToastHook();

    const { isLogin } = useSessionHook();

    function OnClickLinkFavorite(e : React.MouseEvent<HTMLAnchorElement>) {
        if(!isLogin) {
            e.preventDefault();
            InitAlert(toastOpts["unLogin"]);
        }
    }
    
    return (
        <>
            <ToastAlert/>
            
            <Nav className={isColumn ? "column" : ""}>
                <Link className={pathname === "/" ? "active" : ""} href={"/"}><Tickets/> 문화정보 목록</Link>
                <Link className={pathname === "/map" ? "active" : ""} href={"/map"}><MapPinned/> 문화정보 지도</Link>
                <Link onClick={OnClickLinkFavorite} className={`${pathname === "/favorite" ? "active" : ""} ${isColumn && "column"}`} href={"/favorite"}>좋아요 한 문화정보 <TicketCheck/></Link>
            </Nav>        
        </>

    )
}
