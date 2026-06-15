'use client'

import { styled } from 'styled-components'

export const TabList = styled.ul`
    display : flex;
    background-color : #2d3243;
    li {
        button {
            position : relative;
            width : 150px;
            height : 50px;
            line-height : 50px; 

            &.active {
                &:after {
                    content : "";
                    position : absolute;
                    bottom : 0;
                    left : 50%;
                    transform : translateX(-50%);
                    display: block;
                    width : 90%;
                    height : 5px;
                    background-color : #7e4ed5;
                    border-radius : 10px
                }
            }
        }
    }
`