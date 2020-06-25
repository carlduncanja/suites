import {SET_INVENTORIES, ADD_INVENTORY} from "../actions/InventorActions";

import initialState from "./initialState";

export default (state = initialState.inventory, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_INVENTORIES: {
            return payload.data
        }
        case ADD_INVENTORY : {
            const updatedInventories = [...state];
            updatedInventories.push(payload.data);
            return updatedInventories;
        }
        default:
            return state;
    }
}
