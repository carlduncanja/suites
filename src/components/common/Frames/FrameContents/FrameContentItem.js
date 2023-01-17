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
import InputField2 from '../../../common/Input Fields/InputField2'
import { PageContext } from '../../../../contexts/PageContext';

const FrameContentListWrapper = styled.View`
    width : 100%;
`;
const FrameContentListContainer = styled.View`
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

function FrameContentItem(props) {
    const {
        itemContent,
        index,
        handleEdit = () => { },
        handleAddNew = () => { },
        onDelete,
        isAddNew = false,
        isEditMode = false,
        idArray,
        normalInput,
        physicianSelection = true,
        onAction = () => { },
        onEdit = () => { },
        toggleAddOption
    } = props

    const [value, setValue] = useState("");
    const theme = useTheme();

    const { pageState } = useContext(PageContext);
    const [addMode, setAddMode] = useState(false)
    const [editPress, setEditPress] = useState(false)

    const toogleAddOption = (value) => {
        setAddMode(value)
    }

    const editSateToggle = (value) => {
        setEditPress(value)
    }

    return (
        itemContent === '' ?
            <InputFrameItem
                onChangeText={(value) => { handleAddNew(value)(index); setValue(value) }}
                value={value}
                onClear={() => handleEdit('remove')(index)}
                placeholder="Add new item"
            />
            :

            editPress && isEditMode === true ?
                <FrameEditItem itemContent={{ 'name': itemContent }}
                    title="Edit Item"
                    deleteMode={true}
                    onDelete={() => {
                        onDelete(idArray[index])
                    }}
                    onCancel={() => {
                        editSateToggle(false)
                    }}
                    onEdit={onEdit}
                    onAction={(name) => {
                        onAction(name, index, physicianSelection)
                    }}
                    buttonTitle="Save"
                    normalInput={normalInput}
                    id={idArray[index]}
                    physicianSelection={physicianSelection}
                    setEditPress={setEditPress}
                />

                :
                <FrameItem
                    itemContent={itemContent}
                    icon={isEditMode ? <RemoveIcon /> : null}
                    onPressButton={() => {
                        handleEdit()
                        editSateToggle(true)
                        toogleAddOption(false)
                        //isInEditMode=true

                    }}
                    isEditMode={isEditMode}
                />         
    )
}
export default FrameContentItem

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
