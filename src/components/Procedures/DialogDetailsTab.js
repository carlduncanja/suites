import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import {getPhysicians, getTheatres} from "../../api/network";
import OptionSearchableField from "../common/Input Fields/OptionSearchableField";
import OptionsField from "../common/Input Fields/OptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


const DialogDetailsTab = ({onFieldChange, fields}) => {

    const recoveryText = {
        true: "Yes",
        false: "No"
    };
    const templateText = {
        true: "Yes",
        false: "No"
    }
    const testCategory = [
        {
            _id : 'surgical',
            name : 'Surgical'
        },
        {
            _id : 'electrical',
            name : 'Electrical'
        }
    ]

    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


    // ######


    // Handle theatres search
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
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);


    const fetchPhysicians = () => {
        getPhysicians(searchValue, 5)
            .then((data = []) => {


                const results = data.map(item => ({
                    name: `Dr. ${item.surname}`,
                    ...item
                }));

                setSearchResult(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchValue([]);
            })
    };

    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Reference"}
                        onChangeText={onFieldChange('reference')}
                        value={fields['reference']}
                        onClear={() => onFieldChange('reference')('')}
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <OptionsField
                        label={"Template ?"}
                        text={templateText[fields['isTemplate']]}
                        oneOptionsSelected={onFieldChange('isTemplate')}
                        menuOption={<MenuOptions>
                            <MenuOption value={true} text='Yes'/>
                            <MenuOption value={false} text='No'/>
                        </MenuOptions>}
                    />
                </View>

            </View>

            <View
                style={{
                    height: 2,
                    backgroundColor: '#CCD6E0',
                    marginBottom: 20
                }}
            />

            <View style={styles.row}>

                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Procedure"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    {/*<InputField2 */}
                    {/*    label={"Physician"}*/}
                    {/*    onChangeText={onFieldChange('physician')}*/}
                    {/*    value={fields['physician']}*/}
                    {/*    onClear={() => onFieldChange('physician')('')}*/}
                    {/*/>*/}

                    <SearchableOptionsField
                        label={"Physician"}
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


                </View>

            </View>

            <View style={styles.row}>

                {/* <View style={styles.inputWrapper}>
                    <DropdownInputField
                        label={"Location"}
                        onSelectChange={onFieldChange('location')}
                        value={fields['location']}
                        dropdownOptions = {["Operating Room 1","Operating Room 2", "Operating Room 3", "Operating Room 4", "Operating Room 5"]}
                    /> */}
                {/*</View>*/}

                <View style={styles.inputWrapper}>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {testCategory}
                        keysToFilter = {['name']}
                    />
                </View>
            </View>

            <View style={[styles.row]}>

                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Duration"}
                        onChangeText={onFieldChange('duration')}
                        value={fields['duration']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View>

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
