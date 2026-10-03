import { BACKEND_API } from "@/shared/api/server.instance";
import { cache } from "react";

export const GetCultureInfoDetail = cache(async (seq : string) => {
    const result = await (await API_SERVER_CULTURE_INFO_DETAIL(seq)).json<API_CULTURE_INFO_DETAIL>();

    return result.resultCode === 200 ? result.data : null;
});

export async function API_SERVER_CULTURE_INFO_DETAIL(seq : string) {
    try {
        const api = await BACKEND_API(`culture/detail/${seq}`);

        if(!api.ok) throw api

        return api
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}
