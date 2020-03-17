import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNavigator, TabRouter, SafeAreaView } from 'react-navigation';
import PatientTabs from './PatientTabs';

const PatientNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <PatientTabs
            descriptors={descriptors}
            navigation={navigation}
        />
        <ActiveScreen navigation={descriptor.navigation} style={{}} />
    </SafeAreaView>
  );
};

const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

  return createNavigator(PatientNavigator, customTabRouter, {});
};

export default createSidebarNavigator;