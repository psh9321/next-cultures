import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_FAVORITE_LIST } from "../api/api.server.favorite.list";

export async function PrefetchFavoriteList(queryServer : QueryClient) {

    await queryServer.prefetchQuery({
        queryKey : ["favorite", "list"],
        queryFn : async () => {            

            const result = await API_SERVER_FAVORITE_LIST() as API_FAVORITE_LIST

            return result["data"]??[];
        },
    })
}
