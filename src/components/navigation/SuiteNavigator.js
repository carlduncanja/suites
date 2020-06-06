import React, {useContext, useMemo} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SectionList,
    Dimensions,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import {SuitesContext, SuitesContextProvider} from '../../contexts/SuitesContext';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import {createNavigator, TabRouter} from 'react-navigation';
import SideBarComponent from "../SideBar/SideBarComponent";

import OverlaySlidePanelModal from '../../modals/OverlaySlidePanelModal';
import OverlayModal from '../../modals/OverlayModal';
import ActionContainerModal from '../../modals/ActionContainerModal';
import ReportPreviewModal from '../../modals/ReportPreviewModal';
import OverlayInfoModal from '../../modals/OverlayInfoModal';
import BottomSheetModal from '../../modals/BottomSheetModal';
import {MenuProvider} from 'react-native-popup-menu';
import {appActions} from "../../redux/reducers/suitesAppReducer";


/**
 * Custom navigator wrapper for application.
 *
 * https://reactnavigation.org/docs/4.x/custom-navigators/
 * @screenDimension :props
 * @navigation :
 * @descriptor :
 */
export const SuiteNavigator = ({navigation, descriptors}) => {
    const [state, dispatch] = useContext(SuitesContext);


    const screenDimensions = Dimensions.get('window')
    const {routes, index} = navigation.state;
    const descriptor = descriptors[routes[index].key];

    const ActiveScreen = descriptor.getComponent();
    const Provider = descriptor.state.params.provider;

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
        console.log("tab pressed", routeName);
        navigation.navigate(routeName)
    };

    const handleOnLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate('Auth')
    };

    const getPageMeasure = (event) => {
        dispatch({
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout
        })
    };

    return (
        <Provider>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}
            >
                <MenuProvider>
                    <ModalProvider stack={stack}>
                        <View style={styles.container}>
                            <SideBarComponent
                                routes={routes}
                                selectedIndex={index}
                                screenDimensions={screenDimensions}
                                navigation={navigation}
                                onTabPressed={handleOnTabPress}
                                onLogout={handleOnLogout}
                                style={styles.navBar}
                            />

                            <View style={styles.pageContent}
                                  onLayout={getPageMeasure}
                            >
                                <ActiveScreen
                                    navigation={descriptor.navigation}
                                    descriptor={descriptor}
                                    screenDimensions={screenDimensions}
                                />
                            </View>
                        </View>
                    </ModalProvider>
                </MenuProvider>
            </SafeAreaView>
        </Provider>
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

