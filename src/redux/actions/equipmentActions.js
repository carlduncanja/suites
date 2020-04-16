export const SET_EQUIPMENT = "SET_EQUIPMENT"; 

export const setEquipment = (equipment) => ({
    type:  SET_EQUIPMENT, 
    payload: {
        data: equipment
    }
});
