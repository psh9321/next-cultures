import type { QueryClient } from "@tanstack/react-query"

import { API_SERVER_CULTURE_INFO_DETAIL } from "../api/api.server.culture.detail"

export async function PrefetchCultureDetail(queryServer : QueryClient, seq : string) {
    await queryServer.prefetchQuery({
        queryKey : ["cultureInfo", "detail", String(seq)],
        queryFn : async () => {
            const result = await (await API_SERVER_CULTURE_INFO_DETAIL(seq)).json<API_CULTURE_INFO_DETAIL>();

            if(result["resultCode"] === 200) {
                return result["data"]
            }
            else {
                return null
            }
        }
    })
}