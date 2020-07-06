export const SET_THEATRES = "SET_THEATRES";

export const setTheatres = (theatres) => ({
    type: SET_THEATRES,
    payload: {
        data: theatres
    }
});
