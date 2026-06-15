import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_FAVORITE_LIST } from "../api/api.server.favorite.list";

export async function PrefetchFavoriteList(queryServer : QueryClient) {

    await queryServer.prefetchQuery({
        queryKey : ["favorite", "list"],
        queryFn : async () => {            
            try {
                const result = await (await API_SERVER_FAVORITE_LIST()).json<API_FAVORITE_LIST>();

                if(result["resultCode"] === 200) {
                    return result["data"];
                }
                else {
                    return []
                }
            }
            catch(err) {
                console.log(err);
                return []
            }
        },
    })
}
