import React from "react";

export const NOTIFICATIONS = "[Notifications]";

// document
export const INSERT_NOTIFICATION = `${NOTIFICATIONS} insert`;

export const CLOSE_NOTIFICATION = `${NOTIFICATIONS} close`; // Triggers close action.
export const REMOVE_NOTIFICATION = `${NOTIFICATIONS} remove`; // Immediately removes from state.

export const addNotification = (
    message,
    title,
    key = (new Date().getTime() + Math.random()),
    action = undefined
) => ({
    type: INSERT_NOTIFICATION,
    payload: {
        data: {
            title,
            message,
            key,
            action,
        }
    }
});

export const closeNotification = key => ({
    type: CLOSE_NOTIFICATION,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeNotification = key => ({
    type: REMOVE_NOTIFICATION,
    key,
});
