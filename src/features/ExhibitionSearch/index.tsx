"use client"

import { SearchArea } from "./component/SearchArea";
import { SearchInput } from "./component/SearchInput";
import { SearchType } from "./component/SearchType";

export const ExhibitionSearch = () => {

    return (
        <>
            <SearchInput/>
            <div className="flex items-center gap-[10px] mt-[10px] [@media(max-width:499px)]:flex-col [@media(max-width:499px)]:items-start">
                <SearchType/>
                <SearchArea/>
            </div>
        </>
    )
}
