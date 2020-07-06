import React from "react";

import {createStackNavigator} from '@react-navigation/stack'
import LoginPage from "../../../page/LoginPage";

const Stack = createStackNavigator();


const AuthStack = () => <Stack.Navigator>
    <Stack.Screen name='login' component={LoginPage} options={{headerShown: false}}/>
</Stack.Navigator>


export default AuthStack
