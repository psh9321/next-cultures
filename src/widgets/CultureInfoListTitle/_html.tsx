'use client'

import { styled } from 'styled-components'

export const TitleBox = styled.section`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    width : 1000px;
    margin : 120px auto 30px;

    @media all and (max-width : 1050px) {
        width : 100%;
        padding : 20px;
    }

    @media all and (max-width : 499px) {
        margin-bottom : 15px;
    }
`

export const UtilBox = styled.div`
    display : flex;
    flex-direction : column;
    gap : 20px;
    margin : 20px 0;

    @media all and (max-width : 499px) {
        flex-direction : row;
        justify-content:space-around;
        align-items : flex-start;
        gap : 0;
    }
`