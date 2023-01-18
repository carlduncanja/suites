import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameItem from '../FrameItems/FrameItem';
import FrameEditFamily from '../FrameItems/FrameEditFamily';
import AddIcon from '../../../../../assets/svg/addIcon';
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
        onEdit = () => { }
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
                        <View key={index} style={styles.itemContainer}>
                            {
                                Object.keys(item).map((key, index)=>{
                                    return(
                                        <View key={index} style={{width:'50%'}}>
                                            <FrameTableItem 
                                                title={key} 
                                                value={item[key]}/>
                                        </View>
                                        
                                    )
                                })
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
                    onEdit ={onEdit}
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
        padding:15,
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
    }
    
})