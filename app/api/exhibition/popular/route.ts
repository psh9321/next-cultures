import { NextResponse } from 'next/server'

import { API_SERVER_EXHIBITION_POPULAR } from '@/entities/exhibition/popular/api/api.server.exhibition.popular';

export async function POST() {
    try {

        const result = await API_SERVER_EXHIBITION_POPULAR();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json(err, {status : 500});
    }
}