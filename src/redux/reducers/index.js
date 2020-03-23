import {combineReducers} from "redux";

import appointments from "./appointmentReducer"
// import app from "./appReducer"
// import casesFiles from "./caseFilesReducer"
// import suites from './suitesAppReducer'

// action type used to reset redux states
export const RESET_STATE = "RESET_STATE";

const appReducer = combineReducers({
    appointments,
});

/**
 * Resetting Redux State with a Root Reducer
 * https://alligator.io/redux/reset-state-redux/
 */
const rootReducer = (state, action) => {
    if (action.type === RESET_STATE) {
        state = undefined;
    }
    return appReducer(state, action)
};

export default rootReducer;

