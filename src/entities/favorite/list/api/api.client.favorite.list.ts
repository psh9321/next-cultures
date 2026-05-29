"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_FAVORITE_LIST() {
    try {
        const result = await CLIENT_API("favorite/list")
        .json<API_FAVORITE_LIST>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}