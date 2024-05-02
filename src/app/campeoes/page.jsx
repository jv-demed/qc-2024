'use client'

import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';
import { ChampionList } from '@/components/champions/ChampionList';

export default function Campeoes(){
    return(
        <Main>
            <HeaderMenu />
            <ChampionList />
        </Main>
    );
}