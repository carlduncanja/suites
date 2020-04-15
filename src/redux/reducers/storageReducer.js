import initialState from "./initialState";
import { SET_STORAGE } from "../actions/storageActions";

export default (state = initialState.storage, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_STORAGE: {
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
