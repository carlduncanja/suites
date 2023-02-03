import React from 'react';
import { View, StyleSheet } from "react-native";
import FrameTitle from '../FrameTitle';
import FrameTabularContent from '../FrameContents/FrameTabularContent'
import RemoveIcon from '../../../../../assets/svg/wasteIcon';
import EditIcon from '../../../../../assets/svg/editIcon';
const FrameTableCard = (props) => {
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
        onDelete =()=>{},
        onAction =()=>{},
        onEdit =()=>{},
        normalInput,
        physicianSelection=true,
        editable
    } = props

    //const theme = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <FrameTitle
                    color={props.frameColor}
                    borderColor = {props.frameBorderColor}
                    backgroundColor={props.titleBackgroundColor}
                    icon={props.icon}
                    frameTitle={props.frameTitle}
                />
            </View>
            <View style={styles.content}>
                <FrameTabularContent 
                    cardInformation={props.cardInformation} 
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
                    icon={<RemoveIcon/>}
                    editIcon={<EditIcon/>}
                />
            </View>
        </View>

    );
}

export default FrameTableCard;

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
