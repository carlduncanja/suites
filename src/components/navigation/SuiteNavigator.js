import React, {useContext} from "react";
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";

import {
    SuitesContext,
    SuitesContextProvider,
} from "../../contexts/SuitesContext";
import {
    ModalProvider,
    createModalStack,
    useModal,
} from "react-native-modalfy";
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    createNavigatorFactory,
    TabRouter,
    TabActions,
} from "@react-navigation/native";
import {connect} from "react-redux";

import SideBarComponent from "../SideBar/SideBarComponent";

import OverlaySlidePanelModal from "../../modals/OverlaySlidePanelModal";
import OverlayModal from "../../modals/OverlayModal";
import ActionContainerModal from "../../modals/ActionContainerModal";
import ReportPreviewModal from "../../modals/ReportPreviewModal";
import OverlayInfoModal from "../../modals/OverlayInfoModal";
import BottomSheetModal from "../../modals/BottomSheetModal";
import {MenuProvider} from "react-native-popup-menu";
import {appActions} from "../../redux/reducers/suitesAppReducer";
import {signOut} from "../../redux/actions/authActions";
import QuickActionsModal from "../../modals/QuickActionsModal";
import Notifier from "../notifications/Notifier";
import NotificationRegistry from "../notifications/NotficationRegistry";
import ConfirmationModal from "../../modals/ConfirmationModal";
import {logout} from "../../api/network";
import jwtDecode from "jwt-decode";
import CustomSnackbarProvider from "../Snackbar/CustomSnackbarProvider";
import UnAuthorizedSubscription from "../../UnAuthorizedSubscription";

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
    const screenDimensions = Dimensions.get("window");
    const [suitesContext, dispatch] = useContext(SuitesContext);

    const {state, navigation, descriptors} = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });

    console.log(`initialRouteName ${initialRouteName} state`, state);

    const modalConfig = {
        OverlaySlidePanelModal: OverlaySlidePanelModal,
        OverlayModal: OverlayModal,
        ActionContainerModal: ActionContainerModal,
        ReportPreviewModal: ReportPreviewModal,
        OverlayInfoModal: OverlayInfoModal,
        BottomSheetModal: BottomSheetModal,
        QuickActionsModal: QuickActionsModal,
        ConfirmationModal: ConfirmationModal,
    };

    const defaultOptions = {
        backdropOpacity: 0,
        position: "bottom",
        containerStyle: {
            flex: 1,
            // ...StyleSheet.absoluteFillObject,
            alignItems: "flex-end",
        },
    };

    const stack = createModalStack(modalConfig, defaultOptions);

    // event handlers;
    const handleOnTabPress = (e, routeName) => {
        console.log("tab pressed", e, routeName);
        navigation.navigate(routeName);
    };

    const handleOnLogout = () => {

        const {expoPushToken, userToken} = auth;
        const authInfo = jwtDecode(userToken);

        console.log('authInfo: ', authInfo)

        logout(authInfo['user_id'], expoPushToken).catch(error => {
            console.log('logout call failed', error)
        })

        AsyncStorage.clear()
            .catch((error) => {
                console.log("failed to sign out", error);
            })
            .finally((_) => {
                signOut();
            });
        // navigation.navigate('Auth')
    };

    const getPageMeasure = (event) => {
        dispatch({
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout,
        });
    };

    return (
        <NavigationHelpersContext.Provider value={navigation}>
            <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
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

                                    <UnAuthorizedSubscription/>

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
        width: "100%",
        flexDirection: "row",
    },
    navBar: {
        backgroundColor: "blue",
    },
    pageContent: {
        flex: 1,
    },
});

// export const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
//     const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);
//
//     return createNavigator(SuiteNavigator, customTabRouter, {});
// };

const mapDispatchToProps = {
    signOut,
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export const createSuitesSidebarNavigator = createNavigatorFactory(
    connect(mapStateToProps, mapDispatchToProps)(SuitesCustomNavigator)
);
