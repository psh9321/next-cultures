"use client"

import { useState } from 'react';

import { TicketPlus, TicketMinus } from 'lucide-react';

import { useCultureInfoDetailHook } from '@/entities/culture/detail/hook/useCultureInfoDetailHook';
import { useFavoriteToggleHook } from '@/entities/favorite/toggle/hook/useFavoriteToggleHook';
import { useSessionHook } from '@/entities/users/(post)/hook/useSessionHook';
import { useToastHook } from '@/shared/hook/useToastHook';

import { LogoutCallback } from '@/entities/users/(post)/util/logout';

import { toastOpts } from '@/shared/util/toastOps';

export const BtnToggleFavorite = () => {

    const { isFavorite, seq, imgSrc, title, startDate, endDate, area } = useCultureInfoDetailHook();

    const { InitAlert, ToastAlert } = useToastHook(); 

    const { isLogin } = useSessionHook();

    const { mutateAsync } = useFavoriteToggleHook(seq);

    const [ activeFavorite, SetActiveFavorite ] = useState<boolean>(isFavorite);

    async function OnClickToggleCallback() {
        try {

            if(!isLogin) return InitAlert(toastOpts["unLogin"]);

            const { resultCode, data } = await mutateAsync({
                title,
                startDate,
                endDate,
                imgUrl : imgSrc,
                seq,
                area : area as DISTRICT,
            });

            if(resultCode === -999) return InitAlert(toastOpts["unLogin"], async () => {
                if(isLogin) await LogoutCallback();
            });

            SetActiveFavorite(data?.toggleStatus as boolean);
        }
        catch(err) {
            console.log("OnClickToggleCallback error",err)
        }
    }

    return (
        <>
            <button title={`${title} ${activeFavorite ? "좋아요 해제" : "좋아요"}`} onClick={OnClickToggleCallback}>
                {activeFavorite ? <TicketMinus style={{stroke : "#ff5c8a"}}/> : <TicketPlus/> }
            </button>

            <ToastAlert/>        
        </>

    )
}