import styled from 'styled-components';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';

const Styled = styled.label`
    display: flex;
    width: ${props => props.$width};
    input{
        background-color: ${palette.inputs.bg};
        border: 1px solid ${palette.inputs.border};
        border-radius: 2px;
        color: ${palette.inputs.color};
        font-size: 1.2rem;
        height: 30px;
        outline: none;
        padding: 0 8px;
        width: 100%;
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
`

export function TextInput({ type, text, setText, width, placeholder }){
    return(
        <Styled $width={width || '100%'}>
            <input
                type={type ? type : 'text'}
                value={text}
                onChange={setText}
                placeholder={placeholder ? placeholder : '...'}
            />
        </Styled>
    );
}