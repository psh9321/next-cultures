"use client"

import Link from "next/link"

import { ExternalLink } from "lucide-react"

import { useCultureInfoDetailHook } from "@/entities/culture/detail/hook/useCultureInfoDetailHook";

export const BtnCultureInfoLink = () => {

    const { infoLink } = useCultureInfoDetailHook();
    
    return (
        <Link href={infoLink} target="_blank">
            <ExternalLink/>
        </Link>
    )
}