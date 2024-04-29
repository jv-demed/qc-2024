import styled from 'styled-components';
import { screens } from '@/assets/screens';
import { icons } from '@/assets/icons';
import { palette } from '@/assets/palette';
import { getPlayerName } from '@/scripts/matchScripts';
import { formatData } from '@/scripts/utils/dateScripts';

const Styled = styled.li`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    .date{
        font-size: 0.7rem;
    }
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
            <span className='date'>
                {formatData(match.data)}
            </span>
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