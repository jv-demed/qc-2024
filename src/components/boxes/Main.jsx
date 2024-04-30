import styled from 'styled-components';
import { palette } from '@/assets/palette';
import { screens } from '@/assets/screens';

export const Main = styled.main`
    align-items: center;
    background: ${palette.main.bg};
    color: ${palette.main.color};
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 100vh;
    padding: 20px 100px;
    @media(max-width: ${screens.mobile.px}){
        height: auto;
        padding: 10px 2%;
    }
`