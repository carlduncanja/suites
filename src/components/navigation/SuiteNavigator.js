import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Notifications from 'expo-notifications';

import {
    ModalProvider,
    createModalStack,
    useModal,
} from 'react-native-modalfy';
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    createNavigatorFactory,
    TabRouter,
    TabActions,
} from '@react-navigation/native';
import {connect} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import jwtDecode from 'jwt-decode';
import {
    SuitesContext,
    SuitesContextProvider,
} from '../../contexts/SuitesContext';

import SideBarComponent from '../SideBar/SideBarComponent';

import OverlaySlidePanelModal from '../../modals/OverlaySlidePanelModal';
import OverlayModal from '../../modals/OverlayModal';
import ActionContainerModal from '../../modals/ActionContainerModal';
import ReportPreviewModal from '../../modals/ReportPreviewModal';
import OverlayInfoModal from '../../modals/OverlayInfoModal';
import BottomSheetModal from '../../modals/BottomSheetModal';
import {appActions} from '../../redux/reducers/suitesAppReducer';
import {signIn, signOut} from '../../redux/actions/authActions';
import QuickActionsModal from '../../modals/QuickActionsModal';
import Notifier from '../notifications/Notifier';
import NotificationRegistry from '../notifications/NotficationRegistry';
import ConfirmationModal from '../../modals/ConfirmationModal';
import {logout} from '../../api/network';
import CustomSnackbarProvider from '../Snackbar/CustomSnackbarProvider';
import UnauthorizedSubscription from '../../UnauthorizedSubscription';
import {setBearerToken} from "../../api";

/**
 * Custom navigator wrapper for application.
 *
 * https://reactnavigation.org/docs/custom-navigators
 */
const SuitesCustomNavigator = ({
                                   initialRouteName,
                                   children,
                                   screenOptions,
                                   signOut,
                                   auth,
                               }) => {
    const screenDimensions = Dimensions.get('window');
    const [suitesContext, dispatch] = useContext(SuitesContext);

    const {state, navigation, descriptors} = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });

    useEffect(() => {
        // get user token from state,
        AsyncStorage.getItem('userToken')
            .then(token => {
                // navigation.navigate("App")
                if (token) {
                    setBearerToken(token);
                }
                signIn(token);
            })
            .catch(error => {
                console.log('failed to get user token', error);
            });
    }, [])

    const modalConfig = {
        OverlaySlidePanelModal,
        OverlayModal,
        ActionContainerModal,
        ReportPreviewModal,
        OverlayInfoModal,
        BottomSheetModal,
        QuickActionsModal,
        ConfirmationModal,
    };

    const defaultOptions = {
        backdropOpacity: 0,
        position: 'bottom',
        containerStyle: {
            flex: 1,
            // ...StyleSheet.absoluteFillObject,
            alignItems: 'flex-end',
        },
    };

    const stack = createModalStack(modalConfig, defaultOptions);

    // event handlers;
    const handleOnTabPress = (e, routeName) => {
        console.log('tab pressed', routeName);
        navigation.navigate(routeName, {screen: routeName});
    };

    const handleOnLogout = () => {
        const {expoPushToken, userToken} = auth;
        const authInfo = jwtDecode(userToken);

        console.log('authInfo: ', authInfo);

        logout(authInfo.user_id, expoPushToken).catch(error => {
            console.log('logout call failed', error);
        });

        AsyncStorage.clear()
            .catch(error => {
                console.log('failed to sign out', error);
            })
            .finally(_ => {
                signOut();
            });
        // navigation.navigate('Auth')
    };

    const getPageMeasure = event => {
        dispatch({
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout,
        });
    };

    return (
        <NavigationHelpersContext.Provider value={navigation}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <MenuProvider>
                    <ModalProvider stack={stack}>
                        <View style={styles.container}>
                            <SideBarComponent
                                routes={state.routes}
                                selectedIndex={state.index}
                                screenDimensions={screenDimensions}
                                navigation={navigation}
                                onTabPressed={handleOnTabPress}
                                onLogout={handleOnLogout}
                                style={styles.navBar}
                            />

                            <View style={styles.pageContent} onLayout={getPageMeasure}>
                                {/*    ACTIVE SCREEN    */}

                                <CustomSnackbarProvider>

                                    {descriptors[state.routes[state.index].key].render()}

                                    <UnauthorizedSubscription/>

                                </CustomSnackbarProvider>

                            </View>

                            <Notifier/>
                        </View>
                    </ModalProvider>
                </MenuProvider>
            </SafeAreaView>
        </NavigationHelpersContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    navBar: {backgroundColor: 'blue'},
    pageContent: {flex: 1},
});

// export const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
//     const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);
//
//     return createNavigator(SuiteNavigator, customTabRouter, {});
// };

const mapDispatchToProps = {signOut, signIn};

const mapStateToProps = state => ({auth: state.auth});

export const createSuitesSidebarNavigator = createNavigatorFactory(
    connect(mapStateToProps, mapDispatchToProps)(SuitesCustomNavigator)
);
