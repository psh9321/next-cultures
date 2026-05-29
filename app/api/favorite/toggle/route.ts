import { NextRequest, NextResponse } from 'next/server'

import { API_SERVER_TOGGLE_FAVORITE_EXHIBITION } from '@/entities/favorite/toggle/api/api.server.favorite.toggle';

export async function POST(req : NextRequest) {
    try {

        const params = await req.json() as FAVORITE_EXHIBITION_PARAMS;

        const result = await API_SERVER_TOGGLE_FAVORITE_EXHIBITION(params)

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({status : 500});
    }
}