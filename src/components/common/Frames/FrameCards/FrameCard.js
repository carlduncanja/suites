import React, {Component, useContext} from 'react';
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

const FrameCardWrapper = styled.View`
    width: 100%;
    margin-bottom : ${ ({theme}) => theme.space['--space-24']};
`;
const FrameCardContainer = styled.View`
    width: 100%;
`;

function FrameCard(props){
    const {
        frameColor,
        frameBorderColor,
        titleBackgroundColor,
        icon,
        idArray,
        frameTitle,
        cardInformation,
        isEditMode = false,
        handleEdit = ()=>{},
        isAddNew = true,
        handleAddNew = () =>{},
        onDelete =()=>{}
    } = props

    const theme = useTheme();


    return (
        <FrameCardWrapper theme = {theme}>
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
                    onDelete={onDelete}
                    idArray={idArray}
                />


            </FrameCardContainer>
        </FrameCardWrapper>
    )
}
export default FrameCard

