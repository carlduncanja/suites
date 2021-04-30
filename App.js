import React, {useReducer, useMemo, useState} from 'react';
import {connect, Provider} from 'react-redux';
import {ThemeProvider} from 'emotion-theming';
import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';

import {createStackNavigator} from '@react-navigation/stack';
import {appActionTypes, appReducer} from './src/redux/reducers/appReducer';
import {initialState, SuitesContext} from './src/SuitesContext';

import {SuitesContextProvider} from './src/contexts/SuitesContext';
import configureStore from './src/redux/configureStore';
import RootApplicationNavigator from './src/RootApplicationNavigator';
import NotificationRegistry from './src/components/notifications/NotficationRegistry';

import {root} from './src/styles';
import Statusbar from './src/components/navigation/Statusbar';
import {LogBox} from "react-native";

const store = configureStore({});

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [isReady, setIsReady] = useState(false);

    const contextValue = useMemo(() => ({
        state,
        dispatch
    }), [state, dispatch]);

    // TODO REMOVE IN PROD [JUST FOR DEMO PURPOSES]
    LogBox.ignoreAllLogs(true)

    const _cacheResourcesAsync = async () => {
        const images = [
            require('./assets/TheSuitesLogo.png'),
            // require('./assets/TheSuitesLogo2.png')
        ];

        const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
        return Promise.all(cacheImages);
    };

    console.log('isReady', isReady);

    return (
        <>
            {
                // isReady === false
                //     ? (
                //         <AppLoading
                //             startAsync={_cacheResourcesAsync}
                //             onFinish={() => setIsReady(true)}
                //             onError={(e) => {
                //                 console.log('something went wrong: ', e);
                //                 console.warn()
                //             }}
                //         />
                //     )
                //     : (
                        <Provider store={store}>
                            <SuitesContextProvider value={{
                                state: contextValue.state,
                                dispatch: contextValue.dispatch
                            }}
                            >
                                <ThemeProvider theme={root}>
                                    <Statusbar/>
                                    {/*<RootApplicationContainer/>*/}
                                    <RootApplicationNavigator/>
                                    <NotificationRegistry/>
                                </ThemeProvider>
                            </SuitesContextProvider>
                        </Provider>
                    // )
            }
        </>
    );
}

export default App;
