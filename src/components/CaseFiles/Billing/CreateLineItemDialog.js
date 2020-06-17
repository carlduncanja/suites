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

const CreateLineItemDialog = ({onCreated, onCancel}) => {

    const modal = useModal();

    const [fields, setFields] = useState({ 
        name : '',
        type : '',
        unitPrice : '',
        amount : ''
    });

    const [popoverList, setPopoverList] = useState([
        {
            name : "name",
            status : false
        },
    ])

    const [errorFields, setErrorFields] = useState({
        name : false,
        unitPrice : false,
        amount : false,
    })

    // Inventory Search
    const [inventorySearchValue, setInventorySearchValue] = useState();
    const [inventorySearchResults, setInventorySearchResult] = useState([]);
    const [inventorySearchQuery, setInventorySearchQuery] = useState({});

    const [unitPriceText, setUnitPriceText] = useState(fields['unitPrice'])

    useEffect(() => {

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

    const fetchInventories = () => {
        getInventories(inventorySearchValue, 5)
            .then((data = []) => {
                // console.log("Data: ", data)
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

    const onPositiveClick = () => {

        let isNameError = errorFields['name']
        let isPriceError = errorFields['unitPrice']
        let isAmountError = errorFields['amount']

        fields['name'] === '' || null ? isNameError = true : isNameError = false
        fields['unitPrice'] === '' || null ? isPriceError = true : isPriceError = false
        fields['amount'] === '' || null ? isAmountError = true : isAmountError = false

        setErrorFields({
            ...errorFields,
            name : isNameError,
            unitPrice : isPriceError,
            amount : isAmountError,
        })

        if( isNameError === false && isAmountError === false && isPriceError === false){
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

    const handleName = (value) => {
        const { type = "Unknown" } = value
        if(value === ""){
            onFieldChange("name")("") &&
            onFieldChange('type')("")
        }else{
            onFieldChange('name')(value.name) &&
            onFieldChange('type')(type) 
        }
        
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

    let namePop = popoverList.filter( item => item.name === 'name')

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
                            <SearchableOptionsField
                                label={"Item Name"}
                                text={inventorySearchValue}
                                oneOptionsSelected={(item) => {
                                    handleName(item)
                                }}
                                onChangeText={value => {setInventorySearchValue(value)}}
                                onClear={() => {
                                    handleName("")
                                    setInventorySearchValue('');
                                }}
                                options={inventorySearchResults}
                                handlePopovers = {(value)=>handlePopovers(value)('name')}
                                isPopoverOpen = {namePop[0].status}
                                hasError = {errorFields['name']}
                                errorMessage = "Choose an item to add."
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            
                            <AutoFillField
                                label={"Item Type"}
                                value={fields['type']}
                            />

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
                                onChangeText={(value)=>onFieldChange('amount')(parseInt(value))}
                                value={fields['amount'].toString()}
                                onClear={() => onFieldChange('amount')('')}
                                keyboardType = {'number-pad'}
                                hasError = {errorFields['amount']}
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

export default CreateLineItemDialog

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
