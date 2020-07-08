import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';

import { getStorage } from "../../api/network";
import _ from "lodash";


const CreatePurchaseOrderDialog = ({onCancel, onCreated}) =>{

    const [storageSearchValue, setStorageSearchValue] = useState();
    const [storagaeSearchResults, setStorageSearchResult] = useState([]);
    const [storageSearchQuery, setStorageSearchQuery] = useState({});

    const [fields, setFields] = useState({})
    const [errorFields, setErrorFields] = useState({})

    const [popoverList, setPopoverList] = useState([
        {
            name : "storage",
            status : false
        },
    ])

    useEffect(() => {
        if (!storageSearchValue) {
            // empty search values and cancel any out going request.
            setStorageSearchValue([]);
            if (storageSearchQuery.cancel) storageSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchStorage, 300);

        setStorageSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [storageSearchValue]);

    const fetchStorage = () => {
        getStorage(storageSearchValue)
            .then((data = []) => {
                // console.log("Data: ", data)
                // const results = data.map(item => ({
                //     ...item
                // }));

                setStorageSearchResult(data || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get storage locations", error);
                setStorageSearchResult([]);
            })
    };


    const handlePopovers = (popoverValue) => (popoverItem) =>{

        if(!popoverItem){
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})

            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

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

    const onPositiveClick = () => {
        let isValid = validatedPO()

        if(!isValid){ return }
        onCreated(fields)
    }

    const handleCloseDialog = () =>{
        onCancel();
        modal.closeAllModals();
    }

    const validatedPO = () => {
        let isValid = true
        let requiredFields = ['name', 'storageLocation']
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

    let storageStatus = popoverList.filter( item => item.name === 'storage')

    return (
        <OverlayDialog
            title={"Create Purchase Order"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
        >

            <View style={styles.container}>
                <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                >
                    <View style={styles.sectionContainer}>

                        <View style={[styles.row]}>

                            <View style={styles.inputWrapper}>
                                <InputField2
                                    label={"Name"}
                                    onChangeText={onFieldChange('name')}
                                    value={fields['name']}
                                    onClear={() => onFieldChange('name')('')}
                                    hasError = {errorFields['name']}
                                    errorMessage = "Name must be filled."
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <SearchableOptionsField
                                    label={"Storage Location"}
                                    text={storageSearchValue}
                                    oneOptionsSelected={(item) => {
                                        onFieldChange('storageLocation')(item)
                                    }}
                                    onChangeText={value => {setStorageSearchValue(value); console.log("Value:", value)}}
                                    onClear={() => {
                                        onFieldChange('storageLocation')('');
                                        setStorageSearchValue('');
                                    }}
                                    options={storagaeSearchResults}
                                    handlePopovers = {(value)=>handlePopovers(value)('storage')}
                                    isPopoverOpen = {storageStatus[0].status}
                                />
                            </View>

                        </View>

                    </View>
                    
                </TouchableOpacity>

            </View>


        </OverlayDialog>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height:140,
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

export default CreatePurchaseOrderDialog