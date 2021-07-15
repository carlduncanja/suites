import React, {useEffect, useRef, useState} from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function SectionListHeader({title = ""}){
    const theme = useTheme();

    const SectionListHeaderWrapper = styled.View`
        margin : 0px;
    `;
    
    const SectionListHeaderContainer = styled.View`
        height : 50px;
        width: 100%;
        margin-bottom: 10px;
        paddingBottom: 5px;
        paddingTop: 24px;
        background-color:#FFFFFF;
        border-bottom-color: #718096;
        border-bottom-width: 1px;
    `;

    const SectionListHeaderTitle = styled.Text({
        ...theme.font['--text-sm-bold'],
        color: theme.colors['--color-gray-700']
    });

    return (
        <SectionListHeaderWrapper>
            <SectionListHeaderContainer>
                <SectionListHeaderTitle>{title}</SectionListHeaderTitle>
            </SectionListHeaderContainer>
        </SectionListHeaderWrapper>

    )
}

export default SectionListHeader