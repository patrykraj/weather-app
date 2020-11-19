import styled from 'styled-components'

const Container = styled.div`
    background: ${props => props.night ? '#243b55' : 'linear-gradient(-40deg, #56ccf2, #2f80ed)'};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    padding: 2rem 0;
    text-align: center;
    transition: 1s all;

    span {
        margin: 0 5px;
    }
`

export default Container;

// 'linear-gradient(140deg, #141e30, #243b55)'