import React, {useState} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import { useModal } from 'react-native-modalfy';
import { resetUserPassword } from '../../api/network';
import OverlayDialog from '../../components/common/Dialog/OverlayDialog';
import DialogTabs from '../../components/common/Dialog/DialogTabs';
import OverlayDialogContent from '../../components/common/Dialog/OverlayContent';
import Row from '../../components/common/Row';
import FieldContainer from '../../components/common/FieldContainerComponent';
import InputField2 from '../../components/common/Input Fields/InputField2';
import ConfirmationComponent from '../../components/ConfirmationComponent';

const DialogContainer = styled.View`
    display: flex;
    height: 400px;
    background-color: orange;
`;

const ContentContainer = styled.View`
    height: 100%;
    padding: 24px;
    padding-top: 40px;
    padding-bottom: 0;
`;

const ResetPasswordComponent = ({ onClose = () => {}, userId }) => {
    const modal = useModal();
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const onResetButtonPress = () => {
        const isValid = validateReset();

        if (!isValid) return;

        updatePassword();
    };

    const validateReset = () => {
        let fieldErrors = {};
        let isValid = true;

        const required = ['password', 'confirm_password'];

        for (const requiredField of required) {
            if (!fields[requiredField]) {
                fieldErrors = {
                    ...fieldErrors,
                    [requiredField]: 'Value is Required'
                };
                isValid = false;
            }
        }

        setErrors(fieldErrors);
        if (!isValid) return isValid;

        if (isValid && (fields.password.length < 6 || fields.confirm_password.length < 6)) {
            fieldErrors.password = 'minimum six characters';
            fieldErrors.confirm_password = 'minimum six characters';
            isValid = false;
        }

        // check if alphanumeric
        const alphaNumericRegex = /^[a-z0-9]+$/i;
        if (isValid && (!alphaNumericRegex.test(fields.password) || !alphaNumericRegex.test(fields.confirm_password))) {
            fieldErrors.password = 'password should be alphanumeric.';
            fieldErrors.confirm_password = 'password must be alphanumeric.';
            isValid = false;
        }

        // check if passwords are the same
        if (isValid && fields.password !== fields.confirm_password) {
            fieldErrors.password = "passwords don't match";
            fieldErrors.confirm_password = "passwords don't match";
            isValid = false;
        }

        setErrors(fieldErrors);
        return isValid;
    };

    const updatePassword = () => {
        resetUserPassword(userId, {...fields})
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .catch(error => {

                const unauthRegex = /(4[0-9]{2})$/g;
                const isUnAuthMessage = unauthRegex.test(error.response.status) ? 'You do not have authorization to update this password. Please see Admin for access.' : 'There was an issue performing this action';
                
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                            message={isUnAuthMessage}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            });
    };

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });

        setErrors({
            ...errors,
            [fieldName]: undefined
        });
    };

    const onCloseDialog = () => {
        onClose();
    };

    return (
        <DialogContainer>
        
            <OverlayDialog
                title="Reset Password"
                onPositiveButtonPress={onResetButtonPress}
                onClose={onCloseDialog}
                positiveText="RESET PASSWORD"
            >

                <>
                    <DialogTabs
                        tabs={['Details']}
                        tab={0}
                    />
                
                    <ContentContainer>
                        <Row>
                            <FieldContainer>
                                <InputField2
                                    label="Password"
                                    labelWidth={120}
                                    value={fields.password}
                                    secureTextEntry={true}
                                    keyboardType="password"
                                    onClear={onFieldChange('password')}
                                    onChangeText={onFieldChange('password')}
                                    hasError={!!errors.password}
                                    errorMessage={errors.password}
                                />
                            </FieldContainer>

                            <FieldContainer>
                                <InputField2
                                    label="Confirm Password"
                                    labelWidth={120}
                                    value={fields.confirm_password}
                                    secureTextEntry={true}
                                    keyboardType="confirm_password"
                                    onClear={onFieldChange('confirm_password')}
                                    onChangeText={onFieldChange('confirm_password')}
                                    hasError={!!errors.confirm_password}
                                    errorMessage={errors.confirm_password}
                                />
                            </FieldContainer>
                        </Row>
                    </ContentContainer>
                </>
      
            </OverlayDialog>

        </DialogContainer>

    );
};

export default ResetPasswordComponent;
