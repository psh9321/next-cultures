import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode : process.env.NODE_ENV === "production",
  productionBrowserSourceMaps : process.env.NODE_ENV === "production",
  compiler : {
    styledComponents : true,
    removeConsole : process.env.NODE_ENV === "production",
  },

  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "www.culture.go.kr",
        pathname: '/upload/**',
      }, 
      {
        protocol : "https",
        hostname : "lh3.googleusercontent.com",
      }, 
      {
        protocol : "https",
        hostname : "phinf.pstatic.net"
      }, 
      {
        protocol : "http",
        hostname : "k.kakaocdn.net"  
      }, 
      {
        protocol : "https",
        hostname : "ssl.pstatic.net"
      }
    ]
  }
};

export default nextConfig;
