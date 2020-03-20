export const SET_APPOINTMENTS = "SET_APPOINTMENTS";


export const setAppointment = (appointments) => ({
    type: SET_APPOINTMENTS,
    payload: {
        data: appointments
    }
});
