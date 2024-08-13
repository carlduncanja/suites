import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import { getStorage, createInventoryLocation} from "../../api/network";
import _ from "lodash";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
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

 function AddLocationDialog({onCancel, onCreated, variant  }) {
    // console.log("Variant: ", variant);
    // ########## CONST
    const modal = useModal();
    const dialogTabs = ['Location', 'Configuration'];
    const { inventoryGroup } = variant;

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

        let isValid = validateAddLocation();

        if(!isValid){ return }
        
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {

            const updatedFields = {
                levels : {
                    critical : parseInt(fields['critical']),
                    low : parseInt(fields['low']),
                    ideal : parseInt(fields['ideal']),
                    max : parseInt(fields['max'])
                },
                location : fields['storageLocation']?._id,
                inventory : variant?._id,
                stock : parseInt(fields['inStock']),
            }
            console.log("Updated fields:", updatedFields);
            
            createLocationCall(updatedFields);
        }
    };

    const createLocationCall = (updatedFields) => {
        createInventoryLocation(inventoryGroup?._id, variant?._id, updatedFields)
            .then(_=>{
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {false}
                            onCancel = {()=> modal.closeAllModals()}
                            onAction = {()=> {
                                modal.closeAllModals();
                                setTimeout(()=>{
                                    onCreated();
                                },200)
                            }}
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
            })
            .catch(_=>{
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {true}
                            onCancel = {()=> {modal.closeAllModals(); onCancel()}}
                            onAction = {()=> {modal.closeAllModals(); onCancel()}}
                            message = "There was an issue performing this action"
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
            })
            .finally(_=>{

            })
    }

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
        let configRequiredFields = ['inStock', 'critical','low', 'ideal', 'max'];

        selectedIndex === 0 
            ? requiredFields = locationsRequiredFields 
            : requiredFields = configRequiredFields
    
        let errorObj = {...errorFields} || {}

        for (const requiredField of requiredFields) {

            if(!fields[requiredField]){
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }
            else if( 
                (requiredField ==='low' && parseInt(fields['low']) <= parseInt(fields['critical']) ) ||
                (requiredField ==='ideal' && parseInt(fields['ideal']) <= parseInt(fields['low']) ) ||
                (requiredField ==='max' && parseInt(fields['max']) <= parseInt(fields['ideal']) ) ||
                (requiredField ==='inStock' && parseInt(fields['inStock']) > parseInt(fields['max']) )
            ){
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }
            else{
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
            delete fields['storageLocation'];
        } else {
            onFieldChange('storageLocation')(item);
            setStorageSearchValue(item.name);
        }
       
        setStorageSearchResult([]);
        setStorageSearchQuery(false);
    }
    
    const detailsTab = (
        <>
            <Row>
                <FieldContainer maxWidth='100%'>
                    <SearchableOptionsField
                        label={"Storage"}
                        text={storageSearchValue}
                        value = {fields['storageLocation']}
                        oneOptionsSelected={(item)=>{onDestinationSelected(item); }}
                        onChangeText={value => {setStorageSearchValue(value); }}
                        onClear={
                            onDestinationSelected
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
                        label={"Critical"}
                        onChangeText={ (value) => {
                            if ((/^\d/g.test(value) || !value)) {
                                onFieldChange('critical')(value)
                            }
                        }}
                        keyboardType = "number-pad"
                        value={fields['critical']}
                        onClear={() => onFieldChange('critical')('')}
                        errorMessage = "Please provide a critical value"
                        hasError = {errorFields['critical']}
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
                        errorMessage = "Please provide an appropriate value"
                        hasError = {errorFields['low']}
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
                        errorMessage = "Please provide an appropriate value"
                        hasError = {errorFields['ideal']}
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
                        errorMessage = "Please provide an appropriate value"
                        hasError = {errorFields['max']}
                    />
                </FieldContainer>
            </Row>

            <Row>
                <FieldContainer maxWidth='50%'>
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
                        errorMessage = "Please provide an appropriate value"
                        hasError = {errorFields['inStock']}
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
