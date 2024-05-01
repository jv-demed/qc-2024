'use client'

import { Main } from '@/components/boxes/Main';
import { CurrentChampionshipBox } from '@/components/championship/CurrentChampionshipBox';
import { HeaderMenu } from '@/components/menu/HeaderMenu';

export default function Home(){
    return(
        <Main>
            <HeaderMenu />
            <CurrentChampionshipBox />
        </Main>
    );
}