export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';

export const setCartItems = items => ({
    type: SET_CART_ITEMS,
    payload: {data: items}
});

export const addCartItem = item => ({
    type: ADD_CART_ITEM,
    payload: {data: item}
});
