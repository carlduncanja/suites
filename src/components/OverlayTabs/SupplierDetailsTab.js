import React, {useState, useEffect, useContext, useRef} from "react";
import {View, Text, StyleSheet} from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import LineDivider from '../common/LineDivider';

import {transformToSentence} from "../../utils/formatter";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {PageContext} from "../../contexts/PageContext";
import edit from "../../../assets/svg/edit";
import InputField2 from "../common/Input Fields/InputField2";
import InputLabelComponent from "../common/InputLablel";
import TextArea from "../common/Input Fields/TextArea";

const LineDividerContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-32']};
    margin-top : ${({theme}) => theme.space['--space-32']};
`;

const TextAreaWrapper = styled.View`
    width: 100%;
    height: 70px;
`;


const InputWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    z-index: ${({zIndex}) => zIndex};
    margin-right: 8px;
`

const RowWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${({theme}) => theme.space['--space-20']};
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`

const SupplierDetailsTab = ({order}) => {

    const fieldsBaseStateRef = useRef();
    const theme = useTheme();

    const {supplier = {}, status = ""} = order;
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const {
        description = "",
        supplierNumber = "",
        name = "",
        phone = "",
        fax = "",
        email = "",
        representatives = []
    } = supplier


    const [fields, setFields] = useState({
        description,
        supplierNumber,
        name,
        phone,
        fax,
        email,
        representatives
    });

    useEffect(() => {
        console.log("isEditMode", isEditMode)
    }, [isEditMode])


    const onFieldUpdated = (field) => (value) => {
        setFields({
            ...fields,
            [field]: value
        })
    }


    return (
        <>
            <RowWrapper theme={theme}>
                {
                    isEditMode
                        ? <InputWrapper>
                            <InputLabelComponent label={'Description'}/>
                            <TextAreaWrapper>
                                <TextArea
                                    onChangeText={onFieldUpdated('description')}
                                    value={fields['description']}
                                    multiline={true}
                                    numberOfLines={4}
                                    onClear={onFieldUpdated('description')}
                                />
                            </TextAreaWrapper>
                        </InputWrapper>
                        : <Record
                        recordTitle="Description"
                        recordValue={description || "--"}
                        flex={1}
                        editMode={isEditMode}
                        useTextArea={true}
                    />
                }
            </RowWrapper>

            <RowWrapper theme={theme}>
                {
                    isEditMode
                        ? <InputWrapper>
                            <InputLabelComponent label={'Supplier ID'}/>
                            <InputField2
                                value={fields.supplierNumber}
                                onChangeText={onFieldUpdated('supplierNumber')}
                                enabled={false}
                            />
                        </InputWrapper>
                    : <Record
                        recordTitle="Supplier ID"
                        recordValue={supplierNumber || "--"}
                        editMode={isEditMode}
                        editable={false}
                    />
                }
                {
                    isEditMode
                        ? <InputWrapper>
                            <InputLabelComponent label={'Supplier Name'}/>
                            <InputField2
                                value={fields['name']}
                                onChangeText={onFieldUpdated('name')}
                                enabled={true}
                            />
                        </InputWrapper>
                        : <Record
                        recordTitle="Supplier Name"
                        recordValue={name || "--"}
                        editMode={isEditMode}
                    />
                }
                {
                    isEditMode
                        ? <InputWrapper>
                            <InputLabelComponent label={'Status'}/>
                            <InputField2
                                value={fields['status']}
                                onChangeText={onFieldUpdated('status')}
                                enabled={false}
                            />
                        </InputWrapper>
                        : <Record
                            recordTitle="Status"
                            recordValue={transformToSentence(status) || "--"}
                            editMode={isEditMode}
                            editable={false}
                        />
                }
            </RowWrapper>

            <RowWrapper theme={theme}>
                {

                    !isEditMode
                        ? <ResponsiveRecord
                            recordTitle="Telephone"
                            recordValue={phone}
                            handleRecordPress={() => {
                            }}
                            editMode={isEditMode}
                        />

                        : <InputWrapper>
                            <InputLabelComponent label={'Telephone'}/>
                            <InputField2
                                value={fields['phone']}
                                onChangeText={onFieldUpdated('phone')}
                                enabled={true}
                            />
                        </InputWrapper>

                }


                {
                    !isEditMode
                        ? <Record
                            recordTitle="Fax"
                            recordValue={fax}
                        />
                        : <InputWrapper>
                            <InputLabelComponent label={'Fax'}/>
                            <InputField2
                                value={fields['fax']}
                                onChangeText={onFieldUpdated('fax')}
                                enabled={true}
                            />
                        </InputWrapper>
                }

                {
                    !isEditMode
                        ? <ResponsiveRecord
                            recordTitle="Email"
                            recordValue={email}
                            handleRecordPress={() => {
                            }}
                            editMode={isEditMode}
                        />
                        : <InputWrapper>
                            <InputLabelComponent label={'Email'}/>
                            <InputField2
                                value={fields['email']}
                                onChangeText={onFieldUpdated('email')}
                                enabled={true}
                            />
                        </InputWrapper>
                }
            </RowWrapper>

            <LineDividerContainer theme={theme}>
                <LineDivider/>
            </LineDividerContainer>

            {
                representatives.map((item, index) => {

                    return (
                        <RowWrapper theme={theme} key={index}>
                            <Record
                                recordTitle="Representative"
                                recordValue={item.name}
                            />
                            <ResponsiveRecord
                                recordTitle="Rep. Telephone"
                                recordValue={item.phone}
                                handleRecordPress={() => {
                                }}
                            />
                            <ResponsiveRecord
                                recordTitle="Rep. Email"
                                recordValue={item.email}
                                handleRecordPress={() => {
                                }}
                            />
                        </RowWrapper>
                    )
                })
            }
        </>
    )
}

SupplierDetailsTab.propTypes = {};
SupplierDetailsTab.defaultProps = {};

export default SupplierDetailsTab;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        alignItems: "flex-start",
    },
    inputWrapper: {
        flex: 1,
        paddingRight: 15
    }
})
