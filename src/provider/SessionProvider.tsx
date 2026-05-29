"use client"

import type { Session } from "next-auth"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface SESSION_PROVIDER extends LAYOUT_CHILD {
    session? : Session | null
}

export const SessionProvider = ({ children, session } : SESSION_PROVIDER) => {
    return (
        <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
            {children}
        </NextAuthSessionProvider>
    )
}
