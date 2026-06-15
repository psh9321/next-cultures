"use client"

import { BtnCultureInfoShare } from "./components/BtnCultureInfoShare"
import { BtnCultureInfoLink } from "./components/BtnCultureInfoLink"
import { BtnToggleFavorite } from "./components/BtnToggleFavorite"

import { BtnList } from "./_html"
import { BtnClose } from "./components/BtnClose"

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