import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useModal } from "react-native-modalfy";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import SvgIcon from "../../../../assets/SvgIcon";
import GenerateIcon from "../../../../assets/svg/generateIcon";
import { emptyFn } from "../../../const";
import {
  getUserCall,
  deleteAppointmentById,
  updateAppointmentById,
} from "../../../api/network";
import ConfirmationComponent from "../../../components/ConfirmationComponent";
/**
 * Visual component for rendering procedure appointments.
 * @param scheduleItem
 * @returns {*}
 * @constructor
 */
function ProcedureScheduleContent({
  handleScheduleRefresh = () => {},
  appointmentDetails,
  appLocation,
  physicians,
  patient,
  duration,
  nurses = [],
  leadPhysicianId,
  closeOverlay = emptyFn,
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const modal = useModal();

  const {
    _id = "",
    createdBy = "",
    item = {},
    descrition,
    title = "",
    subject = "",
    location = "",
    startTime = new Date(),
    endTime = new Date(),
  } = appointmentDetails;

  const { case: caseItem } = item;
  const { caseNumber } = caseItem;

  const isProcedureDateValid = (procedureDate) => {
    const now = new Date();
    return new Date(procedureDate) >= now;
  };

  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    getUserCall(createdBy).then((res) => {
      setOwner({
        firstName: res.data[0].first_name,
        lastName: res.data[0].last_name,
      });
    });
  }, []);

  const { status } = appointmentDetails;

  /**
   * @param scheduleDate - date object
   */
  const getTime = (scheduleDate) => {
    const date = moment(scheduleDate);
    return date.format("h:mm a");
  };

  const formatDate = (scheduleDate) => {
    const date = moment(scheduleDate);
    return date.format("D/M/YYYY");
  };

  const displayPatient = (patient = {}) => {
    const { firstName = "", surname = "" } = patient;

    return firstName && surname ? `${firstName} ${surname}` : "N/A";
  };

  const staffItem = (key, name, position, isBold) => (
    <View style={[styles.doctorContainer]} key={key}>
      {name !== null ? (
        <View style={{ marginRight: 10 }}>
          <SvgIcon iconName="doctorArrow" strokeColor="#718096" />
        </View>
      ) : null}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        {name !== null ? (
          <Text
            style={[
              styles.detailText,
              {
                color: "#3182CE",
                marginRight: 16,
                fontWeight: isBold ? "bold" : "normal",
              },
            ]}
          >
            {name}
          </Text>
        ) : (
          <Text
            style={[
              styles.detailText,
              {
                color: "#E53E3E",
                marginRight: 16,
                fontWeight: isBold ? "bold" : "normal",
              },
            ]}
          >
            No Data
          </Text>
        )}

        <Text style={[styles.detailText, { color: "#718096" }]}>
          {position}
        </Text>
      </View>
    </View>
  );

  const renderPhysicians = (physicians, leadPhysicianId) => {
    if (physicians.length === 0) {
      const leadPhysicianObj = {
        ...leadPhysicianId,
        tag: "Lead Surgeon",
        name: `Dr. ${leadPhysicianId.surname}`,
      };
      physicians.push(leadPhysicianObj);
    }

    function findPhysicianByTag(tag) {
      const match = physicians.filter((target) => target.tag === tag);

      return match.length > 0 ? match[0].name : null;
    }
    return (
      <View style={styles.box}>
        {staffItem(
          "1",
          findPhysicianByTag("Lead Surgeon"),
          "Lead Surgeon",
          false,
          null
        )}
        {staffItem(
          "2",
          findPhysicianByTag("Anaesthesiologist"),
          "Anaesthesiologist",
          false,
          null
        )}
        {staffItem(
          "3",
          findPhysicianByTag("Assistant Surgeon"),
          "Assistant Surgeon",
          false,
          null
        )}
      </View>
    );
  };

  const renderNurses = (nurses) => (
    <View style={styles.box}>
      {nurses.map((item, index) => {
        const name = `${item.name}` || "No Data";
        const position = `Nurse`;
        return staffItem(index, name, position, false, false);
      })}
    </View>
  );

  const handleOnCaseIdPress = () => {
    navigation.navigate("CaseFiles", {
      screen: "Case",
      params: {
        initial: false,
        caseId: caseItem._id,
        isEdit: false,
      },
    });
    closeOverlay();
  };

  const NewProcedureButton = styled.TouchableOpacity`
    align-items: center;
    border-width: 1px;
    justify-content: center;
    background-color: #0cb0e7;
    width: 53px;
    height: 26px;
    border-radius: 6px;
    margin-left: 20px;
  `;

  const NewProcedureButtonText = styled.Text`
    align-items: center;
    color: white;
    font: ${({ theme }) => theme.font["--text-sm-regular"]};
  `;

  async function handleDeletePress() {
    const appointmentID = appointmentDetails._id;
    await deleteAppointmentById(appointmentID).then(() => {
      handleScheduleRefresh({});
      modal.closeAllModals();
    });
  }

  function handleEditClick() {
    closeOverlay();
  }

  const hanadleErrorModal = (error = "") => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          textPadding={15}
          message={error}
          isError={true}
          isEditUpdate={false}
          onCancel={() => modal.closeModals("ConfirmationModal")}
        />
      ),
      onClose: () => {
        setAllowedToSubmit(false);
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  const handleStartClick = () => {
    const startTime = appointmentDetails?.startTime || new Date();

    if (!isProcedureDateValid(startTime)) {
      Alert.alert(
        "Invalid Start Date",
        "You cannot start a procedure scheduled for a past date.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
      return;
    }

    const now = moment();
    const end = moment(now).add(duration, "hours");

    const appointmentObj = {
      _id,
      description: descrition,
      subject,
      startTime: now,
      status: "In Progress",
      endTime: end,
      title,
      location: appLocation,
    };
    updateAppointmentById(_id, appointmentObj)
      .then(() => {
        navigation.navigate("CaseFiles", {
          screen: "Case",
          params: {
            initial: false,
            caseId: caseItem._id,
            isEdit: false,
            timeStamp: now,
            appointmentObj,
          },
        });
        closeOverlay();
      })
      .catch((err) => {
        console.log(err);
        hanadleErrorModal();
      });
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.cardTitle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: 5,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={handleOnCaseIdPress}
              >
                <Text style={styles.idText}>
                  #{caseNumber}
                </Text>

                <View style={{ paddingTop: 2 }}>
                  <GenerateIcon strokeColor={"#104587"} />
                </View>
              </TouchableOpacity>

              <View style={styles.statusWrapper}>
                <Text
                  style={{
                    color: "#A0AEC0",
                    fontSize: 12,
                  }}
                >
                  {status}
                </Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.subjectText}>{displayPatient(patient)}</Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#104587",
                  paddingBottom: 5,
                }}
              >
                {title}
              </Text>
            </View>
          </View>

          <View style={[styles.doctors]}>
            <View style={styles.cardDescription}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ fontSize: 14, paddingBottom: 10, color: "#718096" }}
                >
                  Theatre
                </Text>
                <Text style={[styles.detailText]}>{location}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "column", marginRight: 15 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingBottom: 10,
                      color: "#718096",
                    }}
                  >
                    Date
                  </Text>
                  <Text style={[styles.detailText]}>
                    {formatDate(startTime)}
                  </Text>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingBottom: 10,
                      color: "#718096",
                    }}
                  >
                    Time
                  </Text>
                  <Text style={[styles.detailText]}>
                    {getTime(startTime)} -
                    {getTime(endTime)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.cardDoctors}>
              {renderPhysicians(physicians, leadPhysicianId)}
              {nurses.length > 0 && renderNurses(nurses)}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.editContainer}>
        <Text style={styles.editText}>
          Created by {owner.firstName}
          {' '}
          {owner.lastName}
        </Text>
        <View style={styles.buttonHolder}>
          {status === "Not Yet Started" && (
            <NewProcedureButton
              style={{ borderColor: "#0CB0E7", width: 150 }}
              theme={theme}
              onPress={handleStartClick}
            >
              <NewProcedureButtonText> Start Procedure </NewProcedureButtonText>
            </NewProcedureButton>
          )}

          <NewProcedureButton
            style={{ borderColor: "#0CB0E7" }}
            theme={theme}
            onPress={() => handleEditClick()}
          >
            <NewProcedureButtonText>Edit</NewProcedureButtonText>
          </NewProcedureButton>
          <NewProcedureButton
            style={{ backgroundColor: "white", borderColor: "#6E7B87" }}
            theme={theme}
            onPress={() => handleDeletePress()}
          >
            <NewProcedureButtonText style={{ color: "#6E7B87" }}>
              Delete
            </NewProcedureButtonText>
          </NewProcedureButton>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    paddingRight: "4%",
    paddingLeft: "4%",
    flexDirection: "column",
  },

  buttonHolder: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  editContainer: {
    height: 50,
    zIndex: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 32,
  },

  editText: {
    color: "#718096",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },

  idText: {
    fontSize: 16,
    color: "#104587",
    marginBottom: 10,
    marginRight: 4,
  },
  subjectText: {
    fontSize: 20,
    color: "#0CB0E7",
    paddingBottom: 5,
  },
  statusWrapper: {
    backgroundColor: "#EEF2F6",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  cardTitle: {
    flexDirection: "column",
    paddingBottom: 20,
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
  },
  doctors: { flexDirection: "column" },

  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: "4%",
    paddingTop: 20,
    paddingBottom: 20,
  },

  cardDescription: {
    borderBottomColor: "#E2E8F0",
    borderBottomWidth: 1,
    paddingBottom: 15,
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDoctors: {
    flexDirection: "column",
    marginTop: 20,
  },
  doctorContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    paddingBottom: 20,
  },
  box: {
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#F7FAFC",
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderColor: "#CBD5E0",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "column",
    marginLeft: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 16,
    color: "#4E5664",
  },
  buttonController: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    flexDirection: "column",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
});

export default ProcedureScheduleContent;
