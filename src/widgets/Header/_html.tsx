'use client'

import { styled } from 'styled-components'

export const HeaderWrapper = styled.header`
    position : fixed;
    top : 0;
    left : 0;
    display : block;
    width : 100%;
    height : 90px;
    margin : 0 auto;
    background:
    /* 상단 단색 영역 */
    linear-gradient(
        180deg,
        #040c1d 0px,
        #040c1d 100px,
        transparent 180px
    ),

    /* 붉은 빛 */
    radial-gradient(
        circle at 18% 82%,
        rgba(255, 60, 60, 0.25),
        transparent 35%
    ),

    /* 파란 빛 */
    radial-gradient(
        circle at 50% 20%,
        rgba(0, 90, 255, 0.22),
        transparent 40%
    ),

    /* 보라 빛 */
    radial-gradient(
        circle at 45% 45%,
        rgba(120, 0, 255, 0.12),
        transparent 45%
    ),

    /* 기본 배경 */
    linear-gradient(
        180deg,
        #040c1d 0%,
        #01050d 55%,
        #000000 100%
    );
    z-index : 9;
`

export const HeaderInner = styled.div`
    position :relative;
    display : flex;
    justify-content : space-between;
    align-items : center;
    max-width : 1250px;
    height : 100%;
    margin : 0 auto;
    padding : 0 40px;
    color : #fff;

    > svg {
        width : 24px;
    }

`

export const HeaderLogo = styled.h1`
    display : inline-block;
    line-height : 1.3;
    color : #7e4ed5;
    font-size : 1.3rem;
    font-family : logo;
    cursor : pointer;
`

export const HeaderBtnList = styled.ul`
    display : flex;
    gap : 15px;
    
    li {
        position : relative;
        > button {
            display : inline-block;

            >svg {
                width : 28px;
                height : 28px;
            }
            
        }
    }
`

export const HeaderSearchWrapper = styled.div`
    position : absolute;
    top : 50px;
    left : -410px;
    width : 450px;
    padding : 20px;
    background-color : #444444;
    border-radius : 10px;
    box-shadow : 5px 5px 5px rgba(0,0,0,0.8);
    z-index : 6;

    &:before {
        content : "";
        position : absolute;
        top : -15px;
        right : 10px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid #444;
    }

    @media all and (max-width :550px) {
        position : fixed;
        top : 80px;
        left : 50%;
        transform : translateX(-50%);
        width : calc(100% - 40px);
    }
`

export const UserBoxWrapper = styled.div`
    position : absolute;
    top : 55px;
    left : -230px;
    width : 270px;
    line-height : 1.4;
    padding : 20px;
    color : #b6b5b8;
    font-weight : 700;
    background-color : #444444;
    border-radius : 10px;
    box-shadow : 5px 5px 5px rgba(0,0,0,0.8);
    z-index : 6;

    &:before {
        content : "";
        position : absolute;
        top : -15px;
        right : 10px;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-bottom: 20px solid #444;
    }

    p {
        margin-bottom : 10px;
    }

    @media all and (max-width: 499px) {
        left : -130px;
        width : 170px;
    }
`

export const SideMenu = styled.aside`
    position : fixed;
    top : 90px;
    right : -100%;
    width : 220px;
    height : calc(100% - 90px);
    padding-left : 20px;
    background-color : #040C1D;
    transition : 0.25s ease;
    z-index : 6;

    &.on {
        right : 0;
    }

`

export const NaviContainer = styled.div`
    position : absolute;
    top : 50%;
    left : 50%;
    transform : translate(-50%, -50%);
    width : 500px;
`