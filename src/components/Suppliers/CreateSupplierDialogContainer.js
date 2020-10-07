import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import OverlayDialogContent from "../common/Dialog/OverlayContent";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent'
import ConfirmationComponent from '../ConfirmationComponent';
import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import { createSupplier } from "../../api/network";
import { addSupplier } from "../../redux/actions/suppliersActions";
import LineDivider from '../common/LineDivider';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { ThemeColors } from 'react-navigation';



/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const DividerContainer = styled.View`
    padding-bottom : ${ ({theme}) => theme.space['--space-24']};
`

function CreateSupplierDialogContainer({onCancel, onCreated, addSupplier, onUpdate}) {

    // ######### CONST
    const modal = useModal();
    const dialogTabs = ['Details'];
    const theme = useTheme();

    // ######### STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [fields, setFields] = useState({
        name : 'Medical Supplies Inc.',
        email : "infoMed@supplies.com",
        phone : "8763687566",
        fax : "8769973765",
    });
    const [representative, setRepresentative] = useState({
        name : 'John Doe',
        email : "doe@supplies.com",
        phone : "8768458743",
    })
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
                supplierToAdd = {...fields,representatives : {...representative} }
            }else{
                supplierToAdd = {...fields}
            }

            console.log("Success:", supplierToAdd);

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
        console.log("Supplier: ", supplier);
        createSupplier(supplier)
            .then(data => {
                // addSupplier(data)
                modal.closeAllModals();

                modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate = {false}
                        isError = {false}
                        onCancel = {()=> {
                            modal.closeAllModals();
                            setTimeout(()=>{
                                onCreated(data);
                            },200)
                            // navigation.goBack();
                        }}
                        onAction = {()=>{
                            modal.closeAllModals();
                            setTimeout(()=>{
                                onCreated(data);
                            },200)
                            // navigation.goBack();
                        }}
                    />
                    ,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                        navigation.goBack();
                    } 
                })
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create supplier", error);
                Alert.alert("Failed", "failed to create supplier")
            })
            .finally(_=>onUpdate())
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

        <>
            <Row>

                <FieldContainer>
                    <InputField2
                        label={"Supplier"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError = {errorFields['name']}
                        errorMessage = "Name must be filled."
                    />
                </FieldContainer>

                <FieldContainer>
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
                </FieldContainer>

            </Row>

            <Row>

                <FieldContainer>
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
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Email"}
                        onChangeText={onFieldChange('email')}
                        value={fields['email']}
                        keyboardType = {'email-address'}
                        onClear={() => onFieldChange('email')('')}
                    />
                </FieldContainer>

            </Row>
            
            <DividerContainer theme = {theme}>
                <LineDivider/>
            </DividerContainer>
            

            <Row>

                <FieldContainer>
                    <InputField2
                        label={"Representative"}
                        onChangeText={handleRepresentative('name')}
                        value={representative['name']}
                        onClear={() => handleRepresentative('name')('')}
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Rep. TelePhone"}
                        onChangeText={(value)=>{
                            if(/^\d{10}$/g.test(value))(handleRepresentative('phone')(value))
                        }}
                        value={representative['phone']}
                        onClear={() => handleRepresentative('phone')('')}
                        keyboardType={'number-pad'}
                    />
                </FieldContainer>

            </Row>

            <Row>

                <FieldContainer>
                    <InputField2
                        label={"Rep. Email"}
                        onChangeText={handleRepresentative('email')}
                        value={representative['email']}
                        onClear={() => handleRepresentative('email')('')}
                        keyboardType={'email-address'}
                    />
                </FieldContainer>

            </Row>
        </>

        // <View style={styles.sectionContainer}>

        //     <View style={styles.row}>
        //         <View style={[styles.inputWrapper,{flex:1,}]}>
        //             <InputField2
        //                 label={"Supplier Name"}
        //                 onChangeText={onFieldChange('name')}
        //                 value={fields['name']}
        //                 onClear={() => onFieldChange('name')('')}
        //                 hasError = {errorFields['name']}
        //                 errorMessage = "Name must be filled."
        //             />
        //         </View>
        //     </View>

        //     <View style={styles.row}>
        //         <View style={[styles.inputWrapper,{flex:1}]}>
        //             <InputField2
        //                 label={"Description"}
        //                 onChangeText={onFieldChange('description')}
        //                 value={fields['description']}
        //                 onClear={() => onFieldChange('description')('')}
        //             />
        //         </View>
        //     </View>

        //     <View style={styles.row}>
        //         <Text style={{color:'#000000'}}>Contact Information</Text>
        //     </View>

        //     <View style={[styles.row,{zIndex:-2}]}>
        //         <View style={styles.inputWrapper}>
        //             <InputField2
        //                 label={"Phone"}
        //                 onChangeText={(value)=>{
        //                     if(/^\d{10}$/g.test(value))(onFieldChange('phone')(value))
        //                 }}
        //                 value={fields['phone']}
        //                 onClear={() => onFieldChange('phone')('')}
        //                 keyboardType = {'number-pad'}
        //                 hasError = {errorFields['phone']}
        //                 errorMessage = "Phone must be filled."
        //             />
        //         </View>

        //         <View style={styles.inputWrapper}>
        //             <InputField2
        //                 label={"Fax"}
        //                 onChangeText={(value)=>{
        //                     if(/^\d{10}$/g.test(value))(onFieldChange('fax')(value))
        //                 }}
        //                 value={fields['fax']}
        //                 onClear={() => onFieldChange('fax')('')}
        //                 keyboardType = {'number-pad'}
        //                 hasError = {errorFields['fax']}
        //                 errorMessage = "Fax must be filled."
        //             />
        //         </View>
        //     </View>

        //     <View style={[styles.row,{zIndex:-3}]}>
        //         <View style={styles.inputWrapper}>
        //             <InputField2
        //                 label={"Email"}
        //                 onChangeText={onFieldChange('email')}
        //                 value={fields['email']}
        //                 keyboardType = {'email-address'}
        //                 onClear={() => onFieldChange('email')('')}
        //             />
        //         </View>

        //     </View>

        // </View>
    
    );

    // const representativeTab = (

    //     <View style={styles.sectionContainer}>

    //         <View style={styles.row}>
    //             <View style={styles.inputWrapper}>
    //                 <InputField2
    //                     label={"Name"}
    //                     onChangeText={handleRepresentative('name')}
    //                     value={representative['name']}
    //                     onClear={() => handleRepresentative('name')('')}
    //                 />
    //             </View>

    //             <View style={styles.inputWrapper}>
    //                 <InputField2
    //                     label={"Phone"}
    //                     onChangeText={(value)=>{
    //                         if(/^\d{10}$/g.test(value))(handleRepresentative('phone')(value))
    //                     }}
    //                     value={representative['phone']}
    //                     onClear={() => handleRepresentative('phone')('')}
    //                     keyboardType={'number-pad'}
    //                 />
    //             </View>
    //         </View>

    //         <View style={styles.row}>
    //             <View style={styles.inputWrapper}>
    //                 <InputField2
    //                     label={"Email"}
    //                     onChangeText={onFieldChange('email')}
    //                     value={representative['email']}
    //                     onClear={() => handleRepresentative('email')('')}
    //                     keyboardType={'email-address'}
    //                 />
    //             </View>
    //         </View>
    //     </View>
    
    // );

    return (
        <OverlayDialog
            title={"Add Supplier"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={selectedIndex === (dialogTabs.length - 1) ? "DONE" : "NEXT"}
            // handlePopovers = {handlePopovers}
            // buttonIcon={<ArrowRightIcon/>}
        >
            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={onTabChange}
                />

                <OverlayDialogContent height = {320}>
                    {getTabContent()}
                </OverlayDialogContent>
            </>

            {/* <View style={styles.container}>
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

            </View> */}


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
