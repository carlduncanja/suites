export const PURCHASE_ORDER = `[Purchase Orders]`;
export const SET_PURCHASE_ORDERS = `${PURCHASE_ORDER} set`;
export const ADD_PURCHASE_ORDER = `${PURCHASE_ORDER} add`;
export const UPDATE_PURCHASE_ORDER = `${PURCHASE_ORDER} update`;

export const setPurchaseOrders = (orders) => ({
    type: SET_PURCHASE_ORDERS,
    payload: {
        data: orders
    }
});

export const addPurchaseOrder = (order) => ({
    type: ADD_PURCHASE_ORDER,
    payload: {
        data: order
    }
});

export const updatePurchaseOrder = (orderId, updates) => ({
    type: UPDATE_PURCHASE_ORDER,
    payload: {
        data: updates,
        id: orderId,
    }
})


