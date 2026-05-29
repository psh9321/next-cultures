declare global {

    /** 좋아요 할 전시 등록 파라미터 */
    interface FAVORITE_EXHIBITION_PARAMS {
        imgUrl : string,
        title : string,
        startDate : string | number,
        endDate : string | number,
        userId : string,
        seq : string,
        area : DISTRICT
    }    

    /** 좋아요 한 전시 아이템 */
    interface FAVORITE_EXHIBITION_ITEM {
        exhibitionImg: string;

        exhibitionTitle: string;

        exhibitionStartDate: string;

        exhibitionEndDate: string;

        exhibitionType : SERVICE_TYPE

        exhibitionArae : DISTRICT

        favoriterId : string;

        createdAt: Date,

        updatedAt: Date,
    }

    interface TOGGLE_FAVORITE_STATUS_ITEM {
        toggleStatus : boolean,
        msg : "찜하기 성공" | "찜하기 해제 성공" | "찜하기 해제 실패"        
    }

    type API_TOGGLE_FAVORITE_EXHIBITION = RESPONSE_MODEL<TOGGLE_FAVORITE_STATUS_ITEM>
}

export {}