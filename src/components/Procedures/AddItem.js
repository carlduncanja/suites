import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import InputField2 from "../common/Input Fields/InputField2";

import Table from '../common/Table/Table';
import Paginator from "../common/Paginators/Paginator";
import Button from '../common/Buttons/Button';
import { getInventories } from "../../api/network";
import { useNextPaginator,usePreviousPaginator } from '../../helpers/caseFilesHelpers';
import _ from "lodash";

const AddItem = ({fields, handlePopovers, popoverList, errors, onFieldChange}) => {

    const [searchInventoriesValue, setSearchInventoriesValue] = useState("")
    const [searchInventoriesResults, setSearchInventoriesResults] = useState([])
    const [searchInventoriesQuery, setSearchInventoriesQuery] = useState({});
    

    useEffect(() => {

        if (!searchInventoriesValue) {
            // empty search values and cancel any out going request.
            setSearchInventoriesResults([]);
            if (searchInventoriesQuery.cancel) searchInventoriesQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventories, 300);

        setSearchInventoriesQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchInventoriesValue]);
 
    const fetchInventories = () => {
        getInventories(searchInventoriesValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                setSearchInventoriesResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories");
                setSearchInventoriesResults([]);
            })
    };

    const handleItem = (value) => {
        const item = value ? {
            _id: value._id,
            name: value.name
        } : value

        if(value === undefined || null ){
            delete fields['item']
        }else{
            onFieldChange('item')(item);
        }
        
        // setSearchValue()
        setSearchInventoriesResults([])
        setSearchInventoriesQuery(undefined)
    }

    const handleAmount = (value) => {
        if (/^\d{9}/g.test(value).toString() || !value) {
            onFieldChange('amount')(value)
        }
    }

    let {status} = popoverList.filter( item => item.name === 'item')[0]

    return (
        <View style={[styles.sectionContainer]}>

            <View style={styles.row}>

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

            </View> 

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