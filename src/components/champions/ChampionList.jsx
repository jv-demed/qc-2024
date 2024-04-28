import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getChampionsStats } from '@/scripts/championStatsScripts';
import { sortChampWinRate } from '@/scripts/championOrdinationScripts';
import { screens } from '@/assets/screens';
import { List } from '@/components/boxes/List';
import { TextInput } from '@/components/inputs/TextInput';
import { ChampionBox } from '@/components/champions/ChampionBox';

const Styled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    width: 500px;
    @media(max-width: ${screens.mobile.px}){
        gap: 5px;
        width: 100%;
    }
`

export function ChampionList(){

    const [champs, setChamps] = useState([]);
    const [champList, setChampList] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getChampionsStats()
        .then(res => setChamps(sortChampWinRate(res)));
    }, []);

    useEffect(() => {
        setChampList(champs.filter(c => {
            return c.name.toLowerCase().includes(search.toLowerCase());
        }));
    }, [champs, search]);

    return(
        <Styled>
            <header>
                <TextInput 
                    text={search}
                    setText={e => setSearch(e.target.value)}
                />
            </header>
            <List>
                {champList.map(champ => {
                    return(
                        <li key={champ.key}>
                            <ChampionBox champ={champ} />
                        </li>
                    )
                })}
            </List>
        </Styled>
    );
}