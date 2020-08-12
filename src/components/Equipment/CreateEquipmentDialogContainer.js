import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import EquipmentDialogDetailsTab from './EquipmentDialogDetailsTab';

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";

import { createEquipment } from "../../api/network";
import { addEquipment } from "../../redux/actions/equipmentActions";
import {connect} from "react-redux";



/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateEquipmentDialogContainer = ({onCancel, onCreated, addEquipment, equipmentTypes}) =>{

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [positiveText, setPositiveText] = useState("DONE")
    const [storage, setStorage] = useState([])

    const [popoverList, setPopoverList] = useState([
        {
            name : "category",
            status : false
        },
        {
            name : "assigned",
            status : false
        },
        {
            name : "type",
            status : false
        }
    ])

    const [fields, setFields] = useState({
        name : '',
        assigmentType: 'Location',
        status : 'Available',
        appointments : [],
        sku : '',
        type: '',
        assignment : {},
        usage : '0',
        category : []
    });

    const [errorFields, setErrorFields] = useState({
        name : false,
        type : false,
        assignment : false,
        usage : false
    })

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        
        if(!popoverItem){
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})
            
            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ]; 
            setPopoverList(updatedPopovers)
        }
    
    }

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveButtonPress = () => {

        let isNameError = errorFields['name']
        let isTypeError = errorFields['type']
        let isAssignmentError = errorFields['assignment']
        let isUsageError = errorFields['usage']

        fields['name'] === '' || null ? isNameError = true : isNameError = false
        fields['type'] === '' || null ? isTypeError = true : isTypeError = false
        Object.keys(fields['assignment']).length === 0 ? isAssignmentError = true : isAssignmentError = false
        parseInt(fields['usage']) === 0 ? isUsageError = true : isUsageError = false

        setErrorFields({
            ...errorFields,
            name : isNameError,
            type : isTypeError,
            assignment : isAssignmentError,
            usage : isUsageError
        })
        const updatedFields = {
            ...fields, 
            usage: parseInt(fields['usage']),
            assignment : fields['assigned'] ,
            // type : fields['type'][0]._id
        }

        if(isNameError === false && isTypeError === false && isUsageError === false && isAssignmentError === false){
            console.log("Success: ", updatedFields)
            createEquipmentCall(updatedFields)
        } 
    };
    
    const getDialogContent = (tab) => {

        switch (tab) {
            case "Details":
                return <EquipmentDialogDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                    handlePopovers = {handlePopovers}
                    popoverList = {popoverList}
                    errorFields = {errorFields}
                />;
            default : 
                return <View/>
        }
    };

    const createEquipmentCall = (updatedFields) => {
        createEquipment(updatedFields)
            .then(data => {
                modal.closeAllModals();
                Alert.alert("Success",`New equipment ${fields['name']} has been created.`)
                setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                Alert.alert("Failed","Failed to create a new equipment item.")
                console.log("failed to create equipment", error);
                // TODO handle error
            })
            .finally(_ => {
            })
    };

    return (
        <OverlayDialog
            title={"Add Equipment"}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
            // handlePopovers = {handlePopovers}

        >
            <View style = {styles.container}>
                <DialogTabs
                    tabs = {dialogTabs}
                    tab = {selectedIndex}
                />
                <TouchableOpacity
                    activeOpacity = {1}
                    onPress = {()=>handlePopovers(false)()}
                >
                    {
                        getDialogContent(dialogTabs[selectedIndex])
                    }
                </TouchableOpacity>
                    
            </View>
        </OverlayDialog>
    )
};

CreateEquipmentDialogContainer.propTypes = {}
CreateEquipmentDialogContainer.defaultProps = {}

export default CreateEquipmentDialogContainer

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})

