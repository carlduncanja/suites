import { SET_INVOICES, ADD_INVOICES } from "../actions/invoicesActions";
import initialState, { InitialState } from "./initialState";

export default (state = initialState.invoices, action) => {
    const {type, payload} = action;
    switch(type) {
        case SET_INVOICES:
            {
                return payload.data;
            }
        case ADD_INVOICES:
            {
                const updatedInvoices = [...state];
                updatedInvoices.push(payload.data);
            }
        default:
            {
                return state;
            }
    }
}