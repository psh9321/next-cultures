import { BACKEND_API } from "@/shared/api/server.instance";

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