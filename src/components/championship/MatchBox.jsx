import styled from 'styled-components';
import { screens } from '@/assets/screens';
import { getPlayerName } from '@/scripts/playerScripts';
import { getChampionImg, getChampionName } from '@/scripts/champions/championScripts';

const Styled = styled.li`
    display: flex;
    flex-direction: column;
    .infos{
        display: flex;
    }
    .result{
        align-items: center;
        display: flex;
        gap: 5px;
        justify-content: space-between;
        .player{
            align-items: center;
            display: flex;
            gap: 5px;
            width: 100%;
            .champ-img{
                border-radius: 50%;
                width: 30px;
            }
        }
        .player1{
            background-color: rgba(0,0,55,0.1);
            border-radius: 15px 5px 5px 15px;
        }
        .player2{
            background-color: rgba(99,0,0,0.25);
            border-radius: 5px 15px 15px 5px;
            justify-content: flex-end;
        }
    }
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function MatchBox({ match, playerList, championList }){
    return(
        <Styled>
            <div className='infos'>

            </div>
            <div className='result'>
                <div className='player player1'>
                    {match.campeao1 && <img className='champ-img'
                        alt={getChampionName(match.campeao1, championList)}
                        src={getChampionImg(match.campeao1, championList)}
                    />}
                    <span>
                        {getPlayerName(match.jogador1, playerList)}
                    </span> 
                </div>
                <span>vs</span> 
                <div className='player player2'>
                    <span>
                        {getPlayerName(match.jogador2, playerList)}
                    </span> 
                    {match.campeao2 && <img className='champ-img'
                        alt={getChampionName(match.campeao2, championList)}
                        src={getChampionImg(match.campeao2, championList)}
                    />}
                </div> 
            </div>
        </Styled>
    );
}