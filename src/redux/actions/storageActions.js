export const SET_STORAGE = "SET_STORAGE";
export const ADD_STORAGE = "ADD_STORAGE";

export const setStorage = (storage) => ({
    type:  SET_STORAGE,
    payload: {
        data: storage
    }
});


export const addStorageLocation = (storage) => ({
    type:  SET_STORAGE,
    payload: {
        data: storage
    }
});
