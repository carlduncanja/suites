import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import TouchableRecord from "../common/Information Record/TouchableRecord";
import { formatDate, formatToCurrency, handleNumberValidation } from "../../utils/formatter";
import { formatAmount } from "../../helpers/caseFilesHelpers";
import { transformToSentence } from "../../hooks/useTextEditHook";
import DateInputField from '../common/Input Fields/DateInputField';
import LineDivider from "../common/LineDivider";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import ConfirmationComponent from '../ConfirmationComponent';
import { getStorage, updatePurchaseOrder, updatePurchaseOrderDetails } from '../../api/network';
import { useModal } from "react-native-modalfy";
import FieldContainer from "../common/FieldContainerComponent";
import InputWrapper from "../common/Input Fields/InputWrapper";
import InputLabelComponent from "../common/InputLablel";
import InputField2 from "../common/Input Fields/InputField2";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import Footer from "../common/Page/Footer";


const LineDividerContainer = styled.View`
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
`;


const OrderDetailsTab = ({
    order = {},
    onUpdate,
}) => {

    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const {
        _id,
        deliveryDate = "",
        nextOrderDate = "",
        repeating = false,
        repeatingType = "",
        status = "",
        total = 0,
        supplier = {},
        invoice = {},
        storageLocation,
        configStatus = "",
        approvedBy = {},
        receivedBy = {},
        requestedBy = {},
        supplier_tax = 0,
        shipping_cost = 0,
        payment_method = "",
        notes = "", 
        
    } = order

    const { description = "", representatives = [] } = supplier;
    const { name = "" } = storageLocation || {};

    const [fields, setFields] = useState({
        description,
        deliveryDate,
        storageLocation,
        notes,
        supplier_tax,
        shipping_cost,
        payment_method
    });
    const [isUpdated, setUpdated] = useState(false)
    const [locationSearchText, setLocationSearchText] = useState('');

    const [locationSearchResults, setLocationSearchResults] = useState('');
    const [searchLocationQuery, setSearchLocationQuery] = useState('');

    useEffect(() => {
        baseStateRef.current = {
            description,
            deliveryDate,
            storageLocation,
            notes,
            supplier_tax,
            shipping_cost,
            payment_method
        }
        return () => {
            baseStateRef.current = {}
        }
    }, []);

    useEffect(() => {
        setFields({
            description,
            deliveryDate,
            storageLocation,
            notes,
            supplier_tax,
            shipping_cost,
            payment_method
        })
    }, [order])

    useEffect(() => {

        if (pageState.isEditMode) {
            baseStateRef.current = fields // save the base state for as we enter edit mode.
        }

        if (pageState.isEditMode === false && isUpdated) {
            handleDetailsUpdate();
            setUpdated(false);
        }
    }, [pageState.isEditMode])

    useEffect(() => {
        if (!locationSearchResults) {
            // empty search values and cancel any out going request.
            setLocationSearchResults([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchStorageLocation, 300);

        setSearchLocationQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [locationSearchText]);

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    };

    function formatNumberField(value) {
        return value.toString().replace(/[^\d.]/g,'');
    }

    const onFieldChange = (fieldName) => (value) => {
       

        let finalValue = value;
        if (fieldName === 'supplier_tax' || fieldName === 'shipping_cost') {
            const formattedValue = formatNumberField(value);
            finalValue = formattedValue;
        }

        setFields({
            ...fields,
            [fieldName]: finalValue
        });
        
        setUpdated(true);
    };

    const handleDetailsUpdate = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                        setUpdated(false);
                        resetState()
                        // setPageState({...pageState, isEditMode: true})
                    }}
                    onAction={() => {
                        updateDetails();
                        modal.closeAllModals();
                    }}
                    // onAction = { () => confirmAction()}
                    message={"Do you want to save your changes ?"}
                />
                ,
                onClose: () => {
                    modal.closeModals('ConfirmationModal')
                }
            })
    }

    const fetchStorageLocation = () => {
        getStorage(locationSearchText, 5)
            .then((locationsInfo) => {
                const { data = [], pages } = locationsInfo;
                setLocationSearchResults(data || []);
            })
            .catch((error) => {
                console.log("failed to get procedures");
                setLocationSearchResults([]);
            });
    }

    const onLocationSearchTextUpdated = (value) => {
        setLocationSearchText(value)
    }

    const updateDetails = () => {
        let updatedFields = {
            ...fields,
            deliveryDate: fields['deliveryDate'].toString(),
            description: fields['description'] ? fields['description'] : '',
            storageLocation: fields.storageLocation && fields.storageLocation._id,
            notes: fields['notes'] ? fields['notes'] : '',
            supplier_tax: fields['supplier_tax'] ? fields['supplier_tax'] : 0,
            shipping_cost: fields['shipping_cost'] ? fields['shipping_cost'] : 0,
            payment_method: fields['payment_method'] ? fields['payment_method'] : ''
        }
        
        updatePurchaseOrderDetails(_id, updatedFields)
            .then(_ => {
                modal.openModal('ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal')
                            }}
                            onCancel={() => {
                                modal.closeModals('ConfirmationModal')
                            }}
                        />
                        , onClose: () => {
                            modal.closeModals('ConfirmationModal')
                        }
                    })
            })
            .catch(error => {
                modal.openModal('ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals('ConfirmationModal')
                            }}

                            onCancel={() => {
                                setPageState({
                                    ...pageState,
                                    isEditMode: true
                                });
                                modal.closeModals('ConfirmationModal')
                            }}
                        />
                        ,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal')
                        }
                    })
            })
            .finally(_ => {
                onUpdate()
            })
    }
    return (
        <>
            <>

                <Row>
                    <Record
                        recordTitle="Description"
                        recordValue={fields['description']}
                        editMode={isEditMode}
                        recordPlaceholder={'No description available'}
                        editable={true}
                        useTextArea={true}
                        onRecordUpdate={onFieldChange('description')}
                        onClearValue={() => {
                            onFieldChange('description')('')
                        }}
                    />
                </Row>

                <Row>
                    <TouchableRecord
                        recordTitle="Invoice"
                        recordValue={invoice?.invoiceNumber || ""}
                    />

                    <Record
                        recordTitle="Order Total"
                        recordValue={formatAmount(total) || 0}
                    />

                    <Record
                        recordTitle="Status"
                        recordValue={transformToSentence(status) || ""}
                    />
                </Row>

                <Row zIndex={3}>
                    <Record
                        recordTitle="Ordered On"
                        recordValue={formatDate(nextOrderDate, "DD/MM/YYYY") || "--"}
                    />


                    <Record
                        recordTitle="Delivered On"
                        recordValue={isEditMode ? fields['deliveryDate'] : formatDate(deliveryDate, 'DD/MM/YYYY')}
                        editMode={isEditMode}
                        editable={true}
                        useDateField={true}
                        minDate={new Date()}
                        onClearValue={() => {
                            onFieldChange('deliveryDate')('')
                        }}
                        onRecordUpdate={(date) => {
                            onFieldChange('deliveryDate')(date)
                        }}
                    />

                    {
                        isEditMode
                            ? <InputWrapper zIndex={3}>
                                <InputLabelComponent label={'Storage Location'} />
                                <SearchableOptionsField
                                    value={fields.storageLocation}
                                    text={locationSearchText}
                                    options={locationSearchResults}
                                    oneOptionsSelected={(value) => {
                                        setLocationSearchResults([]);
                                        setLocationSearchText('');
                                        onFieldChange('storageLocation')(value)
                                    }}
                                    onClear={() => {
                                        setLocationSearchResults([]);
                                        setLocationSearchText('');
                                        // onFieldChange('storageLocation')(value)
                                        onFieldChange('storageLocation')()
                                    }}
                                    onChangeText={onLocationSearchTextUpdated}
                                />
                            </InputWrapper>
                            : <TouchableRecord
                                recordTitle="Storage Location"
                                recordValue={fields?.storageLocation?.name || '--'}
                            />
                    }


                </Row>

                <Row>
                    <Record
                        recordTitle="Requested by"
                        recordValue={`${requestedBy?.first_name || '--'} ${requestedBy?.last_name || ''} `}
                    />

                    <Record
                        recordTitle="Approved by"
                        recordValue={`${approvedBy?.first_name || '--'} ${approvedBy?.last_name || ''}`}
                    />

                    <Record
                        recordTitle="Received by"
                        recordValue={`${receivedBy?.first_name || '--'} ${receivedBy?.last_name || ''}`}
                    />
                </Row>

                <LineDividerContainer theme={theme}>
                    <LineDivider />
                </LineDividerContainer>

                <Row>
                    <Record
                        recordTitle="Type"
                        recordValue={repeating ? "Repeating" : "Non Repeating"}
                    />
                    <Record
                        recordTitle="Repeats"
                        recordValue={repeatingType}
                    />
                    <Record
                        recordTitle="Configuration Status"
                        recordValue={configStatus}
                        valueColor="#38A169"
                    />

                </Row>

                <LineDividerContainer theme={theme}>
                    <LineDivider />
                </LineDividerContainer>

                <Row>
                    <Record
                        recordTitle="Payment Method"
                        recordValue={fields['payment_method']}
                        recordPlaceholder={'Edit to add key notes for this order'}
                        editMode={isEditMode}
                        editable={true}
                        onClearValue={() => {
                            onFieldChange('payment_method')('')
                        }}
                        onRecordUpdate={onFieldChange('payment_method')}
                    />

                    <Record
                        recordTitle="Suppliers Tax"
                        recordValue={isEditMode ? `${fields['supplier_tax']}` : `${fields['supplier_tax']}%`}
                        recordPlaceholder={'Edit to add key notes for this order'}
                        editMode={isEditMode}
                        editable={true}
                        onClearValue={() => {
                            onFieldChange('supplier_tax')('')
                        }}
                        onRecordUpdate={onFieldChange('supplier_tax')}
                    />

                    <Record
                        recordTitle="Shipping Cost"
                        recordValue={isEditMode ? `${fields['shipping_cost']}` : formatToCurrency.format(fields['shipping_cost'])}
                        recordPlaceholder={'--'}
                        editMode={isEditMode}
                        editable={true}
                        onClearValue={() => {
                            onFieldChange('shipping_cost')('')
                        }}
                        onRecordUpdate={onFieldChange('shipping_cost')}
                    />
                </Row>

                <LineDividerContainer theme={theme}>
                    <LineDivider />
                </LineDividerContainer>

                <Row>
                    <Record
                        recordTitle="Notes"
                        recordValue={fields['notes']}
                        editMode={isEditMode}
                        recordPlaceholder={'Edit to add key notes for this order'}
                        editable={true}
                        useTextArea={true}
                        onRecordUpdate={onFieldChange('notes')}
                        onClearValue={() => {
                            onFieldChange('notes')('')
                        }}
                    />
                </Row>

            </>

            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </>
    )
}

export default OrderDetailsTab

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        alignItems: "flex-start"
    },
    inputWrapper: {
        flex: 1,
        paddingRight: 15,
    }
})
