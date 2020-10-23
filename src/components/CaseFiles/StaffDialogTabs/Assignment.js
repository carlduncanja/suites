import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionsField from "../../common/Input Fields/OptionsField";
import SearchableOptionsField from "../../common/Input Fields/SearchableOptionsField";

import { MenuOptions, MenuOption } from "react-native-popup-menu";
import _ from "lodash";
import { getPhysicians, getUsersCall } from "../../../api/network";
import styled from "@emotion/native";
import {useTheme} from "emotion-theming";


const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`

const InputWrapper = styled.View`
    width: 300px;
    flex-direction: row;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};
`

/**
 *
 * @param value
 * @param type
 * @param onStaffChange
 * @param errors
 * @param onErrorUpdate
 * @returns {*}
 * @constructor
 */
const Assignment = ({value, type, onStaffChange, errors = {}, onErrorUpdate}) => {
        // Fields is an object of arrays - Nurses and Physicians.
        // To change the field - add the item object to the specific araay depending on type
        // Eg: Type is Physician, check if exists, if not add the physicians.

        const theme = useTheme();

        const [searchValue, setSearchValue] = useState('')
        const [searchQuery, setSearchQuery] = useState({})
        const [searchResult, setSearchResults] = useState([]);

        const [selectedType, setSelectedType] = useState(type || "Physician")

        useEffect(() => {
            if (!searchValue) {
                // empty search values and cancel any out going request.
                setSearchResults([]);
                if (searchQuery.cancel) searchQuery.cancel();
                return;
            }

            // wait 300ms before search. cancel any prev request before executing current.

            const searchFunction = (selectedType === "Physician") ? fetchPhysicians : fetchNurses

            const search = _.debounce(searchFunction, 300);

            setSearchQuery(prevSearch => {
                if (prevSearch && prevSearch.cancel) {
                    prevSearch.cancel();
                }
                return search;
            });
            search()
        }, [searchValue])

        const fetchPhysicians = () => {
            getPhysicians(searchValue, 5)
                .then((physicianResult = []) => {
                    const { data = [], pages = 0 } = physicianResult
                    const results = data.map(item => ({
                        name: `Dr. ${item.surname}`,
                        ...item
                    }));
                    setSearchResults(results || []);

                })
                .catch(error => {
                    // TODO handle error
                    console.log("failed to get physicians");
                    setSearchResults([]);
                })
        };

        const fetchNurses = () => {
            getUsersCall(searchValue, 1,5)
                .then((userResult = []) => {
                    const { data = [], pages = 0 } = userResult
                    const filterUser = data.filter( user => user?.role?.name === 'Nurse');
                    const results = filterUser.map(item => ({
                        name: `Nurse ${item.last_name}`,
                        ...item
                    }));
                    console.group("Nurse results: ", results);
                    setSearchResults(results || []);

                })
                .catch(error => {
                    // TODO handle error
                    console.log("failed to get nurses");
                    setSearchResults([]);
                })
            // setSearchResults([
            //     {
            //         name: 'Nurse Hector',
            //         _id: '9824HIUAHFUIEH',
            //     },
            //     {
            //         name: 'Nurse John',
            //         _id: '67245HVAUYEGRV',
            //     }
            // ])
        }

        const onSelectType = (type) => {
            setSelectedType(type)
            setSearchValue('')
        }

        const handleClear = () => {
            onStaffChange(false, undefined)
            setSearchValue('')
            onErrorUpdate({})
        }

        console.log("assignments value", value, type);

        return (
            <View style={styles.sectionContainer}>
                <RowWrapper theme={theme} >
                    <InputWrapper >
                        <OptionsField
                            label={"Type"}
                            labelWidth={30}
                            text={selectedType}
                            oneOptionsSelected={(value) => {
                                onSelectType(value)
                            }}
                            menuOption={<MenuOptions>
                                <MenuOption value={"Physician"} text='Physician'/>
                                <MenuOption value={"Nurse"} text='Nurse'/>
                            </MenuOptions>}
                        />
                    </InputWrapper>
                </RowWrapper>

                <View style={styles.row}>
                    <View style={[styles.inputWrapper, {justifyContent: 'flex-start'}]}>
                        <Text style={{fontWeight: '500', fontSize: 14, color: '#323843'}}>{selectedType}</Text>
                    </View>
                </View>

                <RowWrapper theme={theme} >
                    <InputWrapper>
                        <SearchableOptionsField
                            label="Select"
                            labelWidth={30}
                            value={value}
                            text={searchValue}
                            oneOptionsSelected={(value) => {

                                const staff = {
                                    _id : value?._id,
                                    name : value?.name,
                                    type : selectedType
                                }

                                onStaffChange(staff)
                                onErrorUpdate({})
                            }}
                            onChangeText={(value) => setSearchValue(value)}
                            onClear={handleClear}
                            options={searchResult}
                            errorMessage={errors['name']}
                            hasError={errors['name']}
                        />
                    </InputWrapper>
                </RowWrapper>
            </View>
        )
    }

export default Assignment

const styles = StyleSheet.create({
    sectionContainer: {
        height: 260,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center'
    },
    inputWrapper: {
        width: 310,
        flexDirection: 'row',
    }
});
