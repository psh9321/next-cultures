import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_CULTURE_INFO_LIST(querys : API_SERVER_CULTURE_INFO_LIST_PARAMS) {
    try {
       const api = await BACKEND_API("culture/list", {
        method : "get",
        searchParams : {
            ...querys
        }
       });

       if(!api.ok) throw api;

        return api;
    }
    catch(err) {
        console.log("API_SERVER_CULTURE_INFO_LIST error", err);
        throw err;
    }
}