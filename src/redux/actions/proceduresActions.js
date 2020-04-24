export const SET_PROCEDURES = "SET_PROCEDURES"; 

export const setProcedures = (procedures) => ({
    type: SET_PROCEDURES, 
    payload: {
        data: procedures
    }
});


