declare global {

    interface REVIEW_DATA {
        _id : string,
        writerId: string,
        writerName : string,
        writerIsProfileImg : boolean,
        seq: string,
        contents: string,
        createdAt: Date,
        updatedAt: Date,
    }   

    type API_GET_EXHIBITION_LIST = RESPONSE_MODEL<INFINITY_RESPONSE_ITEM<EXHIBITION_ITEM[]>>;

    type REVIEW_LIST = INFINITY_RESPONSE_ITEM<REVIEW_DATA[]>

    type API_SERVER_REVIEW_LIST = RESPONSE_MODEL<REVIEW_LIST>

    type API_CLIENT_REVIEW_LIST = RESPONSE_MODEL<REVIEW_LIST>
}

export {}