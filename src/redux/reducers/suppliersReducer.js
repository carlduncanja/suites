import initialState from "./initialState";
import {SET_SUPPLIERS, ADD_SUPPLIER, UPDATE_SUPPLIER} from "../actions/suppliersActions";

export default (state = initialState.suppliers, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_SUPPLIERS: {
            const {data} = payload;
            return [...data]
        }
        case ADD_SUPPLIER: {
            const {data} = payload
            return [...state, data]
        }
        case UPDATE_SUPPLIER: {
            const {data} = payload

            console.log("Hello00000", data);

            return state.map(item => {
                return item._id === data._id
                    ? {...item, ...data}
                    : {...item}
            })
        }
        default:
            return state
    }

}
