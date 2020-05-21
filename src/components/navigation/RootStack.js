import React from "react";
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import LoginComponent from "../Onboarding/LoginComponent";
import LoginPage from "../Onboarding/LoginPage";
import NavigationStack from "./NavigationStack"

const RootStack = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
        navigationOptions: {
            headerShown: false
        }
    },
    Main: {
        screen: NavigationStack,
        navigationOptions: {
            headerShown: false
        }
    }
});


const RootApplicationContainer = createAppContainer(RootStack);

export default RootApplicationContainer
