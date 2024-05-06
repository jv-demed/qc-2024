import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClassIdByName, getClassesObjs } from '@/scripts/classesScripts';
import { getNumericArrayByStr } from '@/scripts/utils/stringScripts';
import { getPlayerList, getPlayerName } from '@/scripts/playerScripts';
import { getMatchById, getRandomSidesMatch, invertSidesMatch, updateMatch } from '@/scripts/championships/matchScripts';
import { getChampionshipByMatchId } from '@/scripts/championships/championshipScripts';
import { getChampions } from '@/scripts/champions/championScripts';
import { icons } from '@/assets/icons';
import { screens } from '@/assets/screens';
import { Loading } from '../elements/Loading';
import { DateInput } from '../inputs/DateInput';
import { SelectInput } from '../inputs/SelectInput';
import { SideEditor } from './SideEditor';
import { getKillModesObjs } from '@/scripts/killModesScripts';
import { TextInput } from '../inputs/TextInput';

const Styled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 600px;
    .match-actions{
        display: flex;
        justify-content: space-between;
        z-index: 2;
        span{
            cursor: pointer;
        }
        .save{
            display: flex;
            gap: 10px;
        }
    }
    section{
        display: flex;
        flex-direction: column;
        gap: 15px;
        .infos{
            display: flex;
            gap: 20px;
            z-index: 2;
        }
        .players{
            align-items: center;
            display: flex;
            gap: 20px;
            z-index: 2;
            .player1, .player2{
                width: 100%;
            }
            .player2{
                text-align: end;
            }
            .player-options{
                display: flex;
                gap: 5px;
                .icon{
                    cursor: pointer;
                    display: flex;
                    font-size: 1.5rem;
                    height: 50%;
                }
            }
        }
        .sides{
            display: flex;
            gap: 20px;
        }
        .finished{
            align-items: center;
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 10px;
            z-index: 2; 
            .inputs{
                display: flex;
                gap: 15px;
                width: 100%;
            } 
        }
    }
    @media(max-width: ${screens.mobile.px}){
        width: 100%;
    }
`

export function MatchEditor({ idMatch }){

    const router = useRouter();

    const [match, setMatch] = useState();
    const [infos, setInfos] = useState();
    const [championList, setChampionList] = useState();
    const [playerList, setPlayerList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [flag, setFlag] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        getMatchById(idMatch).then(res => {
            setMatch(res);
        });
    }, []);

    useEffect(() => {
        match && getPlayerList(`${match.jogador1},${match.jogador2}`).then(res => {
            setPlayerList(res);
        });
    }, [match]);

    useEffect(() => {
        match && getChampionshipByMatchId(match.idConfronto).then(res => {
            setInfos(res);
        });
    }, [match]);

    useEffect(() => {
        match && getChampions().then(res => {
            setChampionList(res.filter(c => getClassIdByName(c.tags[0]) == match.classe));
        });
    }, [match]);

    useEffect(() => {
        if(match && infos && championList && playerList){
            setIsLoading(false);
        }
    }, [match, infos, championList, playerList]);

    useEffect(() => {
        match && setIsSaving(true);
        match && updateMatch(match).then(() => {
            setIsSaving(false);
        });
    }, [flag]);

    return(
        <Styled>
            {!isLoading && <>
                <header className='match-actions'>
                    <span onClick={() => {
                        router.push(`/registros/confronto/${match.idConfronto}`);
                    }}>
                        Voltar
                    </span>
                    {isSaving && <div className='save'>
                        Salvando <Loading />
                    </div>}
                </header>
                <section>
                    <div className='infos'>
                        <DateInput 
                            value={match.data}
                            setValue={e => {
                                setMatch({...match, data: e.target.value});
                                setFlag(prev => prev+1);
                            }}
                        />
                        <SelectInput 
                            array={getClassesObjs()}
                            info='name'
                            value={match.classe}
                            setValue={e => {
                                setMatch({...match, classe: e});
                                setFlag(prev => prev+1);
                            }}
                        />
                    </div>
                    <div className='players'>
                        <div className='player1'>
                            <span>
                                {getPlayerName(playerList[0].id, playerList)}
                            </span>
                        </div>
                        <div className='player-options'>
                            <icons.arrowChanger className='icon' 
                                onClick={() => invertSidesMatch(match, setMatch)}
                            />
                            <icons.random className='icon' 
                                onClick={() => getRandomSidesMatch(match, setMatch)}
                            />
                        </div>
                        <div className='player2'>
                            <span>
                                {getPlayerName(playerList[1].id, playerList)}
                            </span>
                        </div>
                    </div>
                    <div className='sides'>
                        <SideEditor 
                            match={match}
                            list={championList}
                            champ={match.campeao1}
                            setChamp={e => {
                                setMatch({...match, campeao1: e});
                                setFlag(prev => prev+1);
                            }}
                            bansInfo='bans1'
                            bansNum={infos.regularBans}
                            setBanList={list => {
                                setMatch({...match, bans1: list.join(',')});
                                setFlag(prev => prev+1);
                            }}
                        />
                        <SideEditor 
                            mirror
                            match={match}
                            list={championList}
                            champ={match.campeao2}
                            setChamp={e => {
                                setMatch({...match, campeao2: e.target.value});
                                setFlag(prev => prev+1);
                            }}
                            bansInfo='bans2'
                            bansNum={infos.regularBans}
                            setBanList={list => {
                                setMatch({...match, bans2: list.join(',')});
                                setFlag(prev => prev+1);
                            }}
                        />
                    </div>
                    <div className='finished'>
                        <div className='inputs'>
                            <SelectInput 
                                name='Vencedor'
                                array={playerList}
                                info='nick'
                                value={match.resultado ? (match.resultado == 1 ? match.jogador1 : match.jogador2) : null}
                                setValue={e => {
                                    const result = match.jogador1 == e ? 1 : 2
                                    setMatch({...match, resultado: result});
                                    setFlag(prev => prev+1);
                                }}
                            />
                            <SelectInput 
                                name='Método'
                                array={getKillModesObjs()}
                                info='name'
                                value={match.metodo}
                                setValue={e => {
                                    setMatch({...match, metodo: e});
                                    setFlag(prev => prev+1);
                                }}
                            />
                            <TextInput 
                                name='Tempo'
                                text={match.time}
                                setText={e => {
                                    setMatch({...match, tempo: e.target.value});
                                    setFlag(prev => prev+1);
                                }}
                            />
                        </div>
                    </div>
                </section>
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}