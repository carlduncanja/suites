import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import InputField2 from "../common/Input Fields/InputField2";
import DropdownMultipleSelectField from "../common/Input Fields/DropdownMultipleSelectField";
import DropdownInputField from "../common/Input Fields/DropdownInputField";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import OptionsField from "../common/Input Fields/OptionsField";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import MultipleOptionsField from "../common/Input Fields/MultipleOptionsField";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import {getTheatres, searchSchedule} from "../../api/network";
import _ from "lodash";


const EquipmentDialogDetailsTab = ({onFieldChange, fields}) => {

    const [theatresSearchValue, setTheatreSearchValue] = useState();
    const [theatreSearchResults, setTheatreSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});


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


    const fetchTheatres = () => {
        console.log("searching for ", theatresSearchValue);
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


    return (
        <View style={styles.sectionContainer}>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <InputField2
                        label={"Equipment"}
                        onChangeText={onFieldChange('equipmentName')}
                        value={fields['equipmentName']}
                        onClear={() => onFieldChange('equipmentName')('')}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <MultipleOptionsField
                        label={"Category"}
                        text={fields['category']}
                        oneOptionsSelected={onFieldChange('category')}
                        // menuOption={
                        // <MenuOptions>
                        //     <MenuOption value={'sur'} text='Surgical'/>
                        //     <MenuOption value={'ele'} text='Electric'/>
                        // </MenuOptions>}
                        options={[
                            {
                                id: 'sur',
                                value: 'sur',
                                text: 'Surgical'
                            },
                            {
                                id: 'ele',
                                value: 'ele',
                                text: 'Electric'
                            }
                        ]}
                    />

                    {/* <DropdownMultipleSelectField
                        label={"Category"}
                        onSelectChange={onFieldChange('category')}
                        value={fields['category']}
                        dropdownOptions = {["Electric","Manual"]}
                    /> */}
                </View>
            </View>

            <View style={styles.row}>

                <View style={{width: 260}}>
                    <OptionsField
                        label={"Assignment"}
                        text={fields['assignment']}
                        oneOptionsSelected={onFieldChange('assignment')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'location'} text='Location'/>
                            </MenuOptions>
                        }
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <InputUnitField
                        label={"Usage"}
                        onChangeText={onFieldChange('usage')}
                        value={fields['usage']}
                        units={['hrs']}
                        keyboardType="number-pad"
                    />
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inputWrapper}>
                    <SearchableOptionsField
                        label={"Assigned"}
                        text={theatresSearchValue}
                        oneOptionsSelected={(item) => {
                            onFieldChange('assigned')(item.id)
                        }}
                        onChangeText={value => setTheatreSearchValue(value)}
                        onClear={() => {
                            onFieldChange('assigned')('');
                            setTheatreSearchValue('');
                        }}
                        options={theatreSearchResults}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <OptionsField
                        label={"Status"}
                        text={fields['status']}
                        oneOptionsSelected={onFieldChange('status')}
                        menuOption={
                            <MenuOptions>
                                <MenuOption value={'available'} text='Available'/>
                                <MenuOption value={'use'} text='In Use'/>
                            </MenuOptions>
                        }
                    />
                </View>
            </View>


        </View>
    )
}

EquipmentDialogDetailsTab.propTypes = {}
EquipmentDialogDetailsTab.defaultProps = {}

export default EquipmentDialogDetailsTab

const styles = StyleSheet.create({
    sectionContainer: {
        height: 200,
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
