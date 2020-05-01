import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import EquipmentDialogDetailsTab from './EquipmentDialogDetailsTab';

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";



/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateEquipmentDialogContainer = () =>{

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [positiveText, setPositiveText] = useState("DONE")

    const [fields, setFields] = useState({
        assignment : 'Location',
        assigned : 'OR 1',
        status : 'Available',
        category : 'Electric'
    });

    const onFieldChange = (fieldName) => (value) => {
        // console.log("Value: ", typeof value )
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const onPositiveButtonPress = () =>{
    }

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

    return (
        <OverlayDialog
            title={"Add Equipment"}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={()=>{}}
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

