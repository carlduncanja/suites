import initialState from "./initialState";
import { SET_EQUIPMENT, ADD_EQUIPMENT } from "../actions/equipmentActions";

export default (state = initialState.equipment, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_EQUIPMENT: {
            const {data} = payload;
            return [...data]
        }
        case ADD_EQUIPMENT : {
            const { date } = payload
            return [...state, data]
        }
        default:
            return state
    }

}
