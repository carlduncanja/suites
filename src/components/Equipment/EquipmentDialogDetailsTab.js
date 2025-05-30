import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionsField from "../common/Input Fields/OptionsField";
// import MultipleOptionsField from "../common/InputFields/MultipleOptionsField";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import { getTheatres, searchSchedule, getPhysicians, getEquipmentTypes, getCategories } from "../../api/network";
import _ from "lodash";

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
// import OptionSearchableField from "../common/InputFields/OptionSearchableField";

const EquipmentDialogDetailsTab = ({ onFieldChange, fields, handlePopovers, popoverList, errorFields }) => {

    const testCategory = [
        {
            _id: '8hwHGuygf92',
            name: 'Surgical'
        },
        {
            _id: '8hopTEoud10',
            name: 'Electric'
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
            if (prevSearch && prevSearch.cancel) {
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
            if (prevSearch && prevSearch.cancel) {
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
            if (prevSearch && prevSearch.cancel) {
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
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchTheatres = () => {
        getTheatres(theatresSearchValue, 5)
            .then((theatresResult = {}) => {
                const { data = [], pages = 0 } = theatresResult
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
            .then((physiciansResult = {}) => {
                const { data = [], pages = 0 } = physiciansResult
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
            .then((equipmentsResult) => {
                const { data = [], pages = 0 } = equipmentsResult
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
        getCategories(categorySearchValue)
            .then((categoriesResult = {}) => {
                const { data = [], pages = 0 } = categoriesResult
                const results = data.map(item => ({
                    _id: item,
                    name: item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("Failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    let assignedPop = popoverList.filter(item => item.name === 'assigned')
    let typePop = popoverList.filter(item => item.name === 'type')
    let catPop = popoverList.filter(item => item.name === 'category')

    return (
        <View style={styles.sectionContainer}>

            <View style={[styles.row, { zIndex: 10 }]}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError={errorFields['name']}
                        errorMessage="Name must be filled."
                    />
                </View>
                <View style={styles.inputWrapper}>
                    {/*<MultipleSelectionsField*/}
                    {/*    label={"Category"}*/}
                    {/*    onOptionsSelected={onFieldChange('category')}*/}
                    {/*    options={categorySearchResults}*/}
                    {/*    searchText={categorySearchValue}*/}
                    {/*    onSearchChangeText={(value) => setCategorySearchValue(value)}*/}
                    {/*    onClear={() => { setCategorySearchValue('') }}*/}
                    {/*    handlePopovers={(value) => handlePopovers(value)('category')}*/}
                    {/*    isPopoverOpen={catPop[0].status}*/}
                    {/*/>*/}
                </View>
            </View>

            <View style={[styles.row, { zIndex: -2 }]}>

                <View style={{ width: 260 }}>
                    <OptionsField
                        label={"Assignment"}
                        text={fields['assigmentType']}
                        oneOptionsSelected={onFieldChange('assigmentType')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'Physician'} text='Physician' />
                                <MenuOption value={'Location'} text='Location' />
                            </MenuOptions>
                        }
                    />

                </View>
                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Usage"}
                        onChangeText={(value) => {
                            if (/^\d+$/g.test(value) || !value) {
                                onFieldChange('usage')(value)
                            }
                        }}
                        value={fields['usage']}
                        units={['hrs']}
                        keyboardType="number-pad"
                        hasError={errorFields['usage']}
                        errorMessage="Add hours greater than 0"
                    />
                </View>
            </View>

            <View style={[styles.row, { zIndex: -3 }]}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Assigned"}
                        text={
                            assignmentOption === 'Physician' ?
                                physicianSearchValue
                                :
                                theatresSearchValue
                        }
                        oneOptionsSelected={(item) => {
                            assignmentOption === 'Physician' ?
                                onFieldChange('assigned')({ physician: item._id })
                                :
                                onFieldChange('assigned')({ theatre: item._id })
                        }}
                        onChangeText={value =>
                            assignmentOption === 'Physician' ?
                                setPhysicianSearchValue(value)
                                :
                                setTheatreSearchValue(value)
                        }
                        onClear={() => {
                            onFieldChange('assigned')('');
                            assignmentOption === 'Physician' ?
                                setPhysicianSearchValue('')
                                :
                                setTheatreSearchValue('');
                        }}
                        options={
                            assignmentOption === 'Physician' ?
                                physicianSearchResults
                                :
                                theatreSearchResults
                        }
                        handlePopovers={(value) => handlePopovers(value)('assigned')}
                        isPopoverOpen={assignedPop[0].status}
                        hasError={errorFields['assignment']}
                        errorMessage={`Must select a ${fields['assigmentType']}`}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Status"}
                        text={fields['status']}
                        oneOptionsSelected={onFieldChange('status')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'Available'} text='Available' />
                                <MenuOption value={'In Use'} text='In Use' />
                            </MenuOptions>
                        }
                    />
                </View>

            </View>

            <View style={[styles.row, { zIndex: -4 }]}>
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
                        handlePopovers={(value) => handlePopovers(value)('type')}
                        isPopoverOpen={typePop[0].status}
                        hasError={errorFields['type']}
                        errorMessage="Select a type to classify equipment."
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
