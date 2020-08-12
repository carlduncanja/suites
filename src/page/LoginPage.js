import React, {useState, useRef, useEffect, createRef} from "react";
import PropTypes from "prop-types";
import {
    View,
    StyleSheet,
    Alert,
    AsyncStorage,
    ActivityIndicator,
    Text,
    Keyboard,
} from "react-native";
import {login} from "../api/network";
import LoginBackground from "../components/Onboarding/LoginBackground";
import Logo from "../../assets/svg/logo";
import InputFieldwithIcon from "../components/common/Input Fields/InputFiledwithIcon";
import PersonIcon from "../../assets/svg/personIcon";
import PasswordIcon from "../../assets/svg/lockIcon";
import NotificationReg from "../components/notifications/NotficationRegistry";
import Button from "../components/common/Buttons/Button";
import {connect} from "react-redux";
import {signIn} from "../redux/actions/authActions";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Page from "../components/common/Page/Page";

function LoginPage({navigation, signIn, expoPushToken}) {

    const theme = useTheme();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [fields, setFields] = useState({
        email: "",
        password: "",
    });

    useEffect(()=>{},[])

    const [isLoading, setLoading] = useState(false);

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };
    const onButtonPress = () => {
        console.log("Fields: ", fields);

        setLoading(true);

        login(fields.email, fields.password, expoPushToken)
            .then(async (data) => {
                // save auth data
                console.log(data);
                const {token = null} = data;
                try {
                    await AsyncStorage.setItem("userToken", token);
                    // navigation.navigate("App")
                    signIn(token);
                } catch (error) {
                    // Error saving data
                }
            })
            .catch((e) => {
                console.log("login failed", e);
                Alert.alert("Failed to login");
            })
            .finally((_) => {
                setLoading(false);
            });
    };

    const onGuestButtonPress = () => {
    };

    const divider = (
        <View
            style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#CCD6E0",
                height: 0,
            }}
        />
    );

    const LoginPageWrapper = styled.View`
        margin : 0;
        flex:1;
    `;
    const LoginPageContainer = styled.View`
        height: 100%;
        width: 100%;
        
    `;

    const OverlayWrapper = styled.View`
        flex:1;
        position : 'absolute';
        height: 100%;
        width: 100%;
        top:0;
        bottom:0;
    `;
    const OverlayContainer = styled.View`
        height: 100%;
        width: 100%;
    `;

    const PageWrapper = styled.View`
        height: 100%;
        width: 100%;
        bottom :50;
    `
    const PageContainer = styled.View`
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: center;
    `

    const LogoWrapper = styled.View`
        height: 116px;
        width: 116px;
        margin-bottom: ${theme.space['--space-32']};
    `;
    const LogoContainer = styled.View`
        height: 100%;
        width: 100%;
        background-color: ${theme.colors['--default-shade-white']};
        border-radius: 58px;
        align-items: center;
        justify-content: center;
    `;

    const FormWrapper = styled.View``;
    const FormContainer = styled.View``;
    return (
        <View style={{flex:1}}>
            {/* <LoginPageContainer> */}

                <LoginBackground/>

                <View style={styles.overlay}>
                    {/* <OverlayContainer>  */}

                        <View style={styles.page}>
                            {/* <PageContainer> */}

                                <LogoWrapper>
                                    <LogoContainer>
                                        <Logo/>
                                    </LogoContainer>
                                </LogoWrapper>

                                <View style={styles.form}>

                                    <View style={styles.row}>
                                        <InputFieldwithIcon
                                            label="Email"
                                            onChangeText={(value) => onFieldChange('email')(value)}
                                            value={fields['email']}
                                            keyboardType={"email-address"}
                                            onClear={() => onFieldChange('email')('')}
                                            icon={<PersonIcon/>}
                                            inputRef = {emailRef}
                                            isFocus = {emailRef?.current?.isFocused() || false}
                                            // onFocus = {onFocus}
                                        />
                                    </View>

                                    <View style={styles.row}>
                                        <InputFieldwithIcon
                                            label="Password"
                                            onChangeText={(value) => onFieldChange("password")(value)}
                                            value={fields["password"]}
                                            onClear={() => onFieldChange("password")("")}
                                            icon={<PasswordIcon/>}
                                            secureTextEntry={true}
                                            inputRef = {passwordRef}
                                            isFocus ={passwordRef?.current?.isFocused() || false}
                                        />
                                    </View>

                                    <View style={styles.button}>
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color="#00ff00"/>
                                        ) : (
                                            <Button
                                                backgroundColor="#104587"
                                                buttonPress={onButtonPress}
                                                title="Login"
                                                color="#FFFFFF"
                                            />
                                        )}
                                    </View>

                                    <View style={styles.loginDivider}>
                                        {divider}
                                        <Text
                                            style={{
                                                color: "#CCD6E0",
                                                fontSize: 12,
                                                marginLeft: 4,
                                                marginRight: 4,
                                            }}
                                        >
                                            OR
                                        </Text>
                                        {divider}
                                    </View>

                                    <View
                                        style={[
                                            styles.button,
                                            {
                                                backgroundColor: "#F8FAFB",
                                                borderColor: "#00A9CE",
                                                borderWidth: 1,
                                            },
                                        ]}
                                    >

                                        <Button
                                            backgroundColor="#F8FAFB"
                                            buttonPress={() => onGuestButtonPress()}
                                            title="Continue as Guest"
                                            color="#00A9CE"
                                        />
                                    </View>
                            </View>

                            {/* </PageContainer> */}
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "flex-end",
                                bottom: 30,
                            }}
                        >
                            <Text style={{color: "#FFFFFF", fontSize: 14}}>
                                {"\u00A9"} Copyright 2019 The Suites
                            </Text>
                        </View>
                    {/* </OverlayContainer>  */}
                </View>

            {/* </LoginPageContainer> */}
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
    },
    page: {
        // position:'absolute',
        flex: 1,
        // width:'100%',
        // height:'100%',
        alignItems: "center",
        justifyContent: "center",
        bottom: 50,
    },
    logo: {
        backgroundColor: "#FFFFFF",
        // padding:10,
        borderRadius: 58,
        marginBottom: 30,
        height: 116,
        width: 116,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        backgroundColor: "#FFFFFF",
        padding: 30,
        height: 356,
        width: 325,
        borderRadius: 12,
    },
    row: {
        height: 65,
        marginBottom: 20,
    },
    button: {
        width: "100%",
        borderRadius: 6,
        backgroundColor: "#104587",
        paddingTop: 8,
        paddingBottom: 8,
        height: 35,
    },
    loginDivider: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
        marginLeft: 0,
        marginRight: 0,
    },
});

LoginPage.propTypes = {};
LoginPage.defaultProps = {};

const mapStateToProps = (state) => ({expoPushToken: state.auth.expoPushToken})

const mapDispatcherToProps = {
    signIn,
};

export default connect(mapStateToProps, mapDispatcherToProps)(LoginPage);
