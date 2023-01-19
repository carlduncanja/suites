import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameItem from '../FrameItems/FrameItem';
import FrameEditFamily from '../FrameItems/FrameEditFamily';
import AddIcon from '../../../../../assets/svg/addIcon';
import IconButton from '../../Buttons/IconButton';
import RemoveIcon from '../../../../../assets/svg/removeIcon';
import EditIcon from '../../../../../assets/svg/editIcon';
import styled, { css } from '@emotion/native';
import { red100 } from 'react-native-paper/src/styles/colors';
const IconFrameAdjustment = styled.View`
    
    padding-bottom : ${({ theme }) => theme.space['--space-0']};

`;
const FrameTabularContent = (props) => {
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
        onEdit = () => { },
        editable = true,
        icon
    } = props
    const [addMode, setAddMode] = useState(false)


    const toggleAddOption = (value) => {
        setAddMode(value)
    }

    return ( 
        <View style={styles.container}>
            

            {
                cardInformation.length === 0 ?
                addMode ?
                    null
                    :
                    <FrameItem itemContent="None" />

                :
                props.cardInformation.map((item, index)=>{
                    return(
                        <View key={index} style={isEditMode? styles.itemContainerEdit: styles.itemContainer}>
                            {
                                Object.keys(item).map((key, index)=>{
                                    return(
                                        <View key={index} style={{width:'50%'}}>
                                            
                                            <FrameTableItem 
                                                title={key} 
                                                value={item[key]}
                                                
                                                />
                                                
                                        </View>
                                        
                                    )
                                })
                                
                            }
                            {
                                isEditMode ?
                                    <IconFrameAdjustment>
                                        <IconButton Icon={icon}  onPress={()=>onDelete(index)}/>
                                    </IconFrameAdjustment>
                                :
                                null
                            }
                            
                        </View>
                    ) 
                })
            }

            {isEditMode ?
            
            addMode ?
                <FrameEditFamily
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
        </View>
    );
}
 
export default FrameTabularContent;

const styles = StyleSheet.create({
    container:{
        padding:30,
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    itemContainer:{
        
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    },
    itemContainerEdit:{
        paddingRight: 45,
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        borderColor:'#CCD6E0',
        backgroundColor: 'white',
        borderWidth:1,
        borderRadius:8,
    }

    
})