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
import ConfirmationComponent from "../ConfirmationComponent";
import {updateSupplierCall} from "../../api/network";
import LoadingIndicator from "../common/LoadingIndicator";
import {useModal} from "react-native-modalfy";

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

const SupplierDetailsTab = ({supplierId, onUpdated, order}) => {

    const fieldsBaseStateRef = useRef();
    const modal = useModal();
    const theme = useTheme();

    const {supplier = {}, status = ""} = order;
    const {pageState, setPageState} = useContext(PageContext);
    const [isUpdated, setUpdated] = useState(false);
    const [isLoading, setLoading] = useState(false)
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


    const [fields, setFields] = useState({});

    useEffect(() => {
        console.log("isEditMode", isEditMode)

        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        error={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState()
                            setPageState({...pageState, isEditMode: true})
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            updatedSupplier()
                        }}
                        message="Would you like to finish edit and save changes?"//general message you can send to be displayed
                        action="Yes"
                    />
                ),
                onClose: () => {
                    console.log('Modal closed');
                },
            });
        }

    }, [isEditMode])

    useEffect(() => {
        setFields({
            description,
            supplierNumber,
            name,
            phone,
            fax,
            email,
            representatives
        })
    }, [supplier])

    const onFieldUpdated = (field) => (value) => {
        setUpdated(true);
        setFields({
            ...fields,
            [field]: value
        })
    }

    const updatedSupplier = () => {

        const data = {
            supplierNumber: fields.supplierNumber,
            name: fields.name,
            phone: fields.phone,
            email: fields.email,
            fax: fields.fax,
            description: fields.description,
            // representatives: []
        }

        setLoading(true)
        updateSupplierCall(supplierId, data)
            .then(_ => {
                onUpdated(fields);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                // resetState()
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();

                            }}
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to update supplier", error)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                // resetState()
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();

                            }}
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => setLoading(false))

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
                            recordValue={fields['description'] || "--"}
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
                            recordValue={fields['supplierNumber'] || "--"}
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
                            recordValue={fields['name'] || "--"}
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
                            recordValue={fields['phone']}
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
                            recordValue={fields['fax']}
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
                            recordValue={fields['email']}
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

            {
                isLoading &&
                <LoadingIndicator/>
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
