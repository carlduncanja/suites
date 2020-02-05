import { appActionTypes } from './../actions/appActions';

export const appReducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
        case appActionTypes.UPDATEDIMENSIONS: return {...state, screenDimensions: payload};
        case appActionTypes.UPDATETABSELECTED: return {...state, tabSelected: payload};
        default:
            return state
    }
}