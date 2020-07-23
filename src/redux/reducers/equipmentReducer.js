import initialState from "./initialState";
import { SET_EQUIPMENT, SET_EQUIPMENT_TYPES, ADD_EQUIPMENT, ADD_EQUIPMENT_TYPES } from "../actions/equipmentActions";
 
export default (state = initialState.equipment, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_EQUIPMENT: {
      const { data } = payload;
      return [...data];
    }
    case ADD_EQUIPMENT: {
      const updatedEquipmentType = [...state];
      updatedEquipmentType.push(payload.data);
      return updatedEquipmentType;
    }
    default:
      return state;
  }
};
