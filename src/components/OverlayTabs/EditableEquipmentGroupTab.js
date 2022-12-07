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
import ConfirmationComponent from "../ConfirmationComponent";

const LabelText = styled.Text`
  color: ${({ theme }) => theme.colors["--color-gray-600"]};
  font: ${({ theme }) => theme.font["--text-base-regular"]};
`
const InputWrapper = styled.View`
  height: 30px;
  width: 250px;
  margin-top: 10px;

`
const EditableEquipmentGroupTab = ({ onFieldChange, fields, handlePopovers, popoverList, modal }) => {


    const theme = useTheme();
    const enabled = true;

    // Category Search
    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);

    //Description
    const [descriptionValue, setDescriptionValue] = useState('');

    const values = 
    useEffect(() => {
        fetchCategories();
    }, [categorySearchValue])

    const fetchCategories = () => {
        getCategories("equipment", 1000, categorySearchValue)
            .then(data => {
                setCategorySearchResult(data.data.map(item => { return item.name }));
                categories.length == 0 && setCategories(data.data)
            })
            .catch(error => {
                console.log('Unable to retrieve iventory category items: ', error);
            });
    }

    const createCategory = (name) => {
        if (!name) return;
        addCategory({ name: name, type: "equipment" })
            .then(_ => {
                setCategories([]);
                fetchCategories();
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
            })
            .catch(error => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
                console.log(error);
            })
    }

    const handleCategorySelected = (checkCategories) => {
        const categoryIds = [];
        checkCategories.map((name) => {
            const value = categories.find(item => item.name === name);
            value && categoryIds.push(value._id);
        })
        onFieldChange('categories')(categoryIds)
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
                <View style={{ width: "100%", flexDirection: "column", marginBottom: 30 }}>
                    <>

                        <View style={{ height: 220, width: 620, marginBottom: 20 }}>
                            <Row>
                                <LabelText theme={theme}>Description</LabelText>
                            </Row>
                            <TextArea
                                value={fields['description']}
                                onChangeText={onFieldChange('description')}
                                onClear={() => onFieldChange('description')('')}
                                multiline={true}
                                numberOfLines={4}
                            />
                        </View>
                        <Row>
                            <InputWrapper>
                                <InputField2
                                    label="Unit Price"
                                    value={fields['unitPrice'].toString()}
                                    labelWidth={98}
                                    onClear={() => onFieldChange('unitPrice')(0)}
                                    onChangeText={(value) => {
                                        console.log(value);
                                        const intValue = parseInt(value);
                                        if (!isNaN(value)) {
                                            onFieldChange('unitPrice')(value)
                                        }
                                    }}
                                    enabled={true}
                                />
                            </InputWrapper>

                            <InputWrapper>
                                <InputField2
                                    label="Name"
                                    value={fields['name']}
                                    labelWidth={98}
                                    onChangeText={onFieldChange('name')}
                                    enabled={true}
                                />
                            </InputWrapper>

                        </Row>
                        <Row>
                            <MultipleSelectionsField
                                label={"Category"}
                                value={fields['categories'].map(x=> x.name)}
                                onOptionsSelected={(value) => handleCategorySelected(value)}
                                options={categorySearchResults}
                                createNew={() => createCategory(categorySearchValue)}
                                searchText={categorySearchValue}
                                onSearchChangeText={(value) => setCategorySearchValue(value)}
                                onClear={() => { setCategorySearchValue('') }}
                                handlePopovers={() => { }}
                                isPopoverOpen={true}
                                height={250}
                            />
                        </Row>
                    </>

                </View>
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
