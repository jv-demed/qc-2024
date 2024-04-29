import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPlayerList } from '@/scripts/playerScripts';
import { getClassification, isPlayoffs } from '@/scripts/championships/championshipScripts';
import { sortPlayersPontuation } from '@/scripts/championships/championshipOrdinationScripts';
import { screens } from '@/assets/screens';
import { Loading } from '../elements/Loading';

const Styled = styled.section`
    width: 100%;
    header{
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        span{
            cursor: pointer;
        }
    }
    table{
        align-items: center;
        display: flex;
        flex-direction: column;
        gap: 5px;
        .nick{
            width: 145px
        }
        .fix{
            width: 30px;
        }
    }
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function ClassificationTable({ infos, gameData, current }){

    const [playerList, setPlayerList] = useState([]);
    const [classification, setClassification] = useState([]);
    const [mode, setMode] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPlayerList(infos.jogadores).then(res => {
            setPlayerList(res);
        });
    }, []);
    
    useEffect(() => {
        playerList.length > 0 && getClassification(current, gameData, playerList)
        .then(res => {
            setClassification(sortPlayersPontuation(res));
            setIsLoading(false);
        });
    }, [playerList]);

    return(
        <Styled>
            {!isLoading && <>
                <header>
                    {infos.regular && <span
                        onClick={() => mode != 0 && setMode(prev => prev-1)}
                    >
                        Classificação
                    </span>}
                    {isPlayoffs(infos) && <span
                        onClick={() => mode != 1 && setMode(prev => prev+1)}
                    >
                        Playoffs
                    </span>}
                </header>
                {mode == 0 && <table>
                    <tr>
                        <th></th>
                        <th className='nick'></th>
                        <th className='fix'>P</th>
                        <th className='fix'>V</th>
                        <th className='fix'>JK</th>
                        <th className='fix'>J</th>
                    </tr>
                    {classification.map((player, i) => {
                        return(
                            <tr key={player.id}>
                                <td>{i+1}</td>
                                <td className='nick'>{player.nick}</td>
                                <td className='fix'>{player.points}</td>
                                <td className='fix'>{player.wins}</td>
                                <td className='fix'>{player.jokers}</td>
                                <td className='fix'>{player.matches}</td>
                            </tr>
                        )
                    })}
                </table>}
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}