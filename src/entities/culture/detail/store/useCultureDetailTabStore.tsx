import { create } from 'zustand'

type TAB_STATUS = "info" | "review"; 

interface USE_CULTUER_DETAIL_TAB_STORE {
    currentTab : TAB_STATUS;
    SetCurrentTab : (status : TAB_STATUS) => void;
}

export const useCultureDetailTabStore = create<USE_CULTUER_DETAIL_TAB_STORE>((set) => ({
    currentTab : 'info',
    SetCurrentTab(status) { set({currentTab : status}) }
}))