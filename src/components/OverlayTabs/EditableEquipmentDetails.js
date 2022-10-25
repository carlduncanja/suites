

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import InputField2 from '../common/Input Fields/InputField2';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import OptionsField from '../common/Input Fields/OptionsField';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import styled, { css } from '@emotion/native';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import Row from "../common/Row";
import _ from "lodash";
import { useTheme } from "emotion-theming";
import TextArea from '../common/Input Fields/TextArea';
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import Record from "../common/Information Record/Record";


const LabelText = styled.Text`
color:${({ theme }) => theme.colors["--color-gray-600"]};
font:${({ theme }) => theme.font["--text-base-regular"]};
`
const InputWrapper = styled.View`
height:30px;
width:170px;
margin:20px;

`
const EditableEquipmentDetails = ({ fields, onFieldChange, handlePopovers, popoverList, modal }) => {


    const theme = useTheme();
    const enabled = true;


    //Description
    const [descriptionValue, setDescriptionValue] = useState('');

    // Handle physicians search


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
                    enabled={false}
                    value={fields['description']}
                    onChangeText={onFieldChange('description')}
                    multiline={true}
                    numberOfLines={4}
                />
            </View>
            <>


                <Row>
                    <InputWrapper>
                        <LabelText theme={theme}>SKU</LabelText>
                        <InputField2
                            value={fields['sku']}
                            labelWidth={30}
                            enabled={true}
                            editable={enabled}
                            onChangeText={onFieldChange('sku')}
                            onClear={() => onFieldChange('sku')('')}
                        />
                    </InputWrapper>




                    <InputWrapper>
                        <LabelText theme={theme}>Assigned</LabelText>
                        <ResponsiveRecord
                            recordValue={fields['assigned']}
                            handleRecordPress={() => { }}
                        />
                    </InputWrapper>

                    <InputWrapper>
                        <LabelText theme={theme}>Status</LabelText>
                        <Record
                            recordValue={fields['status']}
                            valueColor="--color-orange-600"
                        />
                    </InputWrapper>
                </Row>


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