import initialState from "./initialState";
import { SET_EQUIPMENT } from "../actions/equipmentActions";

export default (state = initialState.equipment, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_EQUIPMENT: {
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
