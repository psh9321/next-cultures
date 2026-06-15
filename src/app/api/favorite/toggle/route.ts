import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_TOGGLE_FAVORITE_EXHIBITION } from '@/entities/favorite/toggle/api/api.server.favorite.toggle';
import { SetCookies } from '@/shared/lib/cookies';

export async function POST(req : NextRequest) {
    try {

        const params = await req.json() as FAVORITE_EXHIBITION_PARAMS;

        const response = await API_SERVER_TOGGLE_FAVORITE_EXHIBITION(params);

        await SetCookies(response.headers);

        const result = await response.json<API_TOGGLE_FAVORITE_EXHIBITION>();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}