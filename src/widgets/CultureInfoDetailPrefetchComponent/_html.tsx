'use client'

import { styled } from 'styled-components'

export const BackgroundLayer = styled.div`
    position : fixed;
    top : 0;
    left : 0;
    display : flex;
    justify-content : center;
    align-items : center;
    width : 100dvw;
    height : 100vh;
    height : 100svh;
    z-index : 999;
    background-color : rgba(0,0,0,0.7);
`