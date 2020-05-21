import initialState from "./initialState";
import {SET_AUTH, UPDATE_AUTH} from "../actions/authActions";

export default (state = initialState.auth, action) => {
    const {type, payload} = action

    switch (type) {
        case SET_AUTH:
            return payload.data
        case UPDATE_AUTH:
            return {
                ...state,
                ...payload.data
            }
        default:
            return initialState
    }
}
