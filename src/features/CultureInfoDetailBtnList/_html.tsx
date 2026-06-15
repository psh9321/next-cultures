'use client'

import { styled } from 'styled-components'

export const BtnList = styled.ul`
    position : absolute;
    top : 20px;
    right : 20px;
    display : flex;
    gap : 10px;

    @media all and (max-width : 870px) {
        position :sticky;
        top : 0;
        right : 0;
        width : 100%;
        justify-content :flex-end;
        padding : 20px 0;
        background-color : #141825;
        z-index : 4;
    }
`