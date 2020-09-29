import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker, Alert, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import { getStorage, getTheatres, createTransfer} from "../../api/network";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";
import { currencyFormatter } from '../../utils/formatter';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import AutoFillField from '../common/Input Fields/AutoFillField';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import ConfirmationComponent from '../ConfirmationComponent';



/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor 
 */

 function AddLocationDialog({onCancel, onCreated }) {

    // ########## CONST
    const modal = useModal();
    const dialogTabs = ['Location', 'Configuration'];

    // ########## STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [fields, setFields] = useState({});
    const [errorFields, setErrorFields] = useState({});
   
    // Storage Search
    const [storageSearchValue, setStorageSearchValue] = useState("");
    const [storageSearchResults, setStorageSearchResult] = useState([]);
    const [storageSearchQuery, setStorageSearchQuery] = useState({});

    // ########## LIFECYCLE METHODS

    // Handle storage search
    useEffect(() => {
        if (!storageSearchValue) {
            // empty search values and cancel any out going request.
            setStorageSearchResult([]);
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
        getStorage(storageSearchValue, 5)
            .then((storageResults = {}) => {
                const { data = [], pages = 0 } = storageResults
                // console.log("Data: ", data)
                const results = data.map(item => ({
                    ...item
                }));

                setStorageSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories", error);
                setStorageSearchResult([]);
            })
    };


    // ########## EVENT LISTENERS
    

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        
        let isValid = validateAddLocation()

        if(!isValid){ return }
        
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {

            const updatedFields = {
                ...fields
            }
            console.log("Success:", updatedFields);
            
            // createTransferCall(updatedFields);
           
        }
    };

    const onTabChange = (tab) => {
        let isValid = validateAddLocation();
        if(!isValid) {return}
        setSelectedTabIndex(dialogTabs.indexOf(tab))
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })
        const updatedErrors = {...errorFields};
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);

    };

    const validateAddLocation = () => {
        let isValid = true;
        let requiredFields = [];
        let locationsRequiredFields = ['storageLocation'];
        let configRequiredFields = ['inStock', 'low', 'ideal', 'max'];

        selectedIndex === 0 
            ? requiredFields = locationsRequiredFields 
            : requiredFields = configRequiredFields
    
        let errorObj = {...errorFields} || {}

        for (const requiredField of requiredFields) {
            if(!fields[requiredField]){
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }else{
                delete errorObj[requiredField]
            }
        }

        setErrorFields(errorObj)
        return isValid
    }

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case "Location":
                return detailsTab;
            case "Configuration":
                return configTab;
            default:
                return <View/>
        }
    };

    const onDestinationSelected = (item) => {
        console.log("Destination Selected: ", item);
        
        if (item === undefined || null) {
            delete fields['to'];
        } else {
            onFieldChange('to')(item);
            setStorageSearchValue(item.name);
        }
       
        setStorageSearchResult([]);
        setStorageSearchQuery(false);
    }
    
    const detailsTab = (
        <>
            <Row>

                <FieldContainer>
                    <SearchableOptionsField
                        label={"Storage"}
                        text={storageSearchValue}
                        value = {fields['storageLocation']}
                        oneOptionsSelected={(item)=>{onDestinationSelected(item); console.log("Item : ", item)}}
                        onChangeText={value => {setStorageSearchValue(value); }}
                        onClear={
                            onDestinationSelected
                            // console.log("Clearing");
                            // onFieldChange('to')('');
                            // setStorageSearchValue('');
                        }
                        options={storageSearchResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {storageSearchQuery}
                        errorMessage = "Location must be given."
                        hasError = {errorFields['storageLocation']}
                    />  
                </FieldContainer>
                
            </Row>


        </>
    );

    const configTab = (
        <>
            <Row>
                <FieldContainer>
                    <InputField2
                        label={"In-Stock"}
                        onChangeText={ (value) => {
                            if ((/^\d/g.test(value) || !value)) {
                                onFieldChange('inStock')(value)
                            }
                        }}
                        keyboardType = "number-pad"
                        value={fields['inStock']}
                        onClear={() => onFieldChange('inStock')('')}
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Low"}
                        onChangeText={ (value) => {
                            if ((/^\d/g.test(value) || !value)) {
                                onFieldChange('low')(value)
                            }
                        }}
                        keyboardType = "number-pad"
                        value={fields['low']}
                        onClear={() => onFieldChange('low')('')}
                    />
                </FieldContainer>
            </Row>
            
            <Row>
                <FieldContainer>
                    <InputField2
                        label={"Ideal"}
                        onChangeText={ (value) => {
                            if ((/^\d/g.test(value) || !value)) {
                                onFieldChange('ideal')(value)
                            }
                        }}
                        keyboardType = "number-pad"
                        value={fields['ideal']}
                        onClear={() => onFieldChange('ideal')('')}
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Max"}
                        onChangeText={ (value) => {
                            if ((/^\d/g.test(value) || !value)) {
                                onFieldChange('max')(value)
                            }
                        }}
                        keyboardType = "number-pad"
                        value={fields['max']}
                        onClear={() => onFieldChange('max')('')}
                    />
                </FieldContainer>
            </Row>
        </>
       
    );

    return (
        <OverlayDialog
            title={"Add Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={selectedIndex === (dialogTabs.length - 1) ? "DONE" : "NEXT"}
        >

            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={onTabChange}
                />

                <OverlayDialogContent>
                    {getTabContent()}
                </OverlayDialogContent>
                
            </>
        </OverlayDialog>
    );
}

AddLocationDialog.propTypes = {};
AddLocationDialog.defaultProps = {};

export default AddLocationDialog;
