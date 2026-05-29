import { BACKEND_API } from "@/shared/api/server.instance";

/** 전시 찜하기 토글 */
export async function API_SERVER_TOGGLE_FAVORITE_EXHIBITION(params : FAVORITE_EXHIBITION_PARAMS) {
    try {
        const result = await BACKEND_API.post(`favorite`, {
            json : params
        }).json<API_TOGGLE_FAVORITE_EXHIBITION>()

        return result
    }
    catch(err) { 
        console.log(err);
        throw err;
    }
}