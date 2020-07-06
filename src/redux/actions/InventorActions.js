export const SET_INVENTORIES = "SET_INVENTORIES";
export const ADD_INVENTORY = "ADD_INVENTORY";
 

export const setInventory = (inventories) => ({
    type: SET_INVENTORIES,
    payload: {
        data: inventories
    }
});

export const addInventory = (inventory) => ({
    type:  ADD_INVENTORY,
    payload: {
        data: inventory
    }
});

