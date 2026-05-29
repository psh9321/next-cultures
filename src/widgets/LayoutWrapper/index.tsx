"use client"

import { SideMenu } from './ui/SideMenu';
import { Footer } from './ui/Footer';
import { useResizeHook } from "@/shared/hook/useResizeHook";

export const LayoutWrapper = ({ children } : LAYOUT_CHILD) => {

    const isResize = useResizeHook(1200);

    return (
        <div className={`relative flex max-w-[1920px] mx-auto ${isResize ? "pb-[100px]" : ""}`}>
            { !isResize && <SideMenu/> }
            
            <div className={`${isResize ? "w-full" : "w-[calc(100%-242px)]"}`}>
                {children}
            </div>

            { isResize &&  <Footer/> }
        </div>
    )
}