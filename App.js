import React, {useReducer, useMemo} from 'react';
import {connect, Provider} from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
 
import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import configureStore from "./src/redux/configureStore";
import {createStackNavigator} from '@react-navigation/stack';
import RootApplicationNavigator from "./src/RootApplicationNavigator";
import NotificationRegistry from "./src/components/notifications/NotficationRegistry";

import { root } from './src/styles';
import Statusbar from './src/components/navigation/Statusbar';

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
                <ThemeProvider theme = {root}>
                    <Statusbar/>
                    {/*<RootApplicationContainer/>*/}
                    <RootApplicationNavigator/>
                    <NotificationRegistry/>
                </ThemeProvider>
            </SuitesContextProvider>
        </Provider>
    );
};

export default App
