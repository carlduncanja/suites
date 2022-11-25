// NewPasswordPage.js
import React, { useState } from 'react';
import {
    View,
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
// login page at the startup
function NewPasswordPage({ navigation, route }) {
    const theme = useTheme();
    const[error, setError] = useState('');
    // const  { userId, email } = route.params;
    
    const goToLogin = () => {
        navigation.navigate('login')
    };

    const goToVerifyCode = () => {
        // navigation.navigate('verify-code', {userId, email})
    };

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
                                <LabelWrapper style={{marginBottom: 0, marginTop: 0}}>
                                    <InputLabel>Password</InputLabel>
                                    <InputField2
                                        // onChangeText={value => onFieldChange('email')(value)}
                                        // onClear={onFieldChange('email')}
                                        // value={fields.email}
                                        autoCapitalize={'none'}
                                        // keyboardType="email-address"
                                        inputHeight={48}
                                        backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                        hasError={error ? true : false}
                                        errorMessage={''}/>
                                </LabelWrapper>

                                <LabelWrapper>
                                    <InputLabel>Confirm Password</InputLabel>
                                    <InputField2
                                        // onChangeText={value => onFieldChange('email')(value)}
                                        // onClear={onFieldChange('email')}
                                        // value={fields.email}
                                        autoCapitalize={'none'}
                                        // keyboardType="email-address"
                                        inputHeight={48}
                                        backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                        hasError={error ? true : false}
                                        errorMessage={''}/>
                                   {error ?  <Text style={[styles.errorText]}>{error}</Text> : null } 
                                </LabelWrapper>
                                <TouchableOpacity style={[styles.button]} onPress={goToVerifyCode}>
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
        fontSize: 13
    }
});

NewPasswordPage.propTypes = {};
NewPasswordPage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(NewPasswordPage);
