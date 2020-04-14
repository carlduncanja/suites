export const SET_STORAGE = "SET_STORAGE"; 

export const setStorage = (storage) => ({
    type:  SET_STORAGE, 
    payload: {
        data: storage
    }
});
