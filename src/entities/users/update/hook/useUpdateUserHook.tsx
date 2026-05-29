"use client"

import { useMutation } from "@tanstack/react-query"
import { API_CLIENT_UPDATE_USER } from "../api/api.client.update.user";

export const useUpdateUserHook = () => {

    return useMutation({
        mutationKey : ["user", "update"],
        mutationFn : API_CLIENT_UPDATE_USER,
        onSuccess(data, variables, onMutateResult, context) {

            // update({

            // })
            
            // const newData = {...queryData};

            // newData["isFavorite"] = data?.["data"]?.["toggleStatus"]??false;

            // queryClient.setQueryData(queryKey, newData);

            // queryClient.invalidateQueries({queryKey : ["favorite", "list"]})

            return data
        },
    })
}