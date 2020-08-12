import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import InputField2 from "../common/Input Fields/InputField2";
import Row from '../common/Row';
import AutoFillField from "../common/Input Fields/AutoFillField";

import { getInventories, getEquipmentTypes, getTheatres } from "../../api/network";
import _ from "lodash";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

const AddItem = ({fields, errors, onFieldChange, category = ""}) => {
 
    const theme = useTheme();

    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState({});


    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.
        let searchFunction = category === 'Consumables' ? fetchInventories : category === 'Equipments' ? fetchEquipments : fetchTheatres

        const search = _.debounce(searchFunction, 300)

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]); 
 
    const fetchInventories = () => {
        getInventories(searchValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0} = results
                console.log("Results: ", data)
                setSearchResults(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories");
                setSearchResults([]);
            })
    };

   
    const fetchEquipments = () => {
        getEquipmentTypes(searchValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0} = results
                console.log("Results: ", data)
                setSearchResults(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get equipments");
                setSearchResults([]);
            })
    };

    const fetchTheatres = () =>{
        getTheatres(searchValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0} = results
                console.log("Results: ", data)
                setSearchResults(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchResults([]);
            })
    }


    const handleItem = (value) => {
        console.log("Value: ", value)
        // const item = value ? {
        //     _id: value._id,
        //     name: value.name,
        //     unitPrice : value.unitPrice
        // } : value

        if(value === undefined || null ){
            delete fields['item']
        }else{
            onFieldChange('item')(value);
        }
        
        // setSearchValue()
        setSearchResults([])
        setSearchQuery(undefined)
    }

    const handleAmount = (value) => {
        if (/^\d{9}/g.test(value).toString() || !value) {
            onFieldChange('amount')(value)
        }
    }

    // let {status} = popoverList.filter( item => item.name === 'item')[0];

    const AdditemWrapper = styled.View`

    `;
    const AdditemContainer = styled.View``;


    return (
        <View style={[styles.sectionContainer]}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Item Name"} 
                        value = {fields['inventory']}
                        text={searchValue}
                        oneOptionsSelected={(item) => {handleItem(item)}}
                        onChangeText={value => setSearchValue(value)}
                        onClear={handleItem}
                            // onFieldChange('physician')('');
                            // setSearchValue('');
                        // }}
                        options={searchResults}
                        // handlePopovers = {(value)=>handlePopovers(value)('item')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchQuery}
                        hasError = {errors['item']}
                        errorMessage = "Item must be selected"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <AutoFillField
                        label={"Category"}
                        value={category}
                    />
                </View>
            </View>

            <Row zIndex = {-1}>
                <View style={[styles.inputWrapper]}>
                    <AutoFillField
                        label={"Type"}
                        value={'n/a'}
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Quantity"}
                        onChangeText={(value) => {handleAmount(value)}}
                        value={fields['amount']}
                        keyboardType={'number-pad'}
                        onClear={() => handleAmount('')}
                        hasError = {errors['amount']}
                        errorMessage = "Quantity is required."
                    />
                </View>
            </Row>
            

            {/* <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Item Name"} 
                        value = {fields['inventory']}
                        text={searchInventoriesValue}
                        oneOptionsSelected={(item) => {
                            handleItem(item)
                            // onFieldChange('physician')(item);
                        }}
                        onChangeText={value => setSearchInventoriesValue(value)}
                        onClear={handleItem}
                            // onFieldChange('physician')('');
                            // setSearchValue('');
                        // }}
                        options={searchInventoriesResults}
                        handlePopovers = {(value)=>handlePopovers(value)('item')}
                        isPopoverOpen = {status}
                        hasError = {errors['item']}
                        errorMessage = "Item must be selected"
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Amount"}
                        onChangeText={(value) => {handleAmount(value)}}
                        value={fields['amount']}
                        keyboardType={'number-pad'}
                        onClear={() => handleAmount('')}
                        hasError = {errors['amount']}
                        errorMessage = "Amount is required."
                    />
                </View>

            </View>  */}

        </View>
    )
}

export default AddItem

const styles = StyleSheet.create({
    sectionContainer: {
        height: 160,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    inputWrapper: {
        width: 260,
        flexDirection: 'row',
    }

})