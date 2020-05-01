import React,{ useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import DialogDetailsTab from "./DialogDetailsTab";
import DialogLocationTab from "./DialogLocationTab";

import { formatDate } from '../../utils/formatter'
import {useModal} from "react-native-modalfy";


import { createNewProcedure, getTheatres, getPhysicians } from "../../api/network";
import { addProcedure } from "../../redux/actions/proceduresActions";
import {connect} from "react-redux";
import { duration } from "moment";
import _ from "lodash";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateProcedureDialogContainer = ({onCancel, onCreated, addProcedure}) =>{

    const modal = useModal();
    const dialogTabs = ['Details','Location'];
    const selectedIndex = 0;

    const [tabIndex, setTabIndex] = useState(selectedIndex)
    const [positiveText, setPositiveText] = useState("NEXT")
    const [physicians, setPhysicians] = useState([])
    const [theatres, setTheates] = useState([])

    const [fields, setFields] = useState({
        reference :'--',
        name : '',
        duration : '',
        notes:'',
        isTemplate : false,
        hasRecovery : true,
        physician: '',
        supportedRooms: [],
        inventories:[],
        equipments:[]
    });

    useEffect(()=>{
        getTheatres()
            .then(data => {
                setTheates(data)
            })
            .catch(error => {
                console.log("Failed to get storage", error)
            })
        getPhysicians()
            .then(data => {
                setPhysicians(data)
            })
            .catch(error => {
                console.log("Failed to get storage", error)
            })
    },[])

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
        const updatedFields = {
            ...fields,
            duration : parseInt(fields['duration'])
        }
        if(tabIndex === dialogTabs.length - 1){
            // console.log("Fields: ",updatedFields)
            createProcedureCall(updatedFields)
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
                    physicians = {physicians.map( item => { return { _id : item._id, name : `Dr. ${item.firstName} ${item.surname}`} })}
                    theatres = {theatres}
                />;
            case "Location":
                return <DialogLocationTab
                    onFieldChange = {onFieldChange}
                    theatres = {theatres}
                />;
            default :
                return <View/>
        }
    };

    const createProcedureCall = (updatedFields) =>{
        createNewProcedure(updatedFields)
            .then(data => {
                // addProcedure(data);
                modal.closeAllModals();
                setTimeout(() => {onCreated(data)}, 200);
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


export default CreateProcedureDialogContainer;


const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})

