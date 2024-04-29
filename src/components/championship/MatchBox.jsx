import styled from 'styled-components';
import { screens } from '@/assets/screens';
import { getPlayerName } from '@/scripts/playerScripts';

const Styled = styled.li`
    display: flex;
    flex-direction: column;
    .infos{
        display: flex;
        justify-content: space-between;
    }
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function MatchBox({ match, playerList }){
    return(
        <Styled>
            <div className='infos'>
                <span>
                    {getPlayerName(match.jogador1, playerList)}
                </span> 
                <span>vs</span> 
                <span>
                    {getPlayerName(match.jogador2, playerList)}
                </span> 
            </div>
        </Styled>
    );
}