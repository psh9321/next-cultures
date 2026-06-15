import { NextRequest, NextResponse } from 'next/server'

import { SetCookies } from '@/shared/lib/cookies';

import { API_SERVER_CULTURE_INFO_DETAIL } from '@/entities/culture/detail/api/api.server.culture.detail';

export async function POST(req : NextRequest) {
    try {

        const seq = await req.json();

        const response = await API_SERVER_CULTURE_INFO_DETAIL(seq);

        await SetCookies(response.headers);

        const result = await response.json<API_CULTURE_INFO_DETAIL>();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}