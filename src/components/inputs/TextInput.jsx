import { screens } from '@/assets/screens';
import styled from 'styled-components';

const Styled = styled.input`
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    height: 30px;
    outline: none;
    padding: 0 5px;
    width: 100%;
    @media(max-width: ${screens.mobile.px}){
        height: 50px;
    }
`

export function TextInput({ text, setText }){
    return(
        <Styled 
            value={text}
            onChange={setText}
            placeholder='Buscar...'
        />
    );
}