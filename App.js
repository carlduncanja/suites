import React, {useReducer, useMemo, useState} from 'react';
import {Provider} from 'react-redux'
import {StyleSheet, SafeAreaView, Alert} from 'react-native';

import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import configureStore from "./src/redux/configureStore";
import RootApplicationContainer from "./src/components/navigation/RootStack"

const store = configureStore({});

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const contextValue = useMemo(() => {
        return {state, dispatch};
    }, [state, dispatch]);






    return (
        <Provider store={store}>
            <SuitesContextProvider value={{state: contextValue.state, dispatch: contextValue.dispatch}}>
                <RootApplicationContainer auth={{signedIn: true}}/>
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
