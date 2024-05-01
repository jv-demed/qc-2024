'use client'

import { Main } from '@/components/boxes/Main';
import { ChampionList } from '@/components/champions/ChampionList';
import { HeaderMenu } from '@/components/menu/HeaderMenu';

export default function Campeoes(){
    return(
        <Main>
            <HeaderMenu />
            <ChampionList />
        </Main>
    );
}