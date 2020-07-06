import initialState from "./initialState";
import {ADD_CASE_FILE, SET_CASE_FILES} from "../actions/caseFilesActions";

export default (prevState = initialState.caseFiles, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_CASE_FILES: {
            const {data} = payload;
            return [...data]
        }
        case ADD_CASE_FILE: {
            const updatedCases = [...prevState]
            updatedCases.push(payload.data);
            return updatedCases;
        }
        default:
            return prevState
    }

}
