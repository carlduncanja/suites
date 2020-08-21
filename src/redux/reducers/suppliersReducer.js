import initialState from "./initialState";
import { SET_SUPPLIERS, ADD_SUPPLIER } from "../actions/suppliersActions";

export default (state = initialState.suppliers, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_SUPPLIERS: {
            const { data } = payload;
            return [...data]
        }
        case ADD_SUPPLIER: {
            const { data } = payload
            return [...state, data]
        }

        default:
            return state
    }

}
