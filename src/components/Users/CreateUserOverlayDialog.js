import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/native';
import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import Row from "../common/Row";
import {useTheme} from "emotion-theming";
import InputField2 from "../common/Input Fields/InputField2";
import OptionsField from "../common/Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";


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

    const [createUserFields, setCreateUserFields] = useState({
        name: "",
        email: "",
        password: "",
        role: undefined,
    })
    const [fieldErrors, setErrors] = useState({});


    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const onDonePress = () => {
        const isValid = validateFields();

        if (!isValid) return;


    }

    const onFieldChange = field => value => {
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

    const createUser = () => {
    }

    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onDonePress}
            onClose={onCancel}
            positiveText={"DONE"}
        >
            <DialogContent>
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
                                    text={createUserFields['role']}
                                    hasError={!!fieldErrors['role']}
                                    errorMessage={fieldErrors['role']}
                                    oneOptionsSelected={onFieldChange('role')}
                                    menuOption={(
                                        <MenuOptions>
                                            <MenuOption value="Admin" text="Admin"/>
                                            <MenuOption value="Nurse" text="Nurse"/>
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
        </OverlayDialog>
    );
}

CreateUserOverlayDialog.propTypes = {};
CreateUserOverlayDialog.defaultProps = {};

export default CreateUserOverlayDialog;
