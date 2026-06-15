import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PrefetchCultureDetail } from "@/entities/culture/detail/prefetch/prefetch.culture.detail";

import { BackgroundLayer } from "./_html";
import { CultureInfoDetailPageView } from "./components/CultureInfoDetailPageView";

interface CULTURE_INFO_DETAUL_PREFETCH_COMPONENT {
    seq : string
}

export const CultureInfoDetailPrefetchComponent = async ({ seq } : CULTURE_INFO_DETAUL_PREFETCH_COMPONENT) => {
    
    const queryServer = new QueryClient();

    await PrefetchCultureDetail(queryServer, seq);   
    
    const dehydratedState = dehydrate(queryServer);

    return (
        <HydrationBoundary state={dehydratedState}>
            <BackgroundLayer>
                <CultureInfoDetailPageView/>
            </BackgroundLayer>
        </HydrationBoundary>
    )
}