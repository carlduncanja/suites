import initialState from "./initialState";

export default (state = initialState.appointments, action) => {

    const {type, payload} = action;

    switch (type) {
        case "1": {
            break
        }
        case "2": {
            break
        }
        default:
            return state
    }

}
