export const SET_PROCEDURE_PAGE = 'PROCEDURE_PAGE';
export const SET_PROCEDURE_EDIT= 'PROCEDURE_PAGE_EDIT';


export const setProcedureEdit = (items) => ({
    type: SET_PROCEDURE_EDIT,
    payload: {
        data: items
    }
});

export const setProcedurePage = (items) => ({
    type: SET_PROCEDURE_PAGE,
    payload: {
        data: items
    }
});
