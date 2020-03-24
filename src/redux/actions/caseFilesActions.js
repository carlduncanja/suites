export const SET_CASEFILES = "SET_CASEFILES";

export const setCaseFiles = (caseFiles) => ({
    type: SET_CASEFILES,
    payload: {
        data: caseFiles
    }
});
