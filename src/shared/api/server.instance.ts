import ky from "ky"
import { GetCookies } from "../lib/cookies"

export const BACKEND_API = ky.create({
    prefix : process.env.NEXT_PUBLIC_API_URL,
    timeout : 10000,
    credentials : "include",
    headers : {
        accept : "application/json"
    },
    hooks : {
        beforeRequest : [
            async ({request}) => {

                const token = await GetCookies();

                if(token) {
                    request.headers.set(process.env.ACCESS_TOKEN_KEY as string,token["a"])
                    request.headers.set(process.env.REFRESH_TOKEN_KEY as string,token["r"])
                }

                return request
            }
        ],

        beforeError : [
            async ({error}) => {
                return error
            }
        ],

        afterResponse : [
            async ({response}) => {
                return response
            }
        ]
    }
})