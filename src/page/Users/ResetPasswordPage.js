import React, { useState, useRef } from 'react';
import styled from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {
    View,
    ActivityIndicator,
} from 'react-native';

import LoginBackground from '../../components/Onboarding/LoginBackground';
import Logo from '../../../assets/svg/logo';
import Button from '../../components/common/Buttons/Button';
import InputFieldWithIcon from '../../components/common/Input Fields/InputFieldWithIcon';
import PasswordIcon from '../../../assets/svg/lockIcon';

const PageWrapper = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
`;

const PageContainer = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
`;

const LogoWrapper = styled.View`
    height: 116px;
    width: 116px;
    margin-bottom: ${({theme}) => theme.space['--space-32']};
`;

const LogoContainer = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${({theme}) => theme.colors['--default-shade-white']};
    border-radius: 58px;
    align-items: center;
    justify-content: center;
`;

const CopyRightContainer = styled.View`
   align-items: center;
   justify-content: flex-end;
   bottom: 30px;
`;

const CopyRightText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--default-shade-white']

}));

const FormWrapper = styled.View`
   display: flex;
   background-color: ${({theme}) => theme.colors['--default-shade-white']};
   padding: ${({theme}) => theme.space['--space-32']} ;
   //align-self: center;
   //min-height: 200px;
   //width: 352px;
   border-radius: 12px;
   justify-content: flex-start;
   align-items: center;
`;

const FormHeaderText = styled.Text(({theme}) => ({
    ...theme.font['--text-2xl-medium'],
    color: theme.colors['--company'],
    marginBottom: 32
}));

const FormContainer = styled.View`
    display: flex;
    width: 261px;
    align-self: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const RowContainer = styled.View`
    width: 100%;
    height: 36px;
    margin-bottom: ${({theme}) => theme.space['--space-20']};
`;

const DividerContainer = styled.View`
    width: 100%;
    height: 56px;
    flex-direction: row;
    align-items: center;
`;

const DividerText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-gray-400'],
    marginLeft: 10,
    marginRight: 10
}));

const LoginButtonWrapper = styled.View`
    border-radius: 6px;
    background-color: ${({theme}) => theme.colors['--company']};
    padding-top:  ${({theme}) => theme.space['--space-8']};
    padding-bottom:  ${({theme}) => theme.space['--space-8']};
    height: 35px;
    width: 100%;
`;

const ButtonWrapper = styled.View`
    height: 40px;
    margin-top: 16px;
    width: 100%;
`;

const ResetPasswordPage = () => {
    const theme = useTheme();
    const passRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
        const updatedErrors = {...errors};
        delete updatedErrors[fieldName];
        setErrors(updatedErrors);
    };

    const validateFields = () => {
        const requiredParams = ['new_password', 'confirm_password'];

        let valid = true;
        const fielderrors = {};
        
        for (const requiredParam of requiredParams) {
            if (!fields[requiredParam]) {
                valid = false;
                fielderrors[requiredParam] = 'Please enter value';
            }
        };

        // check if passwords are the same
        if (valid && fields.new_password !== fields.confirm_password) {
            fielderrors.new_password = "passwords doesn't match";
            fielderrors.confirm_password = "passwords doesn't match";
            valid = false;
        }

        // check min length
        if (valid && (fields.password.length < 6 || fields.confirm_password.length < 6)) {
            fielderrors.new_password = 'must have at least six characters';
            fielderrors.confirm_password = 'must have at least six characters';
            valid = false;
        }

        // check if alphanumeric
        const alphaNumericRegex = /^[a-z0-9]+$/i;
        if (valid && (!alphaNumericRegex.test(fields.new_password) || !alphaNumericRegex.test(fields.confirm_password))) {
            fielderrors.new_password = 'password should be alphanumeric.';
            fielderrors.confirm_password = 'password must be alphanumeric.';
            valid = false;
        }

        setErrors(fielderrors);
        return valid;
    };

    return (
        <PageWrapper theme={theme}>

            <LoginBackground/>

            <PageWrapper theme={theme}>
                <PageContainer>
                    <LogoWrapper theme={theme}>
                        <LogoContainer theme={theme}>
                            <Logo/>
                        </LogoContainer>
                    </LogoWrapper>

                    <FormWrapper theme={theme}>
                        <FormContainer theme={theme}>

                            <FormHeaderText>Reset Password</FormHeaderText>

                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    placeholder="New Password"
                                    onChangeText={value => onFieldChange('new_password')(value)}
                                    value={fields.new_password}
                                    hasError={!!errors.new_password}
                                    errorMessage={errors.new_password}
                                    onClear={() => onFieldChange('new_password')('')}
                                    icon={<PasswordIcon/>}
                                    secureTextEntry={true}
                                    inputRef={passRef}
                                    isFocus={passRef?.current?.isFocused() || false}
                                />
                            </RowContainer>

                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Password"
                                    placeholder="Confirm Password"
                                    onChangeText={value => onFieldChange('confirm_password')(value)}
                                    hasError={!!errors.confirm_password}
                                    errorMessage={errors.confirm_password}
                                    value={fields.confirm_password}
                                    onClear={() => onFieldChange('confirm_password')('')}
                                    icon={<PasswordIcon/>}
                                    secureTextEntry={true}
                                    inputRef={passRef}
                                    isFocus={passRef?.current?.isFocused() || false}
                                />
                            </RowContainer>

                            <LoginButtonWrapper theme={theme}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#00ff00"/>
                                ) : (
                                    <Button
                                        backgroundColor="#104587"
                                        buttonPress={() => {}}
                                        title="Reset"
                                        color="#FFFFFF"
                                    />
                                )}
                            </LoginButtonWrapper>

                        </FormContainer>

                    </FormWrapper>

                </PageContainer>

                <CopyRightContainer theme={theme}>
                    <CopyRightText theme={theme}>
                        {'\u00A9'} Copyright 2019 The Suites
                    </CopyRightText>
                </CopyRightContainer>

            </PageWrapper>
        </PageWrapper>
    );
};

export default ResetPasswordPage;
