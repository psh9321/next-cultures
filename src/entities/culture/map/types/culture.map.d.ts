declare global {
    interface API_CLIENT_CULTURE_INFO_MAP_PARAMS extends LIST_API_PARAMS {
        fromY : number;
        fromX : number;
        toY : number;
        toX : number;
    }

    interface API_SERVER_CULTURE_INFO_MAP_PARAMS extends LIST_API_PARAMS {
        gpsxfrom : number;
        gpsyfrom : number;
        gpsxto : number;
        gpsyto : number;
    }

    type CULTURE_INFINITY_RESPONSE_ITEM = INFINITY_RESPONSE_ITEM<CULTURE_ITEM[]>;

    /** 현재 좌표 */
    interface COORDINATES {
        fromY : number
        fromX : number
        toY : number
        toX : number
    }

    type API_CULTURE_INFO_MAP = RESPONSE_MODEL<CULTURE_INFINITY_RESPONSE_ITEM>;
}

export {}