"use client"

import { useQuery } from "@tanstack/react-query"
import { API_CLIENT_FAVORITE_LIST } from "../api/api.client.favorite.list";
import { useSessionHook } from "@/entities/users/(post)/hook/useSessionHook";

export const useFavoriteListHook = () => {

    const { isLogin } = useSessionHook();

    const { data, isLoading, isFetching, isError, isSuccess }  = useQuery({
        queryKey : ["favorite", "list"],
        queryFn : async () => {
            const result = await API_CLIENT_FAVORITE_LIST() as API_FAVORITE_LIST;

            return result;
        },
        enabled : isLogin
    });

    return { 
        isUnauthorized : data?.resultCode === -999,
        data : data?.resultCode === 200 ? data.data : [], 
        isLoading, 
        isFetching, 
        isError, 
        isSuccess, 
        favoriteTotal : data?.resultCode === 200 ? data.data?.length : 0
    } 
}
