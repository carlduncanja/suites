export const CASE_FILES = "[cases files]"; 

export const SET_CASE_FILES = `${CASE_FILES} set`;
export const ADD_CASE_FILE = `${CASE_FILES} add`


export const setCaseFiles = (caseFiles) => ({
    type: SET_CASE_FILES,
    payload: {
        data: caseFiles
    }
});

export const addCaseFile = (caseFile) => ({
    type: ADD_CASE_FILE,
    payload: {
        data: caseFile
    }
})
