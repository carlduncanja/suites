import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import OverlayDialog from '../../components/common/Dialog/OverlayDialog';
import DialogTabs from '../../components/common/Dialog/DialogTabs';
import OverlayDialogContent from '../../components/common/Dialog/OverlayContent';
import Row from '../../components/common/Row';
import InputField2 from '../../components/common/Input Fields/InputField2';
import FieldContainer from '../../components/common/FieldContainerComponent';

const PayBalanceItem = ({onAddPay, onCancel}) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [cost, setCost] = useState(0);

    const onFieldChange = fieldName => value => {
        const updatedFields = { ...fields }
        setFields({
            ...updatedFields,
            [fieldName]: value
        });

        const updatedErrors = { ...errors };
        delete updatedErrors[fieldName];
        setErrors(updatedErrors);
    };

    const onValidateBalance = () => {
        let isValid = true;
        const requiredFields = ['name', 'amount'];
        const errorObj = { ...errors } || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                // console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            } else {
                delete errorObj[requiredField]
            }
        }

        setErrors(errorObj);
        return isValid;
    };

    const handleBalanceCost = value => {
        const updatedPay = value.replace(/[^0-9.]/g, '');
        
        if (/^\d+(\.\d{1,2})?$/g.test(updatedPay) || /^\d+$/g.test(updatedPay) || !updatedPay) {
            onFieldChange('amount')(parseFloat(updatedPay));
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(updatedPay) || !updatedPay) {
            setCost(updatedPay);
        }
    };

    const handlePay = () => {
        const valid = onValidateBalance();

        if (!valid) return;
        const dataToSend = {
            ...fields,
            type: 'payment'
        };
        onAddPay(dataToSend);
    };

    const handleDialogClose = () => {
        onCancel();
    };

    return (
        <OverlayDialog
            title="Pay Balance"
            onPositiveButtonPress={handlePay}
            onClose={handleDialogClose}
            positiveText="DONE"
        >
            <DialogTabs
                tabs={['Details']}
                tab={0}
                tabPlacement="flex-start"
            />

            <OverlayDialogContent height={260}>
                <Row>
                    <FieldContainer>
                        <InputField2
                            label="Transaction #"
                            onChangeText={onFieldChange('name')}
                            value={fields.name}
                            onClear={() => { onFieldChange('name')(''); }}
                            hasError={errors.name}
                            errorMessage="Number must be filled."
                        />
                    </FieldContainer>

                    <FieldContainer>
                        <InputField2
                            label="Value"
                            onChangeText={value => handleBalanceCost(value)}
                            value={`$ ${cost.toString()}`}
                            onClear={() => { handleBalanceCost(''); }}
                            keyboardType="number-pad"
                            hasError={errors.amount}
                            errorMessage="Value must be filled."
                        />
                    </FieldContainer>
                </Row>
            </OverlayDialogContent>

        </OverlayDialog>
    );
};

export default PayBalanceItem;
