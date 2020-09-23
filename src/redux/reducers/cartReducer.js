import initialState from './initialState';
import { SET_CART_ITEMS, ADD_CART_ITEM } from '../actions/cartActions';

export default (state = initialState.cart, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_CART_ITEMS: {
            const {data} = payload;
            return [...data];
        }
        case ADD_CART_ITEM: {
            let updatedCart = [...state];
            updatedCart = updatedCart.concat(payload.data);
            // updatedCart.concat(payload.data);
            // console.log("Updated cart: ", updatedCart)
            return payload.data;
            // const { data } = payload
            // return [...state,data]
        }
        default:
            return state;
    }
};
