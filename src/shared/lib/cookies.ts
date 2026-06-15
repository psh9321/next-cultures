"use server"

import { cookies } from "next/headers";

export async function SetCookies(headers : Headers) {
    const a = headers.get("a-t");
    const r = headers.get("r-t");

    if(!a || !r) return 

    const token = encodeURIComponent(JSON.stringify({a, r}));

    const cookie = await cookies();

    cookie.set(process.env.COOKIE_STORE_NAME as string, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })
}

export async function GetCookies() : Promise<{a : string, r : string} | null> {
    try {
        const cookie = await cookies();

        const token = cookie.get(process.env.COOKIE_STORE_NAME as string)?.["value"];

        if(!token) return null

        const result = JSON.parse(decodeURIComponent(token));

        return result??null
    }
    catch(err) {
        console.log("getCookie error",err);
        return null
    }
}

export async function DeleteCookies() : Promise<void> {
    const cookie = await cookies();

    cookie.delete(process.env.COOKIE_STORE_NAME as string);
}