import initialState from "./initialState";
import { SET_PHYSICIANS, UPDATE_PHYSICIAN } from "../actions/physiciansActions";

export default (state = initialState.physicians, action) => {

    const {type, payload} = action;

    switch (type) {
        case SET_PHYSICIANS: {
            const {data} = payload;
            return [...data]
        }
        case UPDATE_PHYSICIAN: {
            console.log("Physicians Put")
            const {data} = payload;
            const {_id} = data
            console.log("Physicians: ", _id)
            const index = state.findIndex(item => item._id === _id);
            console.log("Index:", index)
            return [
                ...state.slice(0,index),
                data,
                ...state.slice(index+1)
            ]
        }
        default:
            return state
    }

}
