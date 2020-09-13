import initialState from "./initialState";
import jwtDecode from 'jwt-decode';
import {EXPO_TOKEN, RESTORE_TOKEN, SET_AUTH, SIGN_IN, SIGN_OUT, UPDATE_AUTH} from "../actions/authActions";

export default (prevState = initialState.auth, action) => {
    const {type, payload} = action

    let tokeData = {};

    switch (type) {
        case SET_AUTH:
            return payload.data
        case UPDATE_AUTH:
            return {
                ...prevState,
                ...payload.data
            }
        case RESTORE_TOKEN:


            try {
                tokeData = jwtDecode(payload.data)
            } catch (e) {
                console.log("parse token");
            }

            return {
                ...prevState,
                userToken: payload.data,
                isLoading: false,
                user: tokeData
            };
        case EXPO_TOKEN:

            console.log("set token called", payload);

            return {
                ...prevState,
                expoPushToken: payload.data,
            };
        case SIGN_IN:

            try {
                tokeData = jwtDecode(payload.data)
            } catch (e) {
                console.log("parse token");
            }

            return {
                ...prevState,
                isSignOut: false,
                userToken: payload.data,
                user: tokeData
            };
        case SIGN_OUT:
            return {
                ...prevState,
                isSignOut: true,
                userToken: null,
            };
        default:
            return prevState
    }
}
