declare global {
    interface AUTH_LOGIN_PARAMS {

        /** 유저이름 및 닉네임 (카톡은 실명 권한 없음) */
        userName : string,

        /** id */
        userId : string,

        /** 로그인 type */
        socialType : "kakao" | "naver" | "google",

    }

    interface POST_SERS_ITEM {

        /** 유저 이름 */
        name : string,

        /** 유저 고유 아이디 */
        id : string,

        /** 최초 로그인 */
        createdAt : Date,

        /** 프로필 이미지 여부 */
        isProfileImg : boolean,
    }

    type API_POST_USERS = RESPONSE_MODEL<POST_SERS_ITEM>
}

export {}