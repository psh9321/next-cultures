"use client"

import { CLIENT_API } from "@/shared/api/client.instance"

export async function API_CLIENT_CULTURE_INFO_LIST(param : API_CLIENT_CULTURE_INFO_LIST_PARAMS) {
    try {
        const result = await CLIENT_API("culture/list", {
            json : param
        })
        .json<API_CULTURE_INFO_LIST>();

        if(result["resultCode"] === 200) {
            return result["data"]
        }
        else {
            return null;
        }
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}