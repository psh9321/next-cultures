'use client'

import { styled } from 'styled-components'

export const AreaListWrapper = styled.article`
    position : relative;
    width : 100px;
    @media all and (max-width : 499px) {
        width : 100%;
    }
`

export const BtnArea = styled.button`
    display : inline-flex;
    justify-content: center;
    align-items : center;
    width : 100px;
    height : 40px;
    text-align : center;
    background-color : #242425;
    border-radius : 10px;

`

export const AreaList = styled.ul`
    position : absolute;
    top : 0;
    left : 110px;
    display : flex;
    flex-wrap : wrap;
    width : 302px;
    background-color : #242425;
    border : 1px solid #343E4D;
    border-top : none;
    border-right : none;
    border-radius : 10px;
    overflow : hidden;
    box-shadow : 5px 5px 5px rgba(0,0,0,0.8);
    z-index : 6;
    
    li {
        button {
            display : inline-flex;
            justify-content: center;
            align-items : center;
            width : 100px;
            height : 40px;
            text-align : center;
            border-top : 1px solid;  
            border-right : 1px solid;   
            border-color : #343E4D;

            &:hover {
                background-color : #343E4D;
            }
            
            &.active {
                pointer-events: none;
                
                &:hover {
                    background-color: #7e4ed5;
                }

                color : #fff;
                background-color: #7e4ed5;
                border-color: #7e4ed5;
            }
        }
    }

    @media all and (max-width : 1700px) {
        top : 50px;
        left : -200px;
    }

    @media all and (max-width : 750px) {
        left : 0;
    }


    @media all and (max-width : 499px) {
        left : 0px;
        width : 100%;
        li {
            width :33.33%;

            button {
                width : 100%;
            }
        }
    }
`