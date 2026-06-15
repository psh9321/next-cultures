import type { QueryClient } from "@tanstack/react-query"
import { API_SERVER_CULTURE_INFO_LIST } from "../api/api.server.culture.info.list"

export async function PrefetchCultureInfoList(queryServer : QueryClient, querys : {
    searchKeyword?: string
    searchArea?: DISTRICT
    searchType?: SERVICE_TYPE
} ) {
    await queryServer.prefetchInfiniteQuery({
        queryKey : ["cultureInfo", "list" ,querys],
        queryFn : async () => {

            const params = {
                offset : 1, 
                limit : 20,
                type : querys["searchType"]??"A",
            } as API_SERVER_CULTURE_INFO_LIST_PARAMS

            if(querys["searchKeyword"]) params["keyword"] = querys["searchKeyword"];
            if(querys["searchArea"]) params["area"] = querys["searchArea"];

            const result = await (await API_SERVER_CULTURE_INFO_LIST(params)).json<API_CULTURE_INFO_LIST>();

            if(result["resultCode"] === 200) {
                return result["data"] as INFINITY_RESPONSE_ITEM<CULTURE_ITEM[]>
            }
            else {
                return null
            }
        },
        initialPageParam : 1,
        getNextPageParam : (lastPage : INFINITY_RESPONSE_ITEM<CULTURE_ITEM[]> | null) => {
            if(!lastPage || lastPage instanceof Error) return undefined;
            
            const { page, isNextPage } = lastPage;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    })
}