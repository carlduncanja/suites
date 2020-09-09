import React from "react";

import {createStackNavigator} from '@react-navigation/stack'
import LoginPage from "../../../page/Onboarding/LoginPage";
import SignUpPage from "../../../page/Onboarding/SignupPage";

const Stack = createStackNavigator();


const AuthStack = () => <Stack.Navigator>
    <Stack.Screen name='login' component={LoginPage} options={{headerShown: false}}/>
    <Stack.Screen name='signup' component={SignUpPage} options={{headerShown: false}}/>
</Stack.Navigator>


export default AuthStack
