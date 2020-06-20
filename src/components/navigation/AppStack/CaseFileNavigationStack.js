import React from "react";
import {createStackNavigator} from 'react-navigation-stack';

import CaseFiles from "../../../page/CaseFiles";
import NotFound from "../../../page/NotFound";

const CaseFileStack = createStackNavigator({
        CaseFiles: {
            screen: CaseFiles,
            navigationOptions: {
                headerShown: false
            }
        },
        CreateCase: {
            screen: NotFound,
            navigationOptions: {
                headerShown: false
            }
        }
    },
    {
        initialRouteName: 'CaseFiles',
    }
);


// const RootApplicationContainer = createAppContainer(AuthStack);

export default CaseFileStack
