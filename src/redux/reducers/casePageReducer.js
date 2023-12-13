import initialState from "./initialState";
import {
  SET_CASE_EDIT,
  SET_CASE_PAGE,
  SET_PROCEDURE_END_TIME,
  SET_CHARGESHEET_TAB,
} from "../actions/casePageActions";

export default (state = initialState.casePage, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CASE_PAGE: {
      const { data } = payload;
      return { ...data };
    }
    case SET_CASE_EDIT: {
      const { data } = payload;
      return { ...state, isEdit: data };
    }
    case SET_PROCEDURE_END_TIME:
      const { procedureEndTime, caseId } = payload;
      return {
        ...state,
        procedureEndTime: {
          ...state.procedureEndTime,
          [caseId]: procedureEndTime,
        },
      };
    case SET_CHARGESHEET_TAB: {
      const { chargeSheetTab } = payload;
      return {
        ...state,
        chargeSheetTab,
      };
    }
    default:
      return state;
  }
};
