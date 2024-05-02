import styled from 'styled-components';
import { useState } from 'react';
import { screens } from '@/assets/screens';
import { palette } from '@/assets/palette';
import { Loading } from '../elements/Loading';

const Styled = styled.button`
    align-items: center;
    background-color: ${palette.actionButton.bg};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    font-size: 1rem;
    height: 30px;
    justify-content: center;
    padding: 0 10px;
    width: ${props => props.$width};
    .txt{
        align-items: center;
        color: ${palette.actionButton.color};
        display: flex;
        gap: 10px;
    }
    @media(max-width: ${screens.mobile.px}){
        height: 45px;
        width: 100%;
    }
`

export function ActionButton({ name, type, icon, width, action, setFlag }){
    
    const [isLoading, setIsLoading] = useState(false);

    return(
        <Styled 
            $width={width ? width : 'auto'}
            type={type ? type : 'button'}
            onClick={async () => {
                setIsLoading(true);
                action && await action();
                setFlag && setFlag();
                setIsLoading(false);
            }}
        >
            {!isLoading && <div className='txt'>
                <span>{name}</span>
                {icon && <icon.component />}
            </div>}
            {isLoading && <Loading />}
        </Styled>
    )
}