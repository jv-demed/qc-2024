import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPlayerList } from '@/scripts/playerScripts';
import { getChampions } from '@/scripts/champions/championScripts';
import { getChampionshipById, getRounds } from '@/scripts/championships/championshipScripts';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';
import { RoundEditor } from './RoundEditor';
import { Loading } from '../elements/Loading';

const Styled = styled.section`
    display: flex;
    width: 100%;
    .planner{
        display: flex;
        gap: 30px;
        width: 100%;
        aside{
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 10px;
            text-align: center;
            width: 250px;
            ul{
                display: flex;
                flex-direction: column;
                gap: 5px;
                list-style: none;
                li{
                    align-items: center;
                    background-color: ${palette.register.element};
                    border-radius: 2px;
                    cursor: pointer;
                    display: flex;
                    height: 30px;
                    justify-content: center;
                }
                li:hover{
                    background-color: ${palette.register.elementHover};
                }
                .selected{
                    background-color: ${palette.register.elementHover};
                }
            }
        }
    }
    @media(max-width: ${screens.mobile.px}){

    }
`

export function ChampionshipEdit({ idChampionship }){

    const [championship, setChampionship] = useState();
    const [championList, setChampionList] = useState();
    const [playerList, setPlayerList] = useState();
    const [roundList, setRoundList] = useState();
    const [current, setCurrent] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getChampionshipById(idChampionship).then(res => {
            setChampionship(res);
        });
    }, []);

    useEffect(() => {
        getChampions().then(res => {
            setChampionList(res);
        });
    }, []);

    useEffect(() => {
        championship && getPlayerList(championship.jogadores).then(res => {
            setPlayerList(res);
        });
    }, [championship]);

    useEffect(() => {
        getRounds(idChampionship).then(res => {
            setRoundList(res);
        });
    }, []);

    useEffect(() => {
        if(championship && playerList && championList && roundList){
            setIsLoading(false);
        }
    }, [championship, playerList, championList, roundList]);

    return(
        <Styled>
            {!isLoading && <section className='planner'>
                <aside>
                    <span>QC-{championship.ano}</span>
                    <ul>
                        {roundList.map(round => {
                            return(
                                <li key={round.id}
                                    className={round.numero == current ? 'selected' : ''}
                                    onClick={() => setCurrent(round.numero)}
                                >
                                    Rodada {round.numero}
                                </li>
                            )
                        })}
                    </ul>
                </aside>
                <RoundEditor 
                    round={roundList.find(round => round.numero == current)}
                    playerList={playerList}
                />
            </section>}
            {isLoading && <Loading />}
        </Styled>
    );
}