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
color:${({ theme }) => theme.colors["--color-gray-600"]};
font:${({ theme }) => theme.font["--text-base-regular"]};
`
const InputWrapper = styled.View`
height:30px;
width:250px;
margin-top:10px;

`
const EditableEquipmentGroupTab = ({ onFieldChange, fields, handlePopovers, popoverList, modal }) => {


    const theme = useTheme();
    const enabled = true;



    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});
    const [catBodyToSend, setcatBodyToSend] = useState([]);

    //Description
    const [descriptionValue, setDescriptionValue] = useState('');



    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }


        console.log('What is being searched:', categorySearchValue)
        const search = _.debounce(fetchCategory, 300);


        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();

    }, [categorySearchValue]);

    // useEffect(() => {
    //     if (!categorySearchValue) {
    //         setCategorySearchResult([])
    //     }
    //     console.log('What being searched with?', categorySearchValue);
    //     fetchCategory(categorySearchValue);

    // }, [categorySearchValue])



    const fetchCategory = () => {
        getCategories(categorySearchValue)
            .then((data = []) => {

                setCategorySearchResult(data)

            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                //setCategorySearchResult([])
            }).finally(_ => {
                return
            })

    }

    const onConfirmSave = () => {
        modal.closeModals("ConfirmationModal");
    }

    const onConfirmCancel = () => {
        modal.closeModals("ConfirmationModal");
    }
    const createCategory = () => {
        catBodyToSend.push(categorySearchValue);

        addCategory(catBodyToSend)
            .then(data => {
                console.log("added category", data)
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message="Completed succesfully"
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
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            message="Failed to add new category"
                            onCancel={onConfirmCancel}
                            onAction={onConfirmSave}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                )
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
                                    label="SKU"
                                    value={fields['sku']}
                                    labelWidth={98}
                                    onChangeText={onFieldChange('sku')}
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
                                createNew={createCategory}
                                label={"Category"}
                                value={fields['categories']}
                                onOptionsSelected={(value) => onFieldChange('categories')(value)}
                                options={categorySearchResults}
                                searchText={categorySearchValue}
                                onSearchChangeText={(value) => setCategorySearchValue(value)}
                                onClear={() => { setCategorySearchValue('') }}
                                handlePopovers={(value) => handlePopovers(value)('category')}
                                isPopoverOpen={catPop[0].status}
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
