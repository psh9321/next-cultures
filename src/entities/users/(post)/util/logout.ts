import { signOut } from 'next-auth/react';

import { DeleteCookies } from '@/shared/lib/cookies';

export async function LogoutCallback() {
    try {
        await DeleteCookies();
    }
    finally {
        signOut();
    }
}