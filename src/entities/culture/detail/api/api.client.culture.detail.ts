import { CLIENT_API } from "@/shared/api/client.instance";

export async function API_CLIENT_CULTURE_INFO_DETAIL(seq : string) {
    try {
        const result = await CLIENT_API(`culture/detail`, {
            json : seq
        }).json<API_CULTURE_INFO_DETAIL>();

        return result["data"];
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}