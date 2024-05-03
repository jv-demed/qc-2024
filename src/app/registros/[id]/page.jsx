'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLogin } from '@/scripts/database/userScripts';
import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';
import { getChampionshipById } from '@/scripts/championships/championshipScripts';
import { getChampions } from '@/scripts/champions/championScripts';
import { getPlayerList } from '@/scripts/playerScripts';
import { ChampionshipEdit } from '@/components/register/ChampionshipEdit';

export default function Registros({ params }){

    const router = useRouter();

    useEffect(() => {
        !isLogin() && router.push('/login');
    });

    return(
        <Main>
            <HeaderMenu />
            <ChampionshipEdit 
                idChampionship={params.id}
            />
        </Main>
    );
}