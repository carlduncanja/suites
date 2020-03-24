import initialState from "./initialState";
import {SET_CASEFILES} from "../actions/caseFilesActions";

export default (state = initialState.caseFiles, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_CASEFILES: {
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
