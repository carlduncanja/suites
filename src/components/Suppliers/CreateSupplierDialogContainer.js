import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import { createSuppier } from "../../api/network";
import { addSupplier } from "../../redux/actions/suppliersActions";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

function CreateSupplierDialogContainer({onCancel, onCreated, addSupplier}) {

    // ######### CONST 
    const modal = useModal();
    const dialogTabs = ['Details', 'Representative'];

    // ######### STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [fields, setFields] = useState({});
    const [representative, setRepresentative] = useState({})
    const [errorFields, setErrorFields] = useState({})

    // ######### EVENT HANDLERS

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {

        let isValid = validateSupplier()
        let supplierToAdd = {}

        if(!isValid){ return }
        
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {

            if(Object.keys(representative).length !== 0 ){
                supplierToAdd = {...fields,representative : {...representative} }
            }else{
                supplierToAdd = {...fields}
            }
            
            console.log("Success:", supplierToAdd)
            createSupplierCall(supplierToAdd)
        }
    };

    const onTabChange = (tab) => {
        let isValid = validateSupplier()
        if(!isValid) {return}
        setSelectedTabIndex(dialogTabs.indexOf(tab))
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })

        const updatedErrors = {...errorFields}
        delete updatedErrors[fieldName]
        setErrorFields(updatedErrors)

    };

    const validateSupplier = () => {
        let isValid = true
        let requiredFields = ['name','phone','fax']
        // selectedIndex === 0 ? requiredFields = requiredFields : requiredFields = [...requiredFields,'unitPrice']
        // const requiredFields = ['name', 'unitPrice']
    
        let errorObj = {...errorFields} || {}

        for (const requiredField of requiredFields) {
            if(!fields[requiredField]){
                // console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }else{
                delete errorObj[requiredField]
            }
        }

        setErrorFields(errorObj)
        console.log("Error obj: ", errorObj)

        return isValid
    }

    const createSupplierCall = (supplier) => {
        createSuppier(supplier)
            .then(data => {
                // addSupplier(data)
                modal.closeAllModals();
                Alert.alert("Success",`Supplier, ${fields['name']} is successfully created.`)
                setTimeout(() => {
                    onCreated(data)
                }, 200);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create supplier", error);
                Alert.alert("Failed", "failed to create supplier")
            })
            .finally()
    };

    const handleRepresentative = (fieldName) => (value) =>{
        const updatedFields = {...representative}
        setRepresentative({
            ...updatedFields,
            [fieldName]: value
        })
    }

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case "Details":
                return detailsTab;
            case "Representative":
                return representativeTab;
            default:
                return <View/>
        }
    };

    const detailsTab = (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={[styles.inputWrapper,{flex:1,}]}>
                    <InputField2
                        label={"Supplier Name"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError = {errorFields['name']}
                        errorMessage = "Name must be filled."
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.inputWrapper,{flex:1}]}>
                    <InputField2
                        label={"Description"}
                        onChangeText={onFieldChange('description')}
                        value={fields['description']}
                        onClear={() => onFieldChange('description')('')}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <Text style={{color:'#000000'}}>Contact Information</Text>
            </View>

            <View style={[styles.row,{zIndex:-2}]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Phone"}
                        onChangeText={(value)=>{
                            if(/^\d{10}$/g.test(value))(onFieldChange('phone')(value))
                        }}
                        value={fields['phone']}
                        onClear={() => onFieldChange('phone')('')}
                        keyboardType = {'number-pad'}
                        hasError = {errorFields['phone']}
                        errorMessage = "Phone must be filled."
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Fax"}
                        onChangeText={(value)=>{
                            if(/^\d{10}$/g.test(value))(onFieldChange('fax')(value))
                        }}
                        value={fields['fax']}
                        onClear={() => onFieldChange('fax')('')}
                        keyboardType = {'number-pad'}
                        hasError = {errorFields['fax']}
                        errorMessage = "Fax must be filled."
                    />
                </View>
            </View>

            <View style={[styles.row,{zIndex:-3}]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Email"}
                        onChangeText={onFieldChange('email')}
                        value={fields['email']}
                        keyboardType = {'email-address'}
                        onClear={() => onFieldChange('email')('')}
                    />
                </View>

            </View>

        </View>
    );

    const representativeTab = (

        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Name"}
                        onChangeText={handleRepresentative('name')}
                        value={representative['name']}
                        onClear={() => handleRepresentative('name')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Phone"}
                        onChangeText={(value)=>{
                            if(/^\d{10}$/g.test(value))(handleRepresentative('phone')(value))
                        }}
                        value={representative['phone']}
                        onClear={() => handleRepresentative('phone')('')}
                        keyboardType={'number-pad'}
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Email"}
                        onChangeText={onFieldChange('email')}
                        value={representative['email']}
                        onClear={() => handleRepresentative('email')('')}
                        keyboardType={'email-address'}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={selectedIndex === (dialogTabs.length - 1) ? "DONE" : "NEXT"}
            // handlePopovers = {handlePopovers}
            // buttonIcon={<ArrowRightIcon/>}
        >

            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={onTabChange}
                />
                <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                >
                    {getTabContent()}
                </TouchableOpacity>

            </View>


        </OverlayDialog>
    );
}

CreateSupplierDialogContainer.propTypes = {};
CreateSupplierDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height:280,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 20
    },

    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },

});

const mapDispatcherToProps = {
    addSupplier
};

export default connect(null, mapDispatcherToProps)(CreateSupplierDialogContainer);
