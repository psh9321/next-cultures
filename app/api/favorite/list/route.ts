import { API_SERVER_FAVORITE_LIST } from '@/entities/favorite/list/api/api.server.favorite.list';
import { NextResponse } from 'next/server'

export async function POST() {
    try {

        const result = await API_SERVER_FAVORITE_LIST();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({
            resultCode : 500,
            data : null,
            errMsg : "관심 전시 목록을 불러오지 못했습니다.",
        } satisfies API_FAVORITE_LIST, { status : 200 });
    }
}
