import { palette } from '@/assets/palette';
import { convertClass } from '@/scripts/classesScripts';
import styled from 'styled-components';

const Styled = styled.div`
    border: 1px solid ${palette.champBoxes.border};
    border-radius: 10px;
    color: ${palette.champBoxes.color};
    display: flex;
    gap: 10px;
    padding: 5px;
    width: 100%;
    .champ-image{
        background: ${palette.champBoxes.imgBorder};
        border-radius: 50%;
        display: flex;
        padding: 2px;
        width: 75px;
        img{
            border-radius: 50%;
            width: 100%;
        }
    }
    .champ-info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px 0;
        width: 100%;
        .top{
            display: flex;
            justify-content: space-between;
        }
        .bot{
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }
    }
`

export function ChampionBox({ champ }){
    return(
        <Styled>
            <div className='champ-image'>
                <img 
                    src={champ.image} 
                    alt={champ.name} 
                />
            </div>
            <div className='champ-info'>
                <div className='top'>
                    <span className='name'>
                        {champ.name}
                    </span>
                    <span>
                        {convertClass(champ.class)}
                    </span>
                </div>
                <div className='bot'>
                    <span>Jogos: {champ.matches}</span>
                    <span>DP: {champ.same}</span>
                    <span>Tx. Vitórias: {champ.winRate.toFixed(2)}%</span>
                </div>
            </div>
        </Styled>
    );
}