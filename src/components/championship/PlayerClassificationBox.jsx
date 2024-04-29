import styled from 'styled-components';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';

const Styled = styled.li`
    background-color: rgba(0,0,0,0.2);
    border: 1px solid ${props => props.$color};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    .rank{
        display: flex;
        gap: 10px;
        .position{
            color: ${props => props.$color};
            font-size: 1.1rem;
            text-align: center;
            width: 20px;
        }
    }
    .stats{
        display: flex;
        .fix{
            align-items: center;
            display: flex;
            justify-content: center;
            width: 40px;
        }
    }
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function PlayerClassificationBox({ position, player, numClass }){
    return(
        <Styled
            $color={() => {
                if(position <= numClass.total && position > numClass.direct){
                    return palette.ranking.classified;
                }else if(position <= numClass.direct){
                    return palette.ranking.direct;
                }else{
                    return palette.ranking.eliminated;
                }
            }}
        >
            <div className='rank'>
                <span className='position'><i>{position}</i></span>
                <span className='nick'>{player.nick}</span>
            </div>
            <div className='stats'>
                <span className='fix'>{player.points}</span>
                <span className='fix'>{player.wins}</span>
                <span className='fix'>{player.jokers}</span>
                <span className='fix'>{player.matches}</span>
            </div>
        </Styled>
    );
}