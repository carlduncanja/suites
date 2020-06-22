import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import InputField2 from '../../common/Input Fields/InputField2';
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";
import OverlayDialog from "../../common/Dialog/OverlayDialog";
import DialogTabs from "../../common/Dialog/DialogTabs";
import {useModal} from "react-native-modalfy";
import { getInventories } from "../../../api/network";
import _ from "lodash";
import AutoFillField from "../../common/Input Fields/AutoFillField";

const CreateServiceLineItem = ({onCreated, onCancel}) => { 

    const modal = useModal();

    const [fields, setFields] = useState({ 
        name : '',
        type : 'service',
        unitPrice : '',
        quantity : ''
    });

    const [errorFields, setErrorFields] = useState({
        name : false,
        unitPrice : false,
        quantity : false,
    })

    const [unitPriceText, setUnitPriceText] = useState(fields['unitPrice'])

    const onPositiveClick = () => {

        let isNameError = errorFields['name']
        let isPriceError = errorFields['unitPrice']
        let isQuantityError = errorFields['quantity']

        fields['name'] === '' || null ? isNameError = true : isNameError = false
        fields['unitPrice'] === '' || null ? isPriceError = true : isPriceError = false
        fields['quantity'] === '' || null ? isQuantityError = true : isQuantityError = false

        setErrorFields({
            ...errorFields,
            name : isNameError,
            unitPrice : isPriceError,
            quantity : isQuantityError,
        })

        if( isNameError === false && isQuantityError === false && isPriceError === false ){
            onCreated(fields)
            modal.closeModals("OverlayModal")
            console.log("Add Item: ",fields)
        }else{
            console.log("Missing", fields)
        }
        
    }

    const handleCloseDialog = () => {
        onCancel();
        modal.closeModals('OverlayModal');
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handleUnitPrice = (price) => {
        if (/^-?[0-9][0-9.]+$/g.test(price) || /^\d+$/g.test(price) || !price) {
            console.log("Unit Price: ", price)
            onFieldChange('unitPrice')(parseFloat(price))
        }
        setUnitPriceText(price)
    }

    return(
        <OverlayDialog
            title={"Add Item"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
            // handlePopovers = {handlePopovers}
            // buttonIcon={<ArrowRightIcon/>}
        >

        <View style={styles.container}>
            {/* <DialogTabs
                tabs={dialogTabs}
                tab={selectedIndex}
                onTabPress={onTabChange}
            /> */}
            <TouchableOpacity
                 onPress = {()=>handlePopovers(false)()}
                activeOpacity = {1}
            >
                <View style={styles.sectionContainer}>

                    <View style={styles.row}>

                        <View style={styles.inputWrapper}>
                            <InputField2
                                label={"Item Name"}
                                onChangeText={onFieldChange('name')}
                                value={fields['name']}
                                onClear={() => onFieldChange('name')('')}
                                hasError = {errorFields['name']}
                                errorMessage = "Name must be provided."
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <AutoFillField
                                label = {"Item Type"}
                                value = {fields['type']}
                            />
                            {/* <InputField2
                                label={"Item Type"}
                                onChangeText={onFieldChange('type')}
                                value={fields['type']}
                                onClear={() => onFieldChange('type')('')}
                                hasError = {errorFields['type']}
                                errorMessage = "Type must be provided."
                            /> */}
                        </View>
                    </View>

                    <View style={[styles.row,{zIndex:-1}]}>
                        <View style={styles.inputWrapper}>
                            <InputField2
                                label={"Unit Price"}
                                onChangeText={(value) => { handleUnitPrice(value )}}
                                value={unitPriceText}
                                keyboardType={'number-pad'}
                                onClear={() => handleUnitPrice('')}
                                hasError = {errorFields['unitPrice']}
                                errorMessage = "Price must be provided."
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <InputField2
                                label={"Quanity"}
                                onChangeText={(value)=>onFieldChange('quantity')(parseInt(value))}
                                value={fields['quantity'].toString()}
                                onClear={() => onFieldChange('quantity')('')}
                                keyboardType = {'number-pad'}
                                hasError = {errorFields['quantity']}
                                errorMessage = "Provide a quantity"
                            />
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
            
        </View>


    </OverlayDialog>
    )
}

export default CreateServiceLineItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height:150,
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
})