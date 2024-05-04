import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPlayerName } from '@/scripts/playerScripts';
import { icons } from '@/assets/icons';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';
import { MatchBox } from './MatchBox';
import { Loading } from '../elements/Loading';
import { getConfrontById } from '@/scripts/championships/confrontScripts';

const Styled = styled.li`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    .btn{
        align-items: center;
        border-bottom: 1px solid ${palette.confrontBoxes.border};
        border-radius: 5px;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        padding: 10px;
        width: 100%;
        .main{
            display: flex;
            gap: 10px;
            justify-content: space-between;
            width: 100%;
            .nick{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
            }
            .player2{
                text-align: end;
            }
        }
    }
    .box{
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0 0 5px 5px;
        display: ${props => props.$display};
        flex-direction: column;
        gap: 5px;
        overflow: auto;
        padding: 10px;
        .date{
            font-size: 0.7rem;
        }
        .match-list{
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
    @media(max-width: ${screens.mobile.px}){
        .btn{
            height: 50px;
        }
    }
`

export function ConfrontDisclosure({ matchList, playerList, championList }){
    
    const [confront, setConfront] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        matchList[0] && getConfrontById(matchList[0].idConfronto)
        .then(res => {
            setConfront(res);
            setIsLoading(false);
        });
    }, []);

    return(
        <Styled 
            $display={isOpen ? 'flex' : 'none'}
        >
            {!isLoading && <div className='btn'
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className='main'>
                    <span className='nick'>
                        {getPlayerName(confront.jogador1, playerList)}
                    </span> 
                    <span>vs</span> 
                    <span className='nick player2'>
                        {getPlayerName(confront.jogador2, playerList)}
                    </span> 
                </div>
                {!isOpen && <icons.chevronDown />}
                {isOpen && <icons.chevronUp />}
            </div>}
            {!isLoading && <div className='box'>
                <ul className='match-list'>
                    {matchList.map(match => {
                        return(
                            <MatchBox key={match.id}
                                match={match}
                                playerList={playerList}
                                championList={championList}
                            />
                        )
                    })}
                </ul>
            </div>}
            {isLoading && <Loading />}
        </Styled>
    );
}