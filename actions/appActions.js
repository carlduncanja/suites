export const appActionTypes = {
    UPDATEDIMENSIONS: "UPDATEDIMENSIONS",
    UPDATETABSELECTED: "UPDATETABSELECTED"
}

export const updateScreenDimensions = (width, height) => {
    return {
        type: appActionTypes.UPDATEDIMENSIONS,
        payload: {
            width,
            height
        }
    };
}

export const updateTabSelected = (tabSelected) => {
    return {
        type: appActionTypes.UPDATETABSELECTED  ,
        payload: {
           tabSelected
        }
    };
}