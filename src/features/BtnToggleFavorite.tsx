"use client"

import { HeartPlus, HeartMinus } from "lucide-react"

import { useSessionHook } from "@/shared/hook/useSessionHook"
import { useToastHook } from "@/shared/hook/useToastHook"

import { toastOpts } from "@/shared/util/toastOps";
import { LogoutCallback } from "@/entities/auth/util/logout";
import { useFavoriteToggleHook } from "../entities/favorite/toggle/hook/useFavoriteToggleHook";

interface BTN_TOGGLE_FAVORITE {
    exhibitionInfo : EXHIBITION_DETAIL_ITEM
}

export const BtnToggleFavorite = ({ exhibitionInfo } : BTN_TOGGLE_FAVORITE) => {
    const { isLogin, user } = useSessionHook();

    const { ToastAlert, InitAlert } = useToastHook();

    const { mutateAsync } = useFavoriteToggleHook(exhibitionInfo?.["seq"]??"");

    async function ToggleFavoriteCallback() {
        try {

            if(!isLogin) return InitAlert(toastOpts["unLogin"]);

            const { resultCode, data } = await mutateAsync({
                userId : user!.id,
                imgUrl : exhibitionInfo?.["imgUrl"],
                title : exhibitionInfo?.["title"],
                startDate : exhibitionInfo?.["startDate"],
                endDate : exhibitionInfo?.["endDate"],
                seq : exhibitionInfo?.["seq"],
                area : exhibitionInfo?.["area"] as DISTRICT
            }) as API_TOGGLE_FAVORITE_EXHIBITION

            if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
                await LogoutCallback()
            });

        }
        catch(err) {
            console.log("ToggleFavoriteCallback 알수없는 에러", err);
            InitAlert(toastOpts["unknownError"]);
        }
    }

    return (
        <>
            <button onClick={ToggleFavoriteCallback} className={`flex items-center gap-[6px] p-[5px_10px] text-[1.1rem] border rounded-[10px] ${exhibitionInfo?.["isFavorite"] && "text-[#ff5c8a] border-[#ff5c8a]"}`}>
                {
                    exhibitionInfo?.["isFavorite"] ? <HeartMinus className="stroke-[#ff5c8a]"/> : <HeartPlus/>
                }
                좋아요
            </button>        

            <ToastAlert/>
        </>

    )
}