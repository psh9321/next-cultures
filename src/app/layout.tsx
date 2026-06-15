import type { Metadata } from "next";

import "@/styles/reset.css";
import "@/styles/font.css";
import "@/styles/common.css";

export const metadata : Metadata = {
//   verification : {
//     google : ""
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
    
    return (
        <html lang="ko">
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
