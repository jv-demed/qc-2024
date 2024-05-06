import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Styled = styled.label`
    display: flex;
    flex-direction: column;
    gap: 5px;
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

export function SelectInput({ name, array, info, value, setValue }){
    return(
        <Styled>
            {name && <span>{name}:</span>}
            <select name={name}
                value={value || ''}
                onChange={e => setValue(e.target.value)} 
            >
                {value == null && ( 
                    <option value=''>Selecione...</option>
                )}
                {array.map(item => {
                    return(
                        <option key={item.id} value={item.id}>
                            {item[info]}
                        </option>
                    )
                })}
            </select>
        </Styled>
    )
}