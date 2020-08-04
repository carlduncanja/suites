import { combineReducers } from "redux";

import appointments from "./appointmentReducer";
import caseFiles from "./caseReducer";
import procedures from "./proceduresReducer";
import physicians from "./physiciansReducer";
import storage from "./storageReducer";
import theatres from "./theatresReducer";
import inventory from "./inventoryReducer";
import equipment from "./equipmentReducer";
import equipmentTypes from "./equipmentTypesReducer";
import auth from "./authReducer";
import suppliers from "./suppliersReducer";
import orders from "./ordersReducers";
import cart from "./cartReducer";
import notifications from "./NotificationReducer";
import draft from "./draftReducer";
import casePage from './casePageReducer';

// import app from "./appReducer"
// import casesFiles from "./caseFilesReducer"
// import suites from './suitesAppReducer'

// action type used to reset redux states
export const RESET_STATE = "RESET_STATE";

const appReducer = combineReducers({
  appointments,
  caseFiles,
  procedures,
  physicians,
  storage,
  theatres,
  equipment,
  equipmentTypes,
  inventory,
  suppliers,
  orders,
  casePage,
  auth,
  cart,
  notifications,
  draft,
});

/**
 * Resetting Redux State with a Root Reducer
 * https://alligator.io/redux/reset-state-redux/
 */
const rootReducer = (state, action) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
