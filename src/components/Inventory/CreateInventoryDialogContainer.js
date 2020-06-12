import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker, Alert, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import {createInventories, getInventories, getCategories} from "../../api/network";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from "lodash";


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */
function CreateInventoryDialogContainer({onCancel, onCreated, addTheatre}) {

    const modal = useModal();
    const dialogTabs = ['Details', 'Configuration'];
    const [selectedIndex, setSelectedTabIndex] = useState(0);


    const [fields, setFields] = useState({
        name: "",
        unitPrice: "",
        category: "",
        referenceName: "",
        sku: "",
        barCode: "",
    });

    const [errorFields, setErrorFields] = useState({
        name : false,
        unitPrice : false
    })

    const [popoverList, setPopoverList] = useState([
        {
            name : "reference",
            status : false
        },
        {
            name : "category",
            status : false
        }
    ])

    // Inventory Search
    const [inventorySearchValue, setInventorySearchValue] = useState();
    const [inventorySearchResults, setInventorySearchResult] = useState([]);
    const [inventorySearchQuery, setInventorySearchQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    const [unitPriceText, setUnitPriceText] = useState(fields['unitPrice'])

    // Handle inventories search
    useEffect(() => {
        console.log("Search: ", inventorySearchValue)
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

    // Handle category search
    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCategory, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchInventories = () => {
        getInventories(inventorySearchValue, 5)
            .then((data = []) => {
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

    const fetchCategory = () => {
        getCategories(categorySearchValue,5)
            .then((data = [])=>{
                const results = data.map(item => ({
                    _id : item,
                    name : item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

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
        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1)
        } else {

            let isNameError = errorFields['name']
            let isPriceError = errorFields['unitPrice']
            let tabIndex = selectedIndex
            if(fields['name'] === '' || null){
                isNameError = true
                tabIndex = 0
            }else{
                isNameError = false
            }
            if(fields['unitPrice'] === '' || null){
                isPriceError = true
                tabIndex = 1
            } else {
                isPriceError = false
            }

            setErrorFields({
                ...errorFields,
                name: isNameError,
                unitPrice : isPriceError,
            })

            setSelectedTabIndex(tabIndex)

            if(isNameError === false && isPriceError === false){
                console.log("Success")
                createInventoryCall()
            }


        }
    };

    const onTabChange = (tab) => {
        setSelectedTabIndex(dialogTabs.indexOf(tab))
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handleUnitPrice = (price) => {
        if (/^-?[0-9][0-9.]+$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('unitPrice')(price)
        }
        setUnitPriceText(price)
    }

    const createInventoryCall = () => {
        createInventories(fields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {
                    onCreated(data)
                }, 200);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create inventory", error);
                Alert.alert("Failed", "failed to created inventory item")
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

    let refPop = popoverList.filter( item => item.name === 'reference')
    let catPop = popoverList.filter( item => item.name === 'category')

    const detailsTab = (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Reference"}
                        text={inventorySearchValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('referenceName')(item._id)
                        }}
                        onChangeText={value => {setInventorySearchValue(value); console.log("Value:", value)}}
                        onClear={() => {
                            onFieldChange('referenceName')('');
                            setInventorySearchValue('');
                        }}
                        options={inventorySearchResults}
                        handlePopovers = {(value)=>handlePopovers(value)('reference')}
                        isPopoverOpen = {refPop[0].status}
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
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {categorySearchResults}
                        searchText = {categorySearchValue}
                        onSearchChangeText = {(value)=> setCategorySearchValue(value)}
                        onClear={()=>{setCategorySearchValue('')}}
                        handlePopovers = {(value)=>handlePopovers(value)('category')}
                        isPopoverOpen = {catPop[0].status}
                    />

                    {/* <InputField2
                        label={"Category"}
                        onChangeText={onFieldChange('category')}
                        value={fields['category']}
                        onClear={() => onFieldChange('category')('')}
                    /> */}
                </View>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Supplier"}
                        onChangeText={onFieldChange('supplier')}
                        value={fields['supplier']}
                        onClear={() => onFieldChange('supplier')('')}
                    />
                </View>
            </View>

            <View style={[styles.row,{zIndex:-3}]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"SKU"}
                        onChangeText={onFieldChange('sku')}
                        value={fields['sku']}
                        onClear={() => onFieldChange('sku')('')}
                    />
                </View>

                <View style={styles.inputWrapper}/>

            </View>

            <View style={[styles.row,{zIndex:-4}]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Barcode"}
                        onChangeText={onFieldChange('barcode')}
                        value={fields['barcode']}
                        onClear={() => onFieldChange('barcode')('')}
                    />
                </View>

                <View style={styles.inputWrapper}/>
            </View>

        </View>
    );

    const configTab = (
        <View style={styles.sectionContainer}>
            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Unit"}
                        onChangeText={onFieldChange('unit')}
                        value={fields['unit']}
                        onClear={() => onFieldChange('unit')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Unit of Measure"}
                        text={fields['unitOfMeasure']}
                        oneOptionsSelected={onFieldChange('unitOfMeasure')}
                        menuOption={<MenuOptions>
                            <MenuOption value={'Glove Boxes'} text='Glove Boxes'/>
                            <MenuOption value={'Pack'} text='Pack'/>
                        </MenuOptions>}
                    />
                    {/* <InputField2
                        label={"Unit Of Measure"}
                        onChangeText={onFieldChange('unitOfMeasure')}
                        value={fields['unitOfMeasure']}
                        onClear={() => onFieldChange('unitOfMeasure')('')}
                    /> */}
                </View>
            </View>

            <View style={styles.row}>
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
                <View style={styles.inputWrapper}/>
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

const mapDispatcherToProps = {};

export default connect(null, mapDispatcherToProps)(CreateInventoryDialogContainer);
