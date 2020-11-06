import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import Row from "../common/Row";
import {useTheme} from "emotion-theming";
import InputField2 from "../common/Input Fields/InputField2";
import OptionsField from "../common/Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import {getRolesCall, registrationCall} from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import jwtDecode from "jwt-decode";
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import FieldContainer from '../common/FieldContainerComponent';


const DialogContent = styled.View`
  flex: 1;
`

const FormWrapper = styled.View`
  display: flex;
  height: 256px;
  //width: 100%;
`

const FormContent = styled.View`
  position: relative;
  flex: 1;
  flex-direction: column;
  padding-right: ${({theme}) => theme.space['--space-24']};
  padding-left: ${({theme}) => theme.space['--space-24']};
  padding-top: ${({theme}) => theme.space['--space-40']};
  padding-top: ${({theme}) => theme.space['--space-40']};
`

const RowWrapper = styled.View`
  width: 100%;
  margin-bottom: 16px;
`

const InputWrapper = styled.View`
    flex: 1;
    align-items: center;
    z-index: ${({zIndex}) => zIndex};
`;

const Space = styled.View`
  width: ${({theme}) => theme.space['--space-24']};
  height: ${({theme}) => theme.space['--space-16']};
`

function CreateUserOverlayDialog({onCancel, onCreated}) {

    const theme = useTheme();
    const modal = useModal();

    const [createUserFields, setCreateUserFields] = useState({
        role: {},
    })

    const [roles, setRoles] = useState([])
    const [fieldErrors, setErrors] = useState({});

    useEffect(() => {
        getRoles()
    }, [])

    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const onDonePress = () => {
        const isValid = validateFields();

        console.log("is valid", isValid);
        if (!isValid) return;

        const data = {
            ...createUserFields,
            role: createUserFields.role?._id
        }

        createUser(data);
    }

    const onFieldChange = ( field = '') => ( value = '') => {
        console.log(field, value);
        setCreateUserFields({
            ...createUserFields,
            [field]: value
        })

        setErrors({
            ...fieldErrors,
            [field]: undefined
        })
    }

    const validateFields = () => {

        let errors = {};
        let isValid = true;

        const requiredFields = ['first_name', 'last_name', 'email', 'role', 'password', 'confirm_password']

        for (const requiredField of requiredFields) {
            if (!createUserFields[requiredField]) {
                errors = {
                    ...errors,
                    [requiredField]: "Value is Required"
                }
                isValid = false;
            } else if (requiredField === 'role' && Object.keys(createUserFields[requiredField]).length === 0) {
                console.log("Role error");
                errors = {
                    ...errors,
                    [requiredField]: "Value is Required"
                }
                isValid = false;
            }
        }

        setErrors(errors);
        if (!isValid) return isValid;


        // check min length
        if (isValid && (createUserFields['password'].length < 6 || createUserFields['confirm_password'].length < 6)) {
            errors['password'] = "minimum six characters"
            errors['confirm_password'] = "minimum six characters"
            isValid = false;
        }

        // check if alphanumeric
        const alphaNumericRegex = /^[a-z0-9]+$/i
        if (isValid && (!alphaNumericRegex.test(createUserFields['password']) || !alphaNumericRegex.test(createUserFields['confirm_password']))) {
            errors['password'] = "password should be alphanumeric."
            errors['confirm_password'] = "password must be alphanumeric."
            isValid = false;
        }

        // check if passwords are the same
        if (isValid && createUserFields['password'] !== createUserFields['confirm_password']) {
            errors['password'] = "passwords don't match"
            errors['confirm_password'] = "passwords don't match"
            isValid = false;
        }

        setErrors(errors)
        return isValid;
    }

    const createUser = (data) => {

        console.log("data", data);

        registrationCall(data)
            .then(data => {
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

                setTimeout(() => {
                    const user = getUserFromToken(data.token)
                    onCreated(user);
                }, 200)

            })
            .catch(error => {
                console.log("Failed to register user");
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
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
            .finally()
    }

    const getRoles = () => {
        getRolesCall()
            .then(data => setRoles(data))
            .catch(error => {
                console.log("failed to get user role")
            })
    }

    const getUserFromToken = (userToken) => {
        try {
            const userInfo = jwtDecode(userToken);
            return {
                ...userInfo,
                _id: userInfo['user_id'],
                role: {
                    _id: userInfo['role_id'],
                    name: userInfo['role_name']
                }
            }
        } catch (e) {
            return false
        }
    }

    return (
        <OverlayDialog
            title={"New User"}
            onPositiveButtonPress={onDonePress}
            onClose={onCancel}
            positiveText={"DONE"}
        >
            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <OverlayDialogContent height={256}>

                    <>
                        <Row>

                            <FieldContainer>
                                <InputField2
                                    label={'First Name'}
                                    labelWidth={120}
                                    value={createUserFields['first_name']}
                                    onChangeText={onFieldChange('first_name')}
                                    onClear={onFieldChange('first_name')}
                                    hasError={!!fieldErrors['first_name']}
                                    errorMessage={fieldErrors['first_name']}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <InputField2
                                    label={'Last Name'}
                                    labelWidth={120}
                                    value={createUserFields['last_name']}
                                    onChangeText={onFieldChange('last_name')}
                                    onClear={onFieldChange('last_name')}
                                    hasError={!!fieldErrors['last_name']}
                                    errorMessage={fieldErrors['last_name']}
                                />
                            </FieldContainer>

                        </Row>

                        <Row>

                            <FieldContainer>
                                <InputField2
                                    label={'Email'}
                                    labelWidth={120}
                                    value={createUserFields['email']}
                                    onChangeText={onFieldChange('email')}
                                    onClear={onFieldChange('email')}
                                    hasError={!!fieldErrors['email']}
                                    errorMessage={fieldErrors['email']}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <OptionsField
                                    label={'Role'}
                                    labelWidth={120}
                                    text={createUserFields['role'].name}
                                    hasError={!!fieldErrors['role']}
                                    errorMessage={fieldErrors['role']}
                                    oneOptionsSelected={onFieldChange('role')}
                                    menuOption={(
                                        <MenuOptions>
                                            {
                                                roles?.map(item => <MenuOption key={item._id} value={item}
                                                                               text={item.name}/>)
                                            }
                                        </MenuOptions>
                                    )}
                                />
                            </FieldContainer>

                        </Row>

                        <Row>

                            <FieldContainer>
                                <InputField2
                                    label={'Password'}
                                    labelWidth={120}
                                    value={createUserFields['password']}
                                    secureTextEntry={true}
                                    keyboardType={'password'}
                                    onClear={onFieldChange('password')}
                                    onChangeText={onFieldChange('password')}
                                    hasError={!!fieldErrors['password']}
                                    errorMessage={fieldErrors['password']}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <InputField2
                                    label={'Confirm Password'}
                                    labelWidth={120}
                                    value={createUserFields['confirm_password']}
                                    secureTextEntry={true}
                                    keyboardType={'confirm_password'}
                                    onClear={onFieldChange('confirm_password')}
                                    onChangeText={onFieldChange('confirm_password')}
                                    hasError={!!fieldErrors['confirm_password']}
                                    errorMessage={fieldErrors['confirm_password']}
                                />
                            </FieldContainer>

                        </Row>

                    </>

                </OverlayDialogContent>
            </>

            {/* <DialogContent>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <FormWrapper theme={theme}>
                    <FormContent theme={theme}>
                        <Row>
                            <InputWrapper>
                                <InputField2
                                    label={'First Name'}
                                    labelWidth={120}
                                    value={createUserFields['first_name']}
                                    onChangeText={onFieldChange('first_name')}
                                    onClear={onFieldChange('first_name')}
                                    hasError={!!fieldErrors['first_name']}
                                    errorMessage={fieldErrors['first_name']}
                                />
                            </InputWrapper>
                            <Space/>
                            <InputWrapper>
                                <InputField2
                                    label={'Last Name'}
                                    labelWidth={120}
                                    value={createUserFields['last_name']}
                                    onChangeText={onFieldChange('last_name')}
                                    onClear={onFieldChange('last_name')}
                                    hasError={!!fieldErrors['last_name']}
                                    errorMessage={fieldErrors['last_name']}
                                />
                            </InputWrapper>
                        </Row>
                        <Row>
                            <InputWrapper>
                                <InputField2
                                    label={'Email'}
                                    labelWidth={120}
                                    value={createUserFields['email']}
                                    onChangeText={onFieldChange('email')}
                                    onClear={onFieldChange('email')}
                                    hasError={!!fieldErrors['email']}
                                    errorMessage={fieldErrors['email']}
                                />
                            </InputWrapper>
                            <Space/>
                            <InputWrapper>
                                <OptionsField
                                    label={'Role'}
                                    labelWidth={120}
                                    text={createUserFields['role'].name}
                                    hasError={!!fieldErrors['role']}
                                    errorMessage={fieldErrors['role']}
                                    oneOptionsSelected={onFieldChange('role')}
                                    menuOption={(
                                        <MenuOptions>
                                            {
                                                roles?.map(item => <MenuOption key={item._id} value={item}
                                                                               text={item.name}/>)
                                            }
                                        </MenuOptions>
                                    )}
                                />
                            </InputWrapper>

                        </Row>
                        <Row>
                            <InputWrapper>
                                <InputField2
                                    label={'Password'}
                                    labelWidth={120}
                                    value={createUserFields['password']}
                                    secureTextEntry={true}
                                    keyboardType={'password'}
                                    onClear={onFieldChange('password')}
                                    onChangeText={onFieldChange('password')}
                                    hasError={!!fieldErrors['password']}
                                    errorMessage={fieldErrors['password']}
                                />
                            </InputWrapper>
                            <Space/>
                            <InputWrapper>
                                <InputField2
                                    label={'Confirm Password'}
                                    labelWidth={120}
                                    value={createUserFields['confirm_password']}
                                    secureTextEntry={true}
                                    keyboardType={'confirm_password'}
                                    onClear={onFieldChange('confirm_password')}
                                    onChangeText={onFieldChange('confirm_password')}
                                    hasError={!!fieldErrors['confirm_password']}
                                    errorMessage={fieldErrors['confirm_password']}
                                />
                            </InputWrapper>
                        </Row>

                    </FormContent>
                </FormWrapper>
            </DialogContent>
         */}
        </OverlayDialog>
    );
}

CreateUserOverlayDialog.propTypes = {};
CreateUserOverlayDialog.defaultProps = {};

export default CreateUserOverlayDialog;
