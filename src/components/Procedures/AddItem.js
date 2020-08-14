import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import InputField2 from "../common/Input Fields/InputField2";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import AutoFillField from "../common/Input Fields/AutoFillField";

import { getInventories, getEquipmentTypes, getTheatres } from "../../api/network";
import _ from "lodash";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming'; 

const AdditemWrapper = styled.View`
    height: 245px;
    padding: ${ ({theme}) => theme.space['--space-24']};
`;
const AdditemContainer = styled.View`
    height: 100%;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    flex-direction: column;
`;

const ItemWrapper = styled.View`
    flex:1;
    max-width : 282px;
`;
const ItemContainer = styled.View`
    width : 100%;
    flex-direction : row;
`;

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

    


    return (
        <AdditemWrapper theme = {theme}>
            <AdditemContainer theme = {theme}>

            <Row>
                <FieldContainer>
                    <SearchableOptionsField
                        label={"Item Name"} 
                        value = {fields['inventory']}
                        text={searchValue}
                        oneOptionsSelected={(item) => {handleItem(item)}}
                        onChangeText={value => setSearchValue(value)}
                        onClear={handleItem}
                        options={searchResults}
                        // handlePopovers = {(value)=>handlePopovers(value)('item')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchQuery}
                        hasError = {errors['item']}
                        errorMessage = "Item must be selected"
                    />
                </FieldContainer>

                <FieldContainer>
                    <AutoFillField
                        label={"Category"}
                        value={category}
                    />
                </FieldContainer>
            </Row>

            <Row zIndex = {-1}>
                <FieldContainer>
                    <AutoFillField
                        label={"Type"}
                        value={'n/a'}
                    />
                </FieldContainer>
                {
                    category === 'Consumables' &&
                        <FieldContainer>
                            <InputField2
                                label={"Quantity"}
                                onChangeText={(value) => {handleAmount(value)}}
                                value={fields['amount']}
                                keyboardType={'number-pad'}
                                onClear={() => handleAmount('')}
                                hasError = {errors['amount']}
                                errorMessage = "Quantity is required."
                            />
                        </FieldContainer>
                }
                
            </Row>
           
            </AdditemContainer>
        </AdditemWrapper>
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