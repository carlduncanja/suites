import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

import RightArrow from '../../../../assets/svg/arrowRightIcon';

const DataItemWrapper = styled.View` 
    flex: ${ ({flex}) => flex.toString()};
    height: 100%;
    margin-right: ${ ({theme}) => theme.space['--space-4']};
`;
const DataItemContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: center;
    align-items: ${ ({align}) => align};
    flex-direction : row;
`;

const DataText = styled.Text( ({theme, fontStyle, color}) => ({
    ...theme.font[fontStyle],
    color : theme.colors[color], 
}))

const DataTextContainer = styled.View`
    min-width : 24px;
    min-height : 20px;
    background-color : ${ ({backgroundColor, theme}) => theme.colors[backgroundColor]};
    border : 1px solid ${ ({borderColor, theme}) => theme.colors[borderColor]};
    padding : ${ ({theme}) => `${theme.space['--space-2']} ${theme.space['--space-4']}`};
    border-radius : 4px;
    box-sizing : border-box;
    align-items:center;
`;

const ArrowContainer = styled.View`
    margin-right : 6;
    margin-left : 6;
`;



function ComparisonDataItem({
    prevText = "", 
    nextText = "",
    flex = 1, 
    align = 'flex-start', 
    fontStyle = '--text-base-regular', 
    color = '--color-gray-700', 

}){
    const theme = useTheme();
    
    return (
        <DataItemWrapper flex = {flex} theme={theme}>
            <DataItemContainer align = {align}>

                <DataTextContainer theme = {theme} backgroundColor = "--color-gray-100" borderColor = "--color-gray-400">
                    <DataText numberOfLines = {1} fontStyle = {fontStyle} color = {color} theme = {theme}>{prevText}</DataText>
                </DataTextContainer>

                <ArrowContainer>
                    <RightArrow strokeColor = {theme.colors['--color-black']}/>
                </ArrowContainer>
                

                <DataTextContainer theme = {theme} backgroundColor = "--color-green-100" borderColor = "--color-green-400">
                    <DataText numberOfLines = {1} fontStyle = {fontStyle} color = {color} theme = {theme}>{nextText}</DataText>
                </DataTextContainer>

            </DataItemContainer>
        </DataItemWrapper>
    )
}

export default ComparisonDataItem

