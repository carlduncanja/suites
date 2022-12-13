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

function RevertPaymentDialogContainer({ selectedData,onCancel, headerTitle, handleDonePressed = () => { } }) {

    // ######### CONST
    const modal = useModal();
    const theme = useTheme();
    const [receiptId, setReceiptId] = useState('');
    const [errors, setErrors] = useState({})

    // ######### EVENT HANDLERS

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const validateFields = () => {
        if (setReceiptId !== '') {
            handleDonePressed(receiptId);
        }
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
                        label="Receipt ID"
                        onChangeText={(value) => setReceiptId(value)}
                        value={receiptId}
                        onClear={() => setReceiptId('')}
                        hasError={errors?.receiptId}
                        errorMessage="This field is required"
                    />
                </FieldContainer>

            </Row>

            <Row margin={1}>
                <ModalText>
                    Enter the receipt/transaction id for the amount to confirm reverting this transaction.
                    Typography
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

RevertPaymentDialogContainer.propTypes = {};
RevertPaymentDialogContainer.defaultProps = {};


export default RevertPaymentDialogContainer;
