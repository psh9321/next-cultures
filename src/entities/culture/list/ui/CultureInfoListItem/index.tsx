"use client"

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { memo } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { ImageError } from "@/shared/util/imgError";
import { CultureInfoDateFormat } from "@/shared/util/dateFormat";
import { BodyScrollLock } from "@/shared/util/bodyScrollLock";
import { useLoadingStore } from "@/shared/store/useLoadingStore";
import { ShowOnGoingInfo } from "@/shared/util/showOnGoingInfo";

import { Li, BtnNav, ImgBox, CultureInfoBox } from "./_html";

export const CultureInfoListItem = memo(({ item } : { item: CULTURE_ITEM }) => {

    const queryClient = useQueryClient();

    const searchParams = useSearchParams();

    const navigation = useRouter();

    const SetLoadingStatus = useLoadingStore(state => state.SetLoadingStatus);

    function NaviCallback() {

        BodyScrollLock(true);
        
        navigation.push(`/culture/${item?.["seq"]}?${searchParams.toString()}`, {
            scroll : false
        });
    }

    function OnclickNaviCallback() {
        const isQuery = queryClient.getQueryData(["cultureInfo","detail", String(item.seq)]);

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
    
    const showOnGoingInfo = new ShowOnGoingInfo(item?.["startDate"], item?.["endDate"]);

    if(!item) return <></>

    return (
        <Li>
            <BtnNav onClick={OnclickNaviCallback}>
                <ImgBox>
                    <Image
                        fill
                        unoptimized
                        sizes={"100vw"}
                        loading="lazy"
                        src={SrcHttpToHttps(item["thumbnail"])}
                        alt={`${decode(item["title"])} 썸네일 이미지
                        `}
                        onError={ImageError}
                    />
                </ImgBox>
                <CultureInfoBox className="block w-full p-[15px_20px] text-left text-basic-color font-bold bg-[#222226] [@media(max-width:499px)]:p-[10px_15px]">
                    <dt>{decode(item["title"])}</dt>
                    <dd>{decode(item["place"])}</dd>
                    <dd>{`${CultureInfoDateFormat(item["startDate"])} ~ ${CultureInfoDateFormat(item["endDate"])}`}</dd>
                    { item["area"] && <dd className="area">{item["area"]}</dd>}
                    <dd className="util">
                        { item["area"] && <span>{item["area"]}</span> }
                        { <span style={{ backgroundColor : showOnGoingInfo["statusColor"] }}>{showOnGoingInfo["status"]}</span> }
                    </dd>
                </CultureInfoBox>
            </BtnNav>
        </Li>
    )
})
