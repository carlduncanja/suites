import initialState from "./initialState";
import {SET_CASE_EDIT, SET_CASE_PAGE} from "../actions/casePageActions";

export default (state = initialState.casePage, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_CASE_PAGE: {
            const {data} = payload;
            return {...data}
        }
        case SET_CASE_EDIT: {
            const {data} = payload;
            return {...state, isEdit: data}
        }
        default:
            return state
    }

}
