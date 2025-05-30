export const SET_CASE_PAGE = "CASE_PAGE";
export const SET_CASE_EDIT = "CASE_PAGE_EDIT";
export const SET_PROCEDURE_END_TIME = "SET_PROCEDURE_END_TIME";
export const SET_CHARGESHEET_TAB = "SET_SELECTED_TAB";

export const setCaseEdit = (items) => ({
  type: SET_CASE_EDIT,
  payload: {
    data: items,
  },
});

export const setCasePage = (items) => ({
  type: SET_CASE_PAGE,
  payload: {
    data: items,
  },
});

export const setProcedureEndTimeRdx = (endTime, caseId) => ({
  type: SET_PROCEDURE_END_TIME,
  payload: {
    procedureEndTime: endTime,
    caseId,
  },
});

export const setChargeSheetTab = (chargeSheetTab) => ({
  type: SET_CHARGESHEET_TAB,
  payload: { chargeSheetTab },
});
