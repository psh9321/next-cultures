import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { QueryClient } from "@tanstack/react-query";

import "@/styles/reset.css";
import "@/styles/font.css";
import "@/styles/common.css";

import { StyledComponentsProvider } from "@/provider/StyledComponentsProvider";
import { QueryProvider } from "@/provider/QueryProvider";
import { SessionProvider } from "@/provider/SessionProvider";

import { KakaoShareInitializer } from "@/script/KakaoShareInitializer";
import { LoadingView } from "@/widgets/LoadingView";

import { authOptions } from "@/auth";
import { KakaoMapInitializer } from "@/script/KakaoMapInitializer";
import { Header } from "@/widgets/Header";

export const metadata : Metadata = {
//   verification : {
//     google : "YNRCvA1ZisdnrnUT_ide10_p6OFQtGi7Ktcdg1sSeXQ"
//   },
  metadataBase: new URL("https://exhibition.psh9321.cloud"),
  creator : "프론트엔드 개발자 박수현",
  publisher : "프론트엔드 개발자 박수현",
  title: {
    default: "Discover Exhibitions",
    template: "%s | 문화 정보 플랫폼",
  },
  description: "전국 문화 정보를 한눈에 확인하세요",
  keywords : ["문화", "문화 정보", "전국 문화 정보", "문화 정보 플랫폼", "exhibition", "discover exhibition", "exhibition discover", "cultures", "discover cultures", "cultures discover", "전시", "전시 정보", "전국 전시 정보", "전시 정보 플랫폼"],
  appLinks : {
    web : {
      url : "https://exhibition.psh9321.cloud",
      should_fallback : true,
    }
  },
  category : "문화",
  other : {
    custom : "meta"
  },
  robots : {
    index : true,
    follow : true,
  },
};

const RootLayout = async ({ children }: LAYOUT_CHILD) => {
    
    const session = await getServerSession(authOptions);
    return (
        <html lang="ko">
            <body suppressHydrationWarning>
                <KakaoMapInitializer/>
                <KakaoShareInitializer/>
                
                <StyledComponentsProvider>
                    <SessionProvider session={session}>
                        <QueryProvider>
                            <Header/>
                            {children}
                            <LoadingView/>

                            <div id="portal-root"></div>
                        </QueryProvider>
                    </SessionProvider>
                </StyledComponentsProvider>
            </body>
        </html>
    );
};

export default RootLayout;
