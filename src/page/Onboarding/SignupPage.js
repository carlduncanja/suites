import React, {useState, useRef, useEffect, createRef} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Alert,
    AsyncStorage,
    ActivityIndicator,
    Text,
    Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import styled, {css} from '@emotion/native';
import {login} from '../../api/network';
import LoginBackground from '../../components/Onboarding/LoginBackground';
import Logo from '../../../assets/svg/logo';
import InputFieldWithIcon from '../../components/common/Input Fields/InputFieldWithIcon';
import PersonIcon from '../../../assets/svg/personIcon';
import PasswordIcon from '../../../assets/svg/lockIcon';
import NotificationReg from '../../components/notifications/NotficationRegistry';
import Button from '../../components/common/Buttons/Button';
import {signIn} from '../../redux/actions/authActions';
import Page from '../../components/common/Page/Page';
import {setBearerToken} from '../../api';
import {useTheme} from "emotion-theming";
import TextButton from "../../components/common/Buttons/TextButton";
import PageButton from "../../components/common/Page/PageButton";

const LoginPageWrapper = styled.View`
        margin: 0;
        flex: 1;
    `;
const LoginPageContainer = styled.View`
        height: 100%;
        width: 100%;
        
    `;

const OverlayWrapper = styled.View`
        flex: 1;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
    `;
const OverlayContainer = styled.View`
        height: 100%;
        width: 100%;
    `;

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

const CopyRightContainer = styled.View`
   align-items: center;
   justify-content: flex-end;
   bottom: 30px;
`
const CopyRightText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--default-shade-white']

}))

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
}))

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
`

const DividerContainer = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
`
const DividerText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-gray-400'],
    marginLeft: 10,
    marginRight: 10
}))

const LoginButtonWrapper = styled.View`
    border-radius: 6px;
    background-color: ${({theme}) => theme.colors['--company']};
    padding-top:  ${({theme}) => theme.space['--space-8']};
    padding-bottom:  ${({theme}) => theme.space['--space-8']};
    height: 35px;
    width: 100%
`

const ButtonWrapper = styled.View`
    height: 40px;
    margin-top: 16px;
    width: 100%
`

