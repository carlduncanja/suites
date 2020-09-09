import React, {useState} from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from "emotion-theming";
import Button from '../Buttons/Button';

const FooterWrapper = styled.TouchableOpacity`
    display: flex;
    height: 48px;
    width: 100%;
`;

const FooterContainer = styled.View`
    height : 100%;
    width  : 100%;
    justify-content: center;
    align-items: center;
    background-color : ${({theme}) => theme.colors["--color-blue-500"]};
    border-radius : 8px;
`

const FooterText = styled.Text`
    font:${({theme}) => theme.font["--text-base-bold"]};
    color:${({theme}) => theme.colors["--default-shade-white"]};
`;


function CreatePageDoneFooter ({title = "DONE", onFooterPress = ()=>{}}){

    const theme = useTheme();

    return(
        <FooterWrapper theme={theme} onPress = {onFooterPress}>
            <FooterContainer theme={theme}>
                <FooterText theme={theme}>{title}</FooterText>
            </FooterContainer>
        </FooterWrapper>
    )
}

CreatePageDoneFooter.propTypes = {};
CreatePageDoneFooter.defaultProps = {};

export default CreatePageDoneFooter