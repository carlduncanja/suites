import React from 'react';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { Text } from 'react-native';

const DataItemWrapper = styled.TouchableOpacity` 
    flex: ${ ({flex}) => flex.toString()};
    height: 100%;
`;
const DataItemContainer = styled.View` 
    display: flex;
    height:100%; 
    justify-content: center;
    align-items: ${ ({align}) => align};
`;

const DataText = styled.Text(({theme, fontStyle, color}) => ({
    ...theme.font[fontStyle],
    color: theme.colors[color],
    paddingTop: 2,
}));

function TouchableDataItem({text = "", flex = 1, align = 'flex-start', fontStyle = '--text-sm-regular', color = '--color-blue-600', onPress = ()=>{}, isDisabled = false }) {
    const theme = useTheme();
    
    return (
        <DataItemWrapper flex={flex} theme={theme} onPress={onPress} disabled={isDisabled}>
            <DataItemContainer align={align}>
                <DataText numberOfLines={1} fontStyle={fontStyle} color={color} theme={theme}>{text}</DataText>
            </DataItemContainer>
        </DataItemWrapper>
    );
}

export default TouchableDataItem;
