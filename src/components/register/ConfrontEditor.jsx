import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPlayer } from '@/scripts/playerScripts';
import { getChampions } from '@/scripts/champions/championScripts';
import { getConfrontById } from '@/scripts/championships/confrontScripts';
import { getMatchesByConfront } from '@/scripts/championships/matchScripts';
import { screens } from '@/assets/screens';
import { MatchItem } from './MatchItem';
import { Loading } from '../elements/Loading';
import { useRouter } from 'next/navigation';
import { getChampionshipIdByConfrontId } from '@/scripts/championships/championshipScripts';

const Styled = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 600px;
    .confront-actions{
        span{
            cursor: pointer;
        }
    }
    .match-list{
        display: flex;
        flex-direction: column;
        gap: 15px;
        list-style: none;
    }
    @media(max-width: ${screens.mobile.px}){
        width: 100%;
    }
`

export function ConfrontEditor({ idConfront }){

    const router = useRouter();

    const [confront, setConfront] = useState();
    const [matchList, setMatchList] = useState();
    const [championList, setChampionList] = useState();
    const [idChampionship, setIdChampionship] = useState();
    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getConfrontById(idConfront).then(res => {
            setConfront(res);
        });
    }, []);

    useEffect(() => {
        getMatchesByConfront(idConfront).then(res => {
            setMatchList(res);
        })
    }, []);

    useEffect(() => {
        getChampions().then(res => {
            setChampionList(res);
        });
    }, []);

    useEffect(() => {
        confront && getPlayer(confront.jogador1).then(res => {
            setPlayer1(res);
        });
        confront && getPlayer(confront.jogador2).then(res => {
            setPlayer2(res);
        });
    }, [confront]);

    useEffect(() => {
        confront && getChampionshipIdByConfrontId(confront.idRodada).then(res => {
            setIdChampionship(res);
        });
    }, [confront]);

    useEffect(() => {
        if(confront && matchList && player1 && player2 && idChampionship){
            setIsLoading(false);
        }
    }, [confront, matchList, player1, player2, idChampionship]);

    return(
        <Styled>
            {!isLoading && <>
                <header className='confront-actions'>
                    <span onClick={() => {
                        router.push(`/registros/${idChampionship}`);
                    }}>
                        Voltar
                    </span>
                </header>
                <ul className='match-list'>
                    {matchList.map(match => {
                        return(
                            <li key={match.id}>
                                <MatchItem 
                                    match={match}
                                    championList={championList}
                                    playerList={[player1, player2]}
                                    router={router}
                                />
                            </li>
                        )
                    })}
                </ul>
            </>}
            {isLoading && <Loading />}
        </Styled>
    );
}