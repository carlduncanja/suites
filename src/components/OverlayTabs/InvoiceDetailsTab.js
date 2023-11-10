import React, { useRef, useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Record from "../common/Information Record/Record";
import Row from "../common/Row";
import TouchableRecord from "../common/Information Record/TouchableRecord";
import { formatDate } from "../../utils/formatter";
import { formatAmount } from "../../helpers/caseFilesHelpers";
import { transformToSentence } from "../../hooks/useTextEditHook";
import DateInputField from '../common/Input Fields/DateInputField';
import LineDivider from "../common/LineDivider";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from "../../contexts/PageContext";
import ConfirmationComponent from '../ConfirmationComponent';
import { updateInvoiceDetails} from '../../api/network';
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
        total=0,
        amountDue="",
        lineItems="",
        equipmentList =[],
        inventoryList=[],
        proceduresBillableItems=[],
        createdAt= "",
        updatedAt= "",
        approvedBy = {},
        receivedBy = {},
        requestedBy = {},
       
    }=invoice
    
    const { representatives = [] } = supplier;
    const {storageLocation=""}=purchaseOrder
    
    const [fields,setFields]=useState({
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
    

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        });
        setUpdated(true);
    }; 

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
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

    const updateDetails =()=>{
        let updatedField={
            ...fields,
            description: fields["description"]
        } 
        updateInvoiceDetails(_id,updatedField)
        .then(_ =>{
            console.log("Sucess")
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
            console.log("Update Invioce description error: ", error);
            modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={isError}
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
                        recordTitle="Purchase Order ID"
                        recordValue={purchaseOrder?.purchaseOrderNumber|| ""}
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
                        recordValue={ formatDate(updatedAt, 'DD/MM/YYYY')}
                    /> 
                    <TouchableRecord
                                recordTitle="Storage Location"
                                recordValue={'--'}
                            />
                    

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