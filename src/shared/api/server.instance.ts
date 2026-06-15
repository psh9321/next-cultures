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
                    request.headers.set("a-t",token["a"])
                    request.headers.set("r-t",token["r"])
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