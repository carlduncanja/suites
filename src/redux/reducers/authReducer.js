import initialState from "./initialState";
import {EXPO_TOKEN, RESTORE_TOKEN, SET_AUTH, SIGN_IN, SIGN_OUT, UPDATE_AUTH} from "../actions/authActions";

export default (prevState = initialState.auth, action) => {
    const {type, payload} = action

    switch (type) {
        case SET_AUTH:
            return payload.data
        case UPDATE_AUTH:
            return {
                ...prevState,
                ...payload.data
            }
        case RESTORE_TOKEN:
            return {
                ...prevState,
                userToken: payload.data,
                isLoading: false,
            };
        case EXPO_TOKEN:

            console.log("set token called", payload);

            return {
                ...prevState,
                expoPushToken: payload.data,
            };
        case SIGN_IN:
            return {
                ...prevState,
                isSignOut: false,
                userToken: payload.data,
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
