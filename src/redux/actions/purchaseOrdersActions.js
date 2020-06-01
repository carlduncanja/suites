export const SET_PURCHASE_ORDERS = "SET_PURCHASE_ORDERS"; 
export const ADD_PURCHASE_ORDER = "ADD_PURCHASE_ORDER";

export const setPurchaseOrders = (orders) => ({
    type: SET_PURCHASE_ORDERS, 
    payload: {
        data: orders
    }
});

export const addPurchaseOrder = (order) => ({
    type:  ADD_PURCHASE_ORDER,
    payload: {
        data: order
    }
});


