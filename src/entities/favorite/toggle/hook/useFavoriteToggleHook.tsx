"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_CLIENT_TOGGLE_FAVORITE_EXHIBITION } from "../api/api.client.favorite.toggle";

export const useFavoriteToggleHook = (seq : string | number) => {

    const queryKey = ["exhibition", "detail", String(seq)];

    const queryClient = useQueryClient();

    const queryData = queryClient.getQueryData(queryKey) as EXHIBITION_DETAIL_ITEM;

    return useMutation({
        mutationKey : queryKey,
        mutationFn : API_CLIENT_TOGGLE_FAVORITE_EXHIBITION,
        onSuccess(data, variables, onMutateResult, context) {
            
            const newData = {...queryData};

            newData["isFavorite"] = data?.["data"]?.["toggleStatus"]??false;

            queryClient.setQueryData(queryKey, newData);

            queryClient.invalidateQueries({queryKey : ["favorite", "list"]})

            return data
        },
    })
}