export const SET_EQUIPMENT_TYPES = "SET_EQUIPMENT_TYPES"; 
export const ADD_EQUIPMENT_TYPE = "ADD_EQUIPMENT_TYPE";

export const setEquipmentTypes = (types) => ({
    type:  SET_EQUIPMENT_TYPES, 
    payload: {
        data: types
    }
});

export const addEquipmentType = (type) => ({
    type:  ADD_EQUIPMENT_TYPE, 
    payload: {
        data: type
    }
});
