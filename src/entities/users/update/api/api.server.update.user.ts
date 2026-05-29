"use server"

import { BACKEND_API } from "@/shared/api/server.instance";
import { SetToken } from "@/shared/util/token";

export async function API_SERVER_UPDATE_USER(param : USER_UPDATE_ITEM) {
    try {
        const api = await BACKEND_API.patch(`users`, { json : param });

        if(!api.ok) throw api.statusText;

        await SetToken(api);

        return await api.json() as API_UPDATE_USER;
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}