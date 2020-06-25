import initialState from "./initialState";
import {CLOSE_NOTIFICATION, INSERT_NOTIFICATION, REMOVE_NOTIFICATION} from "../actions/NotificationActions";

export default (prevState = initialState.notifications, action) => {
    switch (action.type) {
        case CLOSE_NOTIFICATION:
            return prevState.map(notification => (
                (action.dismissAll || notification.key === action.key)
                    ? {...notification, dismissed: true}
                    : {...notification}
            ));
        case REMOVE_NOTIFICATION:
            return prevState.filter(
                notification => notification.key !== action.key,
            );
        case INSERT_NOTIFICATION: {
            const {data} = action.payload;
            return [
                ...prevState,
                {
                    key: action.key,
                    ...data,
                },
            ];
        }
        default:
            return prevState;
    }
};
