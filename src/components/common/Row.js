import React from "react";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Row({children}){

    const theme = useTheme();

    const RowWrapper = styled.View`
        margin-bottom: ${theme.space['--space-20']};
        width: 100%;
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