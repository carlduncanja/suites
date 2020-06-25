import * as types from "../actions/ActionTypes";
import initialState from "./initialState";
import {CLOSE_NOTIFICATION, INSERT_NOTIFICATION, REMOVE_NOTIFICATION} from "../actions/NotificationActions";

export default (state = initialState.notifications, action) => {
    switch (action.type) {
        case CLOSE_NOTIFICATION:
            return state.map(notification => (
                (action.dismissAll || notification.key === action.key)
                    ? {...notification, dismissed: true}
                    : {...notification}
            ));
        case REMOVE_NOTIFICATION:
            return state.filter(
                notification => notification.key !== action.key,
            );
        case INSERT_NOTIFICATION: {
            const {data} = action.payload;
            return [
                ...state,
                {
                    key: action.key,
                    ...data,
                },
            ];
        }
        default:
            return state;
    }
};
