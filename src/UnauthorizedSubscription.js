import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import {EventEmitter, EVENTS} from './api/apiUtils';
import {useSnackbar} from './components/Snackbar/CustomSnackbarProvider';

/**
 * Subscribes and listen to event emitted by
 * @param props
 * @return {null}
 * @constructor
 */
function UnauthorizedSubscription(props) {
    const snackBar = useSnackbar();

    useEffect(() => {
        EventEmitter.subscribe(EVENTS.UNAUTHORIZED, () => {
            handleUnauthorizedRequest();
        });
        return () => {
            EventEmitter.unsubscribe(EVENTS.UNAUTHORIZED);
        };
    }, []);

    const handleUnauthorizedRequest = requestError => {
        const defaultMessage = 'Unauthorized User. Cannot Process Request.';
        const message = requestError?.response?.data?.message || defaultMessage;
        snackBar.showSnackbar(message, 4000);
    };

    return null;
}

UnauthorizedSubscription.propTypes = {};
UnauthorizedSubscription.defaultProps = {};

export default UnauthorizedSubscription;
