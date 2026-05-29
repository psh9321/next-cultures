import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  experimental : {
    serverActions : {
      bodySizeLimit : "5mb"
    }
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname : "www.culture.go.kr",
        pathname: '/upload/**',
      },
      {
        protocol : isProduction ? "https" : "http",
        hostname : isProduction ? process.env.BACKEND_HOST_NAME as string : "localhost",
        ...(isProduction ? {} : { port : "2953" }),
        pathname: '/public/**',
      },
    ]
  }
};

export default nextConfig;
