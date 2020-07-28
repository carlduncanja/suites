import initialState from "./initialState";
import { SET_PROCEDURES, ADD_PROCEDURE } from "../actions/proceduresActions";

export default (state = initialState.procedures, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PROCEDURES: { 
       
            const {data} = payload;
            return [...data]
        }
        case ADD_PROCEDURE : {
            const updatedProcedures = [...state];
            updatedProcedures.push(payload.data);
            return updatedProcedures;
            // const { data } = payload
            // return [...state,data]
        }
        default:
            return state
    }

}
