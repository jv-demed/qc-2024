import styled from 'styled-components';
import { screens } from '@/assets/screens';

const Styled = styled.section`
    border: 1px solid red;
    width: 100%;
    @media(max-width: ${screens.mobile.px}){
        
    }
`

export function Calendar({ infos }){
    return(
        <Styled>
            oi
        </Styled>
    );
}