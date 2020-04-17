import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList} from 'react-native';
import {getList} from '../../hooks/useListHook';
import NavigationTab from '../SideBar/SideBarTabComponent';
import {SuitesContext} from '../../contexts/SuitesContext';
import {appActions} from '../../redux/reducers/suitesAppReducer';
import SvgIcon from '../../../assets/SvgIcon';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import {createNavigator, TabRouter} from 'react-navigation';
import SideBarComponent from "../SideBar/SideBarComponent";

import OverlaySlidePanelModal from '../../modals/OverlaySlidePanelModal';
import OverlayModal from '../../modals/OverlayModal';
import ActionContainerModal from '../../modals/ActionContainerModal';
import ReportPreviewModal from '../../modals/ReportPreviewModal';
import OverlayInfoModal from '../../modals/OverlayInfoModal';
import BottomSheetModal from '../../modals/BottomSheetModal';

/**
 * Custom navigator wrapper for application.
 *
 * https://reactnavigation.org/docs/4.x/custom-navigators/
 * @screenDimension :props
 * @navigation :
 * @descriptor :
 */
export const SuiteNavigator = ({screenDimensions, navigation, descriptors}) => {

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

    const [state, dispatch] = useContext(SuitesContext);

    // event handlers;
    const handleOnTabPress = (e, routeName) => {
        console.log("tab pressed", routeName);
        navigation.navigate(routeName)
    };

    return (
        <Provider>
            <ModalProvider stack={stack}>
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
                        <ActiveScreen
                            navigation={descriptor.navigation}
                            descriptor={descriptor}
                            screenDimensions={screenDimensions}
                        />
                    </View>
                </View>
            </ModalProvider>
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

