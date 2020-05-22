import React from "react";
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {SuitesNavigationStack} from "./AppStack/SuitesNavigationStack"
import Auth from "./AuthStack/AuthStack"
import SplashScreen from "../../page/SplashScreen";


/**
 * Main navigation stack
 *
 * https://reactnavigation.org/docs/4.x/auth-flow
 */
const switchNavigator = createSwitchNavigator(
    {
        Splash: SplashScreen,
        App: SuitesNavigationStack,
        Auth
    },
    {
        initialRouteName: 'Splash',
    }
)

export default createAppContainer(switchNavigator);
