"use server"

import { BACKEND_API } from "@/shared/api/server.instance";

import { SetToken } from "@/shared/util/token";

export async function API_SERVER_POST_USERS(param : AUTH_LOGIN_PARAMS) {

    try {
        const api = await BACKEND_API.post("users", {
            json : param
        })

        if(!api.ok) return null

        await SetToken(api);
        
        const result = await api.json<API_POST_USERS>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}
