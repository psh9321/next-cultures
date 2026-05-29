"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_TOGGLE_FAVORITE_EXHIBITION(params : FAVORITE_EXHIBITION_PARAMS) {
    try {
        const result = await CLIENT_API("favorite/toggle",{
            json : params
        })
        .json<API_TOGGLE_FAVORITE_EXHIBITION>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}