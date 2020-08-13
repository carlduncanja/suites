import React, {Component, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FrameItem from '../FrameItems/FrameItem';
import InputFrameItem from '../FrameItems/InputFrameItem'; 
import RemoveIcon from '../../../../../assets/svg/remove2';
import AddIcon from '../../../../../assets/svg/addNewIcon';
import SearchableOptionsField from '../../Input Fields/SearchableOptionsField';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import TextArea from '../../Input Fields/TextArea';

import { PageContext } from '../../../../contexts/PageContext';

const FrameContentListWrapper = styled.View`
    width : 100%;
`;
const FrameContentListContainer = styled.View`
    width : 100%;
    border-width : 1px;
    background-color: ${ ({theme}) => theme.colors['--color-gray-100']};
    border-color : ${ ({theme}) => theme.colors['--color-gray-400']};
    border-top-width : 0px;
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    padding-top: ${ ({theme}) => theme.space['--space-16']};
    padding-bottom : ${ ({theme}) => theme.space['--space-4']};
    padding-left: ${ ({theme}) => theme.space['--space-16']};
    padding-right: ${ ({theme}) => theme.space['--space-16']};
`;

const InputFrameWrapper = styled.View`
    height : 40px;
    margin-bottom : ${ ({theme}) => theme.space['--space-14']}
`;
const InputFrameContinaer = styled.View`
    height : 100%;
    width : 100%;
`;

function FrameNoteContent (props) { 
    const {
        cardInformation, 
        handleUpdate = () =>{},
        onClear = () =>{},
        handleEdit = () =>{},
        handleAddNew = () => {}, 
        isAddNew = false
    } = props

    const [value, setValue] = useState("");
    const theme = useTheme();

    const { pageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    return (
        <FrameContentListWrapper>
            <FrameContentListContainer theme = {theme}>
                
                {
                    !isEditMode ?
                    <FrameItem itemContent = {cardInformation === "" ? 'None' : cardInformation}/>
                    :
                    <InputFrameWrapper theme = {theme}>
                        <InputFrameContinaer>
                            <TextArea
                                onChangeText={handleUpdate}
                                value={cardInformation}
                                placeholder={ cardInformation === "" ? "Add new note" : null}
                                multiline = {true}
                                numberOfLines = {2}
                                onClear = {()=>handleUpdate('')}
                            />
                        </InputFrameContinaer>
                    </InputFrameWrapper>
                }
                
                
            </FrameContentListContainer>
        </FrameContentListWrapper>
    )
}
export default FrameNoteContent

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    itemContainer:{
        paddingBottom:12,
    }
    
})