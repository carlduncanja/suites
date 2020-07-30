import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

function MultipleTextDataItem({
        primaryText = "", 
        secondaryText = "", 
        flex = 1, 
        align = 'flex-start', 
        primaryFontStyle = '--text-xs-regular', 
        primaryColor = '--color-gray-600', 
        secondaryFontStyle = '--text-base-medium', 
        secondaryColor = '--color-blue-600', 
    }){
    const theme = useTheme();

    const MultipleDataItemWrapper = styled.View`
        flex: ${flex.toString()};
        height: 100%;
    `;
    const MultipleDataItemContainer = styled.View`
        display: flex;
        height:100%;
        justify-content: center;
        align-items: ${align};
    `;

    const PrimaryDataText = styled.Text({
        ...theme.font[primaryFontStyle],
        color : theme.colors[primaryColor],
    });

    const SecondaryDataText = styled.Text({
        ...theme.font[secondaryFontStyle],
        color : theme.colors[secondaryColor],
    }); 

    return (
        <MultipleDataItemWrapper>
            <MultipleDataItemContainer>
                <PrimaryDataText>{primaryText}</PrimaryDataText>
                <SecondaryDataText>{secondaryText}</SecondaryDataText>
            </MultipleDataItemContainer>
        </MultipleDataItemWrapper>
    )
}

export default MultipleTextDataItem

