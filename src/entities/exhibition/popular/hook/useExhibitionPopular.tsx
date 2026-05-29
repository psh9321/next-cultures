import { useQuery } from "@tanstack/react-query"
import { API_CLIENT_EXHIBITION_POPULAR } from "../api/api.client.exhibition.popular"

export const useExhibitionPopular = () => {

    const { data } = useQuery({
        queryKey : ["exhibition", "popular"],
        queryFn : API_CLIENT_EXHIBITION_POPULAR
    })

    return { data }
}