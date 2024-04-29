import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { screens } from '@/assets/screens';
import { getClassification, getCurrentChampionship, getGameData, getRounds } from '@/scripts/championships/championshipScripts';
import { ClassificationTable } from './ClassificationTable';
import { Calendar } from './Calendar';
import { Loading } from '../elements/Loading';
import { getPlayerList } from '@/scripts/playerScripts';

const Styled = styled.section`
    display: flex;
    gap: 15px;
    width: 100%;
    @media(max-width: ${screens.mobile.px}){
        flex-direction: column;
    }
`

export function CurrentChampionshipBox(){

    const [championship, setChampionship] = useState();
    const [gameData, setGameData] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [current, setCurrent] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentChampionship().then(res => {
            setChampionship(res);
        });
    }, []);

    useEffect(() => {
        championship && getGameData(championship.id).then(res => {
            setGameData(res);
        });
    }, [championship]);

    useEffect(() => {
        championship && getPlayerList(championship.jogadores).then(res => {
            setPlayerList(res);
        });
    }, [championship]);

    useEffect(() => {
        gameData && setCurrent(gameData.length);
    }, [gameData]);

    useEffect(() => {
        championship && playerList && gameData && current && setIsLoading(false);
    }, [championship, playerList, gameData, current]);

    return(
        <Styled>
            {!isLoading && <>
                <ClassificationTable
                    infos={championship}
                    gameData={gameData}
                    playerList={playerList}
                    current={current}
                />
                <Calendar
                    infos={championship}
                    gameData={gameData}
                    playerList={playerList}
                    current={current}
                    setRound={e => setCurrent(prev => prev+e)}
                />
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}