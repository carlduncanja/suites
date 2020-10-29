import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import {EventEmitter, EVENTS} from "./api/apiUtils";
import {useSnackbar} from "./components/Snackbar/CustomSnackbarProvider";

/**
 * Subscribes and listen to event emitted by
 * @param props
 * @return {null}
 * @constructor
 */
function UnAuthorizedSubscription(props) {

    const snackBar = useSnackbar();

    useEffect(() => {
        EventEmitter.subscribe(EVENTS.UNAUTHORIZED, () => {
            handleUnAuthorizedRequest()
        })
        return () => {
            EventEmitter.unsubscribe(EVENTS.UNAUTHORIZED)
        }
    }, [])


    const handleUnAuthorizedRequest = (requestError) => {
        const defaultMessage = 'Unauthorized User. Invalid Permissions.'
        const message = requestError?.response?.data?.message || defaultMessage;
        snackBar.showSnackbar(message, 4000);
    }

    return null
}

UnAuthorizedSubscription.propTypes = {};
UnAuthorizedSubscription.defaultProps = {};

export default UnAuthorizedSubscription;
