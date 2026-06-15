"use client"

import { useParams, usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query"

import { decode } from "he";

import { SrcHttpToHttps } from "@/shared/util/srcHttpToHttps";
import { CultureInfoDateFormat } from "@/shared/util/dateFormat";
import { ShowOnGoingInfo } from "@/shared/util/showOnGoingInfo";

import { API_CLIENT_CULTURE_INFO_DETAIL } from "../api/api.client.culture.detail";

export const useCultureInfoDetailHook = () => {

    const { seq } = useParams<{seq : string}>();

    const pathname = usePathname();

    const queryKey = ["cultureInfo", "detail", seq];

    const { data } = useQuery({
        queryKey,
        queryFn : async () => {
            const result = await API_CLIENT_CULTURE_INFO_DETAIL(seq);

            return result
        } 
    }) as { data : CULTURE_DETAIL_ITEM }

    const date = `${CultureInfoDateFormat(data["startDate"])} ~ ${CultureInfoDateFormat(data["endDate"])}`;

    const imgSrc = SrcHttpToHttps(data["imgUrl"]);

    const title = decode(data?.["title"]);

    const place = data?.["place"];

    const showOnGoingInfo = new ShowOnGoingInfo(data["startDate"], data["endDate"])
    
    return { 
        seq,
        title,
        imgSrc,
        date,
        status : showOnGoingInfo["status"],
        statusBackgroundColor : showOnGoingInfo["statusColor"],
        price : data?.["price"],
        phone : data?.["phone"],
        place : data?.["place"],
        placeAddr : data?.["placeAddr"],
        infoLink : data?.["url"],
        contents : data?.["contents1"]??"",
        isFavorite : data?.["isFavorite"]??false,
        startDate : data?.["startDate"],
        endDate : data?.["endDate"],
        area : data?.["area"],
        shareModel : {
            objectType: "feed",
            content : {
                title : title,
                description: `장소 : ${place}\n날짜 : ${date}\n${data?.["contents1"]??""}`,
                imageUrl : imgSrc,
                link : {
                    mobileWebUrl : `${process.env.NEXT_PUBLIC_SERVICE_DOMAIN as string}/${pathname}`,
                    webUrl : `${process.env.NEXT_PUBLIC_SERVICE_DOMAIN as string}/${pathname}`
                }
            }
        }
    }
}