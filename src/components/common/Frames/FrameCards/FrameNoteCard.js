import React from 'react';
import FrameTitle from '../FrameTitle'
import styled  from '@emotion/native';
import { useTheme } from 'emotion-theming';
import FrameNoteContent from '../FrameContents/FrameNoteContent';

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

const FrameNoteCardWrapper = styled.View`
    width: 100%;
    margin-bottom : ${ ({theme}) => theme.space['--space-24']};
`;
const FrameNoteCardContainer = styled.View`
    width: 100%; 
`;

function FrameNoteCard(props){
    const {
        frameColor,
        frameBorderColor,
        titleBackgroundColor,
        icon,
        frameTitle,
        cardInformation,
        handleUpdate = ()=>{},
        onClear = ()=>{},
        isEditMode = false,
        handleEdit = ()=>{},
        isAddNew = true,
        handleAddNew = () =>{}
    } = props

    const theme = useTheme();


    return (
        <FrameNoteCardWrapper theme = {theme}>
            <FrameNoteCardContainer>
                <FrameTitle
                    color={frameColor}
                    borderColor = {frameBorderColor}
                    backgroundColor={titleBackgroundColor}
                    icon={icon}
                    frameTitle={frameTitle}
                />
                <FrameNoteContent
                    cardInformation = {cardInformation}
                    handleUpdate = {handleUpdate}

                />


            </FrameNoteCardContainer>
        </FrameNoteCardWrapper>
    )
}
export default FrameNoteCard

