import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Theatres from "../../page/Theatres/Theatres";
import TheatresPage from "../../page/Theatres/TheatresPage";
import NotFound from "../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();

export default (props) => {
    const isAdmin = props.route.params.isAdmin || false;
    const theatrePermissions = props.route.params.userPermissions.theatres

    return (
        <Stack.Navigator
            initialRouteName="Theatres"
        >
            <Stack.Screen
                name="Theatres"
                component={Theatres}
                options={{
                    headerShown: false
                }}
                initialParams={{ isAdmin , theatrePermissions}}
            />


            <Stack.Screen
                name="TheatresPage"
                component={TheatresPage}
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
