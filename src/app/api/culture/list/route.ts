import { NextRequest, NextResponse } from 'next/server'
import { API_SERVER_CULTURE_INFO_LIST } from '@/entities/culture/list/api/api.server.culture.info.list';
import { SetCookies } from '@/shared/lib/cookies';

export async function POST(req : NextRequest) {
    try {

        const { offset, limit, searchType, searchKeyword, searchArea } = await req.json() as API_CLIENT_CULTURE_INFO_LIST_PARAMS;

        const querys = {
            offset,
            limit,
            type : searchType,
        } as API_SERVER_CULTURE_INFO_LIST_PARAMS;

        if(searchKeyword) querys["keyword"] = searchKeyword;
        if(searchArea) querys["area"] = searchArea as DISTRICT;
        if(searchType) querys["type"] = searchType;

        const response = await API_SERVER_CULTURE_INFO_LIST(querys);

        await SetCookies(response.headers);

        const result = await response.json<API_CULTURE_INFO_LIST>();

        return NextResponse.json(result, { status : 200 });
    }
    catch(err) {
        return NextResponse.json(err, {status : 500});
    }
}