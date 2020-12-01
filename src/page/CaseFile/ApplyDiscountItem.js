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

const ApplyDiscountItem = ({onCreateDiscount, onCancel}) => {
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

    const onValidateDiscount = () => {
        let isValid = true;
        const requiredFields = ['discountType', 'discountValue'];
        let errorObj = { ...errors } || {};

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

    const handleDiscountCost = value => {
        const updatedCost = value.replace(/[^0-9.]/g, '');
        
        if (/^\d+(\.\d{1,2})?$/g.test(updatedCost) || /^\d+$/g.test(updatedCost) || !updatedCost) {
            onFieldChange('discountValue')(parseFloat(updatedCost));
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(updatedCost) || !updatedCost) {
            setCost(updatedCost);
        }
    };

    const handleCreateDiscount = () => {
        const valid = onValidateDiscount();

        if (!valid) return;

        onCreateDiscount();
    };

    const handleDialogClose = () => {
        onCancel();
    };

    return (
        <OverlayDialog
            title="Apply Discounts"
            onPositiveButtonPress={handleCreateDiscount}
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
                            label="Discount Type"
                            onChangeText={onFieldChange('discountType')}
                            value={fields.discountType}
                            onClear={() => { onFieldChange('discountType')(''); }}
                            hasError={errors.discountType}
                            errorMessage="Type must be filled."
                        />
                    </FieldContainer>

                    <FieldContainer>
                        <InputField2
                            label="Value"
                            onChangeText={value => handleDiscountCost(value)}
                            value={`$ ${cost.toString()}`}
                            onClear={() => { handleDiscountCost(''); }}
                            keyboardType="number-pad"
                            hasError={errors.discountValue}
                            errorMessage="Value must be filled."
                        />
                    </FieldContainer>
                </Row>
            </OverlayDialogContent>

        </OverlayDialog>
    );
};

export default ApplyDiscountItem;
