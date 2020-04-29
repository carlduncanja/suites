export const SET_PROCEDURES = "SET_PROCEDURES"; 
export const ADD_PROCEDURE = "ADD_PROCEDURE";

export const setProcedures = (procedures) => ({
    type: SET_PROCEDURES, 
    payload: {
        data: procedures
    }
});

export const addProcedure = (procedure) => ({
    type:  ADD_PROCEDURE,
    payload: {
        data: procedure
    }
});


