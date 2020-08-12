import React from "react";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Row({children, zIndex = 1}){

    const theme = useTheme();

    const RowWrapper = styled.View`
        margin-bottom: ${theme.space['--space-20']};
        width: 100%;
        position: relative;
        z-index : ${zIndex.toString()};
    `;
    const RowContainer = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    return(
        <RowWrapper>
            <RowContainer>
                {children}
            </RowContainer>
        </RowWrapper>
    )   
}

export default Row