import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameContentList from '../FrameContents/FrameContentList';

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

const FrameCard = (props) => {
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

    return (
        <View style={styles.container}>

                <View style={styles.title}>
                    <FrameTitle
                        color={frameColor}
                        borderColor = {frameBorderColor}
                        backgroundColor={titleBackgroundColor}
                        icon={icon}
                        frameTitle={frameTitle}
                    />
                </View>
               
                <View style={styles.content}>
                    <FrameContentList
                        cardInformation={cardInformation}
                        // frameColor = {frameColor}
                        isEditMode = {isEditMode}
                        handleEdit = {handleEdit}
                        handleAddNew = {handleAddNew}
                        isAddNew = {isAddNew}
                    />
                </View>
            </View>
    )
}
export default FrameCard 

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',

    },
    title:{
        width:'100%'
    },
    content:{

        width:'100%'
    }
})
