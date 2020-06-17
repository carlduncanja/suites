import initialState from "./initialState"; 
import { SET_PURCHASE_ORDERS, ADD_PURCHASE_ORDER } from "../actions/purchaseOrdersActions";

export default (state = initialState.orders, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PURCHASE_ORDERS: { 
            const {data} = payload;
            return [...data]
        }
        case ADD_PURCHASE_ORDER : {
            const { data } = payload
            return [...state,data]
        }
        default:
            return state
    }

}
