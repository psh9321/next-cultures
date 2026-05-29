"use client"

import { useKakaoLoader, Map, MapMarker } from "react-kakao-maps-sdk";

import { useExhibitionDetailHook } from "@/entities/exhibition/detail/hook/useExhibitionDetailHook";

export const MapTabContents = () => {

    const data = useExhibitionDetailHook();

    
    const [loading, error] = useKakaoLoader({
        appkey : process.env.NEXT_PUBLIC_KAKAO_APP_KEY as string,
    });

    return (
        <>
            {loading && "로딩중"}
            {error && "지도 불러오기 실패"}
            <Map 
            className="w-full h-[350px] rounded-[10px]"
                center={{
                    lat : Number(data.gpsY),
                    lng : Number(data.gpsX)
                }}

            >
                <MapMarker position={{lat : Number(data.gpsY),lng : Number(data.gpsX)}} />
            </Map>
        </>
    )
}