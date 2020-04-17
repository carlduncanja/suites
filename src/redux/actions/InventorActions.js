export const SET_INVENTORIES = "SET_INVENTORIES";


export const setInventory = (inventory) => ({
    type: SET_INVENTORIES,
    payload: {
        data: inventory
    }
});
