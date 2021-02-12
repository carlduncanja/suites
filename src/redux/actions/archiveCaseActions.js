export const SET_ARCHIVED_CASES = "SET_ARCHIVED_CASES";

export const SetArchivedCases = (archivedCases) => ({
    type: SET_ARCHIVED_CASES,
    payload: {
        data: archivedCases
    }
});