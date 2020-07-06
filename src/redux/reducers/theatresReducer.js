import initialState from "./initialState";
import {SET_THEATRES} from "../actions/theatresActions";

export default (state = initialState.theatres, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_THEATRES: {
            return payload.data
        }
        default:
            return state
    }
}
