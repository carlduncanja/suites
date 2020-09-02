import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const ButtonWrapper = styled.TouchableOpacity`
        min-height: 16px;
        min-width: 97px;
        align-items: center;
        justify-content: center;
`;

const ButtonContainer = styled.View`
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
`;

const ButtonTitle = styled.Text(({theme, font, color}) => ({
    ...theme.font[font],
    color: color ? color : theme.colors['--accent-button']
}))


const TextButton = ({buttonPress, color, title, font = '--text-base-medium'}) => {
    const theme = useTheme();

    return (
        <ButtonWrapper theme={theme} onPress={buttonPress}>
            <ButtonContainer theme={theme}>
                <ButtonTitle theme={theme} font={font} color={color}>{title}</ButtonTitle>
            </ButtonContainer>
        </ButtonWrapper>
    )
}

export default TextButton

const styles = StyleSheet.create({
    button: {
        //backgroundColor:'#F7FAFC',
        //borderRadius:4,
        //borderWidth:1,
        // borderColor:'#CBD5E0',
        alignItems: 'center',
        justifyContent: 'center',
        //padding:10,
        alignSelf: 'center',
        //padding:5,
        //width:91,
        //height:24,

    },
    buttonText: {
        //color: '#4A5568',
    },
})
