import React, {useReducer, useMemo, useEffect} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'emotion-theming'
import * as SplashScreen from 'expo-splash-screen';


import {appReducer} from './src/redux/reducers/appReducer';
import {initialState} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import configureStore from './src/redux/configureStore';
import RootApplicationNavigator from './src/RootApplicationNavigator';
import NotificationRegistry from './src/components/notifications/NotficationRegistry';

import {root} from './src/styles';
import Statusbar from './src/components/navigation/Statusbar';
import {restoreToken} from "./src/redux/actions/authActions";

const store = configureStore({});

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const contextValue = useMemo(() => ({
        state,
        dispatch
    }), [state, dispatch]);

    // TODO REMOVE IN PROD [JUST FOR DEMO PURPOSES]
    // console.disableYellowBox = true;

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                // await SplashScreen.preventAutoHideAsync();

            } catch (e) {
                console.warn('Failed to prevent splash screen hide', e);
            }
        }

        prepare().then(r => {
        }).catch(e => console.log(e));
    }, []);

    return (
        <>
            {
                <Provider store={store}>
                    <SuitesContextProvider value={{
                        state: contextValue.state,
                        dispatch: contextValue.dispatch
                    }}
                    >
                        <ThemeProvider theme={root}>
                            <Statusbar/>
                            <RootApplicationNavigator/>
                            <NotificationRegistry/>
                        </ThemeProvider>
                    </SuitesContextProvider>
                </Provider>
            }
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    restoreToken
}

export default App;
