import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Theatres from '../../page/Theatres/Theatres';
import TheatresPage from '../../page/Theatres/TheatresPage';
import NotFound from '../../page/NotFound';
import HeaderBackComponent from '../components/HeaderBackComponent';
import UsersPage from '../../page/Users/UsersPage';
import UserPage from '../../page/Users/UserPage';
import ResetPasswordPage from '../../page/Users/ResetPasswordPage';

const Stack = createStackNavigator();

export default () => {

    return (
        <Stack.Navigator
            initialRouteName="Users"
        >
            <Stack.Screen
                name="Users"
                component={UsersPage}
                options={{
                    headerShown: false
                }}
            />


            <Stack.Screen
                name="UserPage"
                component={UserPage}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="ResetPasswordPage"
                component={ResetPasswordPage}
                options={{headerShown: false}}
            />

        </Stack.Navigator>
    );
}
