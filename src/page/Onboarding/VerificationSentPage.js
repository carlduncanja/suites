// VerificationSentPage.js
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styled, { css } from '@emotion/native';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Mail from '../../../assets/svg/mail';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import { isValidEmail } from '../../utils/formatter';
import { forgotPassword } from '../../api/network';
import {
    PageWrapper,
    PageContainer, FormWrapper, FormContainer,
    FormContentWrapper, LogoWrapper, LogoContainer,
    FormHeaderText, FormBodyText, BackToLogin,
    ButtonText
} from './ForgotPasswordPage';
// login page at the startup
function VerificationSentPage({ navigation, route }) {
    const theme = useTheme();
    const  { userId, email } = route.params;
    
    const goToLogin = () => {
        navigation.navigate('login')
    };

    const goToVerifyCode = () => {
        navigation.navigate('verify-code', {userId, email})
    };

    return (
        <PageWrapper theme={theme}>

            <LoginBackground />
            <PageWrapper theme={theme}>
                <PageContainer>
                    <FormWrapper theme={theme}>
                        <FormContainer theme={theme}>

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
                                <TouchableOpacity style={[styles.button]} onPress={goToVerifyCode}>
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
