import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import Theatres from "../../../page/Theatres";
import TheatresPage from "../../Theatres/TheatresPage";
import NotFound from "../../../page/NotFound";
import HeaderBackComponent from "../components/HeaderBackComponent";


const Stack = createStackNavigator();


export default () => {

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
