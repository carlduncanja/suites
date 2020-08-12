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
import {createInventoryVariant, getInventories, getCategories, getSuppliers,} from "../../api/network";
import { addInventory } from "../../redux/actions/InventorActions";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";
import { currencyFormatter } from '../../utils/formatter';


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */
function CreateInventoryDialogContainer({onCancel, onCreated, addInventory}) {

    // ########## CONST
    const modal = useModal();
    const dialogTabs = ['Details', 'Configuration'];

    // ########## STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [unitPriceText, setUnitPriceText] = useState(0);
    const [customPriceText, setCustomPriceText] = useState(0)
    const [fields, setFields] = useState({});
    const [errorFields, setErrorFields] = useState({})
    const [popoverList, setPopoverList] = useState([
        {
            name : "product",
            status : false
        },
        {
            name : "supplier",
            status : false
        }
    ])

    // Inventory Search
    const [inventorySearchValue, setInventorySearchValue] = useState();
    const [inventorySearchResults, setInventorySearchResult] = useState([]);
    const [inventorySearchQuery, setInventorySearchQuery] = useState({});

    // Suppliers Search
    const [supplierSearchValue, setSupplierSearchValue] = useState();
    const [supplierSearchResults, setSupplierSearchResult] = useState([]);
    const [supplierSearchQuery, setSupplierSearchQuery] = useState({});

    

    // ########## LIFECYCLE METHODS

    // Handle inventories search
    useEffect(() => {
        // console.log("Search: ", inventorySearchValue)
        if (!inventorySearchValue) {
            // empty search values and cancel any out going request.
            setInventorySearchResult([]);
            if (inventorySearchQuery.cancel) inventorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventories, 300);

        setInventorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [inventorySearchValue]);

    // Handle suppliers search
    useEffect(() => {
        // console.log("Search: ", supplierSearchValue)
        if (!supplierSearchValue) {
            // empty search values and cancel any out going request.
            setSupplierSearchResult([]);
            if (supplierSearchQuery.cancel) supplierSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchSuppliers, 300);

        setSupplierSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [supplierSearchValue]);


    const fetchInventories = () => {
        getInventories(inventorySearchValue, 5)
            .then((inventoryResults = {}) => {
                const { data = [], pages = 0 } = inventoryResults
                console.log("Data: ", data)
                const results = data.map(item => ({
                    ...item
                }));

                setInventorySearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories", error);
                setInventorySearchResult([]);
            })
    };

    const fetchSuppliers = () => {
        getSuppliers(supplierSearchValue, 5)
            .then((supplierData ) => {
                const { data = [], pages = 0} = supplierData
                // console.log("Data: ", data)
                const results = data.map(item => ({
                    ...item
                }));

                setSupplierSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get suppliers", error);
                setSupplierSearchResult([]);
            })
    };

    // ########## EVENT LISTENERS
    
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

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        
        let isValid = validateInventory()

        if(!isValid){ return }
        
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {
            const referenceId = fields['product']
            console.log("Success:", fields, referenceId)
            
            // onCreated(fields)
            createInventoryCall(referenceId,fields)
        }
    };

    const onTabChange = (tab) => {
        let isValid = validateInventory()
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

    const validateInventory = () => {
        let isValid = true
        let requiredFields = ['name','product','supplier']
        selectedIndex === 0 ? requiredFields = requiredFields : requiredFields = [...requiredFields,'unitCost','markup']
    
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

    const handleUnitPrice = (value) => {
        let price = value.replace(/[^0-9.]/g, "")
        if (/^\d+(\.\d{1,2})?$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('unitCost')(parseFloat(price))
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(price) || !price){
            setUnitPriceText(price)
        }
        
    }

    const handleCustomPrice = (value) => {
        let price = value.replace(/[^0-9.]/g, "")
        if (/^\d+(\.\d{1,2})?$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('customPrice')(parseFloat(price))
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(price) || !price){
            setCustomPriceText(price)
        }
        
    }

    const createInventoryCall = (id, itemToCreate) => {
        createInventoryVariant(id, itemToCreate)
            .then(data => {
                addInventory(data)
                modal.closeAllModals();
                Alert.alert("Success","The inventory item has been successfully created.")
                setTimeout(() => {
                    onCreated(data)
                }, 400);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create inventory", error);
                Alert.alert("Failed", "Failed to create an inventory item")
            })
            .finally()
    };

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case "Configuration":
                return configTab;
            case "Details":
                return detailsTab;
            default:
                return <View/>
        }
    };

    let refPop = popoverList.filter( item => item.name === 'product')
    let supplierPop = popoverList.filter( item => item.name === 'supplier')

    let markupPrice = currencyFormatter(fields['unitCost']*((100 + parseFloat(fields['markup']))/100) || 0) 

    const detailsTab = (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Reference"}
                        text={inventorySearchValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('product')(item._id)
                        }}
                        onChangeText={value => {setInventorySearchValue(value); console.log("Value:", value)}}
                        onClear={() => {
                            onFieldChange('product')('');
                            setInventorySearchValue('');
                        }}
                        options={inventorySearchResults}
                        handlePopovers = {(value)=>handlePopovers(value)('product')}
                        isPopoverOpen = {inventorySearchQuery}
                        errorMessage = "Reference must be given."
                        hasError = {errorFields['product']}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Item Name"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError = {errorFields['name']}
                        errorMessage = "Name must be filled."
                    />
                </View>
            </View>

            <View style={[styles.row,{zIndex:-2}]}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Supplier"}
                        text={supplierSearchValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('supplier')(item._id)
                        }}
                        onChangeText={value => {setSupplierSearchValue(value); console.log("Value:", value)}}
                        onClear={() => {
                            onFieldChange('supplier')('');
                            setSupplierSearchValue('');
                        }}
                        options={supplierSearchResults}
                        handlePopovers = {(value)=>handlePopovers(value)('supplier')}
                        isPopoverOpen = {supplierSearchQuery}
                        hasError = {errorFields['supplier']}
                        errorMessage = "Select the supplier for item."
                    />
                
                </View>

            </View>

        </View>
    );

    const configTab = (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Unit Price"}
                        onChangeText={(value) => { handleUnitPrice(value )}}
                        value={`$ ${unitPriceText.toString()}`}
                        keyboardType={'number-pad'}
                        onClear={() => handleUnitPrice('')}
                        hasError = {errorFields['unitCost']}
                        errorMessage = "Price must be provided."
                    />
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Markup"}
                        onChangeText={(value)=>{
                            if (/^\d+\.?\d{0,2}$/g.test(value) || !value) {
                                onFieldChange('markup')(value)
                            }
                        }}
                        value={fields['markup']}
                        units={['%']}
                        keyboardType="number-pad"
                        hasError = {errorFields['markup']}
                        errorMessage = "Add markup value"
                    />
                </View>

                <View style={[styles.inputWrapper,{alignItems:'center'}]}>
                    <Text style={{color:'#A0AEC0', fontSize:14}}>@{fields['markup']}:{markupPrice}</Text>
                </View>

            </View>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Custom Price"}
                        onChangeText={(value) => { handleCustomPrice(value )}}
                        value={`$ ${customPriceText.toString()}`}
                        keyboardType={'number-pad'}
                        onClear={() => handleCustomPrice('')}
                    />
                </View>

            </View>
        
            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Barcode"}
                        onChangeText={onFieldChange('barcode')}
                        value={fields['barcode']}
                        onClear={() => onFieldChange('barcode')('')}
                    />
                </View>
            </View>
        
        </View>
    );

    return (
        <OverlayDialog
            title={"Create Inventory Item"}
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

CreateInventoryDialogContainer.propTypes = {};
CreateInventoryDialogContainer.defaultProps = {};

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

const mapDispatcherToProps = {
    addInventory
};

export default connect(null, mapDispatcherToProps)(CreateInventoryDialogContainer);
