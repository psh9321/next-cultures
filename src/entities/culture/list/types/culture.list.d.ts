declare global {
    /** 분야별구분 (A:공연/전시, B:행사/축제, C:교육/체험) */
    type SERVICE_TYPE = "A" | "B" | "C"; 

    /** 조회할 지역 */
    type DISTRICT = "서울" | "경기" | "세종" | "대전" | "대구" | "부산" | "광주" | "제주" | "강원" | "경남" | "경북" | "울산" | "인천" | "전남" | "전북" | "충남" | "충북";

    /** 문화정보 리스트 params */
    interface API_CLIENT_CULTURE_INFO_LIST_PARAMS extends LIST_API_PARAMS {

        /** 분야별 구분 */
        searchType : SERVICE_TYPE,

        /** 검색어 */
        searchKeyword? : string,

        /** 검색 지역 */
        searchArea? : DISTRICT,
    }

    interface API_SERVER_CULTURE_INFO_LIST_PARAMS {
        /** 페이지 번호 */
        offset : number,

        /** 페이지 별 불러올 게시물 수 */
        limit : number,

        /** 검색 분야 */
        type : SERVICE_TYPE,

        /** 검색어 */
        keyword? : string,

        /** 검색 지역 */
        area : DISTRICT,
    }

    /** 문화 정보 */
    interface CULTURE_ITEM {
        serviceName: string; /** 카테고리(서비스명) */
        seq: string; /** ex) 311142 */
        title: string; /** ex) 창작의 순간 - 예술가의 작업실 */
        startDate: string | number; /** ex) 20250214 */
        endDate: string | number; /** ex) 20250214 */
        place: string; /** ex) 국립현대미술관 서울관 */
        realmName: string; /** ex) 전시 */
        area: DISTRICT | string; /** ex) 서울, 경기 ... */
        thumbnail: string; /** image src url */
        gpsX: string; /** ex) 126.98010361777375 */
        gpsY: string; /** ex) 37.578627490528596 */
        sigungu: string; /** 시, 군, 구 */
    }

    type API_CULTURE_INFO_LIST = RESPONSE_MODEL<INFINITY_RESPONSE_ITEM<CULTURE_ITEM[]>>;
}

export {}