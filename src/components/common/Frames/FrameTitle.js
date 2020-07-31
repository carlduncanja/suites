import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SvgIcon from '../../../../assets/SvgIcon';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function FrameTitle(props){ 
    const {
        backgroundColor,
        borderColor,
        color,
        frameTitle = "",
        icon
    } = props

    const FrameIcon = icon
    const theme = useTheme();

    const FrameTitleWrapper = styled.View`
        width: 100%;
        height: 41px;
    `;

    const FrameTitleContainer = styled.View`
        width: 100%;
        height: 100%;
        background-color : ${backgroundColor};
        padding-left : ${theme.space['--space-16']};
        justify-content : flex-start;
        align-items: center;
        flex-direction : row;
        border-top-left-radius : 8px;
        border-top-right-radius : 8px;
        border-width: 1px;
        border-color : ${borderColor};
    `;

    const TitleText = styled.Text({
        ...theme.font['--text-base-medium'],
        color : color,
        marginLeft : 8,
    });
    
    return (
        <FrameTitleWrapper>
            <FrameTitleContainer>
                <FrameIcon fillColor = {color}/>
                <TitleText>{frameTitle}</TitleText>
            </FrameTitleContainer>
        </FrameTitleWrapper>
    )
}

export default FrameTitle

const styles = StyleSheet.create({
    container:{
        padding:16,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"flex-start",
        borderWidth:1,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
    text:{
        fontSize:16,
        marginLeft:8,
        fontWeight:'500'
    }
})
