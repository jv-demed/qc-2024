import styled from 'styled-components';
import { useState } from 'react';
import { formatDate } from '@/scripts/utils/dateScripts';
import { getPlayerName } from '@/scripts/playerScripts';
import { getClassNameById } from '@/scripts/classesScripts';
import { getNumericArrayByStr } from '@/scripts/utils/stringScripts';
import { getChampionImg, getChampionName } from '@/scripts/champions/championScripts';
import { images } from '@/assets/images';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';
import { VideoBox } from '../elements/VideoBox';

const Styled = styled.li`
    display: flex;
    flex-direction: column;
    gap: 2px;
    .infos{
        display: flex;
        font-size: 0.6rem;
        gap: 20px;
        justify-content: center;
    }
    .result{
        align-items: center;
        display: flex;
        gap: 5px;
        justify-content: space-between;
        .player1, .player2{
            align-items: center;
            display: flex;
            gap: 5px;
            .champ-img{
                border-radius: 50%;
                width: 35px;
            }
            .player{
                display: flex;
                flex-direction: column;
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .winner{
                    color: ${palette.matches.winner};
                }
            }
            .ban-list{
                display: flex;
                gap: 4px;
                list-style: none;
                width: 100%;
                .ban-img{
                    border-radius: 50%;
                    width: 20px;
                }
            }
        }
        .player1{
            background-color: ${palette.matches.blueSide};
            border-radius: 20px 5px 5px 20px;
            width: 100%;
            .champ-img{
                border: 2px solid ${palette.matches.champ1};
            }
        }
        .player2{
            background-color: ${palette.matches.redSide};
            border-radius: 5px 20px 20px 5px;
            justify-content: flex-end;
            text-align: end;
            width: 100%;
            .champ-img{
                border: 2px solid ${palette.matches.champ2};
            }
            .ban-list{
                justify-content: flex-end;
            }
        }
    }
    @media(max-width: ${screens.mobile.px}){
        .infos{
            font-size: 0.8rem;
        }
        .result{
            .player{
                .champ-img{
                    width: 50px;
                }
            }
        }
    }
`

export function MatchBox({ match, playerList, championList }){

    const [videoIsOpen, setIsVideoOpen] = useState(false);

    return(
        <Styled onClick={() => {
            match.video && setIsVideoOpen(!videoIsOpen)
        }}>
            <div className='infos'>
                <span>
                    {formatDate(match.data)}
                </span>
                <span>
                    Partida {match.joker ? 'Joker' : 'Regular'}
                </span>
                <span>
                    Classe: {getClassNameById(match.classe)}
                </span>
            </div>
            <div className='result'>
                <div className='player1'>
                    <img className='champ-img'
                        alt={getChampionName(match.campeao1, championList)}
                        src={getChampionImg(match.campeao1, championList) || images.championIcon}
                    />
                    <div className='player'>
                        <span className={match.resultado == 1 ? 'winner' : ''}>
                            {getPlayerName(match.jogador1, playerList)}
                        </span> 
                        {match.bans1 && <ul className='ban-list'>
                            {getNumericArrayByStr(match.bans1).map(key => {
                                return(
                                    <li key={key}> 
                                        <img className='ban-img'
                                            alt={getChampionName(key, championList)}
                                            src={getChampionImg(key, championList)}
                                        />
                                    </li>
                                )
                            })}
                        </ul>}
                    </div>
                </div>
                <span>vs</span> 
                <div className='player2'>
                    <div className='player'>
                        <span className={match.resultado == 2 ? 'winner' : ''}>
                            {getPlayerName(match.jogador2, playerList)}
                        </span> 
                        {match.bans2 && <ul className='ban-list'>
                            {getNumericArrayByStr(match.bans2).map(key => {
                                return(
                                    <li key={key}> 
                                        <img className='ban-img'
                                            alt={getChampionName(key, championList)}
                                            src={getChampionImg(key, championList)}
                                        />
                                    </li>
                                )
                            })}
                        </ul>}
                    </div>
                    <img className='champ-img'
                        alt={getChampionName(match.campeao2, championList)}
                        src={getChampionImg(match.campeao2, championList) || images.championIcon}
                    />
                </div> 
            </div>
            {videoIsOpen && <VideoBox 
                urlVideo={match.video} 
            />}
        </Styled>
    );
}