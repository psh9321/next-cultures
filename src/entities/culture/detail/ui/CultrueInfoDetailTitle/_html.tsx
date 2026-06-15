'use client'

import { styled } from 'styled-components'

export const TitleBox = styled.div`
    margin-bottom : 20px;
    padding : 0 20px;

`

export const Title = styled.p`
    width : 450px;
    line-height : 1.5;
    color : #fff;
    font-size : 1.8rem;
    font-weight : 700;
    word-break : keep-all;

    @media all and (max-width : 870px) {
        width : 100%;    
        font-size : 1.4rem;
    }

    @media all and (max-width : 499px) {
        font-size : 1rem;
    }
`

export const StatusTxt = styled.p`
    display : inline-block;
    margin-bottom : 10px;
    padding : 8px 12px;
    font-weight : 700;
    border-radius : 10px;
`