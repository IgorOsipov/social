import React from 'react';
import loading from '../../../Img/loading.svg';
import styled from 'styled-components';

const PreloaderStyled = styled.img`
    position: absolute;
    z-index: 10;
    left: calc(55vw - 200px);
    top: calc(55vh - 200px);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
`

const PreloaderImage = () => {
    return(
        <PreloaderStyled  width='200' height='200' alt="Loading..." src={loading} />
    )
    
}

export default PreloaderImage