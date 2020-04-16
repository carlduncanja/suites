import {SET_INVENTORIES} from "../actions/InventorActions";
import initialState from "./initialState";

export default (state = initialState.inventory, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_INVENTORIES: {
            return payload.data
        }
        default:
            return state;
    }
}
