import styled from 'styled-components';
import { icons } from '@/assets/icons';
import { palette } from '@/assets/palette';

const Styled = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: auto;
    width: 100%;
    .icon{
        animation: rotate 0.4s linear infinite;
        color: ${props => props.$color};
        font-size: ${props => props.$width};
    }
    @media(max-width: 650px){
        height: 50px;
        .icon{
            font-size: 2rem;
        }
    }
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }100%{
            transform: rotate(360deg);
        }
    }
`;

export function Loading({ color, width }){
    return(
        <Styled 
            $color={color ? color : palette.elements.loading}
            $width={width ? width : '1.2rem'}
        >
            <icons.loading className='icon' />
        </Styled>
    )
}