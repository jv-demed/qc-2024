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
    padding: 50px 100px 0 100px;
    @media(max-width: ${screens.mobile.px}){
        height: auto;
        padding: 60px 2% 20px 2%;
    }
`