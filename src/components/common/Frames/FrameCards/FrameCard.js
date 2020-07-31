import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameContentList from '../FrameContents/FrameContentList';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

/**
 * @param frameColor string
 * @param frameBorderColor string
 * @param titleBackgroundColor string
 * @param icon component
 * @param frameTitle string
 * @param cardInformation object or array
 * @param isEditMode  boolean
 * @param handleEdit function
 * @param isAddNew boolean
 * @returns {*}
 * @constructor
 */

function FrameCard(props){
    const {
        frameColor,
        frameBorderColor,
        titleBackgroundColor,
        icon,
        frameTitle,
        cardInformation,
        isEditMode = false,
        handleEdit = ()=>{},
        isAddNew = true,
        handleAddNew = () =>{}
    } = props

    const theme = useTheme();

    const FrameCardWrapper = styled.View`
        width: 100%;
        margin-bottom : ${theme.space['--space-24']};
    `;
    const FrameCardContainer = styled.View`
        width: 100%;
    `;

    return (
        <FrameCardWrapper>
            <FrameCardContainer>
                <FrameTitle
                    color={frameColor}
                    borderColor = {frameBorderColor}
                    backgroundColor={titleBackgroundColor}
                    icon={icon}
                    frameTitle={frameTitle}
                />
               
                <FrameContentList
                    cardInformation={cardInformation}
                    isEditMode = {isEditMode}
                    handleEdit = {handleEdit}
                    handleAddNew = {handleAddNew}
                    isAddNew = {isAddNew}
                />
             
            </FrameCardContainer>
        </FrameCardWrapper>
    )
}
export default FrameCard 

