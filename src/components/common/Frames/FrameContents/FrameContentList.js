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


    const toogleAddOption = (value) => {
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

                            const [editPress, setEditPress] = useState(false)

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
                                            buttonTitle="Save"
                                            normalInput={normalInput}
                                            id={idArray[index]}
                                            physicianSelection={physicianSelection}
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
                        })



                }
                {isEditMode ?

                    addMode ?
                        <FrameEditItem
                            title="New Item"
                            onCancel={() => {
                                toogleAddOption(false)
                            }}
                            onAction={onAction}
                            buttonTitle="Add"
                            normalInput={normalInput}
                            physicianSelection={physicianSelection}
                        />
                        :

                        <TouchableOpacity
                            onPress={() => {
                                toogleAddOption(true)
                            }}>
                            <FrameItem itemContent="Add New" icon={<AddIcon />} isEditMode={isEditMode} onPressButton={()=>{toogleAddOption(true)}}/>
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
