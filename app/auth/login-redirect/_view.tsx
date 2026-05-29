"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { getCsrfToken } from "next-auth/react"

import { UserKey } from 'lucide-react';
import { GoogleLogo, KakaoLogo, NaverLogo } from "@/shared/ui/svg/SSOLogo";

const LoginRedirectPageView = () => {

    const searchParams = useSearchParams()
    const provider = searchParams.get("provider")
    const callbackUrl = searchParams.get("callbackUrl") ?? "/"
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        getCsrfToken().then((csrfToken) => {
            if (!formRef.current || !csrfToken) return;
            const input = formRef.current.querySelector<HTMLInputElement>('input[name="csrfToken"]')
            if (input) {
                input.value = csrfToken;

                formRef.current.submit();
            }
        })
    }, [])

    return (
        <>
            <div className="text-center mt-[150px]">
                <h3 className="block mb-[15px] text-main-color text-[1.7rem]">Discover Exhibitions</h3>
                <div className="inline-flex flex-col  justify-center items-center gap-[10px] w-[280px] h-[160px] text-basic-color border border-basic-color rounded-[10px]">
                    <UserKey size={45}/>
                    <h1 className="flex items-center gap-[10px] text-[2rem]">
                        { provider === "kakao" && <KakaoLogo />}
                        { provider === "naver" && <NaverLogo />}
                        { provider === "google" && <GoogleLogo />}
                        로그인 중...
                    </h1>
                </div>
            </div>
            <form ref={formRef} method="POST" action={`/api/auth/signin/${provider}`} style={{ display: "none" }}>
                <input type="hidden" name="csrfToken" defaultValue="" />
                <input type="hidden" name="callbackUrl" defaultValue={callbackUrl} />
            </form>        
        </>
    )
}

export default LoginRedirectPageView