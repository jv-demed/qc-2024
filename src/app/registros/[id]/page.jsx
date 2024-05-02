'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLogin } from '@/scripts/database/userScripts';
import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';

export default function Registros(){

    const router = useRouter();

    useEffect(() => {
        !isLogin() && router.push('/login');
    });

    return(
        <Main>
            <HeaderMenu />
            oi
        </Main>
    );
}