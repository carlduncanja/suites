import initialState from "./initialState";
import {SET_PROCEDURE_EDIT, SET_PROCEDURE_PAGE} from "../actions/procedurePageActions";

export default (state = initialState.casePage, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PROCEDURE_PAGE: {
            const {data} = payload;
            return {...data}
        }
        case SET_PROCEDURE_EDIT: {
            const {data} = payload;
            return {...state, isEdit: data}
        }
        default:
            return state
    }

}
