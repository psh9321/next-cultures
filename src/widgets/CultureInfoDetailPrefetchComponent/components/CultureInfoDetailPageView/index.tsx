"use client"

import { useEffect } from "react"
import { useShallow } from "zustand/shallow"

import { useLoadingStore } from "@/shared/store/useLoadingStore"

import { CultrueInfoDetailImg } from "@/entities/culture/detail/ui/CultrueInfoDetailImg"
import { CultrueInfoDetailTitle } from "@/entities/culture/detail/ui/CultrueInfoDetailTitle"
import { CultureInfoDetailBtnList } from "@/features/CultureInfoDetailBtnList"
import { CultureInfoDetailTabMenu } from "@/features/CultureInfoDetailTabMenu"
import { CultureInfoDetailInfo } from "@/entities/culture/detail/ui/CultureInfoDetailInfo"

import { RouteAnimation } from "@/shared/ui/RouteAnimation"

import { ContentsBox, TabContents, Wrapper } from "./_html"

export const CultureInfoDetailPageView = () => {

    const { SetLoadingStatus } = useLoadingStore(useShallow(state => ({
        loadingState : state.loadingStatus,
        SetLoadingStatus : state.SetLoadingStatus
    })));

    useEffect(() => SetLoadingStatus(""),[]);

    return (
        <RouteAnimation initial={{scale : 0.8}} animate={{scale :1}}>
            <Wrapper>
                <h1 className="hidden">상세 페이지</h1>
                <CultureInfoDetailBtnList/>
                <CultrueInfoDetailImg/>
                <ContentsBox>
                    <CultrueInfoDetailTitle/>
                    <CultureInfoDetailTabMenu/>
                    <TabContents>
                        <h2 className="hidden">탭 박스</h2>
                        <CultureInfoDetailInfo/>
                    </TabContents>
                </ContentsBox>
            </Wrapper>
        </RouteAnimation>

    )
}