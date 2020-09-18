import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import OptionsField from '../common/Input Fields/OptionsField';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import styled, { css } from '@emotion/native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import EditLocked from "../../../assets/svg/editLockedIcon";
import { getPhysicians, getCategories, addCategory } from "../../api/network";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import Row from "../common/Row";
import _ from "lodash";
import Record from "../common/Information Record/Record";
import { useTheme } from "emotion-theming";
import TextEditor from "../common/Input Fields/TextEditor";
import { forEach } from "lodash";
import { set } from "numeral";
import TextArea from "../common/Input Fields/TextArea";
import InputFieldWithIcon from "../common/Input Fields/InputFieldWithIcon";
import { withModal } from "react-native-modalfy";
import { Divider } from "react-native-elements";

const LabelText = styled.Text`
color:${({ theme }) => theme.colors["--color-gray-600"]};
font:${({ theme }) => theme.font["--text-base-regular"]};
`
const InputWrapper = styled.View`
height:30px;
width:250px;
margin-top:5px;

`
const EditableEquipmentGroupTab = ({ onFieldChange, fields, handlePopovers, popoverList, modal }) => {


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
                console.log("results have", results);
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    const createCategory = () => {
        categorySearchResults.push(categorySearchValue);
        addCategory(categorySearchResults)
            .then(data => {
                console.log("added category", data)
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={onConfirmCancel}
                            onAction={onConfirmSave}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                )
            })
            .catch(error => {
                console.log("Failed to add category", error)
            })
    }
    let catPop = popoverList.filter(item => item.name === 'category')

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            enabled
            keyboardVerticalOffset={300}
            behavior={'padding'}
        >
            <View style={{ width: 600, alignSelf: "center", }}>
                <View style={{ width: "100%", flexDirection: "column", marginBottom: 20 }}>
                    <>


                        <Row>
                            <InputWrapper>
                                <InputField2
                                    label="Equipment"
                                    value={""}
                                    labelWidth={80}
                                    placeholder={fields['name']}
                                    enabled={true}
                                    editable={enabled}
                                />
                            </InputWrapper>

                            <InputWrapper>

                                <MultipleSelectionsField
                                    disabled={false}
                                    createNew={createCategory}
                                    label={"Category"}
                                    onOptionsSelected={onFieldChange('category')}
                                    options={categorySearchResults}
                                    searchText={categorySearchValue}
                                    onSearchChangeText={(value) => setCategorySearchValue(value)}
                                    onClear={() => { setCategorySearchValue('') }}
                                    handlePopovers={(value) => handlePopovers(value)('category')}
                                    isPopoverOpen={catPop[0].status}
                                />
                            </InputWrapper>
                        </Row>
                        <Row>

                            <InputWrapper>
                                <InputField2
                                    label="SKU"
                                    value={""}
                                    labelWidth={30}
                                    placeholder={fields['sku']}
                                    enabled={false}
                                    editable={enabled}
                                />
                            </InputWrapper>




                            <InputWrapper>

                                <InputField2
                                    label="Assigned"
                                    value={fields['assigned']}
                                    labelWidth={30}
                                    placeholder={"--"}
                                    enabled={true}

                                />
                            </InputWrapper>

                        </Row>
                        <Row>
                            <InputWrapper>

                                <OptionsField
                                    label="Status"
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

                            <InputWrapper>

                                <InputField2
                                    label="Supplier"
                                    value={""}
                                    labelWidth={30}
                                    placeholder={"--"}
                                    enabled={true}

                                />
                            </InputWrapper>
                        </Row>







                    </>

                </View>
                <Divider />
            </View>
        </KeyboardAvoidingView>


    )
}

EditableEquipmentGroupTab.propTypes = {};
EditableEquipmentGroupTab.defaultProps = {};

export default withModal(EditableEquipmentGroupTab)

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
