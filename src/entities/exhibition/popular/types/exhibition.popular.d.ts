declare global {
    interface EXHIBITION_POPULAR_ITEM {
        favoriteCount: number,
        exhibitionSeq: string,
        exhibitionImg: string,
        exhibitionTitle: string,
        exhibitionStartDate: string,
        exhibitionEndDate: string,
        exhibitionArea: string,
    }

    type API_SERVER_EXHIBITION_POPULAR = RESPONSE_MODEL<EXHIBITION_POPULAR_ITEM[]>;
}

export {}