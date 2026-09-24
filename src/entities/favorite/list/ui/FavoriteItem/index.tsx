"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";

import { memo } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useLoadingStore } from "@/shared/store/useLoadingStore";

import { ShowOnGoingInfo } from "@/shared/util/showOnGoingInfo"
import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ImageError } from "@/shared/util/imgError";
import { CultureInfoDateFormat } from "@/shared/util/dateFormat";
import { BodyScrollLock } from "@/shared/util/bodyScrollLock";

import { ImgBox, InfoBox, Item } from "./_html"

export const FavoriteItem = memo(({ item } :  { item : FAVORITE_ITEM }) => {

    const queryClient = useQueryClient();

    const navigation = useRouter();

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    const info = new ShowOnGoingInfo(item?.exhibitionStartDate, item?.exhibitionEndDate);

    function NaviCallback() {
        
        BodyScrollLock(true);

        navigation.push(`/culture/${item?.["exhibitionSeq"]}`, {
            scroll : false
        });
    }

    function OnclickNaviCallback() {
        const isQuery = queryClient.getQueryData(["cultureInfo","detail", String(item?.["exhibitionSeq"])]);

        if(isQuery) {
            NaviCallback()
        }
        else {
            SetLoadingStatus("route");

            const timer = setTimeout(() => {
                NaviCallback();
                clearTimeout(timer)
            }, 1000);
        }    
    }
    
    return (
        <Item>
            <button onClick={OnclickNaviCallback}>
                <ImgBox>
                    <Image
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="lazy"
                        src={SrcHttpToHttps(item?.["exhibitionImg"])}
                        alt={` 썸네일 이미지`}
                        onError={ImageError}
                    />
                </ImgBox>
                <InfoBox>
                    <dt>{item.exhibitionTitle}</dt>
                    <dd className="mb-[10px] text-[0.9rem] [@media(max-width:499px)]:text-[0.7rem]">{item?`${CultureInfoDateFormat(item?.["exhibitionStartDate"])} ~ ${CultureInfoDateFormat(item?.["exhibitionEndDate"])}` : ""}</dd>
                    <dd className="status" style={{ backgroundColor : info.statusColor }}>{info.status}</dd>
                </InfoBox>
            </button>
        </Item>
    )
})