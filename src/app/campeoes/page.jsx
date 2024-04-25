'use client'

import { useEffect, useState } from 'react';
import { getChampionsStats } from '@/scripts/championStatsScripts';
import { ChampionBox } from '@/components/champions/ChampionBox';
import { Main } from '@/components/boxes/Main';
import { List } from '@/components/boxes/List';
import { sortChampWinRate } from '@/scripts/championOrdinationScripts';

export default function Campeoes(){

    const [champs, setChamps] = useState([]);

    useEffect(() => {
        getChampionsStats()
        .then(res => setChamps(sortChampWinRate(res)));
    }, []);

    console.log(champs);

    return(
        <Main>
            <List>
                {champs.map(champ => {
                    return(
                        <li key={champ.key}>
                            <ChampionBox champ={champ} />
                        </li>
                    )
                })}
            </List>
        </Main>
    );
}