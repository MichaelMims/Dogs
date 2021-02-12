import react from 'react'
import styled, { keyframes } from 'styled-components'
import {LoadingProp} from '../../utils/utils'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `
    const Message = styled.p`
    font-family: 'Josefin Slab', serif;
    `

    const spin = keyframes`
    100% { transform: rotate(1turn); }
    `

    const LoadingAnimation = styled.div`
    display: inline-block;
    width: 5rem;
    height: 5rem;
    vertical-align: text-bottom;
    border: .25em solid;
    border-right: .25em solid transparent;
    border-radius: 50%;
    animation: ${spin} .75s linear infinite;
    `

export default function Loading({message} : LoadingProp) {
    return (
        <Container>
            <Message>{message}</Message>
            <LoadingAnimation>
            </LoadingAnimation>
        </Container>
    )
}