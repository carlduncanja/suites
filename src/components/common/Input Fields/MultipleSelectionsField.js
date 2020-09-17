import React, { useState } from "react";
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import DropDownIcon from "../../../../assets/svg/dropDown";
import RemoveIcon from "../../../../assets/svg/removeIcon";
import AddIcon from "../../../../assets/svg/addIcon";
import IconButton from "../Buttons/IconButton";
import CheckBoxComponent from '../Checkbox';
import { checkboxItemPress } from '../../../helpers/caseFilesHelpers';
import { createFilter } from 'react-native-search-filter';
import SearchableContainer from '../SearchableContainer';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useTheme } from 'emotion-theming';
import styled, { css } from '@emotion/native';
import InputLabelComponent from "../InputLablel";
import SearchableOptionsField from "./SearchableOptionsField";

const InputFieldWrapper = styled.View`
    flex:1;
    position: relative;
`;

const InputFieldContainer = styled.View`
    width : 100%;
    flex-direction: row;
    align-items: center;
`;

const TextInputWrapper = styled.View`
    flex:1;
    height : 32px;
`;
const TextInputContainer = styled.View`
    height : 100%;
    width : 100%;
    border-width: 1px;
    border-color: ${({ theme, hasError }) => hasError ? theme.colors['--color-red-600'] : theme.colors['--color-gray-300']};
    background-color : ${({ theme, backgroundColor }) => backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white']};
    border-radius: 4px;
`;



function MultipleSelectionsField({
    onOptionsSelected,
    disabled = false,
    createNew,
    label,
    value = [],
    options,
    searchText,
    onSearchChangeText,
    onClear,
    handlePopovers,
    isPopoverOpen,
    hasError = false
}) {

    console.log("Category options: ", options)
    let { name = "" } = value[0] || {}
    const theme = useTheme();

    const [selectedOption, setSelectedOption] = useState(name)
    const [checkedList, setCheckedList] = useState(value)
    const [isDisplay, setIsDisplay] = useState(false)

    const onCheckboxPress = (item) => {
        console.log("Item: ", item)
        let updatedList = [...checkedList]
        if (checkedList.includes(item)) {
            updatedList = updatedList.filter(filterItem => filterItem !== item)
        } else {
            updatedList = [...updatedList, item]
        }

        setCheckedList(updatedList)
        setSelectedOption(updatedList.length > 0 ? updatedList[0].name : "")
        // console.log("Updated List: ", updatedList)
        onOptionsSelected(updatedList)
    }

    const toggleCheckBox = () => {
        setIsDisplay(!isDisplay)
    }

    return (
        <InputFieldWrapper>
            <InputFieldContainer>

                {
                    label && <InputLabelComponent label={label} />
                }
                {/* <Text style={[
                    styles.textLabel, {
                        marginRight: label ? 20 : 0
                    }
                ]}>
                    {label}
                </Text>
                */}

                <TextInputWrapper>
                    <TextInputContainer theme={theme} hasError={hasError} backgroundColor={disabled ? "--color-gray-200" : null}>

                        <TouchableOpacity
                            onPress={() => { !disabled ? toggleCheckBox() && handlePopovers(true) : () => { } }}
                            style={[styles.inputField, {}]}
                        >
                            {
                                checkedList.length > 0 &&
                                <TouchableOpacity
                                    style={[styles.valueBox, { zIndex: -4 }]}
                                    onPress={
                                        onCheckboxPress(checkedList[0])
                                    }
                                >
                                    <Text style={{ padding: 3, paddingLeft: 5, marginRight: 5 }}>{selectedOption}</Text>
                                    <RemoveIcon />

                                </TouchableOpacity>
                            }
                            {
                                checkedList.length - 1 > 0 &&
                                <Text style={{
                                    fontSize: 14,
                                    color: '#3182CE',
                                    paddingLeft: 4
                                }}>
                                    +{checkedList.length - 1} more
                            </Text>
                            }

                            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                <IconButton
                                    Icon={<DropDownIcon />}
                                    //onPress={() => { }}
                                    onPress={() => { toggleCheckBox(); handlePopovers(true) }}
                                />
                            </View>

                        </TouchableOpacity>

                    </TextInputContainer>
                </TextInputWrapper>


                {isDisplay && isPopoverOpen &&

                    <View style={styles.menuOptionsContainer}>

                        <SearchableContainer
                            options={options}
                            onCheckboxPress={onCheckboxPress}
                            checkedList={checkedList}
                            searchText={searchText}
                            onSearchChangeText={onSearchChangeText}
                            onClear={onClear}
                        />



                        <View style={styles.footer}>
                            <TouchableOpacity onPress={createNew} style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                <AddIcon />
                                <Text style={{ paddingLeft: 10 }}>Create New</Text>
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: '#4299E1', fontSize: 12 }}>"{searchText}"</Text>
                            </View>
                        </View>
                    </View>

                }

            </InputFieldContainer>
        </InputFieldWrapper >
    )
}

MultipleSelectionsField.propTypes = {};
MultipleSelectionsField.defaultProps = {};

export default MultipleSelectionsField;


const optionsStyles = {
    optionsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0)"
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'#FFFFFF',
        // elevation:20

    },
    textLabel: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
    inputWrapper: {
        flex: 1,
        height: 32,
        borderColor: '#E3E8EF',
        borderRadius: 4,
        borderWidth: 1,
    },
    inputField: {
        // flex: 1,
        width: '100%',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderColor: '#E3E8EF',
        // borderRadius: 4,
        paddingRight: 4,
        paddingLeft: 4,
        height: 32,
    },
    menuOptionsContainer: {
        position: 'absolute',
        top: 32,
        padding: 12,
        paddingTop: 8,
        paddingBottom: 2,
        width: '100%',
        height: 150,
        maxHeight: 300,
        borderRadius: 8,
        // border: 1px solid #CCD6E0;
        borderWidth: 1,
        borderColor: '#CCD6E0',
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0.5,
            height: 2.5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10,
        zIndex: 1,

    },
    searchContainer: {
        padding: 10,
        paddingLeft: 6,
        paddingRight: 6,
        borderBottomColor: "#E3E8EF",
        borderBottomWidth: 1,
    },
    valueBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingRight: 3,
        borderColor: '#FEB2B2',
        borderWidth: 1,
        backgroundColor: '#FFF5F5',
        borderRadius: 2,
    },
    footer: {
        // flex:1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // alignSelf:'flex-end',
        height: 40,
        borderBottomColor: '#CCD6E0',
        borderBottomWidth: 1,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        // alignSelf:'flex-end',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: '#F8FAFB'
    }
});

