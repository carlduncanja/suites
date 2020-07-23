/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
// import {removeSnackbar} from '../redux/actions/NotificationActions';
// import IconButton from "@material-ui/core/IconButton";
// import Icon from "@material-ui/core/Icon";
import { View, StyleSheet, Text, SafeAreaView, Vibration } from "react-native";
import * as Animatable from "react-native-animatable";
import NotificationComponent from "../NotificationComponent";
import { Notifications } from "expo";
import {
  addNotification,
  closeNotification,
  removeNotification,
} from "../../redux/actions/NotificationActions";

// Object {
//     "actionId": null,
//         "data": Object {},
//     "origin": "received",
//         "remote": true,
//         "userText": null,
// }

/**
 * This component handles the logic for displaying and removing notifications.
 */
class Notifier extends Component {
  state = {
    notifications: [],
  };

  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  removeDisplayed = (id) => {
    this.displayed = this.displayed.filter((key) => id !== key);
  };

  componentDidMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() {
    // Remove the notification listener
    this._notificationSubscription.remove();
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;
    console.log("On updated", notifications);

    notifications.forEach(({ key, message, action, dismissed = false }) => {
      if (dismissed) {
        return;
      }
      // Do nothing if the notification is already displayed
      if (this.displayed.includes(key)) return;

      // Display snackbar using notistack
      // this.props.enqueueSnackbar(message, {
      //     key,
      //     ...options,
      //     action: (!options.action) ? this.close : options.action,
      //     onClose: (event, reason, key) => {
      //         if (options.onClose) {
      //             options.onClose(event, reason, key);
      //         }
      //     },
      //     onExited: (event, key) => {
      //         this.props.removeSnackbar(key);
      //         this.removeDisplayed(key)
      //     }
      // });

      //Remove notification after time
      setTimeout(() => this._closeNotification(key), 5000);

      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  _handleNotification = (notification) => {
    Vibration.vibrate([0, 250, 250, 250]);
    console.log("NOTIFICATION RECEIVED", notification);

    this.props.addNotification(notification.body);
  };

  _closeNotification = (key) => {
    this.props.closeNotification(key);
  };

  _removeNotification = (key) => {
    this.removeDisplayed(key);
    this.props.removeNotification(key);
  };

  _handleAnimationEnd = (dismissed, key, endState) => {
    if (dismissed) {
      this._removeNotification(key);
    }
  };

  render() {
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
          {this.props.notifications.map(
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
                    this._handleAnimationEnd(dismissed, key, endState)
                  }
                  animation={dismissed ? "fadeOutRight" : "fadeInRight"}
                  duration={500}
                >
                  <NotificationComponent
                    context={title}
                    message={message}
                    specialItem={specialItem}
                    timeCreated={new Date()}
                    onClose={() => this._closeNotification(key)}
                  />
                </Animatable.View>
              );
            }
          )}
        </View>
      </SafeAreaView>
    );
  }
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
