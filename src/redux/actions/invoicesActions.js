export const SET_INVOICES = "SET_INVOICES";
export const ADD_INVOICES = "ADD_INVOICES";

export const setInvoices = (invoices) => ({
    type: SET_INVOICES,
    payload: {
        data: invoices
    }
});

export const addInvoices = (invoices) => ({
    type: ADD_INVOICES,
    payload: {
        data: invoices
    }
});



