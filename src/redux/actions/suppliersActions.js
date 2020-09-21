export const SET_SUPPLIERS = "SET_SUPPLIERS";
export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER";
export const SET_ARCHIVED_SUPPLIERS = "SET_ARCHIVED_SUPPLIERS"

export const setSuppliers = (suppliers) => ({
    type: SET_SUPPLIERS,
    payload: {
        data: suppliers
    }
});

export const addSupplier = (supplier) => ({
    type: ADD_SUPPLIER,
    payload: {
        data: supplier
    }
});


export const updateSupplierAction = (supplier) => ({
    type: UPDATE_SUPPLIER,
    payload: {
        data: supplier
    }
});

export const setArchivedSuppliers = (archivedSuppliers) =>
    ({
        type: SET_ARCHIVED_SUPPLIERS,
        payload: {
            data: archivedSuppliers
        }
    })


