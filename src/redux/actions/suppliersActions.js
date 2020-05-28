export const SET_SUPPLIERS = "SET_SUPPLIERS"; 
export const ADD_SUPPLIER = "ADD_SUPPLIER";

export const setSuppliers = (suppliers) => ({
    type: SET_SUPPLIERS, 
    payload: {
        data: suppliers
    }
});

export const addSupplier = (supplier) => ({
    type:  ADD_SUPPLIER,
    payload: {
        data: supplier
    }
});


