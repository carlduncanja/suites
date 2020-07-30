import React from 'react';
import { StatusBar } from 'react-native';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function Statusbar({backgroundColor = '--color-black'}){
    const theme = useTheme();

    const StatusbarWrapper = styled.View`
        width: 100%;
        margin : 0;
        height : ${theme.space['--space-20']}
    `;

    const StatusbarContainer = styled.View`
        height: 100%;
        width: 100%;
        justify-content: center;
        background-color: ${theme.colors[backgroundColor]}
    `;
    return(
        <StatusbarWrapper>
            <StatusbarContainer>
                <StatusBar backgroundColor={theme.colors[backgroundColor]} barStyle={'light-content'} />
            </StatusbarContainer>
        </StatusbarWrapper>
    )

}
export default Statusbar