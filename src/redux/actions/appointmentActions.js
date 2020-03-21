export const SET_APPOINTMENTS = "SET_APPOINTMENTS";


export const setAppointments = (appointments) => ({
    type: SET_APPOINTMENTS,
    payload: {
        data: appointments
    }
});
