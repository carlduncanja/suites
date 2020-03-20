import React, {useReducer, useMemo} from 'react';

import {Provider} from 'react-redux'
import DefaultReduxState from './src/redux/reducers/initialState'


import {StyleSheet, SafeAreaView} from 'react-native';

import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import NavigationStack from './src/components/navigation/NavigationStack';
import configureStore from "./src/redux/configureStore";


const store = configureStore({});

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


    return (
        <Provider store={store}>
            <SuitesContextProvider value={{state: contextValue.state, dispatch: contextValue.dispatch}}>
                <SafeAreaView style={styles.container} onLayout={getDimensions}>
                    <NavigationStack
                        screenDimensions={state.screenDimensions}
                        tabSelected={state.tabSelected.tabSelected}
                        onTabPress={onTabPress}
                    />
                </SafeAreaView>
            </SuitesContextProvider>
        </Provider>
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
