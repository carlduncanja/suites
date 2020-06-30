import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import InputField2 from "../common/Input Fields/InputField2";

import Table from '../common/Table/Table';
import Paginator from "../common/Paginators/Paginator";
import Button from '../common/Buttons/Button'; 
import { getTheatres } from "../../api/network";
import { useNextPaginator,usePreviousPaginator } from '../../helpers/caseFilesHelpers';
import _ from "lodash";

const AddTheatreItem = ({fields, handlePopovers, popoverList, errors, onFieldChange}) => {

    const [searchTheatresValue, setSearchTheatresValue] = useState("")
    const [searchTheatresResults, setSearchThetresResults] = useState([])
    const [searchTheatresQuery, setSearchTheatresQuery] = useState({});
     

    useEffect(() => {

        if (!searchTheatresValue) {
            // empty search values and cancel any out going request.
            setSearchThetresResults([]);
            if (searchTheatresQuery.cancel) searchTheatresQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchTheatresQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchTheatresValue]); 
 
    const fetchTheatres = () => {
        getTheatres(searchTheatresValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    ...item
                }));
                setSearchThetresResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories");
                setSearchThetresResults([]);
            })
    };

    const handleItem = (value) => {
        const item = value ? {
            _id: value._id,
            name: value.name,
            status : value.status,
            isRecovery : value.isRecovery
        } : value

        if(value === undefined || null ){
            delete fields['item']
        }else{
            onFieldChange('item')(item);
        }
        
        // setSearchValue()
        setSearchThetresResults([])
        setSearchTheatresQuery(undefined)
    }

    let {status} = popoverList.filter( item => item.name === 'item')[0]

    return (
        <View style={[styles.sectionContainer]}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Item Name"} 
                        value = {fields['theatre']}
                        text={searchTheatresValue}
                        oneOptionsSelected={(item) => {
                            handleItem(item)
                            // onFieldChange('physician')(item);
                        }}
                        onChangeText={value => setSearchTheatresValue(value)}
                        onClear={handleItem}
                            // onFieldChange('physician')('');
                            // setSearchValue('');
                        // }}
                        options={searchTheatresResults}
                        handlePopovers = {(value)=>handlePopovers(value)('item')}
                        isPopoverOpen = {status}
                        hasError = {errors['item']}
                        errorMessage = "Item must be selected"
                    />
                </View>

            </View> 

        </View>
    )
}

export default AddTheatreItem

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