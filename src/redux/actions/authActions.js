export const Auth = `[AUTH]`

export const SET_AUTH = `${Auth} set`
export const UPDATE_AUTH = `${Auth} update`
export const RESTORE_TOKEN = `${Auth} restore token`
export const SIGN_IN = `${Auth} sign in`
export const SIGN_OUT = `${Auth} sign out`


export const setAuthData = (authData = {}) => ({
    type: SET_AUTH,
    payload: {
        data: authData
    }
})

export const signOut = () => ({
    type: SIGN_OUT
})

export const signIn = () => ({
    type: SIGN_IN
})

export const restoreToken = (token) => ({
    type: RESTORE_TOKEN,
    payload: {
        data: token
    }
})



