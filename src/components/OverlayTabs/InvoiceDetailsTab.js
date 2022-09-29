import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import ResponsiveRecord from "../common/Information Record/ResponsiveRecord";
import { formatDate } from "../../utils/formatter";
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


const InvoiceDetailsTab =({
    invoice={},
    onUpdate,
})=>{
    const theme = useTheme();
    const modal = useModal();
    const baseStateRef = useRef();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState; 
    
    const {
        _id,
        status="",
        amountPaid="",
        productList=[],
        type="",
        invoiceNumber="",
        purchaseOrder={},
        supplier={},
        description="",
        total="",
        amountDue="",
        lineItems="",
        equipmentList =[],
        inventoryList=[],
        proceduresBillableItems=[],
        createdAt= "",
        updatedAt= "",
    }=invoice
    
    const { representatives = [] } = supplier;
    const {storageLocation=""}=purchaseOrder
    
    const [feilds,setFields]=useState({
        description,
        createdAt,
        storageLocation
    })
    
    const [isUpdated, setUpdated] = useState(false)
    const [locationSearchText, setLocationSearchText] = useState('');

    const [locationSearchResults, setLocationSearchResults] = useState('');
    const [searchLocationQuery, setSearchLocationQuery] = useState('');
    
    useEffect(() => {
        baseStateRef.current = {
            description,
            createdAt,
            storageLocation
        }
        return () => {
            baseStateRef.current = {}
        }
    }, []); 

    useEffect(() => {
        setFields({
            description,
            createdAt,
            storageLocation
        })
    }, [invoice])
    

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



    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
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
                    <ResponsiveRecord
                        recordTitle="Purchase Order ID"
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
                        recordValue={formatDate(createdAt, "DD/MM/YYYY") || "--"}
                    />


                    <Record
                        recordTitle="Delivered On"
                        recordValue={isEditMode ? fields['deliveryDate'] : formatDate(updatedAt, 'DD/MM/YYYY')}
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
                            : <ResponsiveRecord
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


            </>

            <Footer
                hasActions={false}
                hasPaginator={false}
            />
        </>
    )
}

export default InvoiceDetailsTab

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