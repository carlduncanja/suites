export const SET_PHYSICIANS = "SET_PHYSICIANS"; 
export const UPDATE_PHYSICIAN = "UPDATE_PHYSICIAN";

export const setPhysicians = (physicians) => ({
    type:  SET_PHYSICIANS, 
    payload: {
        data: physicians
    }
});

export const updatePhysicianRecord = (physician) => ({
    type:  UPDATE_PHYSICIAN, 
    payload: {
        data: physician
    }
});
