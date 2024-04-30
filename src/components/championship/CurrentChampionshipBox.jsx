import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { screens } from '@/assets/screens';
import { getPlayerList } from '@/scripts/playerScripts';
import { getChampions } from '@/scripts/champions/championScripts';
import { getCurrentChampionship, getGameData } from '@/scripts/championships/championshipScripts';
import { Calendar } from './Calendar';
import { Loading } from '../elements/Loading';
import { ClassificationTable } from './ClassificationTable';

const Styled = styled.section`
    display: flex;
    gap: 15px;
    width: 100%;
    @media(max-width: ${screens.mobile.px}){
        flex-direction: column;
        gap: 30px;
    }
`

export function CurrentChampionshipBox(){

    const [championship, setChampionship] = useState();
    const [gameData, setGameData] = useState();
    const [playerList, setPlayerList] = useState();
    const [championList, setChampionList] = useState();
    const [current, setCurrent] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentChampionship().then(res => {
            setChampionship(res);
        });
    }, []);

    useEffect(() => {
        getChampions().then(res => {
            setChampionList(res);
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
        if(championship && playerList && championList && gameData && current){
            setIsLoading(false);
        }
    }, [championship, playerList, championList, gameData, current]);

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
                    championList={championList}
                    current={current}
                    setRound={e => setCurrent(prev => prev+e)}
                />
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}