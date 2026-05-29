import { BACKEND_API } from "@/shared/api/server.instance";

export async function API_SERVER_EXHIBITION_POPULAR() {
    try {
        const result = await BACKEND_API.get("exhibition/popular")
        .json<API_SERVER_EXHIBITION_POPULAR>();

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}