import React, {useState, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View} from 'react-native';
import styled from '@emotion/native';
import Snackbar from "react-native-paper/src/components/Snackbar";
import {useTheme} from "emotion-theming";

/**
 * Snackbar Context
 */
export const SnackbarContext = createContext({
    snackbar: {},
    setSnackBar: () => {
    }
});

/**
 * Custom hook to interface with snackbar.
 * @return {{showSnackbar: showSnackbar}}
 */
export function useSnackbar() {
    const {snackbar, setSnackBar} = useContext(SnackbarContext);

    const showSnackbar = (message, duration = Snackbar.DURATION_SHORT, variant) => {
        console.log('my actions', setSnackBar);
        setSnackBar({
            message,
            duration,
            visible: true,
            variant
        })
    }

    return {
        showSnackbar
    }
}


/**
 * Provider for managing and displaying snackbar based on the context.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function CustomSnackbarProvider(props) {

    const theme = useTheme();
    const [snackbar, setSnackBar] = useState();

    const clearSnackBar = () => {
        setSnackBar({visible: false})
    }

    return (
        <SnackbarContext.Provider value={{snackbar, setSnackBar}}>
            <SafeAreaView style={{
                flex: 1,
                zIndex: 100
            }}>
                {
                    props.children
                }
                {
                    snackbar &&
                    <Snackbar
                        visible={snackbar?.visible}
                        onDismiss={clearSnackBar}
                        duration={snackbar?.duration || Snackbar.DURATION_MEDIUM}
                        theme={{
                            colors: {
                                accent: theme.colors['--color-red-700'],
                                surface: theme.colors['--color-red-700'],
                            }
                        }}
                        style={{
                            backgroundColor: theme.colors['--color-red-200'],
                            color: theme.colors['--color-red-700']
                        }}
                        action={{
                            label: 'x',
                            onPress: clearSnackBar,
                        }}
                    >
                        {snackbar?.message}
                    </Snackbar>
                }
            </SafeAreaView>
        </SnackbarContext.Provider>
    );
}


CustomSnackbarProvider.propTypes = {};
CustomSnackbarProvider.defaultProps = {};


export default CustomSnackbarProvider;



