import styled from 'styled-components';
import { icons } from '@/assets/icons';
import { sortAlpha } from '@/scripts/utils/ordinationScripts';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';
import { getRandomChampionPick } from '@/scripts/champions/championScripts';

const Styled = styled.label`
    align-items: center;
    display: flex;
    gap: 5px;
    width: 100%;
    .icon{
        cursor: pointer;
        font-size: 1.5rem;
    }
    select{
        background-color: ${palette.inputs.bg};
        border: 1px solid ${palette.inputs.border};
        border-radius: 2px;
        color: ${palette.inputs.color};
        font-size: 1.2rem;
        height: 30px;
        outline: none;
        padding: 0 8px;
        width: 100%;
        option{
            color: ${palette.inputs.option};
        }
    }
    input:focus{
        border: none;
        outline: 2px solid ${palette.inputs.outline};
    }
    @media(max-width: ${screens.mobile.px}){
        input{
            height: 50px;
        }
    }
`;

export function ChampionInput({ championList, value, setValue, random }){
    return(
        <Styled>
            <select name='championList'
                value={value || ''}
                onChange={e => setValue(e.target.value)} 
            >
                {value == null && ( 
                    <option value=''>Selecione...</option>
                )}
                {sortAlpha(championList, 'name').map(champ => {
                    return(
                        <option key={champ.key} value={champ.key}>
                            {champ.name}
                        </option>
                    )
                })}
            </select>
            {random && <icons.random className='icon' 
                onClick={() => setValue(getRandomChampionPick(championList))}
            />}
        </Styled>
    )
}