import styled from 'styled-components';
import { TextInput } from '../inputs/TextInput';

const Styled = styled.header`
    border: 1px solid red;
    width: 100%;
`

export function HeaderChampList({ }){
    return(
        <Styled> 
            <TextInput 
                text={'oi'}
            />
        </Styled>
    );
}