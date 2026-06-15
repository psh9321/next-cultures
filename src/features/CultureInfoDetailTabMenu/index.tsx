"use client"

import { TabList } from "./_html"

export const CultureInfoDetailTabMenu = () => {
    return (
        <TabList>
            <li>
                <button className="active">정보</button>
            </li>
            {/* <li>
                <button>후기</button>
            </li> */}
        </TabList>
    )
}