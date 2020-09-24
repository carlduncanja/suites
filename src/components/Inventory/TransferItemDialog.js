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
function TransferItemDialog({onCancel, onCreated, selectedLocation, variant}) {

    // ########## CONST
    const modal = useModal();
    const { name = "", storageLocations = [], inventoryGroup = {} } = variant;
    const storageLocationObj = storageLocations.filter( location => location?._id === selectedLocation)[0] || {} ;
    const { locationName = "", levels = {}, stock, location = "" } = storageLocationObj;
    const { low = 0} = levels;
    const available = parseInt(stock - low) < 0 ? 0 : parseInt(stock - low);
  

    console.log("Variant:", variant);

    const dialogTabs = ['Details', 'Configuration'];

    // ########## STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [fields, setFields] = useState({ priority : 'Not Urgent'});
    const [errorFields, setErrorFields] = useState({});
   
    // Storage Search
    const [storageSearchValue, setStorageSearchValue] = useState("");
    const [storageSearchResults, setStorageSearchResult] = useState([]);
    const [storageSearchQuery, setStorageSearchQuery] = useState({});

    // Theatre Search
    const [theatreSearchValue, setTheatreSearchValue] = useState("");
    const [theatreSearchResults, setTheatreSearchResult] = useState([]);
    const [theatreSearchQuery, setTheatreSearchQuery] = useState({});

    

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

    // Handle theatre search
    useEffect(() => {
        // console.log("Search: ", supplierSearchValue)
        if (!theatreSearchValue) {
            // empty search values and cancel any out going request.
            setTheatreSearchResult([]);
            if (theatreSearchQuery.cancel) theatreSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setTheatreSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [theatreSearchValue]);


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

    const fetchTheatres = () => {
        getTheatres(theatreSearchValue, 5)
            .then((theatreResults ) => {
                const { data = [], pages = 0} = theatreResults
                // console.log("Data: ", data)
                const results = data.map(item => ({
                    ...item
                }));

                setTheatreSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get suppliers", error);
                setTheatreSearchResult([]);
            })
    };

    // ########## EVENT LISTENERS
    

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        
        let isValid = validateTransfer()

        if(!isValid){ return }
        
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {
            // const referenceId = fields['product']
            const updatedFields = {
                from : storageLocationObj?.location,
                amount : (parseInt(fields['amount']).toString()),
                to : fields['to']?._id,
                priority : fields['priority']
            }
            console.log("Success:", updatedFields);
            
            createTransferCall(updatedFields);
            // onCreated(fields)
            // createInventoryCall(referenceId,fields)
        }
    };

    const onTabChange = (tab) => {
        console.log("Tab: ", tab);
        let isValid = validateTransfer();
        if(!isValid) {return}
        setSelectedTabIndex(dialogTabs.indexOf(tab))
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })
        console.log("Fieldname: ", fieldName, value);
        const updatedErrors = {...errorFields};
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);

    };

    const validateTransfer = () => {
        let isValid = true;
        let requiredFields = [];
        let detailsRequiredFields = ['to'];
        // let destinationRequiredFields = ['to'];
        let configurationRequiredFields = ['amount'];
        selectedIndex === 0 
            ? requiredFields = detailsRequiredFields 
            : requiredFields = configurationRequiredFields
    
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

    const createTransferCall = (transferToCreate) => {
        console.log("Group id: ",inventoryGroup?._id);
        console.log("Variant id: ",variant?._id);
        console.log("Dta: ", transferToCreate);

        createTransfer(inventoryGroup?._id, variant?._id, transferToCreate)
            .then(data => {
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {false}
                            onCancel = {()=> modal.closeAllModals()}
                            onAction = {()=> modal.closeAllModals()}
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
                // Alert.alert("Success","The transfer is successful.")
                setTimeout(() => {
                    onCreated(data)
                }, 400);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create transfer", error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {true}
                            onCancel = {()=> {modal.closeAllModals()}}
                            onAction = {()=> modal.closeAllModals()}
                            message = "There was an issue performing this action"
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
                // Alert.alert("Failed", "Failed to create a transfer")
            })
            .finally()
    
        };

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case "Details":
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
                    <AutoFillField
                        label = "Item Name"
                        value = {name}
                    />
                </FieldContainer>

                <FieldContainer>
                    <AutoFillField
                        label = "Location"
                        value = {locationName}
                    />
                </FieldContainer>
            </Row>

            <Row zIndex = {-1}>

                <FieldContainer>
                    <SearchableOptionsField
                        label={"Destination"}
                        text={storageSearchValue}
                        value = {fields['to']}
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
                        errorMessage = "Destination must be given."
                        hasError = {errorFields['to']}
                    />  
                </FieldContainer>
                {/* <FieldContainer>
                    {
                        locationName === 'Warehouse 1' || locationName === 'Warehouse 2' ?
                            <AutoFillField
                                label = "Location"
                                value = {'No Location Available'}
                            />
                            :

                            <OptionsField
                                label={"Location"}
                                text={fields['currentLocation']}
                                oneOptionsSelected={onFieldChange('currentLocation')}
                                menuOption={
                                    <MenuOptions>
                                        <MenuOption value={'Cabinet 1'} text='Cabinet 1'/>
                                        <MenuOption value={'Cabinet 2'} text='Cabinet 2'/>
                                    </MenuOptions>
                                }
                            />
                    }
                    
                </FieldContainer> */}
                
            </Row>


        </>
    );

    const configTab = (
        <>
            <Row>
                <FieldContainer>
                    {
                        available === 0 ?
                            <AutoFillField
                                label = "Requested"
                                value = {'0'}
                            />

                            :

                            <InputField2
                                label={"Requested"}
                                onChangeText={ (value) => {
                                    if ((/^\d/g.test(value) || !value) && value <= available) {
                                        onFieldChange('amount')(value)
                                    }
                                }}
                                keyboardType = "number-pad"
                                value={fields['amount']}
                                onClear={() => onFieldChange('amount')('')}
                            />

                    }
                </FieldContainer>
                <FieldContainer>
                    <AutoFillField
                        label = "Available"
                        value = {available|| 0}
                    />
                </FieldContainer>
            </Row>
            
            <Row>
                <FieldContainer>
                    <AutoFillField
                        label = "Reserved"
                        value = {low || 0}
                    />
                </FieldContainer>
                <FieldContainer>
                    <OptionsField
                        label={"Priority"}
                        text={fields['priority']}
                        oneOptionsSelected={onFieldChange('priority')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'Not Urgent'} text='Not Urgent'/>
                                <MenuOption value={'Normal'} text='Normal'/>
                                <MenuOption value={'Urgent'} text='Urgent'/>
                                <MenuOption value={'Very Urgent'} text='Very Urgent'/>
                            </MenuOptions>
                        }
                    />
                </FieldContainer>
            </Row>
        </>
       
    );

    return (
        <OverlayDialog
            title={"Item Transfer"}
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

                <OverlayDialogContent>
                    {getTabContent()}
                </OverlayDialogContent>
                
                {/* <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                >
                    {getTabContent()}
                </TouchableOpacity> */}
            </>
        </OverlayDialog>
    );
}

TransferItemDialog.propTypes = {};
TransferItemDialog.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height:240,
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


export default TransferItemDialog;
