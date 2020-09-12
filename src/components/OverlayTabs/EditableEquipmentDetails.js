import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import OptionsField from '../common/Input Fields/OptionsField';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import styled, { css } from '@emotion/native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import EditLocked from "../../../assets/svg/editLockedIcon";
import { getPhysicians, getCategories } from "../../api/network";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import Row from "../common/Row";
import Record from "../common/Information Record/Record";
import { useTheme } from "emotion-theming";
import TextEditor from "../common/Input Fields/TextEditor";
import { forEach } from "lodash";
import { set } from "numeral";
import TextArea from "../common/Input Fields/TextArea";
import InputFieldWithIcon from "../common/Input Fields/InputFieldWithIcon";

const LabelText = styled.Text`
color:${({ theme }) => theme.colors["--color-gray-600"]};
font:${({ theme }) => theme.font["--text-base-regular"]};
`
const InputWrapper = styled.View`
height:30px;
width:170px;
margin:20px;

`
const EditableEquipmentDetails = ({ fields, onFieldChange }) => {

    const theme = useTheme();
    const enabled = true;

    // Physicians Search
    const [searchValue, setSearchValue] = useState();
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    //Description
    const [descriptionValue, setDescriptionValue] = useState('');

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
            <View style={{ height: 220, width: 620 }}>
                <Row>
                    <LabelText theme={theme}>Description</LabelText>
                </Row>
                <TextArea
                    value={fields['description']}
                    onChangeText={(value) => setDescriptionValue(value)}
                />
            </View>
            <>


                <View style={{ height: 100, width: 300, flexDirection: "row" }}>
                    <InputWrapper>
                        <LabelText theme={theme}>SKU</LabelText>
                        <InputField2

                            value={""}
                            labelWidth={30}
                            placeholder={fields['sku']}
                            enabled={false}
                            editable={enabled}
                        />
                    </InputWrapper>




                    <InputWrapper>
                        <LabelText theme={theme}>Assigned</LabelText>
                        <InputField2
                            value={fields['assigned']}
                            labelWidth={30}
                            placeholder={"--"}
                            enabled={true}

                        />
                    </InputWrapper>

                    <InputWrapper>
                        <LabelText theme={theme}>Status</LabelText>
                        <OptionsField
                            key={fields['status']}
                            text={fields['status']}
                            oneOptionsSelected={onFieldChange('Status')}
                            menuOption={<MenuOptions>
                                <MenuOption value={"Available"} text='Available' />
                                <MenuOption value={"Servicing"} text='Servicing' />
                                <MenuOption value={"Damaged"} text='Damaged' />
                                <MenuOption value={"In Use"} text='In Use' />
                            </MenuOptions>}

                        />
                    </InputWrapper>

                </View>


            </>


        </KeyboardAvoidingView>


    )
}

EditableEquipmentDetails.propTypes = {};
EditableEquipmentDetails.defaultProps = {};

export default EditableEquipmentDetails

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
