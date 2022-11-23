// ForgotPasswordPage.js
import React, { useState, useRef, useEffect, createRef } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    ActivityIndicator, Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import styled, { css } from '@emotion/native';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Logo from '../../../assets/svg/logo';

import Button from '../../components/common/Buttons/Button';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import InputField2 from '../../components/common/Input Fields/InputField2';
import { isValidEmail } from '../../utils/formatter';
// login page at the startup
function ForgotPasswordPage({ navigation }) {
    const theme = useTheme();


    const [fields, setFields] = useState({
        email: '',
    });
    const [error, setError] = useState('')

    const goToLogin = () => {
        navigation.navigate('login')
    };

    const onFieldChange = fieldName => value => {
        const updatedFields = {
            ...fields,
            [fieldName]: value
        };

        setFields(updatedFields);
    };

    const handleSendCode = () => {
       console.log('Code sent');
    }

    const validate = () => {
        let message = ''
        let isValid = true;
        const { email } = fields;

        if(!email) message = 'Please provide an email.'
        if(!isValidEmail(email) && email) message = 'The email provided is invalid.';
        

        setError(message)
        if(!error) isValid = false;

        if (isValid) handleSendCode();
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
                                <FormHeaderText>Forgot Password?</FormHeaderText>
                                <FormBodyText>
                                    Enter the email associated with your account. A verification
                                    code will be sent to you to help us confirm your account.
                                </FormBodyText>
                                <LabelWrapper>
                                    <InputLabel>Email</InputLabel>
                                    <InputField2
                                        placeholder='Your email'
                                        onChangeText={value => onFieldChange('email')(value)}
                                        onClear={onFieldChange('email')}
                                        value={fields.email}
                                        autoCapitalize={'none'}
                                        keyboardType="email-address"
                                        borderColor={'--color-gray-300'}
                                        inputHeight={48} />
                                   {error ?  <Text style={[styles.errorText]}>{error}</Text> : null } 
                                </LabelWrapper>

                                <View style={[styles.button]}>
                                    <Button
                                        backgroundColor={theme.colors['--company']}
                                        buttonPress={validate}
                                        title="Send Code"
                                        color={theme.colors['--default-shade-white']}
                                    />
                                </View>
                                <View style={{ justifyContent: 'center' }} >
                                    <BackToLogin onPress={() => goToLogin()}>Back to Login</BackToLogin>
                                </View>
                            </FormContentWrapper>
                        </FormContainer>
                    </FormWrapper>

                </PageContainer>
            </PageWrapper>

        </PageWrapper>
    );
}

const PageWrapper = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const PageContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

const FormWrapper = styled.View`
  position: absolute;
  bottom: 0px;
  display: flex;
  height: 80%;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
  padding: ${({ theme }) => theme.space['--space-32']};
  width: 100%;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.View`
  display: flex;
  width: 459px;
  height: 85%;
  align-items: center;
//   background-color: red;
`;

const FormContentWrapper = styled.View`
    display: flex;
    width: 459px;
    align-items: center;
    justify-content: space-between;
    // background-color: yellow;
`

const LogoWrapper = styled.View`
  height: 116px;
  width: 116px;
  margin-bottom: ${({ theme }) => theme.space['--space-32']};
// background-color: green;
`;

const LogoContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
  border-radius: 58px;
  align-items: center;
  justify-content: center;
`;



const FormHeaderText = styled.Text(({ theme }) => ({
    ...theme.font['--text-2xl-medium'],
    color: theme.colors['--color-black'],
}))

const FormBodyText = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600'],
    marginTop: 16,
    marginBottom: 32,
    width: '100%'
}))

const BackToLogin = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-700'],
    marginTop: 32,
    width: '100%',
    textDecorationLine: 'underline'
}))

const LabelWrapper = styled.View`
  height: 85px;
  width: 100%;
  justify-content: between;
  margin-top: ${({ theme }) => theme.space['--space-16']};
  margin-bottom: ${({ theme }) => theme.space['--space-32']};
//   background-color: purple;
`;

const InputLabel = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600'],
    flex: 1,
}))


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
        fontSize: 13
    }
});

ForgotPasswordPage.propTypes = {};
ForgotPasswordPage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(ForgotPasswordPage);
