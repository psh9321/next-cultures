'use client'

import { styled } from 'styled-components'

export const Wrapper = styled.div`
    position : relative;
    display : flex;
    padding : 20px;
    background-color : #141825;
    border-radius : 10px;

    @media all and (max-width : 870px) {
        display : block;
        height : 550px;
        padding-top:0;
        overflow-y : auto;

        &::-webkit-scrollbar { 
            display: none;
        }
    }

    @media all and (max-width : 570px) {
        width : calc(100% - 40px);
        margin : 0 auto;
    }

`

export const ContentsBox = styled.main`
    width : 600px;
    max-height : 500px;
    overflow-y : auto;

    &::-webkit-scrollbar { 
        display: none;
    }

    @media all and (max-width : 1020px) {
        width : 450px;
    }

    @media all and (max-width : 570px) {
        width : 100%;
    }
`

export const TabContents = styled.section`
    margin-top : 20px;
    padding : 20px;
`