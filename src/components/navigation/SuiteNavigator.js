import React, {useContext} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import {SuitesContext, SuitesContextProvider} from '../../contexts/SuitesContext';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    createNavigatorFactory,
    TabRouter,
    TabActions,
} from '@react-navigation/native';
import {connect} from 'react-redux'

import SideBarComponent from "../SideBar/SideBarComponent";

import OverlaySlidePanelModal from '../../modals/OverlaySlidePanelModal';
import OverlayModal from '../../modals/OverlayModal';
import ActionContainerModal from '../../modals/ActionContainerModal';
import ReportPreviewModal from '../../modals/ReportPreviewModal';
import OverlayInfoModal from '../../modals/OverlayInfoModal';
import BottomSheetModal from '../../modals/BottomSheetModal';
import {MenuProvider} from 'react-native-popup-menu';
import {appActions} from "../../redux/reducers/suitesAppReducer";
import {signOut} from "../../redux/actions/authActions";


/**
 * Custom navigator wrapper for application.
 *
 * https://reactnavigation.org/docs/custom-navigators
 */
const SuitesCustomNavigator = ({
                                   initialRouteName,
                                   children,
                                   screenOptions,
                                   signOut
                               }) => {
    const screenDimensions = Dimensions.get('window')
    const [suitesContext, dispatch] = useContext(SuitesContext);


    const {state, navigation, descriptors} = useNavigationBuilder(TabRouter, {
        children,
        screenOptions,
        initialRouteName,
    });

    console.log(`initialRouteName ${initialRouteName} state`, state)


    // const ActiveScreen = descriptors.getComponent();
    // const ActiveScreen = descriptors[state.routes[state.index].key].render()


    const modalConfig = {
        OverlaySlidePanelModal: OverlaySlidePanelModal,
        OverlayModal: OverlayModal,
        ActionContainerModal: ActionContainerModal,
        ReportPreviewModal: ReportPreviewModal,
        OverlayInfoModal: OverlayInfoModal,
        BottomSheetModal: BottomSheetModal,
    };

    const defaultOptions = {
        backdropOpacity: 0,
        position: 'bottom',
        containerStyle: {
            flex: 1,
            // ...StyleSheet.absoluteFillObject,
            alignItems: 'flex-end',
        }
    };

    const stack = createModalStack(modalConfig, defaultOptions);

    // event handlers;
    const handleOnTabPress = (e, routeName) => {
        console.log("tab pressed", e, routeName);
        navigation.navigate(routeName)
    };

    const handleOnLogout = () => {
        AsyncStorage
            .clear()
            .catch(error => {
                console.log("failed to sign out", error);
            })
            .finally(_ => {
                signOut()
            })
        // navigation.navigate('Auth')
    };

    const getPageMeasure = (event) => {
        dispatch({
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout
        })
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

                            <View style={styles.pageContent}
                                  onLayout={getPageMeasure}
                            >
                                {/*    ACTIVE SCREEN    */}

                                {/*<ActiveScreen*/}
                                {/*    navigation={descriptor.navigation}*/}
                                {/*    descriptor={descriptor}*/}
                                {/*    screenDimensions={screenDimensions}*/}
                                {/*/>*/}

                                {descriptors[state.routes[state.index].key].render()}

                            </View>
                        </View>
                    </ModalProvider>
                </MenuProvider>
            </SafeAreaView>
        </NavigationHelpersContext.Provider>
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

// export const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
//     const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);
//
//     return createNavigator(SuiteNavigator, customTabRouter, {});
// };


const mapDispatchToProps = {
    signOut,
}
export const createSuitesSidebarNavigator = createNavigatorFactory(
    connect(null, mapDispatchToProps)(SuitesCustomNavigator)
);



