import React from 'react';
import styled from 'styled-components';

function Loader() {
  return (
        <LoaderContainer>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <div className="loader-circle"></div>
            <p className="loader-caption">Loading...</p>
        </LoaderContainer>
  );
}

export default Loader;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 2rem 0;
  
  .loader-circle {
    position: absolute;
    border: 5px solid white;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    animation: grow 2s linear infinite;
    opacity: 0;
  }
  
  .loader-circle:nth-child(1) {
    animation-delay: 660ms;
  }
  
  .loader-circle:nth-child(2) {
    animation-delay: 1320ms;
  }
  
  .loader-caption {
    position: absolute;
    top: 70px;
    left: -10px;
    font-size: 25px;
  }
  
  @keyframes grow {
    0% {
      transform: scale(0);
      opacity: 1;
    }
  
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
