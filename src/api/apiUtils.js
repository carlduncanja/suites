import {useSnackbar} from "../components/Snackbar/CustomSnackbarProvider";

export async function handleRawResponse(response) {
    return response;
}

export async function handleResponse(response) {
    return response.data;
    //throw new Error("Network response was not ok.");
}

export function handleError(error) {
    // eslint-disable-next-line no-console
    console.log("API call failed. ", error.response.status);

    try {
        const STATUS_CODE = error?.response?.status;
        switch (STATUS_CODE) {
            case 401:
                return EventEmitter.dispatch(EVENTS.UNAUTHORIZED, error);
            default:
                return
        }
    } catch (e) {
        console.log('Failed to dispatch event')
    }
    throw error;
}


/**
 * React: Event Emitter.
 * Used for subscribing to api events.
 *
 * Retrieved from: https://medium.com/@lolahef/react-event-emitter-9a3bb0c719
 */
export const EventEmitter = {
    events: {},
    dispatch: function (event, data) {
        console.log(`Dispatching event - ${event}:`, data);
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    },
    subscribe: function (event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
        // return this.events[event]
    },
    unsubscribe(event) {
        delete this.events[event];
    }
};

export const EVENTS = {

    // notification message event
    UNAUTHORIZED: "401_UNAUTHORIZED",
    //
};
