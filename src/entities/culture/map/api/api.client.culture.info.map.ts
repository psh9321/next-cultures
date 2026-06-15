"use client"

import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_CULTURE_INFO_MAP(params : API_CLIENT_CULTURE_INFO_MAP_PARAMS) {
    try {
        const result = await CLIENT_API("culture/map", {
            json : params
        })
        .json<API_CULTURE_INFO_MAP>();

        return result["data"];
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}