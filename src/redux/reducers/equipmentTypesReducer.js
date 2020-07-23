import initialState from "./initialState";
import { SET_EQUIPMENT_TYPES, ADD_EQUIPMENT_TYPE } from "../actions/equipmentTypesActions";
 
export default (state = initialState.equipmentTypyes, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_EQUIPMENT_TYPES: {
            const {data} = payload;
            return [...data]
        }
        case ADD_EQUIPMENT_TYPE : {
            const updatedTypes = [...state];
            updatedTypes.push(payload.data);
            return updatedTypes;
        }
        default:
            return state
    }

}
