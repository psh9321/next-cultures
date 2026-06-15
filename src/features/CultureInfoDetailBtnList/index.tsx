"use client"

import { BtnCultureInfoShare } from "./ui/BtnCultureInfoShare"
import { BtnCultureInfoLink } from "./ui/BtnCultureInfoLink"
import { BtnToggleFavorite } from "./ui/BtnToggleFavorite"

import { BtnList } from "./_html"
import { BtnClose } from "./ui/BtnClose"

export const CultureInfoDetailBtnList = () => {

    return (
        <BtnList>
            <li><BtnToggleFavorite/></li>
            <li><BtnCultureInfoLink/></li>
            <li><BtnCultureInfoShare/></li>
            <li><BtnClose/></li>
        </BtnList>
    )
}