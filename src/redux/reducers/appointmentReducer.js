import initialState from "./initialState";
import {SET_APPOINTMENTS} from "../actions/appointmentActions";

export default (state = initialState.appointments, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_APPOINTMENTS: {
            const {data} = payload;
            return [...data]
        }
        default:
            return state
    }

}
