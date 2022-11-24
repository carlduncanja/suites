// VerificationSentPage.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator, Text,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styled, { css } from '@emotion/native';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Mail from '../../../assets/svg/mail';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import InputField2 from '../../components/common/Input Fields/InputField2';
import { isValidEmail } from '../../utils/formatter';
import { forgotPassword } from '../../api/network';
import {
    PageWrapper,
    PageContainer, FormWrapper, FormContainer,
    FormContentWrapper, LogoWrapper, LogoContainer,
    FormHeaderText, FormBodyText, BackToLogin,
    ButtonText, LabelWrapper, InputLabel
} from './ForgotPasswordPage';
// login page at the startup
function VerificationSentPage({ navigation }) {
    const theme = useTheme();

    const [isLoading, setLoading] = useState(false);
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
        setLoading(true);
        forgotPassword(fields.email)
            .then(_ => {
                console.log('success');
            })
            .catch(error => {
                console.log(error);
                setError('An error occured whilst trying to send verification code.');
            }).finally(_ => {
                setLoading(false);
            })
    }

    const validate = () => {
        console.log('test')
        let message = ''
        let isValid = true;
        const { email } = fields;

        if (!email) {
            message = 'Please provide an email.'
            isValid = false;
        }
        if (!isValidEmail(email) && email) {
            message = 'The email provided is invalid.';
            isValid = false;
        }

        message && setError(message)

        if (isValid) handleSendCode();
    }

    return (
        <PageWrapper theme={theme}>

            <LoginBackground />
            <PageWrapper theme={theme}>
                <PageContainer>
                    <FormWrapper theme={theme}>
                        <FormContainer theme={theme} style={{marginTop: 150}}>

                            <LogoWrapper theme={theme} style={{marginBottom: 60}}>
                                <LogoContainer theme={theme}>
                                    <Mail />
                                </LogoContainer>
                            </LogoWrapper>

                            <FormContentWrapper>
                                <FormHeaderText>Verification Sent</FormHeaderText>
                                <FormBodyText>
                                    A verification code was sent to the email address provided
                                </FormBodyText>
                                {/* <LabelWrapper>
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
                                </LabelWrapper> */}

                                <TouchableOpacity style={[styles.button]} onPress={validate} disabled={isLoading}>
                                    <ButtonText theme={theme} >Continue</ButtonText>
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
        fontSize: 13
    }
});

VerificationSentPage.propTypes = {};
VerificationSentPage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(VerificationSentPage);
