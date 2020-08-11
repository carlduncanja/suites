import React from "react";
import {Text, View, Button, Vibration, Platform} from "react-native";
import {Notifications} from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
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
            console.log(existingStatus);
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

    sendPushNotification = async (token) => {
        const message = {
            to: token,
            sound: "default",
            title: "Tite",
            body: "Any!",
            data: {data: "goes here"},
        };

        const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
        // const data = response._bodyInit;
        // console.log(`Status & Response ID-> ${data}`);
        console.log("Sending!");
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
        this.sendPushNotification();
        this.props.setExpoPushToken(null);
    }

    // _handleNotification = notification => {
    //     Vibration.vibrate(1);
    //     this.setState({ notification: notification });
    //
    //     console.log("NOTIFICATION RECEIVED", notification);
    //
    // };

    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    // sendPushNotification = async () => {
    //     const message = {
    //         to: this.state.expoPushToken,
    //         sound: 'default',
    //         title: 'Original Title',
    //         body: 'And here is the body!',
    //         data: { data: 'goes here' },
    //         _displayInForeground: true,
    //     };
    //     const response = await fetch('https://exp.host/--/api/v2/push/send', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Accept-encoding': 'gzip, deflate',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(message),
    //     });
    // };

    render() {
        return null;
    }
}

const mapDispatchToProps = {
    setExpoPushToken
}

export default connect(undefined, mapDispatchToProps)(NotificationRegistry)
