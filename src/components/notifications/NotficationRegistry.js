import React from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from 'expo-constants';
import {connect} from "react-redux";
import {setExpoPushToken} from "../../redux/actions/authActions";

class NotificationRegistry extends React.Component {
    state = {
        expoPushToken: "",
        notification: {},
    };

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {

            const {status: existingStatus} = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );

            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const {status} = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("Please enable notifications in settings");
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            console.log("TOKEN", token);

            this.props.setExpoPushToken(token)
            this.setState({expoPushToken: token});
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.createChannelAndroidAsync("default", {
                name: "default",
                sound: true,
                priority: "max",
                vibrate: [0, 250, 250, 250],
            });
        }
    };

    componentDidMount() {
        this.registerForPushNotificationsAsync();

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        // this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillUnmount() {
        this.props.setExpoPushToken(null);
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = {
    setExpoPushToken
}

export default connect(undefined, mapDispatchToProps)(NotificationRegistry)
