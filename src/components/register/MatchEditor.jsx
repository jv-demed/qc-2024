import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getClassIdByName, getClassesObjs } from '@/scripts/classesScripts';
import { getNumericArrayByStr } from '@/scripts/utils/stringScripts';
import { getPlayerList, getPlayerName } from '@/scripts/playerScripts';
import { getMatchById, updateMatch } from '@/scripts/championships/matchScripts';
import { getChampionshipByMatchId } from '@/scripts/championships/championshipScripts';
import { getChampionLoadingScreenImg, getChampionName, getChampions } from '@/scripts/champions/championScripts';
import { icons } from '@/assets/icons';
import { screens } from '@/assets/screens';
import { Loading } from '../elements/Loading';
import { DateInput } from '../inputs/DateInput';
import { SelectInput } from '../inputs/SelectInput';
import { ChampionInput } from '../inputs/ChampionInput';
import { SideEditor } from './SideEditor';

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
            .icon{
                cursor: pointer;
                display: flex;
                font-size: 3rem;
                height: 50%;
            }
        }
        .sides{
            display: flex;
            gap: 8px;
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
    const [bans1, setBans1] = useState([]);
    const [bans2, setBans2] = useState([]);
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
            const filtered = res.filter(c => getClassIdByName(c.tags[0]) == match.classe);
            setChampionList(filtered);
        });
    }, [match]);

    useEffect(() => {
        if(championList){
            const filtered = championList.filter(c => !bans1.includes(c.key) && !bans2.includes(c.key));
            setChampionList(filtered);
        }
    }, [bans1, bans2]);
    //ARRUMAR AQUI, NÃO TÁ SENDO FILTRADO OS CAMPEOES JÁ ESCOLHIDOS

    console.log(bans1);

    useEffect(() => {
        if(match && infos && bans1.length == 0 && bans2.length == 0){
            const list1 = getNumericArrayByStr(match.bans1);
            const list2 = getNumericArrayByStr(match.bans2);
            for(let i = 0; i < infos.regularBans; i++){
                setBans1(prev => [...prev, list1[i]]);
                setBans2(prev => [...prev, list2[i]]);
            }
        }
    }, [match, infos]);

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
                                setMatch({...match, classe: e.target.value});
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
                        <icons.arrowChanger className='icon' />
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
                            setList={setChampionList}
                            champ={match.campeao1}
                            setChamp={e => {
                                setMatch({...match, campeao1: e.target.value});
                                setFlag(prev => prev+1);
                            }}
                            bans={bans1}
                            bansInfo='bans1'
                            setBans={(info, list) => {
                                setBans1(list);
                                setMatch({...match, [info]: list.join(',')});
                                setFlag(prev => prev+1);
                            }}
                            mirror={false}
                        />
                        <SideEditor 
                            match={match}
                            list={championList}
                            setList={setChampionList}
                            champ={match.campeao2}
                            setChamp={e => {
                                setMatch({...match, campeao2: e.target.value});
                                setFlag(prev => prev+1);
                            }}
                            bans={bans2}
                            bansInfo='bans2'
                            setBans={(info, list) => {
                                setBans1(list);
                                setMatch({...match, [info]: list.join(',')});
                                setFlag(prev => prev+1);
                            }}
                            mirror={true}
                        />
                    </div>
                </section>
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}