function SignupPage({navigation, signIn, expoPushToken}) {
    const theme = useTheme();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [fields, setFields] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
    }, []);

    const [isLoading, setLoading] = useState(false);

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onButtonPress = () => {
        console.log('Fields: ', fields);

        // setLoading(true);
        // login(fields.email, fields.password, expoPushToken)
        //     .then(async data => {
        //         // save auth data
        //         console.log(data);
        //         const {token = null} = data;
        //         try {
        //             await AsyncStorage.setItem('userToken', token);
        //             // navigation.navigate("App")
        //             if (token) {
        //                 setBearerToken(token);
        //             }
        //
        //             signIn(token);
        //         } catch (error) {
        //             // Error saving data
        //         }
        //     })
        //     .catch(e => {
        //         console.log('login failed', e);
        //         Alert.alert('Failed to login');
        //     })
        //     .finally(_ => {
        //         setLoading(false);
        //     });


    };

    const onGuestButtonPress = () => {
    };

    const goToLogin = () => {
        navigation.navigate('login')
    };

    const divider = (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#CCD6E0',
                height: 0,
            }}
        />
    );

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

                            <FormHeaderText>SignUp</FormHeaderText>


                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Email"
                                    placeholder={"Firstname"}
                                    onChangeText={value => onFieldChange('first_name')(value)}
                                    value={fields['first_name']}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onClear={() => onFieldChange('first_name')('')}
                                    inputRef={emailRef}
                                    isFocus={emailRef?.current?.isFocused() || false}
                                />
                            </RowContainer>


                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Email"
                                    placeholder={"Lastname"}
                                    onChangeText={value => onFieldChange('last_name')(value)}
                                    value={fields['last_name']}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onClear={() => onFieldChange('last_name')('')}
                                    inputRef={emailRef}
                                    isFocus={emailRef?.current?.isFocused() || false}
                                />
                            </RowContainer>


                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Email"
                                    placeholder={"Email"}
                                    onChangeText={value => onFieldChange('email')(value)}
                                    value={fields.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onClear={() => onFieldChange('email')('')}
                                    inputRef={emailRef}
                                    isFocus={emailRef?.current?.isFocused() || false}
                                />
                            </RowContainer>

                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Password"
                                    placeholder={"Password"}
                                    onChangeText={value => onFieldChange('password')(value)}
                                    value={fields.password}
                                    onClear={() => onFieldChange('password')('')}
                                    icon={<PasswordIcon/>}
                                    secureTextEntry={true}
                                    inputRef={passwordRef}
                                    isFocus={passwordRef?.current?.isFocused() || false}
                                />
                            </RowContainer>

                            <RowContainer theme={theme}>
                                <InputFieldWithIcon
                                    // label="Password"
                                    placeholder={"Confirm Password"}
                                    onChangeText={value => onFieldChange('confirm_password')(value)}
                                    value={fields['confirm_password']}
                                    onClear={() => onFieldChange('confirm_password')('')}
                                    icon={<PasswordIcon/>}
                                    secureTextEntry={true}
                                    inputRef={passwordRef}
                                    isFocus={passwordRef?.current?.isFocused() || false}
                                />
                            </RowContainer>

                            <LoginButtonWrapper theme={theme}>
                                {isLoading ? (
                                    <ActivityIndicator size="small" color="#00ff00"/>
                                ) : (
                                    <Button
                                        backgroundColor="#104587"
                                        buttonPress={onButtonPress}
                                        title="Signup"
                                        color="#FFFFFF"
                                    />
                                )}
                            </LoginButtonWrapper>

                            <ButtonWrapper theme={theme}>
                                <PageButton
                                    fontStyle={theme.font['--text-xs-medium']}
                                    fontColor={theme.colors['--accent-line']}
                                    backgroundColor={theme.colors['--color-gray-100']}
                                    text={'Continue As Guest'}
                                />
                            </ButtonWrapper>



                            <DividerContainer theme={theme}>
                                {divider}
                                <DividerText>OR</DividerText>
                                {divider}
                            </DividerContainer>


                            <View
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: '#F8FAFB',
                                        borderColor: '#00A9CE',
                                        borderWidth: 1,
                                    },
                                ]}
                            >

                                <Button
                                    backgroundColor="#F8FAFB"
                                    buttonPress={goToLogin}
                                    title="Login"
                                    color="#00A9CE"
                                />
                            </View>

                        </FormContainer>
                    </FormWrapper>

                    {/* </PageContainer> */}
                </PageContainer>

                <CopyRightContainer theme={theme}>
                    <CopyRightText theme={theme}>
                        {'\u00A9'} Copyright 2019 The Suites
                    </CopyRightText>
                </CopyRightContainer>

            </PageWrapper>

        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
    },
    page: {
        // position:'absolute',
        flex: 1,
        // width:'100%',
        // height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 50,
    },
    logo: {
        backgroundColor: '#FFFFFF',
        // padding:10,
        borderRadius: 58,
        marginBottom: 30,
        height: 116,
        width: 116,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#FFFFFF',
        padding: 30,
        height: 356,
        width: 325,
        borderRadius: 12,
    },
    row: {
        width: '100%',
        height: 65,
        marginBottom: 20,
    },
    button: {
        borderRadius: 6,
        backgroundColor: '#104587',
        paddingTop: 8,
        paddingBottom: 8,
        height: 35,
    },
    loginDivider: {
        width: 261,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        marginLeft: 0,
        marginRight: 0,
    },
});

SignupPage.propTypes = {};
SignupPage.defaultProps = {};

const mapStateToProps = state => ({expoPushToken: state.auth.expoPushToken});

const mapDispatcherToProps = {signIn,};

export default connect(mapStateToProps, mapDispatcherToProps)(SignupPage);
