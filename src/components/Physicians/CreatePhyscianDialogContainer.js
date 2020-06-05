import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import { createPhysician } from "../../api/network";
import {useModal} from "react-native-modalfy";
import PhysicianDetailsTab from './PhysicianDetailsTab';


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const CreatePhysicianDialogContainer = ({ onCancel, onCreated }) => {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [positiveText, setPositiveText] = useState("DONE")

    const [fields, setFields] = useState({
        firstName : '',
        middleName: '',
        trn:'',
        surname : '',
        gender: '',
        phones : [],
        emails : [],
        emergencyContact:[],
        address:[]
    });

    const [errorFields, setErrorFields] = useState({
        firstName : false,
        surname : false,
        trn : false,
        gender : false,
    })

    const onFieldChange = (fieldName) => (value) => {
        console.log("Value:", value)
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveButtonPress = () => {

        let isFirstError = errorFields['firstName']
        let isSurnameError = errorFields['surname']
        let isTrnError = errorFields['trn']
        let isGenderError = errorFields['gender']

        fields['firstName'] === '' || null ? isFirstError = true : isFirstError = false
        fields['surname'] === '' || null ? isSurnameError = true : isSurnameError = false
        fields['trn'] === '' || null ? isTrnError = true : isTrnError = false
        fields['gender'] === '' || null ? isGenderError = true : isGenderError = false

        setErrorFields({
            ...errorFields,
            firstName: isFirstError,
            surname : isSurnameError,
            trn : isTrnError,
            gender : isGenderError
        })

        const updatedFields = {
            ...fields,
            // trn : parseInt(fields['trn']) || ''
        }
        
        if(isFirstError === false && isSurnameError === false && isTrnError === false && isGenderError === false){
            console.log("Success: ",updatedFields)
            // createPhysicianCall(updatedFields)
        } 
        
     
    };

    const getDialogContent = (tab) => {
        switch (tab) {
            case "Details":
                return <PhysicianDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                    errorFields = {errorFields}
                />;
            default :
                return <View/>
        }
    };

    const createPhysicianCall = (updatedFields) => {
        createPhysician(updatedFields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                console.log("failed to create physician", error);
                // TODO handle error
            })
            .finally(_ => {
            })
    };

    return (
        <OverlayDialog
            title={"Add Physician"}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
        >
            <View style = {styles.container}>
                <DialogTabs
                    tabs = {dialogTabs}
                    tab = {selectedIndex}
                />
                    {
                        getDialogContent(dialogTabs[selectedIndex])
                    }
            </View>
        </OverlayDialog>
    )
}

CreatePhysicianDialogContainer.propTypes = {}
CreatePhysicianDialogContainer.defaultProps = {}

export default CreatePhysicianDialogContainer

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})