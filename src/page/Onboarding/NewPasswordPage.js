// NewPasswordPage.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styled, { css } from '@emotion/native';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Logo from '../../../assets/svg/logo';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import { isValidEmail } from '../../utils/formatter';
import { forgotPassword } from '../../api/network';
import {
    PageWrapper,
    PageContainer, FormWrapper, FormContainer,
    FormContentWrapper, LogoWrapper, LogoContainer,
    FormHeaderText, FormBodyText, BackToLogin,
    ButtonText, LabelWrapper, InputLabel
} from './ForgotPasswordPage';
import InputField2 from '../../components/common/Input Fields/InputField2';
import { startCase } from 'lodash';

// login page at the startup
function NewPasswordPage({ navigation, route }) {
    const theme = useTheme();
    const [errors, setErrors] = useState({});
    const [fields, setFields] = useState({});
    // const  { userId, email } = route.params;

    const goToLogin = () => {
        navigation.navigate('login')
    };

    const goToVerifyCode = () => {
        // navigation.navigate('verify-code', {userId, email})
    };

    const onFieldChange = fieldName => value => {
        const updatedFields = {
            ...fields,
            [fieldName]: value
        };

        setFields(updatedFields);
        setErrors({...errors, [fieldName]: undefined})
    };

    const validate = () => {
        let isValid = true;

        const requiredParams = ['password', 'confirmPassword']
        const {password, confirmPassword } = fields;
        const errors = {}
        for (const requiredParam of requiredParams) {
            if (!fields[requiredParam]) {
                isValid = false;
                errors[requiredParam] = "Please enter value"
            }
        }

        if (isValid && password !== confirmPassword) {
            errors['password'] = 'match'
            errors['confirmPassword'] = 'Password does not match.'
            isValid = false;
        }
        if (isValid && password.length < 6) {
            errors['password'] = 'Must have at least six characters';
            isValid = false;
        }
        if (isValid && confirmPassword.length < 6) {
            errors['confirmPassword'] = 'Must have at least six characters';
            isValid = false;
        }

        const alphaNumericRegex = /^[a-z0-9]+$/i
        if (isValid && !alphaNumericRegex.test(password) && !alphaNumericRegex.test(confirmPassword)) {
            errors['password'] = 'match';
            errors['confirmPassword'] = 'Password must be alphanumeric.';
            isValid = false;
        }

        setErrors(errors)

        if (isValid) handleSetNewPassword();
    }

    const handleSetNewPassword = () => {
        console.log("set")
    }

    return (
        <PageWrapper theme={theme}>

            <LoginBackground />
            <PageWrapper theme={theme}>
                <PageContainer>
                    <FormWrapper theme={theme}>
                        <FormContainer theme={theme}>

                            <LogoWrapper theme={theme}>
                                <LogoContainer theme={theme}>
                                    <Logo />
                                </LogoContainer>
                            </LogoWrapper>

                            <FormContentWrapper>
                                <FormHeaderText>Set New Password</FormHeaderText>
                                <FormBodyText >
                                    Enter your new password below.
                                </FormBodyText>
                                <LabelWrapper style={{ marginBottom: 0, marginTop: 0 }}>
                                    <InputLabel>Password</InputLabel>
                                    <InputField2
                                        onChangeText={value => onFieldChange('password')(value)}
                                        onClear={onFieldChange('password')}
                                        value={fields.password}
                                        autoCapitalize={'none'}
                                        inputHeight={48}
                                        backgroundColor={errors['password'] ? '--color-red-100' : '--default-shade-white'}
                                        hasError={errors['password']}
                                        errorMessage={''}
                                        secureTextEntry={true} />
                                    {(errors['password'] && errors['password'] !== 'match') && ( <Text style={[styles.errorText]}>{errors['password']}</Text> )}
                                </LabelWrapper>

                                <LabelWrapper>
                                    <InputLabel>Confirm Password</InputLabel>
                                    <InputField2
                                        onChangeText={value => onFieldChange('confirmPassword')(value)}
                                        onClear={onFieldChange('confirmPassword')}
                                        value={fields.confirmPassword}
                                        autoCapitalize={'none'}
                                        inputHeight={48}
                                        backgroundColor={errors['confirmPassword'] ? '--color-red-100' : '--default-shade-white'}
                                        hasError={errors['password']}
                                        errorMessage={''}
                                        secureTextEntry={true} />
                                 {errors['confirmPassword'] && (<Text style={[styles.errorText]}>{errors['confirmPassword']}</Text>) }
                                </LabelWrapper>
                                <TouchableOpacity style={[styles.button]} onPress={validate}>
                                    <ButtonText theme={theme} >Set Password</ButtonText>
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }} >
                                    <BackToLogin onPress={goToLogin}>Back to Login</BackToLogin>
                                </View>
                            </FormContentWrapper>
                        </FormContainer>
                    </FormWrapper>

                </PageContainer>
            </PageWrapper>

        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#104587',
        borderColor: '#104587',
        borderWidth: 1,
        height: 48,
        borderRadius: 8
    },
    errorText: {
        color: '#c53030',
        fontSize: 13,
        alignSelf: 'flex-start'
    }
});

NewPasswordPage.propTypes = {};
NewPasswordPage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(NewPasswordPage);
