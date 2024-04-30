import { screens } from '@/assets/screens';
import styled from 'styled-components';

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 85vh;
    list-style: none;
    overflow: auto;
    padding-right: 8px;
    width: 100%;
    @media(max-width: ${screens.mobile.px}){
        gap: 5px
    }
`