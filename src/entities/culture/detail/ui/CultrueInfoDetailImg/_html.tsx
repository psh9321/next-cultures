'use client'

import { styled } from 'styled-components'

export const ImgBox = styled.div`
    flex-shrink: 0;
    position : relative;
    display : block;
    width : 350px;
    height : 450px;
    border-radius : 10px;
    overflow : hidden;

    @media all and (max-width: 870px) {
        width : 100%;    
        height : 100vw;
        margin :0 auto 40px;
        
    }

`
