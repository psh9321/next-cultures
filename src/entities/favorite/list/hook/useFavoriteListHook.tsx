"use client"

import { useQuery } from "@tanstack/react-query"
import { API_CLIENT_FAVORITE_LIST } from "../api/api.client.favorite.list";
import { useSessionHook } from "@/shared/hook/useSessionHook";

export const useFavoriteListHook = () => {

    const { isLogin } = useSessionHook()

    const { data, isLoading, isFetching, isError, isSuccess }  = useQuery({
        queryKey : ["favorite", "list"],
        queryFn : async () => {
            const { data } = await API_CLIENT_FAVORITE_LIST() as API_FAVORITE_LIST;

            return data??[];
        },
        enabled : isLogin
    });

    const favoriteTotal = data?.length??0;

    return { data, isLoading, isFetching, isError, isSuccess, favoriteTotal } 
}
