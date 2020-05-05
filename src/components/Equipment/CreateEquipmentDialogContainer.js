import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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

    const onFieldChange = (fieldName) => (value) => {
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

        const updatedFields = {
            ...fields, 
            usage: parseInt(fields['usage']),
            assignment : fields['assigned'] ,
            // type : fields['type'][0]._id
        }

        console.log("New Fields: ", updatedFields)
        createEquipmentCall(updatedFields)
    };
    
    const getDialogContent = (tab) => {

        switch (tab) {
            case "Details":
                return <EquipmentDialogDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />;
            default :
                return <View/>
        }
    };

    const createEquipmentCall = (updatedFields) => {
        createEquipment(updatedFields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
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

