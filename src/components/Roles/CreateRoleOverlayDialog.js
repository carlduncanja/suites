import React, {useEffect, useState} from 'react';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useModal} from 'react-native-modalfy';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import DialogTabs from '../common/Dialog/DialogTabs';
import Row from '../common/Row';
import InputField2 from '../common/Input Fields/InputField2';
import {createRoleCall} from '../../api/network';
import ConfirmationComponent from '../ConfirmationComponent';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import FieldContainer from '../common/FieldContainerComponent';

function CreateRoleOverlayDialog({
    onCreated = () => {
    },
    onCancel = () => {
    },
    roles = []
}) {
    const theme = useTheme();
    const modal = useModal();

    const [createRoleFields, setCreateRoleFields] = useState({});
    const [fieldErrors, setErrors] = useState({});

    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const onDonePress = () => {
        const isValid = validateFields();
        console.log('role.is.valid', isValid);
        if (!isValid) return;

        const data = {...createRoleFields};

        createRole(data);
    };

    const onFieldChange = field => value => {
        setCreateRoleFields({
            ...createRoleFields,
            [field]: value
        });

        setErrors({
            ...fieldErrors,
            [field]: undefined
        });
    };

    const validateFields = () => {
        let errors = {};
        let isValid = true;

        const requiredFields = ['name'];

        for (const requiredField of requiredFields) {
            if (!createRoleFields[requiredField]) {
                errors = {
                    ...errors,
                    [requiredField]: 'Value is Required'
                };
                isValid = false;
            } else if (requiredField === 'name' && roles.some(role => role.name === createRoleFields[requiredField])) {
                errors = {
                    ...errors,
                    [requiredField]: 'Cannot have Duplicate Roles'
                };
                isValid = false;
            }
        }

        setErrors(errors);
        return isValid;
    };

    const createRole = data => {
        createRoleCall(data).then(role => {
            console.log('create.role.success', role);
            modal.openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onCancel={modal.closeAllModals}
                        onAction={modal.closeAllModals}
                    />,
                    onClose: () => modal.closeModals('ConfirmationModal')
                }
            );

            setTimeout(() => onCreated(role), 200);
        }).catch(error => {
            console.error('create.role.error', error);
            modal.openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={true}
                        isEditUpdate={false}
                        onCancel={modal.closeAllModals}
                        onAction={modal.closeAllModals}
                    />,
                    onClose: () => modal.closeModals('ConfirmationModal')
                }
            );
        }).finally();
    };

    return (
        <OverlayDialog
            title="New Role"
            onPositiveButtonPress={onDonePress}
            onClose={onCancel}
            positiveText="DONE"
        >
            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <OverlayDialogContent height={128}>
                    <>
                        <Row>
                            <FieldContainer>
                                <InputField2
                                    label="Role Name"
                                    labelWidth={120}
                                    value={createRoleFields.name}
                                    onChangeText={onFieldChange('name')}
                                    onClear={onFieldChange('name')}
                                    hasError={!!fieldErrors.name}
                                    errorMessage={fieldErrors.name}
                                />
                            </FieldContainer>
                        </Row>
                    </>
                </OverlayDialogContent>
            </>
        </OverlayDialog>
    );
}

export default CreateRoleOverlayDialog;
