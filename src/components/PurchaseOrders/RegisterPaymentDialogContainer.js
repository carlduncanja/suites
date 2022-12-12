import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import OverlayDialogContent from "../common/Dialog/OverlayContent";
import { useModal } from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent'
import ConfirmationComponent from '../ConfirmationComponent';
import _ from "lodash";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { isValidNumber, currencyFormatter } from '../../utils/formatter';


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

function RegisterPaymentDialogContainer({ onCancel, headerTitle }) {

    // ######### CONST
    const modal = useModal();
    const theme = useTheme();
    const [amountPaid, setAmountPaid] = useState(0);
    const [receiptId, setReceiptId] = useState('');

    // ######### EVENT HANDLERS

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const handleAmount = (value) => {
        if (/^\d+(\.\d{1,2})?$/g.test(value) || /^\d+$/g.test(value) || !value) {
            setAmountPaid(value)
        }
    }

    const handleReceipt = (value) => {
        setReceiptId(value)
    }

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });
    };


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
                        value={amountPaid}
                        onClear={() => setAmountPaid(0)}
                        keyboardType="number-pad"
                        hasError={false}
                        errorMessage="Amount Paid is required"
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label="Receipt ID"
                        onChangeText={(value) => handleReceipt(value)}
                        value={receiptId}
                        onClear={() => setReceiptId('')}
                        hasError={false}
                        errorMessage="Receipt ID is required"
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
            onPositiveButtonPress={() => { }}
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
