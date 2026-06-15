"use client"

import { Share2 } from 'lucide-react';

import { useCultureInfoDetailHook } from '@/entities/culture/detail/hook/useCultureInfoDetailHook';

export const BtnCultureInfoShare = () => {

    const { shareModel, title } = useCultureInfoDetailHook();

    function OnShareKaKaoCallback() {
        if(!window.Kakao.Share.sendDefault) return console.log("Kakao SDK load failed");

        window.Kakao.Share.sendDefault(shareModel);
    }
    
    return (
        <button onClick={OnShareKaKaoCallback} title={`${title} 카카오톡 공유 하기`}>
            <Share2/>
        </button>
    )
}