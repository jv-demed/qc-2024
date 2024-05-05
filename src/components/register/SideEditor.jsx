import styled from 'styled-components';
import { getChampionLoadingScreenImg, getChampionName } from '@/scripts/champions/championScripts';
import { screens } from '@/assets/screens';
import { ChampionInput } from '../inputs/ChampionInput';

const Styled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    .bans{
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 2;
        ul{
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
    .pick{
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 2;
    }
    .title{
        align-items: center;
        display: flex;
        height: 30px;
        justify-content: center;
    }
    .champion-img{
        opacity: 30%;
        position: fixed;
        top: 40px;
        transition: all 2s;
        z-index: 1;
        ${props => props.$positionImg}: -20px;
    }
    @media(max-width: ${screens.mobile.px}){
        width: 100%;
    }
`

export function SideEditor({ match, list, setList, champ, setChamp, bans, bansInfo, setBans, mirror }){
    return(
        <Styled 
            $direction={mirror ? 'row-reverse' : 'row'}
            $positionImg={mirror ? 'right' : 'left'}
        >
            <div className='bans'>
                <span className='title'>Bans: </span>
                <ul>
                    {bans.map((ban, i) => {
                        return(
                            <ChampionInput 
                                key={`ban-${i+1}`}
                                championList={list}
                                value={ban}
                                classMatch={match.classe}
                                setValue={e => {
                                    const updatedBans = [...bans];
                                    updatedBans[i] = parseInt(e.target.value);
                                    setBans(bansInfo, updatedBans);
                                }}
                            />
                        )
                    })}
                </ul>
            </div>
            <div className='pick'>
                <span className='title'>Pick:</span>
                <ChampionInput
                    championList={list}
                    value={champ || null}
                    classMatch={match.classe}
                    setValue={setChamp}
                />
            </div>
            <img className='champion-img'
                alt={getChampionName(champ, list)}
                src={getChampionLoadingScreenImg(champ, list)}
            />
        </Styled>
    );
}