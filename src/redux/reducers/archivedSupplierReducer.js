
import initialState from "./initialState";
import { SET_ARCHIVED_SUPPLIERS } from "../actions/archivedSupplierActions";


export default (state = initialState.archivedSuppliers, action) => {

    const { type, payload } = action;
    switch (type) {
        case SET_ARCHIVED_SUPPLIERS:
            {
                const { data } = payload
                return [...data]
            }
        default:
            return state
    }
}