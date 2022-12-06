
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import CheckedCircle from '../../../assets/svg/checkedCircle';
import CloudError from '../../../assets/svg/cloudError';
import { signIn } from '../../redux/actions/authActions';
import { useTheme } from "emotion-theming";
import {
    PageWrapper,
    PageContainer, FormWrapper, FormContainer,
    FormContentWrapper, LogoWrapper, LogoContainer, FormBodyText, 
    ButtonText
} from './ForgotPasswordPage';

function ConfirmationPage({ navigation, route }) {
    const theme = useTheme();
    const  { state } = route.params;
    
    const goToLogin = () => {
        navigation.navigate('login')
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
                                   {state ? <CheckedCircle/> :  <CloudError />}
                                </LogoContainer>
                            </LogoWrapper>

                            <FormContentWrapper>
                                <FormBodyText>
                                    {
                                        state ?
                                        'You have successfully reset your password. To return to the login page, tap the button below.'
                                        :
                                        'An error occured while trying to reset your password, please try again later.'

                                    }    
                                </FormBodyText>
                                <TouchableOpacity style={[styles.button]} onPress={goToLogin}>
                                    <ButtonText theme={theme} >Back to Login</ButtonText>
                                </TouchableOpacity>
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

ConfirmationPage.propTypes = {};
ConfirmationPage.defaultProps = {};

const mapStateToProps = state => ({ expoPushToken: state.auth.expoPushToken });

const mapDispatcherToProps = { signIn, };

export default connect(mapStateToProps, mapDispatcherToProps)(ConfirmationPage);
