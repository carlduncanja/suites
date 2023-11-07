import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Physicians from "../../page/Physicians";
import PhysicianPage from "../../components/Physicians/PhysicianPage";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const allPermisisons = props.route.params.userPermissions
    const permissions = props.route.params.userPermissions.physicians;
    return (
        <Stack.Navigator
            initialRouteName="Physicians"
        >
            <Stack.Screen
                name="Physicians"
                component={Physicians}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin , permissions}}
            />


            <Stack.Screen
                name="PhysicianPage"
                component={PhysicianPage}
                options={{
                    headerShown: false,
                    headerLeft: (props) => (
                        <HeaderBackComponent
                            {...props}
                        />
                    ),
                    headerStyle: {
                        height: 100,

                    },
                    headerTitle: ""
                }}
            />

        </Stack.Navigator>
    );
}
