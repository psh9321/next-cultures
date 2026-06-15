'use client'

import { ScanSearch, Route, Scroll, TicketCheck } from 'lucide-react';

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { LoadingIcon } from "@/features/LoadingIcon";

export const LoadingView = () => {

    const loadingStatus = useLoadingStore(state => state.loadingStatus);

    switch (loadingStatus) {
        case "fetch" : return (
            <LoadingIcon style={{ width : "300px" }}>
                <Scroll/>문화정보 불러오는 중
            </LoadingIcon>
        )
        case "route" : return (
            <LoadingIcon>
                <Route/>로딩중
            </LoadingIcon>
        )
        case "search" : return (
            <LoadingIcon>
                <ScanSearch/>검색중
            </LoadingIcon>
        )

        case "favorite" : return (
            <LoadingIcon style={{ width : "310px" }}>
                <TicketCheck/>좋아요 한 정보 불러오는 중
            </LoadingIcon>
        )
    
        default: return <></>
    }
};