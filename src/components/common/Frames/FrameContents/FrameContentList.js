import React, { Component, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FrameItem from '../FrameItems/FrameItem';
import FrameEditItem from '../FrameItems/FrameEditItem';
import InputFrameItem from '../FrameItems/InputFrameItem';
import RemoveIcon from '../../../../../assets/svg/editIcon';
//import addIcon from '../../../../../assets/svg/addIcon.js';
import AddIcon from '../../../../../assets/svg/addNewIcon';
import SearchableOptionsField from '../../Input Fields/SearchableOptionsField';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import InputField2 from '../../../common/Input Fields/InputField2';
import { PageContext } from '../../../../contexts/PageContext';
import FrameContentItem from './FrameContentItem';

export const FrameContentListWrapper = styled.View`
    width : 100%;
`;
export const FrameContentListContainer = styled.View`
    width : 100%;
    border-width : 1px;
    background-color: ${({ theme }) => theme.colors['--color-gray-100']};
    border-color : ${({ theme }) => theme.colors['--color-gray-400']};
    border-top-width : 0px;
    border-bottom-left-radius : 8px;
    border-bottom-right-radius : 8px;
    padding-top: ${({ theme }) => theme.space['--space-16']};
    padding-bottom : ${({ theme }) => theme.space['--space-4']};
    padding-left: ${({ theme }) => theme.space['--space-16']};
    padding-right: ${({ theme }) => theme.space['--space-16']};
`;

function FrameContentList(props) {
    const {
        cardInformation,
        handleEdit = () => { },
        handleAddNew = () => { },
        onDelete,
        isAddNew = false,
        isEditMode = false,
        idArray,
        normalInput,
        physicianSelection = true,
        onAction = () => { },
        onEdit = () => { }
    } = props

    const [value, setValue] = useState("");
    const theme = useTheme();

    const { pageState } = useContext(PageContext);
    const [addMode, setAddMode] = useState(false)


    const toggleAddOption = (value) => {
        setAddMode(value)
    }

    return (
        <FrameContentListWrapper>
            <FrameContentListContainer theme={theme}>
                {
                    cardInformation.length === 0 ?

                        // isEditMode ?
                        //     <InputFrameItem
                        //         onChangeText = {()=>{}}
                        //         value = {value}
                        //         onClear = {()=>{}}
                        //         placeholder = "Add new item"
                        //     /> 
                        //     :
                        addMode ?
                            null
                            :
                            <FrameItem itemContent="None" />

                        :
                        cardInformation.map((itemContent, index) => {
                            return (
                               <FrameContentItem
                                itemContent = {itemContent}
                                index = {index}
                                isEditMode = {isEditMode}
                                handleEdit = {handleEdit}
                                handleAddNew = {handleAddNew}
                                isAddNew = {isAddNew}
                                onDelete={onDelete}
                                idArray={idArray}
                                onAction={onAction}
                                onEdit={onEdit}
                                physicianSelection={physicianSelection}
                                normalInput={normalInput} 
                                toggleAddOption={toggleAddOption}
                               />
                            )
                        })



                }
                {isEditMode ?

                    addMode ?
                        <FrameEditItem
                            title="New Item"
                            onCancel={() => {
                                toggleAddOption(false)
                            }}
                            onAction={onAction}
                            buttonTitle="Add"
                            normalInput={normalInput}
                            physicianSelection={physicianSelection}
                            toggleAddOption={toggleAddOption}
                        />
                        :

                        <TouchableOpacity
                            onPress={() => {
                                toggleAddOption(true)
                            }}>
                            <FrameItem itemContent="Add New" icon={<AddIcon />} isEditMode={isEditMode} onPressButton={() => { toggleAddOption(true) }} />
                        </TouchableOpacity>
                    :
                    <View>

                    </View>
                }


            </FrameContentListContainer>
        </FrameContentListWrapper>
    )
}
export default FrameContentList

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#CCD6E0',
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    itemContainer: {
        paddingBottom: 12,
    }

})
