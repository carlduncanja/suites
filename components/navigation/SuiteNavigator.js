import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList } from 'react-native';
import NavigationTab from '../SideBar/SideBarTabComponent';

import SvgIcon from '../../assets/SvgIcon';


import { createNavigator, TabRouter } from 'react-navigation';
import SideBarComponent from "../SideBar/SideBarComponent";

/**
 * Custom navigators
 *
 * https://reactnavigation.org/docs/4.x/custom-navigators/
 * @param props
 * @returns {*}
 * @constructor
 */
export const SuiteNavigator = ({screenDimensions, navigation, descriptors}) => {

    const { routes, index } = navigation.state;
    const descriptor = descriptors[routes[index].key];

    const ActiveScreen = descriptor.getComponent();
    const Provider = descriptor.state.params.provider;

    console.log("ActiveScreen: ", ActiveScreen, index);

    // event handlers;
    const handleOnTabPress = (e, routeName) => {
        console.log("tab pressed", routeName);
        navigation.navigate(routeName)
    };

    return (
        <View style={styles.container}>
            <SideBarComponent
                routes={routes}
                selectedIndex={index}
                screenDimensions={screenDimensions}
                navigation={navigation}
                onTabPressed={handleOnTabPress}
                style={styles.navBar}
            />

            <View style={styles.pageContent}>
                <Provider>
                    <ActiveScreen
                        navigation={descriptor.navigation}
                        descriptor={descriptor}
                        screenDimensions={screenDimensions}
                    />
                </Provider>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    navBar: {
        backgroundColor: 'blue'
    },
    pageContent: {
        flex: 1,
    }
});

export const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
    const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

    return createNavigator(SuiteNavigator, customTabRouter, {});
};

