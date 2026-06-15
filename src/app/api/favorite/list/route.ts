import { API_SERVER_FAVORITE_LIST } from '@/entities/favorite/list/api/api.server.favorite.list';
import { SetCookies } from '@/shared/lib/cookies';
import { NextResponse } from 'next/server'

export async function POST() {
    try {

        const response = await API_SERVER_FAVORITE_LIST();

        await SetCookies(response.headers);

        const result = await response.json<API_FAVORITE_LIST>();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        return NextResponse.json(err, { status : 200 });
    }
}
