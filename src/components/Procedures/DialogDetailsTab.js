import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, YellowBox} from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import {getPhysicians, getTheatres, getProcedures, getCategories} from "../../api/network";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";
import OptionsField from "../common/Input Fields/OptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


const DialogDetailsTab = ({onFieldChange, fields, handlePopovers,popoverList, errorFields, errors}) => {

    const templateText = {
        true: "Yes",
        false: "No"
    }

    const { serviceFee = 0 } = fields

    // Physicians Search
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Procedures Search
    const [searchProcedureValue, setSearchProcedureValue] = useState();
    const [searchProcedureResults, setSearcProcedurehResult] = useState([]);
    const [searchProcedureQuery, setSearchProcedureQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    const [fee, setFee] = useState(serviceFee)
    const [selectedPhysicican, setSelectedPhysician] = useState()

    // ######

    // Handle physicians search
    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysicians, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);

    // Handle procedures search
    useEffect(() => {

        if (!searchProcedureValue) {
            // empty search values and cancel any out going request.
            setSearcProcedurehResult([]);
            if (searchProcedureQuery.cancel) searchProcedureQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProcedures, 300);

        setSearchProcedureQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchProcedureValue]);

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

    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));
                console.log("Results: ", results)
                setSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchValue([]);
            })
    };

    const fetchProcedures = () => {
        getProcedures(searchProcedureValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    ...item
                }));

                setSearcProcedurehResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get procedures");
                setSearchProcedureValue([]);
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

    const handlePrice = (price) => {
        if (/^-?[0-9][0-9.]+$/g.test(price) || /^\d+$/g.test(price) || !price) {
            console.log("Service Fee: ", price)
            onFieldChange('serviceFee')(parseFloat(price))
        }
        setFee(price)
    }

    const handlePhysician = (value) => {
        const physician = value ? {
            _id: value._id,
            name: value.name
        } : value

        if(value === undefined || null ){
            delete fields['physician']
        }else{
            onFieldChange('physician')(physician);
        }
        
        // setSearchValue()
        setSearchResult([])
        setSearchQuery(undefined)
    }

    let refPop = popoverList.filter( item => item.name === 'reference')
    let physPop = popoverList.filter( item => item.name === 'physician')
    let catPop = popoverList.filter( item => item.name === 'category')

    return (
        <View style={[styles.sectionContainer]}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Reference"}
                        text={searchProcedureValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('reference')(item._id)
                        }}
                        onChangeText={value => setSearchProcedureValue(value)}
                        onClear={() => {
                            onFieldChange('reference')('');
                            setSearchProcedureValue('');
                        }}
                        options={searchProcedureResults}
                        handlePopovers = {(value)=>handlePopovers(value)('reference')}
                        isPopoverOpen = {refPop[0].status}
                    />
                </View>

            </View>

            <View
                style={{
                    height: 2,
                    backgroundColor: '#CCD6E0',
                    marginBottom: 20,
                    zIndex:-1
                }}
            />

            <View style={[styles.row,{zIndex:-1}]}>

                <View style={[styles.inputWrapper,{zIndex:-2}]}>
                    <InputField2
                        label={"Procedure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        // hasError = {errorFields['name']}
                        hasError = {errors['name']}
                        errorMessage = "Name must be assigned"
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <SearchableOptionsField
                        label={"Physician"} 
                        value = {fields['physician']}
                        text={searchValue}
                        oneOptionsSelected={(item) => {
                            handlePhysician(item)
                            // onFieldChange('physician')(item);
                        }}
                        onChangeText={value => setSearchValue(value)}
                        onClear={handlePhysician}
                            // onFieldChange('physician')('');
                            // setSearchValue('');
                        // }}
                        options={searchResults}
                        handlePopovers = {(value)=>handlePopovers(value)('physician')}
                        isPopoverOpen = {physPop[0].status}
                        hasError = {errors['physician']}
                        errorMessage = "Physician must be assigned"
                    />

                </View>

            </View>

            <View style={[styles.row, {zIndex:-2}]}>

                <View style={[styles.inputWrapper, {zIndex:-3}]}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={(value) => {
                            if (/^\d{9}/g.test(value).toString() || !value) {
                                onFieldChange('duration')(value)
                            }
                        }}
                        value={fields['duration']}
                        units={['hrs']}
                        keyboardType="number-pad"
                        hasError = {errors['duration']}
                        errorMessage = "Input estimated time (hours)."
                    />
                </View>

                <View style={[styles.inputWrapper,{zIndex:-3}]}>
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
                </View>
            </View>

            <View style={[styles.row, {zIndex:-3}]}>

                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Recovery ?"}
                        text={templateText[fields['hasRecovery']]}
                        oneOptionsSelected={onFieldChange('hasRecovery')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </View>

                <View style={[styles.inputWrapper]}>
                    <InputField2
                        label={"Service Fee"}
                        onChangeText={(value) => {handlePrice(value)}}
                        value={fee.toString()}
                        keyboardType={'number-pad'}
                        onClear={() => handlePrice('')}
                        hasError = {errors['serviceFee']}
                        errorMessage = "Cost is required."
                    />
                </View>

            </View>

        </View>
    )
}

DialogDetailsTab.propTypes = {}
DialogDetailsTab.defaultProps = {}

export default DialogDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
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
});
