import React, {useReducer, useMemo} from 'react';
import {connect, Provider} from 'react-redux'

import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import configureStore from "./src/redux/configureStore";
import {createStackNavigator} from '@react-navigation/stack';
import RootApplicationNavigator from "./src/RootApplicationNavigator";
import NotificationRegistry from "./src/components/notifications/NotficationRegistry";
import {View} from "react-native";

const store = configureStore({});

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const contextValue = useMemo(() => {
        return {state, dispatch};
    }, [state, dispatch]);


    // TODO REMOVE IN PROD [JUST FOR DEMO PURPOSES]
    console.disableYellowBox = true;

    return (
        <Provider store={store}>
            <SuitesContextProvider value={{state: contextValue.state, dispatch: contextValue.dispatch}}>

                {/*<RootApplicationContainer/>*/}
                <RootApplicationNavigator/>
                <NotificationRegistry/>

            </SuitesContextProvider>
        </Provider>
    );
};


export default App
