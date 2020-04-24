import initialState from "./initialState";
import { SET_PROCEDURES } from "../actions/proceduresActions";

export default (state = initialState.procedures, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PROCEDURES: { 
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
