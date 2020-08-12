import React,{ useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import OverlayDialog from "../../components/common/Dialog/OverlayDialog";
import DialogTabs from "../../components/common/Dialog/DialogTabs";
import DialogDetailsTab from "../../components/Procedures/DialogDetailsTab";
import DialogLocationTab from "../../components/Procedures/DialogLocationTab";

import { formatDate } from '../../utils/formatter'
// import {useModal} from "react-native-modalfy";

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

const CreateProcedure = ({ addProcedure, navigation}) =>{

    // const modal = useModal();
    const dialogTabs = ['Details','Location'];
    const selectedIndex = 0;

    const [tabIndex, setTabIndex] = useState(selectedIndex)
    const [positiveText, setPositiveText] = useState("NEXT")
    const [physicians, setPhysicians] = useState([])
    const [savedTheatres, setSavedTheatres] = useState([])

    const [popoverList, setPopoverList] = useState([
        {
            name : "reference",
            status : false
        },
        {
            name : "physician",
            status : false
        },
        {
            name : "category",
            status : false
        },
        {
            name : 'location',
            status : false
        }
    ])

    const [fields, setFields] = useState({
        // reference :'',
        // name : '',
        // duration : '',
        // notes:'',
        // isTemplate : false,
        // hasRecovery : true,
        // physician: '',
        // supportedRooms: [],
        // inventories:[],
        // equipments:[],
        // serviceFee : 0
    });

    const [errors, setErrors] = useState({})

    const [errorFields, setErrorFields] = useState({
        name : false,
        duration : false,
        physician : false,
        serviceFee : false
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

    // const handleCloseDialog = () => {
    //     onCancel();
    //     modal.closeAllModals();
    // };

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

    const onTabPress = (newTab) => {
        const newIndex = dialogTabs.findIndex( tab => tab === newTab)
        if (newIndex === dialogTabs.length - 1)
        {
            let isValid = validateProcedure()

            if(!isValid){return}

            setPositiveText("DONE")
            setTabIndex(dialogTabs.length-1)

        }else
        {

            setPositiveText("NEXT")
            setTabIndex(newIndex)
        }

    }

    const validateProcedure = () =>{
        let isValid = true
        const requiredFields = ['name', 'duration', 'physician', 'serviceFee']

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
        let updatedFields = {}
        let isValid = true


        if (tabIndex === 0){
            isValid = validateProcedure()
        }

        if(!isValid){ return }

        if(tabIndex === dialogTabs.length - 1){
            updatedFields = {
                ...fields,
                physician : fields['physician']._id,
                duration : parseInt(fields['duration']),
                supportedRooms : fields['supportedRooms']?.map(item => item._id) || []
            }
            console.log("Fields: ",updatedFields)
            createProcedureCall(updatedFields)


            // let isNameError = errorFields['name']
            // let isDurationError = errorFields['duration']
            // let isPhysicianError = errorFields['physician']
            // let isServiceFeeError = errorFields['serviceFee']

            // fields['name'] === '' || null ? isNameError = true : isNameError = false
            // fields['duration'] === '' || null ? isDurationError = true : isDurationError = false
            // fields['physician'] === '' || null ? isPhysicianError = true : isPhysicianError = false
            // fields['serviceFee'] === 0 || null ? isServiceFeeError = true : isServiceFeeError = false

            // setErrorFields({
            //     ...errorFields,
            //     name : isNameError,
            //     duration : isDurationError,
            //     physician : isPhysicianError,
            //     serviceFee : isServiceFeeError
            // })

            // if(isNameError === false && isDurationError === false && isPhysicianError === false && isServiceFeeError === false){
            //     console.log("Fields: ",updatedFields)
            //     // createProcedureCall(updatedFields)
            // }else{
            //     setTabIndex(0)
            // }

        }else if (tabIndex + 1 === dialogTabs.length - 1)
        {
            setPositiveText("DONE")
            setTabIndex(dialogTabs.length-1)
        }else
        {
            setTabIndex(tabIndex + 1)
        }
    }

    const getSavedTheatres = (value) => {
        setSavedTheatres(value)
    }

    const getDialogContent = (tab) => {
        switch (tab) {
            case "Details":
                return <DialogDetailsTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                    handlePopovers = {handlePopovers}
                    popoverList = {popoverList}
                    errorFields = {errorFields}
                    errors = {errors}
                />;
            case "Location":
                return <DialogLocationTab
                    onFieldChange = {onFieldChange}
                    fields = {fields}
                    // theatres = {theatres}
                    getSavedTheatres={getSavedTheatres}
                    savedTheatres = {savedTheatres}
                    handlePopovers = {handlePopovers}
                    popoverList = {popoverList}
                />;
            default :
                return <View/>
        }
    };

    const createProcedureCall = (updatedFields) =>{
        createNewProcedure(updatedFields)
            .then(data => {
                addProcedure(data);
                // modal.closeAllModals();
                Alert.alert("Success",`New procedure ${updatedFields['name']} has been created.`)
                navigation.replace('Procedure', {
                    procedure : data,
                    isOpenEditable : true
                })
                // setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                // todo handle error
                Alert.alert("Fialed","Failed to create a new procedure.")
                console.log("failed to create procedure", error)
            })
            // .finally(_ => {
            //     modal.closeAllModals()
            // });
    }

    return (
        // <OverlayDialog
        //     title={"New Procedure"}
        //     onPositiveButtonPress={onPositiveButtonPress}
        //     onClose={()=>{}}
        //     positiveText={positiveText}
        //     // handlePopovers = {handlePopovers}
        // >
            <View style = {styles.container}>

                <View style={styles.headingContainer}>
                    <Text>New Procedure</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{height: 40}}>
                        <DialogTabs
                            tabs = {dialogTabs}
                            tab = {tabIndex}
                            onTabPress = { onTabPress }
                        />
                    </View>

                    <TouchableOpacity
                        onPress = {()=>handlePopovers(false)()}
                        activeOpacity = {1}
                    >
                        {
                            getDialogContent(dialogTabs[tabIndex])
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.footer} onPress={onPositiveButtonPress}>
                    <Text style={styles.footerText}>{positiveText}</Text>
                </TouchableOpacity>

            </View>
        // </OverlayDialog>
    )
}

CreateProcedure.propTypes = {}
CreateProcedure.defaultProps = {}

const mapDispatchToProp = {
    addProcedure
}

export default connect(null, mapDispatchToProp)(CreateProcedure);


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    headingContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 47,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E8EF'
    },
    footer:{
        height: 57,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    footerText:{
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#3182CE",
    }
})

