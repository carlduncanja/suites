import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import CancelIcon from "../../assets/svg/CancelIcon";
import FolderIcon from "../../assets/svg/FolderIcon";
import moment from "moment";

function NotificationComponent(props) {
  const {
    icon = <FolderIcon />,
    timeCreated = new Date(),
    context = "Group",
    specialItem = "",
    onClose,
    message = "",
  } = props;

  return (
    <TouchableWithoutFeedback
      pointerEvents={"auto"}
      animation="fadeInRight"
      duration={400}
    >
      <View style={styles.container}>
        <View style={styles.headingRow}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={{ paddingRight: 10, paddingTop: 4 }}>{icon}</View>
            <Text style={{ fontSize: 14 }}>{context}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.text}>
              {/*Time*/}
              {moment(timeCreated).fromNow()}
            </Text>
            <TouchableOpacity
              style={{ paddingLeft: 10, paddingTop: 4 }}
              onPress={onClose}
            >
              <CancelIcon />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "baseline",
            marginBottom: 5,
          }}
        >
          <Text style={styles.special}>{specialItem}</Text>
          <Text style={styles.text}>{message}</Text>

          {props.children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

NotificationComponent.propTypes = {
  icon: PropTypes.element,
  timeCreated: PropTypes.object,
  context: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
NotificationComponent.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    width: 350,
    minHeight: 94,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderColor: "#0CB0E7",
    borderWidth: 1,
    borderLeftWidth: 5,
    flexDirection: "column",
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,0.49)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headingRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "#718096",
  },
  special: {
    fontSize: 20,
    color: "#0CB0E7",
    marginRight: 10,
  },
});

export default NotificationComponent;
