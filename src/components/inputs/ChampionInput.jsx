import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getClassIdByName } from '@/scripts/classesScripts';
import { sortAlpha } from '@/scripts/utils/ordinationScripts';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';

const Styled = styled.label`
    display: flex;
    flex-direction: column;
    width: 100%;
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

export function ChampionInput({ championList, value, setValue }){
    return(
        <Styled>
            <select name='championList'
                value={value || ''}
                onChange={setValue} 
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
        </Styled>
    )
}