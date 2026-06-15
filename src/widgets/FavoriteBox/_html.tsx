'use client'

import { styled } from 'styled-components'

export const Wrapper = styled.section`
    width : 1200px;
    margin : 120px auto 20px;

    @media all and (max-width : 1250px) {
        width : 100%;
        padding : 0 20px;
    }

    @media all and (max-width : 750px) {
        width : 500px;
    }

    @media all and (max-width : 520px) {
        width : 100%;
    }
`