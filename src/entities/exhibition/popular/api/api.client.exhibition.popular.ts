import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_EXHIBITION_POPULAR() {
    try {
        const result = await CLIENT_API("exhibition/popular")
        .json<API_SERVER_EXHIBITION_POPULAR>();

        return result["data"]
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}