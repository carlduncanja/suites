import initialState from "./initialState";
import { SET_PHYSICIANS } from "../actions/physiciansActions";

export default (state = initialState.physicians, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PHYSICIANS: {
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
