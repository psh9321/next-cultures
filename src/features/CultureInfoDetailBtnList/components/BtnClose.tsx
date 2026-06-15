"use client"

import { useRouter } from "next/navigation";

import { BodyScrollLock } from "@/shared/util/bodyScrollLock";

import { SquareX } from "lucide-react"

export const BtnClose = () => {

    const navigation = useRouter();

    function CloseCallback() { 

        BodyScrollLock(false);

        window.history.length > 1 ? navigation.back() : navigation.push("/");
    }
    
    return (
        <button onClick={CloseCallback}>
            <SquareX/>        
        </button>
    )
}