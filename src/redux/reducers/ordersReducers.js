import initialState from "./initialState";
import {SET_PURCHASE_ORDERS, ADD_PURCHASE_ORDER, UPDATE_PURCHASE_ORDER} from "../actions/purchaseOrdersActions";

export default (prevState = initialState.orders, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PURCHASE_ORDERS: {
            const {data} = payload;
            return [...data]
        }
        case ADD_PURCHASE_ORDER : {
            const {data} = payload
            return [...prevState, data]
        }
        case UPDATE_PURCHASE_ORDER : {
            const {data, id} = payload
            return prevState.map(item => {
                return item._id === id
                    ? {...item, ...data}
                    : {...item}
            })
        }
        default:
            return prevState
    }

}
