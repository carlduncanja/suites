import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import Notifier from "../components/notifications/Notifier";
import { bindActionCreators } from "redux";

import { signOut } from "../redux/actions/authActions";
import { addNotification } from "../redux/actions/NotificationActions";
import { render } from "react-dom";

function NotFound({ addNotification, signOut, route = {} }) {
  //ensure to destructer redux function
  const { name = "" } = route;

  const message = "items added to inventory";
  const title = "Group";
  const special = "";

  const handleOnLogout = async () => {
    await AsyncStorage.clear();
    signOut();
  };

  const handleNotif = () => {
    addNotification(message, title, special);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ margin: 50 }}> {name} Page Not Found</Text>
      {/* <Notif notifications={notifs} /> */}

      <Button onPress={handleNotif} title="toggle Notif" />

      <Button onPress={handleOnLogout} title="LOGOUT" />
    </View>
  );
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

const mapDispatcherToProps = (dispatch) =>
  bindActionCreators(
    {
      signOut,
      addNotification,
    },
    dispatch
  );

export default connect(null, mapDispatcherToProps)(NotFound);
