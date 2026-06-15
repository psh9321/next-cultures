import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PrefetchFavoriteList } from "@/entities/favorite/list/prefetch/prefetch.favorite.list";

import FavoritePageView from "./_view"

const FavoritePageServer = async () => {
    
    const queryServer = new QueryClient();

    await PrefetchFavoriteList(queryServer);

    const dehydratedState = dehydrate(queryServer);

    return (
        <FavoritePageView/>
    )
}

export default FavoritePageServer