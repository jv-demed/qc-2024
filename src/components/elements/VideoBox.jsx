import styled from 'styled-components';

const Styled = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    position: fixed; top: 0; left: 0;
    width: 100%;
    z-index: 1000;
    .container{
        height: 70%;
        max-height: 600px;
        max-width: 800px;
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 70%;
        iframe{
            width: 100%;
            height: 100%;
        }
    }
`;

export function VideoBox({ urlVideo }){
    return(
        <Styled>
            <div className='container'>
                <iframe
                    width='560'
                    height='315'
                    src={urlVideo}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                />
            </div>
        </Styled>
    );
};