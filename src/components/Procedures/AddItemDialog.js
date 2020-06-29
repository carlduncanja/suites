import React,{ useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import DialogDetailsTab from "./DialogDetailsTab";
import DialogLocationTab from "./DialogLocationTab";

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";
import { updateProcedure } from "../../api/network";

import {connect} from "react-redux";
import { duration } from "moment";
import _ from "lodash";
import AddItem from "./AddItem";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const AddItemDialog = ({onCancel, onCreated}) =>{ 

    const modal = useModal();

    const [positiveText, setPositiveText] = useState("DONE")
    
    const [popoverList, setPopoverList] = useState([
        {
            name : "item",
            status : false
        },
    ])

    const [fields, setFields] = useState({});

    const [errors, setErrors] = useState({})

    const [errorFields, setErrorFields] = useState({
        item : false,
        amount : false
    })

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        let updatedPopovers;
        if(!popoverItem){
            updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})

            // setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            // setPopoverList(updatedPopovers)
        }
        setPopoverList(updatedPopovers)
    }

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })
        const updatedErrors = {...errors}
        delete updatedErrors[fieldName]
        console.log("Update error: ", errors)
        setErrors(updatedErrors)
    };

    const validateItem = () =>{
        let isValid = true
        const requiredFields = ['item', 'amount']

        let errorObj = {...errors} || {}

        for (const requiredField of requiredFields) {
            if(!fields[requiredField]){
                console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }else{
                delete errorObj[requiredField]
            }
        }

        setErrors(errorObj)
        console.log("Error obj: ", errorObj)

        return isValid
    }

    const onPositiveButtonPress = () =>{
        let updatedFields = {
            amount : parseInt(fields['amount']),
            inventory : {
                _id : fields['item']._id,
                unitPrice : fields['item'].unitPrice,
                name : fields['item'].name
            }
        }
        // console.log("Update: ", updatedFields)
        let isValid = validateItem()
        if(!isValid){ return }

        onCreated(updatedFields)
        setTimeout(()=>{onCancel(); modal.closeModals('OverlayModal')},200)
        
        // addItemCall(updatedFields)
        // console.log("Fields: ",updatedFields)
    }

    // const addItemCall = (updatedFields) =>{
    //     updateProcedure(updatedFields)
    //         .then(data => {
    //             modal.closeAllModals();
    //             // setTimeout(() => {onCreated(data)}, 200);
    //         })
    //         .catch(error => {
    //             // todo handle error
    //             console.log("failed to update procedure", error)
    //         })
    //         .finally(_ => {
    //             modal.closeAllModals()
    //         });
    // }

    return (
        <OverlayDialog
            title={"Add Item"}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
            // handlePopovers = {handlePopovers}
        >
            <View style = {styles.container}>
                <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                >
                    <AddItem
                        fields = {fields}
                        handlePopovers = {handlePopovers}
                        popoverList = {popoverList}
                        errorFields = {errorFields}
                        errors = {errors}
                        onFieldChange = {onFieldChange}
                    />
                </TouchableOpacity>

            </View>
        </OverlayDialog>
    )
}

AddItemDialog.propTypes = {}
AddItemDialog.defaultProps = {}


export default AddItemDialog;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // height:500,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})

