import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import OptionsField from '../common/Input Fields/OptionsField';
import InputUnitField from '../common/Input Fields/InputUnitFields';

import { MenuOptions, MenuOption } from 'react-native-popup-menu';

import { getPhysicians, getCategories } from "../../api/network";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";


const AppointmentTab = ({ fields, onFieldChange }) => {

    // const {
    //     // supplier id
    //     _id,
    //     // supplier name
    //     supplier,
    //     assigned,
    //     status,
    //     usage,
    //     availableOn,
    //     categories,
    //     description
    // } = equipment

    // const [fields, setFields] = useState({
    //     // supplier name
    //     supplier : supplier,
    //     assigned : assigned,
    //     status : status ,
    //     usage : usage,
    //     availableOn : availableOn,
    //     categories : categories,
    //     description : description
    // })

    // Physicians Search
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

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

    const fetchCategory = () => {
        getCategories(categorySearchValue, 5)
            .then((data = []) => {
                const results = data.map(item => ({
                    _id: item,
                    name: item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            keyboardVerticalOffset={300}
            behavior={'padding'}
        >
            <View>

                <View style={styles.fieldWrapper}>
                    <View style={{ marginBottom: 5 }}>
                        <Text style={styles.title}>Procedure</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                    </View>
                </View>

                <View style={styles.row}>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Location</Text>
                        </View>


                    </View>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Category</Text>
                        </View>

                        {/* <View style={styles.inputWrapper}>
                            <SearchableOptionsField
                                text={searchValue}
                                oneOptionsSelected={(item) => {
                                    onFieldChange('physician')(item._id)
                                }}
                                onChangeText={value => setSearchValue(value)}
                                onClear={() => {
                                    onFieldChange('physician')('');
                                    setSearchValue('');
                                }}
                                options={searchResults}
                            />
                        </View> */}
                    </View>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Status</Text>
                        </View>

                        {/* <View style={styles.inputWrapper}>
                            <OptionsField
                                text={fields['status']}
                                oneOptionsSelected={onFieldChange('status')}
                                menuOption={<MenuOptions>
                                    <MenuOption value={"In Use"} text='In Use' />
                                    <MenuOption value={"Available"} text='Available' />
                                </MenuOptions>}
                            />
                        </View> */}
                    </View>

                </View>

                <View style={styles.row}>

                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Supplier</Text>
                        </View>

                        <View style={styles.inputWrapper}>

                        </View>
                    </View>



                    <View style={styles.fieldWrapper}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.title}>Available On</Text>
                        </View>

                        <View style={styles.inputWrapper}>

                        </View>
                    </View>

                </View>


                {/* <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options={categorySearchResults}
                        searchText={categorySearchValue}
                        onSearchChangeText={(value) => setCategorySearchValue(value)}
                        onClear={() => { setCategorySearchValue('') }}
                    />
                </View> */}
            </View>


        </KeyboardAvoidingView>


    )
}



export default AppointmentTab

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    fieldWrapper: {
        flex: 1,
        marginRight: 35,
        marginBottom: 30,
        flexDirection: 'column'
    },
    inputWrapper: {
        height: 30,
        justifyContent: 'center'
    },
    title: {
        color: '#718096',
        fontSize: 16,
        // marginBottom:5
    },
})
