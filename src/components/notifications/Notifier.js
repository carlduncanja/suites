/* eslint-disable react/prop-types */
import React, { Component, useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
// import {removeSnackbar} from '../redux/actions/NotificationActions';
// import IconButton from "@material-ui/core/IconButton";
// import Icon from "@material-ui/core/Icon";
import { View, StyleSheet, Text, SafeAreaView, Vibration } from "react-native";
import * as Animatable from "react-native-animatable";
import NotificationComponent from "../NotificationComponent";
import * as Notifications from "expo-notifications";
import {
    addNotification,
    closeNotification,
    removeNotification,
} from "../../redux/actions/NotificationActions";
import { not, set } from "react-native-reanimated";


/**
 * This component handles the logic for displaying and removing notifications.
 */
const Notifier = (props) => {
    const [displayed, setDisplayed] = useState([]);
    const notificationListener = useRef();
    const responseListener = useRef();

    const storeDisplayed = (id) => {
        setDisplayed([...displayed, id]);
    };

    const removeDisplayed = (id) => {
        const updatedDisplayed = displayed.filter((key) => id !== key);
        setDisplayed(updatedDisplayed);
    };

    useEffect(() => {
        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        notificationListener.current = Notifications.addNotificationReceivedListener(_handleNotification);

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
        }
    }, [])


    useEffect(() => {
        const { notifications = [] } = props;
        console.log("On updated", notifications);

        notifications.forEach(({ key, message, action, dismissed = false }) => {
            if (dismissed) {
                return;
            }
            // Do nothing if the notification is already displayed
            if (displayed.includes(key)) return;


            //Remove notification after time
            setTimeout(() => _closeNotification(key), 5000);

            // Keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    })

    const _handleNotification = (notification, test, test2) => {
        Vibration.vibrate([0, 250, 250, 250]);
        console.log("NOTIFICATION RECEIVED", notification);

        const { title, body, data } = notification.request?.content;
        const dataObj = data.body;

        props.addNotification(body, title, dataObj.count);
    };

    const _handleNotificationResponse = response => {
        console.log(response);
    };

    const _closeNotification = (key) => {
        props.closeNotification(key);
    };

    const _removeNotification = (key) => {
        removeDisplayed(key);
        props.removeNotification(key);
    };

    const _handleAnimationEnd = (dismissed, key, endState) => {
        if (dismissed) {
            _removeNotification(key);
        }
    };

    return (
        <SafeAreaView
            pointerEvents={"box-none"}
            style={{ ...StyleSheet.absoluteFillObject }}
        >
            <View
                pointerEvents={"box-none"}
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    flexDirection: "column",
                    padding: 20,
                }}
            >
                {props.notifications.map(
                    (
                        { key, message, specialItem, title, action, dismissed = false },
                        index
                    ) => {
                        console.log(key, message, index);

                        return (
                            <Animatable.View
                                style={{ marginBottom: 10 }}
                                key={key}
                                pointerEvents={"auto"}
                                onAnimationEnd={(endState) =>
                                    _handleAnimationEnd(dismissed, key, endState)
                                }
                                animation={dismissed ? "fadeOutRight" : "fadeInRight"}
                                duration={500}
                            >
                                <NotificationComponent
                                    context={title}
                                    message={message}
                                    specialItem={specialItem}
                                    timeCreated={new Date()}
                                    onClose={() => _closeNotification(key)}
                                />
                            </Animatable.View>
                        );
                    }
                )}
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    notifications: state.notifications,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            removeNotification,
            closeNotification,
            addNotification,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
