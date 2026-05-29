import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import QueryProvider from "@/provider/QueryProvider";
import { LoadingView } from "@/shared/ui/loadingView";
import { SessionProvider } from "@/provider/SessionProvider";
import { LayoutWrapper } from "@/widgets/LayoutWrapper";
import { PrefetchFavoriteList } from "@/entities/favorite/list/prefetch/prefetch.favorite.list";

const PageWrapperRoot = async ({children} : LAYOUT_CHILD) => {
    const queryServer = new QueryClient();
    const session = await getServerSession(authOptions);

    if(session) {
        await PrefetchFavoriteList(queryServer);
    }

    const dehydratedState = dehydrate(queryServer);

    return (
        <SessionProvider session={session}>
          <QueryProvider>
            <HydrationBoundary state={dehydratedState}>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <LoadingView/>

              <div id="portal-root"></div>
            </HydrationBoundary>
          </QueryProvider>
        </SessionProvider>
    )
}

export default PageWrapperRoot
