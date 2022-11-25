// VerificationCodePage.js
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import styled, { css } from '@emotion/native';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Logo from '../../../assets/svg/logo';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import { isValidEmail } from '../../utils/formatter';
import { verifyOtp, forgotPassword } from '../../api/network';
import {
    PageWrapper,
    PageContainer, FormWrapper, FormContainer,
    FormContentWrapper, LogoWrapper, LogoContainer,
    FormHeaderText, FormBodyText, BackToLogin,
    InputLabel, ButtonText
} from './ForgotPasswordPage';
import InputField2 from '../../components/common/Input Fields/InputField2';
// login page at the startup
function VerificationCodePage({ navigation, route }) {

    const { userId, email } = route.params;
    const theme = useTheme();
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const code_one = useRef();
    const code_two = useRef();
    const code_three = useRef();
    const code_four = useRef();
    const code_five = useRef();
    const code_six = useRef();

    const [fields, setFields] = useState({
        code_one: { value: '', focused: true },
        code_two: { value: '', focused: false },
        code_three: { value: '', focused: false },
        code_four: { value: '', focused: false },
        code_five: { value: '', focused: false },
        code_six: { value: '', focused: false },
    })

    const goToLogin = () => {
        navigation.navigate('login')
    };

    const handleCodeChange = (field, value) => {
        let updatedFields = { ...fields }

        switch (field) {
            case 'code_one':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                    ['code_two']: { focused: true },
                };
                code_two.current.focus();
                break;
            case 'code_two':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                    ['code_three']: { focused: true },
                };
                code_three.current.focus();
                break;
            case 'code_three':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                    ['code_four']: { focused: true },
                };
                code_four.current.focus();
                break;
            case 'code_four':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                    ['code_five']: { focused: true },
                };
                code_five.current.focus();
                break;
            case 'code_five':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                    ['code_six']: { focused: true },
                };
                code_six.current.focus();
                break;
            case 'code_six':
                updatedFields = {
                    ...fields,
                    [field]: { value, focused: false },
                };
                break;
        }
        setFields(updatedFields);
    }

    const handleSendCode = () => {
        console.log(userId);
        let code = '';
        Object.values(fields).forEach(item => { code = code + item.value })
        if (code.length < 6) {
            setError("Please enter the correct verification code");
            return;
        }
        setLoading(true);
        verifyOtp(userId, code)
            .then(_ => {
                navigation.navigate('new-password');
            })
            .catch(error => {
                console.log(error);
                setError('Verification failed.');
            }).finally(_ => {
                setLoading(false);
            })
    }

    const handleResendCode = () => {
        setLoading(true);
        setError('');
        forgotPassword(email)
            .then(data => {
                navigation.navigate('verification-sent', { userId: data.userId, email })
            })
            .catch(error => {
                const { status } = error.response
                !status && setError("An error has occured");
                status === 404 ? setError('This email address could not be located.') : setError('An error occured whilst trying to send verification code.');
            }).finally(_ => {
                setLoading(false);
            })
    }

    return (
        <PageWrapper theme={theme}>

            <LoginBackground />
            <PageWrapper theme={theme}>
                <PageContainer>
                    <FormWrapper theme={theme}>
                        <FormContainer theme={theme} >

                            <LogoWrapper theme={theme} >
                                <LogoContainer theme={theme}>
                                    <Logo />
                                </LogoContainer>
                            </LogoWrapper>

                            <FormContentWrapper>
                                <FormHeaderText>Verification Code</FormHeaderText>
                                <FormBodyText>
                                    Please enter the verification code sent to your email. The code will expire in 5 minutes.
                                </FormBodyText>
                                <LabelWrapper>
                                    <InputLabel>Code</InputLabel>
                                </LabelWrapper>
                                <InputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={"numeric"}
                                            value={fields.code_one.value}
                                            isFocussed={fields.code_one.focused}
                                            onChangeText={(value) => { handleCodeChange('code_one', value) }}
                                            maxLength={1}
                                            inputRef={code_one}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={'numeric'}
                                            value={fields.code_two.value}
                                            isFocussed={fields.code_two.focused}
                                            onChangeText={(value) => { handleCodeChange('code_two', value) }}
                                            maxLength={1}
                                            inputRef={code_two}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={'numeric'}
                                            value={fields.code_three.value}
                                            isFocussed={fields.code_three.focused}
                                            onChangeText={(value) => { handleCodeChange('code_three', value) }}
                                            maxLength={1}
                                            inputRef={code_three}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={'numeric'}
                                            value={fields.code_four.value}
                                            isFocussed={fields.code_four.focused}
                                            onChangeText={(value) => { handleCodeChange('code_four', value) }}
                                            maxLength={1}
                                            inputRef={code_four}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={'numeric'}
                                            value={fields.code_five.value}
                                            isFocussed={fields.code_five.focused}
                                            onChangeText={(value) => { handleCodeChange('code_five', value) }}
                                            maxLength={1}
                                            inputRef={code_five}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                    <TextInputWrapper>
                                        <InputField2
                                            placeholder='-'
                                            inputHeight={64}
                                            alignText={'center'}
                                            clearButton={false}
                                            keyboardType={'numeric'}
                                            value={fields.code_six.value}
                                            isFocussed={fields.code_six.focused}
                                            onChangeText={(value) => { handleCodeChange('code_six', value) }}
                                            maxLength={1}
                                            inputRef={code_six}
                                            backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                            hasError={error ? true : false}
                                            errorMessage={''}
                                        />
                                    </TextInputWrapper>
                                </InputWrapper>
                                <ErrorWrapper>
                                    {error ? <Text style={[styles.errorText]}>{error}</Text> : null}
                                </ErrorWrapper>

                                <TouchableOpacity style={[styles.button]} onPress={handleSendCode}>
                                    {isLoading ? (
                                        <ActivityIndicator style={{ paddingTop: 10 }} size="small" color="#FFFFFF" />
                                    ) :
                                        (<ButtonText theme={theme} >Verify</ButtonText>)
                                    }
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', marginTop: 15, display: 'flex', flexDirection: 'row' }} >
                                    <Text style={[styles.resendLabel]}>Didnt receive a verification code?  </Text>
                                    <Text style={[styles.resendLabel, { color: '#104587', fontWeight: '700', textDecorationLine: 'underline' }]} onPress={handleResendCode}>Resend Code</Text>
                                </View>
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
export const LabelWrapper = styled.View`
dipslay: flex;
  height: 20px;
  width: 100%;
  margin-top: ${({ theme }) => theme.space['--space-4']};
`;

export const ErrorWrapper = styled.View`
dipslay: flex;
  height: 20px;
  width: 100%;
`;
export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  height: 85px;
  width: 100%;

`;

export const TextInputWrapper = styled.View`
  height: 64px;
  width: 64px;
`;




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
    },
    resendLabel: {
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 16,
        color: '#6E7B87'
    }
});

VerificationCodePage.propTypes = {};
VerificationCodePage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(VerificationCodePage);
