import React, { useState } from 'react';
import OverlayDialog from "../common/Dialog/OverlayDialog";
import OverlayDialogContent from "../common/Dialog/OverlayContent";
import { useModal } from "react-native-modalfy";
import InputField2 from "../common/Input Fields/InputField2";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent'
import ConfirmationComponent from '../ConfirmationComponent';
import _ from "lodash";
import styled from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { currencyFormatter } from '../../utils/formatter';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const DividerContainer = styled.View`
    padding-bottom : ${({ theme }) => theme.space['--space-24']};
`

const ModalText = styled.Text(({ textColor = '--color-gray-600', theme, font = '--confirm-title' }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
}));

function RegisterPaymentDialogContainer({headerTitle, handleDonePressed }) {

    // ######### CONST
    const modal = useModal();
    const theme = useTheme();
    const [amountPaid, setAmountPaid] = useState(0);
    const [receiptId, setReceiptId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState({})

    // ######### EVENT HANDLERS

    const handleCloseDialog = () => {
        modal.closeAllModals();
    };

    const handleAmount = (value) => {
        const amount = value.replace(/[^0-9.]/g, '');
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(amount) || !amount) {
            setAmountPaid(amount)
            updateErrors("amountPaid")
        }
    }

    const formatAmount = () => {
        if (amountPaid) {
            setAmountPaid(currencyFormatter(amountPaid));
        }
    }

    const updateErrors = (fieldName) => {
        if (fieldName in errors) {
            let localErrors = errors;
            delete localErrors[fieldName];
            setErrors(localErrors);
        }
    }

    const handleReceipt = (value) => {
        setReceiptId(value)
        updateErrors("receiptId")
    }

    const handlePaymentMethod = (value) => {
        setPaymentMethod(value)
        updateErrors("paymentMethod")
    }

    const validateFields = () => {
        let amount = 0
        let errors = {};
        if (!amountPaid) errors = { amountPaid: true }
        if (!receiptId) errors = { ...errors, receiptId: true }
        if (!paymentMethod) errors = {...errors, paymentMethod: true}
        setErrors(errors);
        if (amountPaid) {
            amount = amountPaid.replace(/[^0-9.]/g, '');
        }
        if (_.isEmpty(errors)) handleDonePressed(parseFloat(amount), receiptId, paymentMethod);
    }


    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };



    const Details = (

        <>
            <Row>
                <FieldContainer>
                    <InputField2
                        label={"Amount Paid"}
                        onChangeText={(value) => { handleAmount(value) }}
                        value={`$ ${amountPaid.toString()}`}
                        onClear={() => setAmountPaid('')}
                        onEndEditing={() => formatAmount(amountPaid)}
                        keyboardType="number-pad"
                        hasError={errors?.amountPaid}
                        errorMessage="This field is required"
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label="Receipt ID"
                        onChangeText={(value) => handleReceipt(value)}
                        value={receiptId}
                        onClear={() => setReceiptId('')}
                        hasError={errors?.receiptId}
                        errorMessage="This field is required"
                    />
                </FieldContainer>

            </Row>

            <Row>
                <FieldContainer maxWidth='50%'>
                <InputField2
                            label="Payment Method"
                            labelWidth={120 }
                            errorMessage="This field is required"
                            value={paymentMethod}
                            onClear={()=> setPaymentMethod('')}
                            hasError={errors?.paymentMethod}
                            onChangeText={(value) => handlePaymentMethod(value)}
                        />
                </FieldContainer>
            </Row>

            <Row margin={1}>
                <ModalText>
                    The receipt/transaction number that was provide by the supplier should be entered along
                    with the amount stated.
                </ModalText>
            </Row>
        </>
    );


    return (
        <OverlayDialog
            title={headerTitle}
            onPositiveButtonPress={() => validateFields()}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
            maxWidth={'800px'}

        >
            <>
                <OverlayDialogContent height={150}>
                    {Details}
                </OverlayDialogContent>
            </>
        </OverlayDialog>
    );
}

RegisterPaymentDialogContainer.propTypes = {};
RegisterPaymentDialogContainer.defaultProps = {};


export default RegisterPaymentDialogContainer;
