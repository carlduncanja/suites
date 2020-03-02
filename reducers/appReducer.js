export const appActionTypes = {
    DIMENSIONS: "DIMENSIONS",
    TABSELECTED: "TABSELECTED"
}

export const appReducer = (state, action) => {
    const { type, newState } = action;
    switch(type) {
        case appActionTypes.DIMENSIONS: return {...state, screenDimensions: newState};
        case appActionTypes.TABSELECTED: return {...state, tabSelected: newState};
        default:
            return state
    }
}