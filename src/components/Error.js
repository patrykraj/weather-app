import styled from 'styled-components'

function Error({ err }) {
    return (
        <ErrorElement>{err}</ErrorElement>
    )
}

export default Error

const ErrorElement = styled.p`
    color: #ec544c;
    font-size: 1.5rem;
`