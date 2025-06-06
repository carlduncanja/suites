import React from "react";

import {createStackNavigator} from '@react-navigation/stack'
import LoginPage from "../../page/Onboarding/LoginPage";
import SignUpPage from "../../page/Onboarding/SignupPage";
import ForgotPasswordPage from "../../page/Onboarding/ForgotPasswordPage";
import VerificationSentPage from "../../page/Onboarding/VerificationSentPage";
import VerificationCodePage from "../../page/Onboarding/VerificationCodePage";
import NewPasswordPage from "../../page/Onboarding/NewPasswordPage";
import ConfirmationPage from "../../page/Onboarding/ConfirmationPage";

const Stack = createStackNavigator();


const AuthStack = () => <Stack.Navigator>
    <Stack.Screen name='login' component={LoginPage} options={{headerShown: false}}/>
    <Stack.Screen name='signup' component={SignUpPage} options={{headerShown: false}}/>
    <Stack.Screen name='forgot' component={ForgotPasswordPage} options={{headerShown: false}}/>
    <Stack.Screen name='verification-sent' component={VerificationSentPage} options={{headerShown: false}}/>
    <Stack.Screen name='verify-code' component={VerificationCodePage} options={{headerShown: false}}/>
    <Stack.Screen name='new-password' component={NewPasswordPage} options={{headerShown: false}}/>
    <Stack.Screen name='confirmation' component={ConfirmationPage} options={{headerShown: false}}/>
</Stack.Navigator>


export default AuthStack
