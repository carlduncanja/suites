import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import LoginPage from "../../../page/LoginPage";

const AuthStack = createStackNavigator({
    LoginScreen: {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false
        }
    }
});


// const RootApplicationContainer = createAppContainer(AuthStack);

export default AuthStack
