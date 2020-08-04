export const SET_CASE_PAGE = 'CASE_PAGE';
export const SET_CASE_EDIT= 'CASE_PAGE_EDIT';


export const setCaseEdit = (items) => ({
    type: SET_CASE_EDIT,
    payload: {
        data: items
    }
});

export const setCasePage = (items) => ({
    type: SET_CASE_PAGE,
    payload: {
        data: items
    }
});
