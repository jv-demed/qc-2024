import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getClassification, isPlayoffs } from '@/scripts/championships/championshipScripts';
import { sortPlayersPontuation } from '@/scripts/championships/championshipOrdinationScripts';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';
import { Loading } from '../elements/Loading';
import { PlayerClassificationBox } from './PlayerClassificationBox';

const Styled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    .change-header{
        border-bottom: 1px solid ${palette.elements.divisorBorder};
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
        span{
            cursor: pointer;
        }
    }
    .table{
        header{
            display: flex;
            justify-content: flex-end;
            padding: 0 5px;
            margin-bottom: 5px;
            width: 100%;
            div{
                display: flex;
                justify-content: center;
                width: 40px;
            }
        }
        ul{
            display: flex;
            flex-direction: column;
            gap: 5px;
            list-style: none;
            li:hover{
                background-color: rgba(0,0,0,0.5);
            }
        }
    }
    .playoffs{
        text-align: center;
    }
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function ClassificationTable({ infos, gameData, playerList, current }){

    const [classification, setClassification] = useState(playerList);
    const [mode, setMode] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
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
                <header className='change-header'>
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
                {mode == 0 && <section className='table'>
                    <header>
                        <div>P</div>
                        <div>V</div>
                        <div>JK</div>
                        <div>J</div>
                    </header>
                    <ul>
                        {classification.map((player, i) => {
                            return(
                                <PlayerClassificationBox 
                                    key={player.id}
                                    position={i+1}
                                    player={player}
                                    numClass={{
                                        direct: infos.classificacaoDireta,
                                        total: infos.classificacao
                                    }}
                                />
                            )
                        })}
                    </ul>
                </section>}
                {mode == 1 && <section className='playoffs'>
                    <span>Em construção</span>    
                </section>}
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}