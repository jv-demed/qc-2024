import styled from 'styled-components';
import { palette } from '@/assets/palette';

const Styled = styled.div`
    background-color: ${palette.transparentBox.bg};
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;
    padding: 20px;
    width: ${props => props.$width};
`

export function TransparentBox({ children, width }){
    return(
        <Styled $width={width || 'auto'}>
            {children}
        </Styled>
    )
}