'use client'

import { create } from 'zustand'

type LOADING_STATUS = "" | "fetch" | "search" | "route" | "favorite";

interface LOADING_STORE {
    loadingStatus : LOADING_STATUS,
    SetLoadingStatus : (loadingStatus : LOADING_STATUS) => void
}

export const useLoadingStore = create<LOADING_STORE>(( set ) => ({
    loadingStatus : "",
    SetLoadingStatus(loadingStatus) { set({loadingStatus}) }
}))