"use client"

import { useEffect, useRef } from "react";

import { twMerge } from "tailwind-merge";

type BTN_SSO = LAYOUT_CHILD & COMPONENT_CLASS_NAME & {
    type : "kakao" | "naver" | "google"
}

export const BtnSSO = ({ type, children, className } : BTN_SSO) => {
    const popupRef = useRef<Window | null>(null);

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type === "SOCIAL_LOGIN_SUCCESS") {
                window.location.reload();
            }
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    function SSOLoginCallcack() {

        const callbackUrl = encodeURIComponent(`${window.location.origin}/auth/popup-callback`);
        const url = `/auth/login-redirect?provider=${type}&callbackUrl=${callbackUrl}`;

        const width = 550;
        const height = 550;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        if (popupRef.current && !popupRef.current.closed) {
            popupRef.current.focus();
            return;
        }

        popupRef.current = window.open(
            url,
            "socialLogin",
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
        );
    }

    return (
        <button onClick={SSOLoginCallcack} className={twMerge("flex justify-center items-center gap-[5px] w-full h-[45px] text-[1.05rem] font-bold rounded-[10px]", className??"")}>{children}</button>
    )
}