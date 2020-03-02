import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList } from 'react-native';
import NavigationTab from './NavigationTab';

import SvgIcon from '../../assets/SvgIcon';


import { createNavigator, TabRouter } from 'react-navigation';

export const NavigationBar = (props) => {
    const { routes, index } = props.navigation.state;
    const descriptor = props.descriptors[routes[index].key];

    const ActiveScreen = descriptor.getComponent();
    const Provider = descriptor.state.params.provider;

    return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, width: '11%' }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.viewContainer}>
                        <View style={[styles.logo,
                        { paddingBottom: props.screenDimensions.width > props.screenDimensions.height ? 10 : 25 }
                        ]}>
                            <SvgIcon iconName="logo" />
                        </View>
                        <ScrollView
                            stickyHeaderIndices={[routes.indexOf(props.tabSelected.tabSelected)]}
                            //invertStickyHeaders={[tabs.indexOf(props.tabSelected.tabSelected)]}
                            scrollEventThrottle={2}
                            scrollEnabled={true}
                            showsVerticalScrollIndicator={false}
                            style={[styles.container]}
                            contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}
                        //bounces={false}
                        >

                            {routes.map((route, tabIndex) => {
                                const { routeName, params } = route;
                                const { icon, tabName } = params || {};

                                return (
                                    <View style={{ width: '100%' }} key={tabIndex}>
                                        <NavigationTab
                                            {...props}
                                            icon={icon}
                                            tabName={tabName}
                                        />

                                    </View>


                                )
                            })}

                        </ScrollView>

                    </View>
                    <View style={styles.footer} />
                </View>
            </View>
            <View style={styles.content}>

                <Provider>
                    <ActiveScreen navigation={descriptor.navigation} {...props} />
                </Provider>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
    },
    viewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#104587',
        //flex:1,
    },
    logo: {
        paddingTop: 10
    },
    content: {
        flex: 12,
    }
})

export const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
    const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

    return createNavigator(NavigationBar, customTabRouter, {});
};

