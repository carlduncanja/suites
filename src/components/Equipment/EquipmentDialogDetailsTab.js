import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet} from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionsField from "../common/Input Fields/OptionsField";
import MultipleOptionsField from "../common/Input Fields/MultipleOptionsField";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import {getTheatres, searchSchedule, getPhysicians, getEquipmentTypes, getCategories} from "../../api/network";
import _ from "lodash";

import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";

const EquipmentDialogDetailsTab = ({onFieldChange, fields }) => {

const testCategory = [
    {
        _id : '8hwHGuygf92',
        name : 'Surgical'
    },
    {
        _id : '8hopTEoud10',
        name : 'Electric'
    }
];
// const EquipmentDialogDetailsTab = ({onFieldChange, fields}) => {

    const [theatresSearchValue, setTheatreSearchValue] = useState();
    const [theatreSearchResults, setTheatreSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [physicianSearchValue, setPhysicianSearchValue] = useState();
    const [physicianSearchResults, setPhysicianSearchResult] = useState([]);
    const [physicianSearchQuery, setPhysicianSearchQuery] = useState({});

    const [typeSearchValue, setTypeSearchValue] = useState();
    const [typeSearchResults, setTypeSearchResult] = useState([]);
    const [typeSearchQuery, setTypeSearchQuery] = useState({});

    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    const assignmentOption = fields['assigmentType'] || ""

    // ######


    // Handle theatres search
    useEffect(() => {

        if (!theatresSearchValue) {
            // empty search values and cancel any out going request.
            setTheatreSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [theatresSearchValue]);

    // Hanlde physician search
    useEffect(() => {

        if (!physicianSearchValue) {
            // empty search values and cancel any out going request.
            setPhysicianSearchResult([]);
            if (physicianSearchQuery.cancel) physicianSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysician, 300);

        setPhysicianSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [physicianSearchValue]);

    // Hanlde type search
    useEffect(() => {

        if (!typeSearchValue) {
            // empty search values and cancel any out going request.
            setTypeSearchResult([]);
            if (typeSearchQuery.cancel) typeSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchEquipmentTypes, 300);

        setTypeSearchQuery(prevSearch => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [typeSearchValue]);

    // Hanlde category search
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
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchTheatres = () => {
        getTheatres(theatresSearchValue, 5)
            .then(data => {
                console.log("theatres search", data);
                setTheatreSearchResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setTheatreSearchValue([]);
            })
    };

    const fetchPhysician = () => {
        getPhysicians(physicianSearchValue, 5)
            .then(data => {
                const refinedResults = data.map(item => ({
                    name: `Dr. ${item.firstName} ${item.surname}`,
                    ...item
                }));
                setPhysicianSearchResult(refinedResults || []);
            })
            .catch(error => {
                // TODO handle error
                // console.log("failed to get theatres");
                setPhysicianSearchResult([]);
            })
    };

    const fetchEquipmentTypes = () => {
        getEquipmentTypes(typeSearchValue)
            .then(data => {
                console.log("Equip Data: ", data)
                setTypeSearchResult(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("Eroor:", error)
                setTypeSearchResult([]);
            })
    };

    const fetchCategory = () => {
        getCategories(categorySearchValue,5)
            .then(data => {
                const results = data.map(item => ({
                    _id : item,
                    name : item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("Failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }


    return (
        <View style={styles.sectionContainer}>

            <View style={[styles.row, {zIndex: 10}]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {categorySearchResults}
                        searchText = {categorySearchValue}
                        onSearchChangeText = {(value)=> setCategorySearchValue(value)}
                        onClear={()=>{setCategorySearchValue('')}}
                    />
                </View>
            </View>

            <View style={styles.row}>

                <View style={{width: 260}}>
                    <OptionsField
                        label={"Assignment"}
                        text={fields['assigmentType']}
                        oneOptionsSelected={onFieldChange('assigmentType')}
                        menuOption={
                        <MenuOptions>
                            <MenuOption value={'Physicians'} text='Physicians'/>
                            <MenuOption value={'Location'} text='Location'/>
                        </MenuOptions>
                        }
                    />

                </View>
                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Usage"}
                        onChangeText={(value)=>{
                            if (/^\d+$/g.test(value) || !value) {
                                onFieldChange('usage')(value)
                            }
                        }}
                        value={fields['usage']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View>
            </View>

            <View style={[styles.row, {zIndex: 1}]}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Assigned"}
                        text={
                            assignmentOption === 'Physicians' ?
                                physicianSearchValue
                                :
                                theatresSearchValue
                        }
                        oneOptionsSelected={(item) => {
                            assignmentOption === 'Physicians'?
                                onFieldChange('assigned')({physician : item._id})
                                :
                                onFieldChange('assigned')({theatre : item._id})
                        }}
                        onChangeText={value =>
                            assignmentOption === 'Physicians' ?
                                setPhysicianSearchValue(value)
                                :
                                setTheatreSearchValue(value)
                        }
                        onClear={() => {
                            onFieldChange('assigned')('');
                            assignmentOption === 'Physicians' ?
                                setPhysicianSearchValue('')
                                :
                                setTheatreSearchValue('');
                        }}
                        options={
                            assignmentOption === 'Physicians' ?
                                physicianSearchResults
                                :
                                theatreSearchResults
                        }
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Status"}
                        text={fields['status']}
                        oneOptionsSelected={onFieldChange('status')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'Available'} text='Available'/>
                                <MenuOption value={'In Use'} text='In Use'/>
                            </MenuOptions>
                        }
                    />
                </View>

            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Type"}
                        text={typeSearchValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('type')(item._id)
                        }}
                        onChangeText={value => setTypeSearchValue(value)}
                        onClear={() => {
                            onFieldChange('type')('');
                            setTypeSearchValue('');
                        }}
                        options={typeSearchResults}
                    />
                </View>
            </View>


        </View>
    )
};


EquipmentDialogDetailsTab.propTypes = {}
EquipmentDialogDetailsTab.defaultProps = {}

export default EquipmentDialogDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 230,
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
