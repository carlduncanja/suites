import initialState from "./initialState";
import { SET_ARCHIVED_CASES } from "../actions/archiveCaseActions";


export default (state = initialState.archivedCases, action) => {

    const { type, payload } = action;
    switch (type) {
        case SET_ARCHIVED_CASES:
            {
                const { data } = payload
                return [...data]
            }
        default:
            return state
    }
}