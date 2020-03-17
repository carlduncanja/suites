import React, {useReducer, useMemo} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {appActionTypes, appReducer} from './reducers/appReducer';
import {initialState, SuitesContext} from './SuitesContext';

import {SuitesContextProvider} from './contexts/SuitesContext';
import {CaseFileContextProvider} from './contexts/CaseFileContext';
import {ModalProvider, createModalStack} from 'react-native-modalfy';
import OverlaySlidePanelModal from './modals/OverlaySlidePanelModal';
import OverlayModal from './modals/OverlayModal';
import ActionContainerModal from './modals/ActionContainerModal';
import ReportPreviewModal from './modals/ReportPreviewModal';
import Content from './components/layout/Content';

// import NavigationStack from './components/Navigator/NavigationStack';
import NavigationStack from './components/navigation/NavigationStack';


const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const contextValue = useMemo(() => {
        return {state, dispatch};
    }, [state, dispatch]);


    const getDimensions = (event) => {
        dispatch({
            type: appActionTypes.DIMENSIONS,
            newState: {width: event.nativeEvent.layout.width, length: event.nativeEvent.layout.height}
        });
    };

    const onTabPress = (event, selected) => {
        console.log("tab press", selected);
        dispatch({
            type: appActionTypes.TABSELECTED,
            newState: {tabSelected: selected, status: true}
        });
    };

    const modalConfig = {
        OverlaySlidePanelModal: OverlaySlidePanelModal,
        OverlayModal: OverlayModal,
        ActionContainerModal: ActionContainerModal,
        ReportPreviewModal: ReportPreviewModal
    }

    const defaultOptions = {
        backdropOpacity: 0,
        position: 'bottom',
        containerStyle: {
            flex: 1,
            alignItems: 'flex-end',
        }
    }
    const stack = createModalStack(modalConfig, defaultOptions)


    return (
        <SuitesContextProvider value={{state: contextValue.state, dispatch: contextValue.dispatch}}>
            <ModalProvider stack={stack}>
                <SafeAreaView style={styles.container} onLayout={getDimensions}>
                    <NavigationStack
                        screenDimensions={state.screenDimensions}
                        tabSelected={state.tabSelected.tabSelected}
                        onTabPress={onTabPress}
                    />
                </SafeAreaView>
            </ModalProvider>
        </SuitesContextProvider>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        //flex:1,
        width: '7%'
    },
    content: {
        flex: 12,
    }

});

export default App
