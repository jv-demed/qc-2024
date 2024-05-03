import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPlayerName } from '@/scripts/playerScripts';
import { sortAlpha } from '@/scripts/utils/ordinationScripts';
import { addConfront, getConfrontsByRound } from '@/scripts/championships/confrontScripts';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';
import { objsData } from '@/assets/objsData';
import { Loading } from '../elements/Loading';
import { SelectInput } from '../inputs/SelectInput';
import { ActionButton } from '../buttons/ActionButton';

const Styled = styled.section`
    width: 100%;
    section{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    header{
        display: flex;
        justify-content: flex-end;
        .header-new{
            align-items: center;
            display: flex;
            justify-content: space-between;
            width: 100%;
            span{
                cursor: pointer;
            }
        }
    }
    .new-confront{
        align-items: center;
        display: flex;
        gap: 8px;
    }
    ul{
        display: flex;
        flex-direction: column;
        gap: 8px;
        list-style: none;
        li{
            align-items: center;
            background-color: ${palette.register.element};
            border-radius: 2px;
            display: flex;
            height: 30px;
            justify-content: space-between;
            padding: 0 10px;
            .nick{
                width: 100%;
            }
            .player2{
                text-align: end;
            }
        }
        li:hover{
            background-color: ${palette.register.elementHover};;
        }
    }
    @media(max-width: ${screens.mobile.px}){

    }
`

export function RoundEditor({ round, playerList }){

    const [confronts, setConfronts] = useState();
    const [newMode, setNewMode] = useState(false);
    const [newConfront, setNewConfront] = useState(objsData.confront);
    const [usePlayers, setUsePlayers] = useState([]);
    const [flag, setFlag] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getConfrontsByRound(round.id).then(res => {
            setConfronts(res);
            setIsLoading(false);
        })
    }, [round, flag]);

    useEffect(() => {
        if(confronts){
            const list = playerList.filter(p => {
                return !confronts.some(c => c.jogador1 == p.id || c.jogador2 == p.id);
            });
            setUsePlayers(list);
        }
    }, [confronts, flag]);

    useEffect(() => {
        usePlayers.length > 0 && setNewConfront({
            ...newConfront,
            jogador1: usePlayers[0].id,
            jogador2: usePlayers[1].id
        });
    }, [usePlayers]);

    return(
        <Styled>
            {!isLoading && <section>
                <header>
                    {!newMode && <ActionButton 
                        name='Novo Confronto'
                        action={() => setNewMode(true)}
                        disabled={usePlayers.length == 0}
                    />}
                    {newMode && <div className='header-new'>
                        <span onClick={() => setNewMode(false)}>
                            Cancelar
                        </span>
                        <ActionButton 
                            name='Adicionar'
                            width='100px'
                            action={async () => {
                                await addConfront({
                                    ...newConfront,
                                    idRodada: round.id
                                })
                            }}
                            setFlag={() => setFlag(prev => prev+1)}
                            setMode={() => setNewMode(false)}
                        />
                    </div>}
                </header>
                {newMode && <div className='new-confront'>
                    <SelectInput name='player1-seletor'
                        array={sortAlpha(usePlayers, 'nick')}
                        info='nick'
                        value={newConfront.jogador1}
                        setValue={e => setNewConfront({
                            ...newConfront,
                            jogador1: parseInt(e.target.value)
                        })}
                    />   
                    <span>vs</span>
                    <SelectInput name='player1-seletor'
                        array={sortAlpha(usePlayers, 'nick')}
                        info='nick'
                        value={newConfront.jogador2}
                        setValue={e => setNewConfront({
                            ...newConfront,
                            jogador2: parseInt(e.target.value)
                        })}
                    />  
                </div>}
                <ul>
                    {confronts.map(confront => {
                        return(
                            <li key={confront.id}>
                                <span className='nick'>
                                    {getPlayerName(confront.jogador1, playerList)}
                                </span> 
                                <span>vs</span> 
                                <span className='nick player2'>
                                    {getPlayerName(confront.jogador2, playerList)}
                                </span> 
                                
                            </li>
                        );
                    })}
                </ul>
            </section>}
            {isLoading && <Loading />}
        </Styled>
    );
}