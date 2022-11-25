// ForgotPasswordPage.js
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
import Logo from '../../../assets/svg/logo';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import InputField2 from '../../components/common/Input Fields/InputField2';
import { isValidEmail } from '../../utils/formatter';
import { forgotPassword } from '../../api/network';

// login page at the startup
function ForgotPasswordPage({ navigation }) {
    const theme = useTheme();

    const[isLoading, setLoading] = useState(false);
    const [fields, setFields] = useState({
        email: '',
    });
    const [error, setError] = useState('')

    const goToLogin = () => {
        navigation.navigate('login');
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
        setError('');
        forgotPassword(fields.email)
        .then(data => {
            navigation.navigate('verification-sent', {userId: data.userId, email: fields.email})
        })
        .catch(error => {
            const {status} = error.response
            !status && setError("An error has occured");
            status === 404 ? setError('This email address could not be located.') : setError('An error occured whilst trying to send verification code.');
        }).finally(_ => {
            setLoading(false);
        })
    }

    const validate = () => {
        let message = ''
        let isValid = true;
        const { email } = fields;

        if(!email){
            message = 'Please provide an email.'
            isValid = false;
        } 
        if(!isValidEmail(email) && email) {
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
                                        inputHeight={48}
                                        backgroundColor={error ? '--color-red-100' : '--default-shade-white'}
                                        hasError={error ? true : false}
                                        errorMessage={''}/>
                                   {error ?  <Text style={[styles.errorText]}>{error}</Text> : null } 
                                </LabelWrapper>

                                <TouchableOpacity style={[styles.button]} onPress={validate} disabled={isLoading}>
                                {isLoading ? (
                                    <ActivityIndicator style={{paddingTop: 10}} size="small" color="#FFFFFF"/>
                                    ) :
                                    ( <ButtonText theme={theme} >Send Code</ButtonText> )
                                }
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

export const PageWrapper = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const PageContainer = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const FormWrapper = styled.View`
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

export const FormContainer = styled.View`
  display: flex;
  width: 459px;
  height: 85%;
  align-items: center;
  justify-content: center;
`;

export const FormContentWrapper = styled.View`
    display: flex;
    width: 459px;
    align-items: center;
    justify-content: space-between;
    // background-color: yellow;
`

export const LogoWrapper = styled.View`
  height: 116px;
  width: 116px;
  margin-bottom: ${({ theme }) => theme.space['--space-32']};
// background-color: green;
`;

export const LogoContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
  border-radius: 58px;
  align-items: center;
  justify-content: center;
`;



export const FormHeaderText = styled.Text(({ theme }) => ({
    ...theme.font['--text-2xl-medium'],
    color: theme.colors['--color-black'],
}))

export const FormBodyText = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-600'],
    marginTop: 16,
    marginBottom: 32,
    width: '100%'
}))

export const BackToLogin = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--color-gray-700'],
    marginTop: 32,
    width: '100%',
    textDecorationLine: 'underline'
}))

export const ButtonText = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-regular'],
    color: theme.colors['--default-shade-white'],
    textAlign: 'center',
    paddingTop: 15
}))

export const LabelWrapper = styled.View`
  height: 85px;
  width: 100%;
  justify-content: between;
  margin-top: ${({ theme }) => theme.space['--space-16']};
  margin-bottom: ${({ theme }) => theme.space['--space-32']};
//   background-color: purple;
`;

export const InputLabel = styled.Text(({ theme }) => ({
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
