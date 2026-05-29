declare global {
    interface FAVORITE_ITEM {
        /** 전시 썸네일 */
        exhibitionImg: string,

        /** 전시 명 */
        exhibitionTitle: string,

        /** 전시 시작날짜 */
        exhibitionStartDate: string,

        /** 전시 종료날짜 */
        exhibitionEndDate: string,

        /** 전시 고유 seq */
        exhibitionSeq: string,

        /** 전시 지역 */
        exhibitionArea : DISTRICT,

        /** 찜한 사람 아이디 */
        favoriterId: string,
    }

    type FAVORITE_LIST = INFINITY_RESPONSE_ITEM<FAVORITE_ITEM[]>

    type API_SERVER_FAVORITE_LIST = RESPONSE_MODEL<FAVORITE_LIST>

    type API_CLIENT_FAVORITE_LIST = FAVORITE_LIST

    type API_FAVORITE_LIST = RESPONSE_MODEL<FAVORITE_ITEM[]>
}

export {}