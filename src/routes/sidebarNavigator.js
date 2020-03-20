import React from 'react';

import { createNavigator, TabRouter, SafeAreaView } from 'react-navigation';

import NavigationTab from '../components/SideBar/SideBarTabComponent';

const SidebarTabsNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'row' }}>
        <NavigationTab
          descriptors={descriptors}
          navigation={navigation}
        />
        <ActiveScreen navigation={descriptor.navigation} />
    </SafeAreaView>
  );
};

const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

  return createNavigator(SidebarTabsNavigator, customTabRouter, {});
};

export default createSidebarNavigator;
