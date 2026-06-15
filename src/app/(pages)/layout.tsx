
import { getServerSession } from "next-auth";

import { ReactNode } from "react";

import { authOptions } from "@/auth";

import { StyledComponentsProvider } from "@/provider/StyledComponentsProvider";
import { QueryProvider } from "@/provider/QueryProvider";
import { SessionProvider } from "@/provider/SessionProvider";

import { KakaoMapInitializer } from "@/script/KakaoMapInitializer";
import { KakaoShareInitializer } from "@/script/KakaoShareInitializer";

import { LoadingView } from "@/widgets/LoadingView";
import { Header } from "@/widgets/Header";

interface ROOT_LAYOUT extends LAYOUT_CHILD {
    parallel : ReactNode,
}

const PageRoot = async ({ children, parallel } : ROOT_LAYOUT) => {
    
    const session = await getServerSession(authOptions);

    return (
        <>
            <KakaoMapInitializer/>
            <KakaoShareInitializer/>
            <StyledComponentsProvider>
                <SessionProvider session={session}>
                     <QueryProvider>
                        <Header/>
                        {children}
                        {parallel}

                        <LoadingView/>

                        <div id="portal-root"></div>
                     </QueryProvider>
                </SessionProvider>
            </StyledComponentsProvider>
        </>
        
    );
};

export default PageRoot;