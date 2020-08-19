import React from "react";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const RowWrapper = styled.View`
        margin-bottom: ${({theme}) => theme.space['--space-32']};
        width: 100%;
        position: relative;
        z-index : ${ ({zIndex}) => zIndex.toString()};
    `; 
    const RowContainer = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

function Row({children, zIndex = 1}){

    const theme = useTheme();

    return(
        <RowWrapper theme = {theme} zIndex = {zIndex}>
            <RowContainer>
                {children}
            </RowContainer>
        </RowWrapper>
    )   
}

export default Row