import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import styled from "@emotion/native";
import { login, loginGuest } from "../../api/network";
import LoginBackground from "../../components/Onboarding/LoginBackground";
import Logo from "../../../assets/svg/logo";
import InputFieldWithIcon from "../../components/common/Input Fields/InputFieldWithIcon";
import PersonIcon from "../../../assets/svg/personIcon";
import PasswordIcon from "../../../assets/svg/lockIcon";
import Button from "../../components/common/Buttons/Button";
import { signIn } from "../../redux/actions/authActions";
import { setBearerToken } from "../../api";
import PageButton from "../../components/common/Page/PageButton";
import { useTheme } from "emotion-theming";

function LoginPage({ navigation, signIn, expoPushToken }) {
  const theme = useTheme();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [fieldError, setFieldError] = useState({});

  const [isLoading, setLoading] = useState(false);

  const onFieldChange = (fieldName) => (value) => {
    setFields({
      ...fields,
      [fieldName]: value,
    });
    const updatedErrors = { ...fieldError };
    delete updatedErrors[fieldName];
    setFieldError(updatedErrors);
  };

  const onLoginButtonPress = () => {
    if (!isFormFieldsValid()) return;

    setLoading(true);
    login(fields.email, fields.password, expoPushToken)
      .then(async (data) => {
        const { token = null } = data;
        try {
          await AsyncStorage.setItem("userToken", token);
          if (token) {
            setBearerToken(token);
          }
          signIn(token);
        } catch (error) {
          console.log("Failed to save token", error);
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

  const isFormFieldsValid = () => {
    const requiredParams = ["email", "password"];
    let valid = true;
    const errors = {};
    for (const requiredParam of requiredParams) {
      if (!fields[requiredParam]) {
        valid = false;
        errors[requiredParam] = "Please enter value";
      }
    }
    setFieldError(errors);
    return valid;
  };

  const onGuestButtonPress = () => {
    setLoading(true);
    loginGuest()
      .then(async (data) => {
        const { token = null } = data;
        try {
          await AsyncStorage.setItem("userToken", token);
          if (token) {
            setBearerToken(token);
          }
          signIn(token);
        } catch (error) {
          console.log("Failed to save token", error);
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

  const goToSignUp = () => {
    navigation.navigate("signup");
  };

  const goToForgotPassword = () => {
    navigation.navigate("forgot");
  };

  return (
    <PageWrapper theme={theme}>
      <LoginBackground />
      <PageWrapper theme={theme}>
        <PageContainer>
          <LogoWrapper theme={theme}>
            <LogoContainer theme={theme}>
              <Logo />
            </LogoContainer>
          </LogoWrapper>

          <FormWrapper theme={theme}>
            <FormContainer theme={theme}>
              <FormHeaderText>Login</FormHeaderText>

              <RowContainer theme={theme}>
                <InputFieldWithIcon
                  placeholder="Email"
                  onChangeText={(value) => onFieldChange("email")(value)}
                  hasError={!!fieldError["email"]}
                  errorMessage={fieldError["email"]}
                  value={fields.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onClear={() => onFieldChange("email")("")}
                  icon={<PersonIcon />}
                  inputRef={emailRef}
                  isFocus={emailRef?.current?.isFocused() || false}
                />
              </RowContainer>

              <RowContainer theme={theme}>
                <InputFieldWithIcon
                  placeholder="Password"
                  onChangeText={(value) => onFieldChange("password")(value)}
                  value={fields.password}
                  autoCapitalize={"none"}
                  hasError={!!fieldError["password"]}
                  errorMessage={fieldError["password"]}
                  onClear={() => onFieldChange("password")("")}
                  icon={<PasswordIcon />}
                  secureTextEntry={true}
                  inputRef={passwordRef}
                  isFocus={passwordRef?.current?.isFocused() || false}
                />
              </RowContainer>

              <LoginButtonWrapper theme={theme}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#00ff00" />
                ) : (
                  <Button
                    backgroundColor="#104587"
                    buttonPress={onLoginButtonPress}
                    title="Login"
                    color="#FFFFFF"
                  />
                )}
              </LoginButtonWrapper>

              <ButtonWrapper theme={theme}>
                <PageButton
                  onPress={onGuestButtonPress}
                  fontStyle={theme.font["--text-xs-medium"]}
                  fontColor={theme.colors["--accent-line"]}
                  backgroundColor={theme.colors["--color-gray-100"]}
                  text={"Continue As Guest"}
                />
              </ButtonWrapper>

              <View style={{ justifyContent: "center" }}>
                <ForgotPasswordText onPress={goToForgotPassword}>
                  Forgot Password?
                </ForgotPasswordText>
              </View>

              <DividerContainer theme={theme}>
                {divider}
                <DividerText>OR</DividerText>
                {divider}
              </DividerContainer>

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
                  buttonPress={goToSignUp}
                  title="Signup"
                  color="#00A9CE"
                />
              </View>
            </FormContainer>
          </FormWrapper>
        </PageContainer>

        <CopyRightContainer theme={theme}>
          <CopyRightText theme={theme}>Powered by SMS</CopyRightText>
        </CopyRightContainer>
      </PageWrapper>
    </PageWrapper>
  );
}

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
`;
const CopyRightText = styled.Text(({ theme }) => ({
  ...theme.font["--text-xs-regular"],
  color: theme.colors["--default-shade-white"],
}));

const LogoWrapper = styled.View`
  height: 116px;
  width: 116px;
  margin-bottom: ${({ theme }) => theme.space["--space-32"]};
`;
const LogoContainer = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
  border-radius: 58px;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.View`
  display: flex;
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
  padding: ${({ theme }) => theme.space["--space-32"]};
  //align-self: center;
  //min-height: 200px;
  //width: 352px;
  border-radius: 12px;
  justify-content: flex-start;
  align-items: center;
`;

const FormHeaderText = styled.Text(({ theme }) => ({
  ...theme.font["--text-2xl-medium"],
  color: theme.colors["--company"],
  marginBottom: 32,
}));

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
  margin-bottom: ${({ theme }) => theme.space["--space-20"]};
`;

const DividerContainer = styled.View`
  width: 100%;
  height: 56px;
  flex-direction: row;
  align-items: center;
`;
const DividerText = styled.Text(({ theme }) => ({
  ...theme.font["--text-xs-regular"],
  color: theme.colors["--color-gray-400"],
  marginLeft: 10,
  marginRight: 10,
}));

const LoginButtonWrapper = styled.View`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors["--company"]};
  padding-top: ${({ theme }) => theme.space["--space-8"]};
  padding-bottom: ${({ theme }) => theme.space["--space-8"]};
  height: 35px;
  width: 100%;
`;

const ButtonWrapper = styled.View`
  height: 36px;
  margin-top: 16px;
  width: 100%;
`;
const ForgotPasswordText = styled.Text(({ theme }) => ({
  ...theme.font["--text-base-regular"],
  color: "#00A9CE",
  marginTop: 32,
  width: "100%",
  textDecorationLine: "underline",
}));

const styles = StyleSheet.create({
  logo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 58,
    marginBottom: 30,
    height: 116,
    width: 116,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: "100%",
    height: 65,
    marginBottom: 20,
  },
  button: {
    borderRadius: 6,
    backgroundColor: "#104587",
    paddingTop: 8,
    width: "100%",
    paddingBottom: 8,
    height: 35,
  },
});

const mapStateToProps = (state) => ({
  expoPushToken: state.auth.expoPushToken,
});

const mapDispatcherToProps = { signIn };

export default connect(mapStateToProps, mapDispatcherToProps)(LoginPage);
