import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { ModalProvider, createModalStack } from "react-native-modalfy";
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    createNavigatorFactory,
    TabRouter,
} from "@react-navigation/native";
import { connect } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import jwtDecode from "jwt-decode";
import { SuitesContext } from "../contexts/SuitesContext";
import SideBarComponent from "../components/SideBar/SideBarComponent";
import OverlaySlidePanelModal from "../modals/OverlaySlidePanelModal";
import OverlayModal from "../modals/OverlayModal";
import AddWorkItemModal from "../modals/AddWorkItemModal";
import EditWorkItemModal from "../modals/EditWorkItemModal";
import ActionContainerModal from "../modals/ActionContainerModal";
import ReportPreviewModal from "../modals/ReportPreviewModal";
import OverlayInfoModal from "../modals/OverlayInfoModal";
import BottomSheetModal from "../modals/BottomSheetModal";
import { appActions } from "../redux/reducers/suitesAppReducer";
import { signIn, signOut } from "../redux/actions/authActions";
import QuickActionsModal from "../modals/QuickActionsModal";
import Notifier from "../components/notifications/Notifier";
import ConfirmationModal from "../modals/ConfirmationModal";
import { logout } from "../api/network";
import CustomSnackbarProvider from "../components/Snackbar/CustomSnackbarProvider";
import UnauthorizedSubscription from "../UnauthorizedSubscription";
import { setBearerToken } from "../api";
import PrintScheduleModal from "../modals/PrintScheduleModal";
import ToastComponent from "../components/common/ToastComponent";

const SuitesCustomNavigator = ({
    initialRouteName,
    children,
    screenOptions,
    signOut,
    auth,
}) => {
    const screenDimensions = Dimensions.get("window");
    const [suitesContext, dispatch] = useContext(SuitesContext);

    const { state, navigation, descriptors } = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });
    const [isDisplay, setIsDispay] = useState(false);

    useEffect(() => {
        NetInfo.addEventListener((state) => {
            setIsDispay(!state.isInternetReachable);
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem("userToken")
            .then((token) => {
                if (token) {
                    setBearerToken(token);
                }
                signIn(token);
            })
            .catch((error) => {
                console.log("failed to get user token", error);
            });
    }, []);

    const modalConfig = {
        OverlaySlidePanelModal,
        OverlayModal,
        ActionContainerModal,
        ReportPreviewModal,
        PrintScheduleModal,
        OverlayInfoModal,
        BottomSheetModal,
        QuickActionsModal,
        ConfirmationModal,
        AddWorkItemModal,
        EditWorkItemModal,
    };

    const defaultOptions = {
        backdropOpacity: 0,
        position: "bottom",
        containerStyle: {
            flex: 1,
            alignItems: "flex-end",
        },
    };

    const stack = createModalStack(modalConfig, defaultOptions);

    const handleOnTabPress = (e, routeName) => {
        navigation.navigate(routeName, { screen: routeName });
    };

    const handleOnLogout = () => {
        const { expoPushToken, userToken } = auth;
        const authInfo = jwtDecode(userToken);

        logout(authInfo.user_id, expoPushToken).catch((error) => {
            console.log("logout call failed", error);
        });

        AsyncStorage.clear()
            .catch((error) => {
                console.log("failed to sign out", error);
            })
            .finally((_) => {
                signOut();
            });
    };

    const getPageMeasure = (event) => {
        dispatch({
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout,
        });
    };

    return (
        <NavigationHelpersContext.Provider value={navigation}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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

                            <View
                                style={styles.pageContent}
                                onLayout={getPageMeasure}
                            >
                                <CustomSnackbarProvider>
                                    {isDisplay ? (
                                        <View
                                            style={{
                                                width: "100%",
                                                height: 100,
                                                position: "absolute",
                                                display: "flex",
                                                zIndex: 100,
                                                padding: 30,
                                                paddingTop: 13,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                    height: 48,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <ToastComponent
                                                    isDisplay={isDisplay}
                                                    setIsDispay={setIsDispay}
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <View></View>
                                    )}
                                    {descriptors[
                                        state.routes[state.index].key
                                    ].render()}

                                    <UnauthorizedSubscription />
                                </CustomSnackbarProvider>
                            </View>

                            <Notifier />
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
    navBar: { backgroundColor: "blue" },
    pageContent: { flex: 1 },
});

const mapDispatchToProps = { signOut, signIn };

const mapStateToProps = (state) => ({ auth: state.auth });

export const createSuitesSidebarNavigator = createNavigatorFactory(
    connect(mapStateToProps, mapDispatchToProps)(SuitesCustomNavigator)
);
