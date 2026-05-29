"use client"

import { useExhibitionDetailTabMenuStore } from "@/entities/exhibition/detail/store/useExhibitionDetailTabMenuStore";
import { InfoTabContents } from "../features/ExhibitionTabContents/InfoTabContents";
import { ReviewList } from "../features/ReviewList";
import { MapTabContents } from "@/features/ExhibitionTabContents/MapTabContents";

export const ExhibitionDetailTabBox = () => {

    const currentTab = useExhibitionDetailTabMenuStore(state => state.currentTab)

    return (
        <section>
            <h2 className="sr-only">전시정보, 모임, 후기 탭 박스</h2>
            {
                currentTab === "info" && <InfoTabContents />
            }
            {
                 currentTab === "map" && <MapTabContents/>
            }
            {
                currentTab === "review" && <ReviewList />
            }
            
        </section>
    )
}