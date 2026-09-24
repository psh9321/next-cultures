"use client"

import dynamic from "next/dynamic"

import { useEffect } from "react"

import { useLoadingStore } from "@/shared/store/useLoadingStore"
import { useCultureDetailTabStore } from "@/entities/culture/detail/store/useCultureDetailTabStore"

import { CultrueInfoDetailImg } from "@/entities/culture/detail/ui/CultrueInfoDetailImg"
import { CultrueInfoDetailTitle } from "@/entities/culture/detail/ui/CultrueInfoDetailTitle"
import { CultureInfoDetailInfo } from "@/entities/culture/detail/ui/CultureInfoDetailInfo"

import { CultureInfoDetailBtnList } from "@/features/CultureInfoDetailBtnList"
const CultureInfoReviewList = dynamic(() => import("@/features/CultureInfoReviewList").then(rs => rs.CultureInfoReviewList));

import { RouteAnimation } from "@/shared/ui/RouteAnimation"

import { ContentsBox, TabContents, Wrapper, TabList, ScrollContainer } from "./_html"

export const CultureInfoDetailPageView = () => {

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    const { currentTab, SetCurrentTab } = useCultureDetailTabStore();

    useEffect(() => SetLoadingStatus(""),[]);

    return (
        <RouteAnimation initial={{scale : 0.8}} animate={{scale :1}}>
            <Wrapper>
                <h1 className="hidden">상세 페이지</h1>
                <CultureInfoDetailBtnList/>
                <CultrueInfoDetailImg/>
                <ContentsBox>
                    <CultrueInfoDetailTitle/>
                    <ScrollContainer>
                        <TabList>
                            <li>
                                <button onClick={() => SetCurrentTab("info")} className={`${currentTab === "info" && "active"}`}>정보</button>
                            </li>
                            <li>
                                <button onClick={() => SetCurrentTab("review")} className={`${currentTab === "review" && "active"}`} >후기</button>
                            </li>
                        </TabList>
                        <TabContents>
                            <h2 className="hidden">탭 박스</h2>
                            { currentTab === "info" && <CultureInfoDetailInfo/> }
                            {
                                currentTab === "review" && <CultureInfoReviewList/>
                            }
                        </TabContents>
                    </ScrollContainer>
                </ContentsBox>
            </Wrapper>
        </RouteAnimation>

    )
}