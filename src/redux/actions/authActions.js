export const Auth = `[AUTH]`

export const SET_AUTH = `${Auth} set`
export const UPDATE_AUTH = `${Auth} update`


export const setAuthData = (authData = {}) => ({
    type: SET_AUTH,
    payload: {
        data: authData
    }
})


export const updateAuthData = (authData = {}) => ({
    type: UPDATE_AUTH,
    payload: {
        data: authData
    }
})
