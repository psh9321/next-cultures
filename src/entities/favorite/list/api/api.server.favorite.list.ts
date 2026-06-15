import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_FAVORITE_LIST() {
    try {
        const api = await BACKEND_API.get("favorite");
        
        if(!api.ok) throw api;

        return api
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}