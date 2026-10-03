import type { QueryClient } from "@tanstack/react-query"

import { GetCultureInfoDetail } from "../api/api.server.culture.detail"

export async function PrefetchCultureDetail(queryServer : QueryClient, seq : string) {
    await queryServer.prefetchQuery({
        queryKey : ["cultureInfo", "detail", String(seq)],
        queryFn : () => GetCultureInfoDetail(seq)
    })
}
