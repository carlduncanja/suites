import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

const FrameTitleWrapper = styled.View`
        width: 100%;
        height: 41px;
    `;

const FrameTitleContainer = styled.View`
        width: 100%;
        height: 100%;
        background-color : ${({backgroundColor}) => backgroundColor};
        padding-left : ${({theme}) => theme.space['--space-16']};
        justify-content : space-between;
        align-items: center;
        flex-direction : row;
        border-top-left-radius : 8px;
        border-top-right-radius : 8px;
        border-width: 1px;
        border-color : ${({borderColor}) => borderColor};
    `;

const ActionContainer = styled.View`
   //flex: 1
   margin-right: 8;
`

const TitleContainer = styled.View`
   flex: 1;
   flex-direction : row;
   justify-content : flex-start;
`

const TitleText = styled.Text(({theme, color}) => ({
    ...theme.font['--text-base-medium'],
    color: color,
    marginLeft: 8,
}));

function FrameTitle(props) {
    const {
        backgroundColor,
        borderColor,
        color,
        frameTitle = "",
        icon,
        ActionComponent,
    } = props

    const theme = useTheme();
    const FrameIcon = icon


    return (
        <FrameTitleWrapper theme={theme}>
            <FrameTitleContainer theme={theme} backgroundColor={backgroundColor} borderColor={borderColor}>

                <TitleContainer>
                    <FrameIcon fillColor={color}/>
                    <TitleText theme={theme} color={color}>{frameTitle}</TitleText>
                    
                </TitleContainer>


                <ActionContainer>
                    {
                        ActionComponent
                    }
                </ActionContainer>

            </FrameTitleContainer>
        </FrameTitleWrapper>
    )
}

export default FrameTitle

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    text: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500'
    }
})
