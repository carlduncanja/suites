import React, {useState, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, View} from 'react-native';
import styled from '@emotion/native';
import Snackbar from "react-native-paper/src/components/Snackbar";
import {useTheme} from "emotion-theming";


/**
 * Snackbar Context
 */
const SnackbarContext = createContext({state: {}, actions: {}});


/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
function CustomSnackbarProvider(props) {

    const theme = useTheme();
    const [snackbar, setSnackBar] = useState({
        // visible: true,
        // message: 'hello??'
    });

    const clearSnackBar = () => {
        setSnackBar(null)
    }

    const setSnack = (message, duration = Snackbar.DURATION_SHORT,  variant) => {
        setSnack({
            message,
            duration: duration,
            visible: true,
            variant
        })
    }

    const contextValue = {
        state: {snackbar},
        actions: {setSnack}
    }

    return (
        <SnackbarContext.Provider value={contextValue}>

            <SafeAreaView style={{
                flex: 1,
                zIndex: 100
            }}>
                {
                    props.children
                }
                <Snackbar
                    visible={snackbar?.visible}
                    onDismiss={clearSnackBar}
                    duration={Snackbar.DURATION_MEDIUM}
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
                    {snackbar?.message || 'Something went wrong'}
                </Snackbar>
            </SafeAreaView>

        </SnackbarContext.Provider>
    );
}


export function useSnackbar() {
    const {setSnack} = useContext(SnackbarContext);

    return {
        setSnack
    }
}


CustomSnackbarProvider.propTypes = {};
CustomSnackbarProvider.defaultProps = {};

export default CustomSnackbarProvider;
