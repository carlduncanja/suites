import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import Notifier from "../components/notifications/Notifier";
import { bindActionCreators } from "redux";
import ConfirmationComponent from "../components/ConfirmationComponent";
import { withModal, useModal } from "react-native-modalfy";
import { signOut } from "../redux/actions/authActions";
import { addNotification } from "../redux/actions/NotificationActions";
import { render } from "react-dom";

function NotFound({ addNotification, signOut, route = {}, modal }) {
  //ensure to destructer redux function
  const { name = "" } = route;
  // const { openModal, closeModal } = useModal();

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

  const toggleConfirmation = () => {
    console.log("Opening Modal!");
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          onCancel={cancelClicked}
          message="Umm are you sure?"
          action="Save"
        />
      ),
      onClose: () => {},
    });
  };

  const cancelClicked = () => {
    console.log("Gonna close the modal");
    modal.closeModals("ConfirmationModal");
    //alert("Are you sure? Your changes won't be reflected");
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

      <Button onPress={toggleConfirmation} title="toggle Confirmation" />

      <Button onPress={cancelClicked} title="Close Modal" />

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

export default connect(null, mapDispatcherToProps)(withModal(NotFound));
