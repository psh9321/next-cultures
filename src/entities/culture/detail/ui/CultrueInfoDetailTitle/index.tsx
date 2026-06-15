"use client"

import { useCultureInfoDetailHook } from "../../hook/useCultureInfoDetailHook";

import { StatusTxt, Title, TitleBox } from "./_html"

export const CultrueInfoDetailTitle = () => {

    const { title, status, statusBackgroundColor } = useCultureInfoDetailHook();

    return (
        <TitleBox>
            <StatusTxt style={{
                backgroundColor : statusBackgroundColor
            }}>{status}</StatusTxt>
            <Title>{title}</Title>
        </TitleBox>
    )
}