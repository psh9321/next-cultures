"use client"

import { useEffect } from "react";

const PopupCallbackPageView = () => {
    
    useEffect(() => {
        if (window.opener) {
            window.opener.postMessage({ type: "SOCIAL_LOGIN_SUCCESS" }, window.location.origin);
            window.close();
        }
    }, []);

    return <></>
}

export default PopupCallbackPageView