import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../../page/Settings';
import AppointmentBufferPage from '../../components/Settings/AppointmentBuffer/AppointmentBufferPage';
import InventoryPage from '../../components/Settings/Category/CategoryPage';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Settings"
    >
        <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
        />

        <Stack.Screen
            name="AppointmentsPage"
            component={AppointmentBufferPage}
            options={{headerShown: false,}}
        />

        <Stack.Screen
            name="InventoryPage"
            component={InventoryPage}
            options={{headerShown: false,}}
        />

    </Stack.Navigator>
);
