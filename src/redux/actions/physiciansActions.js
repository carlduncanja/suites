export const SET_PHYSICIANS = "SET_PHYSICIANS"; 

export const setPhysicians = (physicians) => ({
    type:  SET_PHYSICIANS, 
    payload: {
        data: physicians
    }
});
