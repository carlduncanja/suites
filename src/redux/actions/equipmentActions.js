export const SET_EQUIPMENT = "SET_EQUIPMENT"; 
export const ADD_EQUIPMENT = "ADD_EQUIPMENT";

export const setEquipment = (equipment) => ({
    type:  SET_EQUIPMENT, 
    payload: {
        data: equipment
    }
});

export const addEquipment = (equipment) => ({
    type:  ADD_EQUIPMENT, 
    payload: {
        data: equipment
    }
});
