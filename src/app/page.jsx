'use client'

import { Main } from '@/components/boxes/Main';
import { CurrentChampionshipBox } from '@/components/championship/CurrentChampionshipBox';

export default function Home(){
    return(
        <Main>
            <CurrentChampionshipBox />
        </Main>
    );
}