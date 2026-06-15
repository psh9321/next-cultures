'use client'

import { styled } from 'styled-components'

export const InfoList = styled.ul`
    li {
        display : flex; 
        align-items : flex-start;
        gap : 10px;
        color : #b6b5b8;
        font-size : 1.1rem;

        &:nth-child(n+2) {
            margin-top : 15px;
        }   

        svg {
            flex-shrink : 0;
            width : 24px;
            height : 24px;
        }

        p {
            width : 100%;
            line-height : 1.4;
            word-break : keep-all;
        }

        &.price {
            margin-top : 25px;
            font-size : 1rem;
            &.free {
                display :inline-block;
                padding : 8px 12px;
                background-color : #444444;
                border-radius : 10px;
            }

        }

        @media all and (max-width :499px) {
            font-size : 0.8rem;
        }
    }
`