import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FrameItem from '../FrameItems/FrameItem';
import InputFrameItem from '../FrameItems/InputFrameItem'; 
import RemoveIcon from '../../../../../assets/svg/remove2';
import AddIcon from '../../../../../assets/svg/addNewIcon';
import SearchableOptionsField from '../../Input Fields/SearchableOptionsField';
import IconButton from '../../Buttons/IconButton';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

function FrameContentList (props) {
    const {
        cardInformation, 
        isEditMode = false,
        handleEdit = () =>{},
        handleAddNew = () => {},
        isAddNew = false
    } = props

    const [value, setValue] = useState("");
    const theme = useTheme();

    const FrameContentListWrapper = styled.View`
        width : 100%;

    `;
    const FrameContentListContainer = styled.View`
        width : 100%;
        border-width : 1px;
        background-color: ${theme.colors['--color-gray-100']};
        border-color : ${theme.colors['--color-gray-400']};
        border-top-width : 0px;
        border-bottom-left-radius : 8px;
        border-bottom-right-radius : 8px;
        padding-top: ${theme.space['--space-16']};
        padding-bottom : ${theme.space['--space-4']};
        padding-left: ${theme.space['--space-16']};
        padding-right: ${theme.space['--space-16']};
    `;

    const testCardInformation = [
        "hELLO",
        "Its",
        ""
    ]
    return (
        <FrameContentListWrapper>
            <FrameContentListContainer>
                {
                    cardInformation.length === 0 ?
                        <FrameItem itemContent = "None"/>
                        :
                        cardInformation.map((itemContent,index)=>{
                            return(
                                itemContent === '' ?
                                    <InputFrameItem
                                        onChangeText = {(value)=>{handleAddNew(value)(index); setValue(value)}}
                                        value = {value}
                                        onClear = {()=>handleEdit('remove')(index)}
                                        placeholder = "Add new item"
                                    />
                                    :
                                    <FrameItem 
                                        itemContent = {itemContent}
                                        icon = {isEditMode ? <RemoveIcon/> : null}
                                        onPressButton = {()=>handleEdit('remove')(index)}
                                        isEditMode = {isEditMode}
                                    />
                            )
                        })
                    
                }
                {/* {
                    isEditMode && <TouchableOpacity onPress = {handleEdit} style={styles.itemContainer}>
                        <FrameItem 
                            isEditMode = {isEditMode}
                            itemContent = "Add New"
                            icon = {<AddIcon/>}
                            backgroundColor = "#F8FAFB"
                            onPressButton = {()=>handleEdit('add')(-1)}
                        />
                    </TouchableOpacity>
                }  */}
            </FrameContentListContainer>
            {/* {
                cardInformation.length === 0 ?
                    <View style={styles.itemContainer}>
                        <FrameItem itemContent = "None"/>
                    </View>
                    :
                    cardInformation.map((itemContent,index)=>{
                        return(
                            <View key={index} style={styles.itemContainer}>
                                {itemContent === '' ?
                                    <InputFrameItem
                                        onChangeText = {(value)=>{handleAddNew(value)(index); setValue(value)}}
                                        value = {value}
                                        onClear = {()=>handleEdit('remove')(index)}
                                        placeholder = "Add new item"
                                    />
                                    :
                                    <FrameItem 
                                        itemContent = {itemContent}
                                        icon = {isEditMode ? <RemoveIcon/> : null}
                                        onPressButton = {()=>handleEdit('remove')(index)}
                                        isEditMode = {isEditMode}
                                    />
                                }
                            </View>
                        )
                    })
                
            }
            {
                isEditMode && <TouchableOpacity onPress = {handleEdit} style={styles.itemContainer}>
                    <FrameItem 
                        isEditMode = {isEditMode}
                        itemContent = "Add New"
                        icon = {<AddIcon/>}
                        backgroundColor = "#F8FAFB"
                        onPressButton = {()=>handleEdit('add')(-1)}
                    />
                </TouchableOpacity>
            } */}
        </FrameContentListWrapper>
    )
}
export default  FrameContentList

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