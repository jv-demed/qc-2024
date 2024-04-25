import styled from 'styled-components';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';

export const Main = styled.main`
    align-items: center;
    background: ${palette.main.bg};
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
    padding: 20px 20%;
    @media(max-width: ${screens.mobile.px}){
        padding: 10px 2%;
    }
`