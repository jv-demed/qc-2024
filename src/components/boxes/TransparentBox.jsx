import styled from 'styled-components';
import { palette } from '@/assets/palette';

const Styled = styled.div`
    background-color: ${palette.transparentBox.bg};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
`

export function TransparentBox({ children }){
    return(
        <Styled>
            {children}
        </Styled>
    )
}