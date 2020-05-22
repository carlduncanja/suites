import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import LoginComponent from "../../Onboarding/LoginComponent";
import LoginPage from "../../Onboarding/LoginPage";
import NavigationStack from "../AppStack/SuitesNavigationStack"

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
