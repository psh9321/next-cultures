"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { API_CLIENT_CULTURE_INFO_MAP } from "../api/api.client.culture.info.map";

export const useCultureInfoMapHook = (coordinates : COORDINATES | null) => {

        const { data, isLoading, isFetching, isError, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey : ["cultureInfo","map", coordinates],
        queryFn : async ({pageParam}) => {
            const params = {
                offset : pageParam??1, 
                limit : 20,
            } as API_CLIENT_CULTURE_INFO_MAP_PARAMS;

            const result = await API_CLIENT_CULTURE_INFO_MAP({...params, ...coordinates});

            return result
        },
        enabled : !!coordinates,
        initialPageParam : 1,
        getNextPageParam : (response) => {
            if(!response || response instanceof Error) return undefined;
            
            const { page, isNextPage } = response as INFINITY_RESPONSE_ITEM<CULTURE_ITEM[]>;
            
            if(!isNextPage) return undefined

            return isNextPage ? page+1 : undefined
        },
    });

    return { 
        list : data?.pages.flatMap(el => el?.list), 
        isLoading, 
        isFetching, 
        isError, 
        isSuccess, 
        hasNextPage, 
        isFetchingNextPage,
        fetchNextPage, 
    } 
}