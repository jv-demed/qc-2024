import styled from 'styled-components';

const Styled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

const VideoContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    max-width: 800px;
    max-height: 600px;
    iframe {
        width: 100%;
        height: 100%;
    }
`;

export const VideoBox = ({ videoId }) => {
    console.log(videoId);
    return(
        <Styled>
            <VideoContainer>
                <iframe
                    title='YouTube Video'
                    width='560'
                    height='315'
                    src={videoId}
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                />
            </VideoContainer>
        </Styled>
    );
};