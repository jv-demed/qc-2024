import styled from 'styled-components';

const Styled = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`

export function Form({ children }){
    return(
        <Styled onSubmit={e => {
            e.preventDefault();
        }}>
            {children}
        </Styled>
    )
}