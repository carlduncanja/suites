import React, {useReducer, useMemo, useState} from 'react';

import {Provider} from 'react-redux'
import DefaultReduxState from './src/redux/reducers/initialState'


import {StyleSheet, SafeAreaView, Alert} from 'react-native';

import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import NavigationStack from './src/components/navigation/AppStack/SuitesNavigationStack';
import configureStore from "./src/redux/configureStore";
import LoginComponent from './src/components/Onboarding/LoginComponent'
import {login} from "./src/api/network";
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
