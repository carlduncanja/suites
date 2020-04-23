import initialState from "./initialState";
import {ADD_STORAGE, SET_STORAGE} from "../actions/storageActions";

export default (state = initialState.storage, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_STORAGE: {
            const {data} = payload;
            return [...data]
        }
        case ADD_STORAGE: {
            const {data} = payload;
            return [...state, data]
        }
        default:
            return state
    }

}
