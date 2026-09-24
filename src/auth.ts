import type { NextAuthOptions, User } from "next-auth";

import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";

// import { API_SERVER_POST_USERS } from "./entities/users/post/api/api.server.post.users";
import { DateFormat } from "./shared/util/dateFormat";
import { API_SERVER_POST_USERS } from "./entities/users/(post)/api/api.server.post.users";

const maxAge = (60 * 60) * 4;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge : maxAge,
  },
  jwt: {
    maxAge : maxAge,
  },
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,

      async profile(profile) {
        const r = profile.response;

        const id = `${r.id}-naver`;

        const userInfo = await API_SERVER_POST_USERS({userId : id, userName : r.name, socialType : "naver", profileImg : r.profile_image as string});

        if(!userInfo) throw new Error("Failed to load Naver user information.");

        return {
          id: userInfo.id,
          name: userInfo.name,
          type: "naver",
          profileImg : r.profile_image as string,
          createDate : DateFormat(userInfo.createdAt as Date,true),
        } satisfies User;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,

      async profile(profile) {

        const kakaoProfile = profile.kakao_account?.profile;
        
        const id = `${String(profile.id)}-kakao`;

        
        const userInfo = await API_SERVER_POST_USERS({userId : id, userName : kakaoProfile.nickname, socialType : "kakao", profileImg : kakaoProfile.profile_image_url});

        if(!userInfo) throw new Error("Failed to load Kakao user information.");

        return {
          id: userInfo.id,
          name : userInfo.name,
          type: "kakao",
          profileImg : userInfo.profileImg,
          createDate : DateFormat(userInfo.createdAt as Date,true),
        } satisfies User;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      async profile(profile) {
        const userInfo = await API_SERVER_POST_USERS({userId : `${profile.email}-google`, userName : profile.name, socialType : "google", profileImg : profile.picture});

        if(!userInfo) throw new Error("Failed to load Google user information.");

          return {
          id: userInfo.id,
          name : userInfo.name,
          type: "google",
          profileImg : userInfo.profileImg,
          createDate : DateFormat(userInfo.createdAt as Date,true),
        } satisfies User;
      },
    })
  ],
  callbacks: {
    async signIn() {
      return true;
    },

    async jwt({ token, user, trigger, session }) {

      if(user) {
        token["id"] = user["id"];
        token["name"] = user["name"];
        token["type"] = user["type"];
        token["createDate"] = user["createDate"];
        token["profileImg"] = user["profileImg"];
      }

      if(trigger === "update" && session) {
        const updateUser = session.user ?? session;

        token["name"] = updateUser.name ?? token["name"];
        token["profileImg"] = updateUser.profileImg ?? token["profileImg"];
      }

      return token;
    },

    session({ session, token }) {
      session["user"]["id"] = token["id"];
      session["user"]["name"] = token["name"];
      session["user"]["type"] = token["type"];
      session["user"]["createDate"] = token["createDate"];
      session["user"]["profileImg"] = token["profileImg"];

      return session;
    },
  },
};
