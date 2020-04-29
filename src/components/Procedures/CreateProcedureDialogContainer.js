import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import DialogDetailsTab from "./DialogDetailsTab";
import DialogLocationTab from "./DialogLocationTab";

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";


import { createNewProcedure } from "../../api/network";
import { addProcedure } from "../../redux/actions/proceduresActions";
import {connect} from "react-redux";
import { duration } from "moment";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateProcedureDialogContainer = ({onCancel, addProcedure}) =>{

    const modal = useModal();
    const dialogTabs = ['Details','Location'];
    const selectedIndex = 0;

    const [tabIndex, setTabIndex] = useState(selectedIndex)
    const [positiveText, setPositiveText] = useState("NEXT")

    const [fields, setFields] = useState({
        isTemplate : 'Yes',
        hasRecovery : 'Yes'
    });

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const onTabPress = (newTab) => {
        const newIndex = dialogTabs.findIndex( tab => tab === newTab)
        setTabIndex(newIndex)
    }

    const onPositiveButtonPress = () =>{
        if(tabIndex === dialogTabs.length - 1){
            // console.log("Fields: ",fields)
            createProcedureCall()
        }else if (tabIndex + 1 === dialogTabs.length - 1)
        {
            setPositiveText("DONE")
            setTabIndex(dialogTabs.length-1)

        }else
        {
            setTabIndex(tabIndex + 1)
        }
    }

    const getDialogContent = (tab) => {

        switch (tab) {
            case "Details":
                return <DialogDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                />;
            case "Location":
                return <DialogLocationTab
                    onFieldChange = {onFieldChange}
                />;
            default :
                return <View/>
        }
    };

    const createProcedureCall = () =>{
        createNewProcedure(fields)
            .then(data => {
                addProcedure(data);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create procedure", error)
            })
            .finally(_ => {
                modal.closeAllModals()
            });
    }

    return (
        <OverlayDialog
            title={"New Procedure"}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
        >
            <View style = {styles.container}>
                <DialogTabs
                    tabs = {dialogTabs}
                    tab = {tabIndex}
                    onTabPress = { onTabPress }
                />
                    {
                        getDialogContent(dialogTabs[tabIndex])
                    }
            </View>
        </OverlayDialog>
    )
}

CreateProcedureDialogContainer.propTypes = {}
CreateProcedureDialogContainer.defaultProps = {}

const mapDispatcherToProps = {
    addProcedure
};

export default connect(null, mapDispatcherToProps)(CreateProcedureDialogContainer);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})

