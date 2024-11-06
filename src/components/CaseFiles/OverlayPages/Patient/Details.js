import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { useModal } from "react-native-modalfy";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { MenuOption, MenuOptions } from "react-native-popup-menu";
import BMIConverter from "../../BMIConverter";
import { PersonalRecord } from "../../../common/Information Record/RecordStyles";
import TouchableRecord from "../../../common/Information Record/TouchableRecord";
import ContentResponsiveRecord from "../../../common/Information Record/ContentResponsiveRecord";
import PatientBMIChart from "../../PatientBMIChart";
import {
  formatDate,
  calcAge,
  handleNumberValidation,
  formatPhoneNumber,
  isValidEmail,
  checkObjectProperty,
  _formatPhoneNumber,
} from "../../../../utils/formatter";
import Row from "../../../common/Row";
import Record from "../../../common/Information Record/Record";
import { PageContext } from "../../../../contexts/PageContext";
import ConfirmationComponent from "../../../ConfirmationComponent";
import { updatePatient } from "../../../../api/network";
import { calculateBmi } from "../../../../helpers/calculations";
import FieldContainer from "../../../common/FieldContainerComponent";
import { validateAddressField, validateNameField } from "../../../../utils";
import moment from "moment";

const bmiScale = [
  {
    color: "#4299E1",
    startValue: 0,
    endValue: 18.4,
  },
  {
    color: "#48BB78",
    startValue: 18.5,
    endValue: 24.9,
  },
  {
    color: "#ED8936",
    startValue: 25,
    endValue: 29.9,
  },
  {
    color: "#E53E3E",
    startValue: 30,
    endValue: 34.9,
  },
  {
    color: "#805AD5",
    startValue: 35,
    endValue: 100,
  },
];

/**
 * @typedef {Object} TabDetails
 * @property {string} _id
 * @property {string} firstName
 * @property {string} middleName
 * @property {string} surname
 * @property {string} height
 * @property {string} weight
 * @property {string} dob
 * @property {string} gender
 * @property {string} ethnicity
 * @property {string} bloodType
 * @property {string} nextVisit
 * @property {Object} contactInfo //TO-DO: to refine
 * @property {string} passport
 * @property {string} other
 * @property {string} national
 * @property {Object[]} address //TO-DO: to refine
 *
 */

/**
 * @callback onUpdated
 * @returns {void}
 */

/**
 * @typedef {Object} DetailProps
 * @property {TabDetails} tabDetails
 * @property {onUpdated} onUpdated
 */

/**
 * @param {DetailProps} props
 * @returns {JSX.Element}
 */
const Details = ({ tabDetails, onUpdated = () => {} }) => {
  const theme = useTheme();
  const modal = useModal();

  const Divider = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${theme.colors["--color-gray-400"]};
    border-radius: 2px;
    margin-bottom: ${theme.space["--space-20"]};
  `;

  const baseStateRef = useRef();

  const {
    _id: patientId,
    firstName,
    middleName,
    surname,
    height,
    weight,
    dob,
    trn,
    gender,
    ethnicity,
    bloodType,
    nextVisit,
    contactInfo = {},
    passport,
    other,
    national,
    address: addresses = [],
  } = tabDetails;
  const {
    phones = [],
    emails = [],
    emergencyContact: emergencyContacts = [],
  } = contactInfo;

  const [fields, setFields] = useState({
    firstName,
    middleName,
    surname,
    height,
    weight,
    dob,
    trn,
    gender,
    ethnicity,
    bloodType,
    nextVisit,
    phones,
    emails,
    address: addresses,
    emergencyContact: emergencyContacts,
    passport,
    other,
    national,
  });

  const { pageState, setPageState } = useContext(PageContext);
  const { isEditMode } = pageState;

  const [isUpdated, setUpdated] = useState(false);

  const [phoneValues, setPhoneValues] = useState(phones);
  const [emailValues, setEmailValues] = useState(emails);
  const [addressValues, setAddressValues] = useState(addresses);
  const [emergencyContactsValues, setEmergencyContactsValues] =
    useState(emergencyContacts);

  const age = calcAge(fields.dob || dob);
  const dateOfBirth = `${formatDate(fields.dob || dob, "DD/MM/YYYY")} (${age})`;

  const bmiMeasure = calculateBmi(height, weight);
  const bmi = bmiMeasure > 100 ? 100 : bmiMeasure;

  const onTabUpdated = (updatedFields) =>
    setFields({ ...fields, ...updatedFields });

  const onFieldChange = (fieldName) => (value) => {
    const updatedFields = {
      ...fields,
      [fieldName]: value,
    };

    setFields(updatedFields);

    onTabUpdated({
      ...updatedFields,
      contactInfo: {
        phones: phoneValues,
        emails: emailValues,
        emergencyContact: emergencyContactsValues,
      },
      address: addressValues,
    });
    setUpdated(true);
  };

  useEffect(() => {
    baseStateRef.current = {
      firstName,
      middleName,
      surname,
      height,
      weight,
      dob,
      trn,
      gender,
      ethnicity,
      bloodType,
      nextVisit,
      phones,
      emails,
      address: addresses,
      emergencyContact: emergencyContacts,
    };

    return () => {
      baseStateRef.current = {};
    };
  }, []);

  useEffect(() => {
    if (isUpdated && !isEditMode) {
      modal.openModal("ConfirmationModal", {
        content: (
          <ConfirmationComponent
            isError={false}
            isEditUpdate={true}
            onCancel={() => {
              setPageState({
                ...pageState,
                isEditMode: true,
              });
              setUpdated(false);
              modal.closeAllModals();
            }}
            onAction={() => {
              modal.closeAllModals();
              updatePatientAction();
            }}
            message="Do you want to save changes?"
            action="Yes"
          />
        ),
        onClose: () => console.log("Modal closed"),
      });
    }

    if (isEditMode) {
      setPhoneValues(phones);
      setEmailValues(emails);
      setAddressValues(addresses);
      setEmergencyContactsValues(emergencyContacts);
    }
  }, [isEditMode]);

  const updatePatientAction = () => {
    const data = { ...fields };

    updatePatient(patientId, data)
      .then((_) => {
        onUpdated(data);
        setUpdated(false);
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={false}
              isEditUpdate={false}
              onCancel={() => modal.closeAllModals()}
              onAction={() => modal.closeAllModals()}
              message="Changes were successful."
              action="Yes"
            />
          ),
          onClose: () => console.log("Modal closed"),
        });
      })
      .catch((error) => {
        console.log("Failed to update Patient", error);
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              error={true}
              isEditUpdate={false}
              onCancel={() => modal.closeAllModals()}
              onAction={() => {
                modal.closeAllModals();
                resetState();
              }}
              message="Something went wrong when applying changes."
              action="Yes"
            />
          ),
          onClose: () => console.log("Modal closed"),
        });
      });
  };

  const resetState = () => {
    setFields(baseStateRef.current);
    setUpdated(false);
  };

  const handleBMIPress = (value) => {
    modal.openModal("OverlayInfoModal", {
      overlayContent: <PatientBMIChart value={value} bmiScale={bmiScale} />,
    });
  };

  const defaultRecordValue = (object, key, defaultValue) => {
    const isPropertyValueValid = checkObjectProperty(object, key);
    return isPropertyValueValid ? object[key] : defaultValue || "--";
  };

  const updatePhone = (newValue, phoneType) => {
    let updatedPhones = [...phones];

    let found = false;
    updatedPhones.map((p) => {
      if (p.type === phoneType) {
        p.phone = newValue;
        found = true;
      }
    });

    if (!found)
      updatedPhones = [
        ...updatedPhones,
        {
          type: phoneType,
          phone: newValue,
        },
      ];

    setPhoneValues(updatedPhones);
    return updatedPhones;
  };

  const updateEmail = (newValue, emailType) => {
    let updatedEmails = [...emails];

    let found = false;
    updatedEmails.map((e) => {
      if (e.type === emailType) {
        e.email = newValue;
        found = true;
      }
    });

    if (!found)
      updatedEmails = [
        ...updatedEmails,
        {
          type: emailType,
          email: newValue,
        },
      ];

    setEmailValues(updatedEmails);
    return updatedEmails;
  };

  const updateAddress = (value, key, id) => {
    let updatedAddresses = [...addresses];

    let found = false;
    updatedAddresses.map((addressObj) => {
      if (addressObj._id === id) {
        addressObj[key] = value;
        found = true;
      }
    });

    if (!found)
      updatedAddresses = [
        ...updatedAddresses,
        {
          [key]: value,
          [key === "line1" ? "line2" : "line2"]: "",
        },
      ];

    setAddressValues(updatedAddresses);
    onFieldChange("address")(updatedAddresses);
  };

  const handlePhoneChange = (number, phoneType) => {
    const formattedNumber = number.replace(/\s/g, "");
    const updatedPhones = updatePhone(formattedNumber, phoneType);

    if (number === "") onFieldChange("phones")(updatePhone("", phoneType));
    else if (/^\d+$/g.test(formattedNumber) || !number)
      onFieldChange("phones")(updatedPhones);
  };

  const handleEmailChange = (email, emailType) => {
    const updatedEmails = updateEmail(email, emailType);

    if (email === "") onFieldChange("emails")(updatedEmails);
    else if (isValidEmail(email) || !email)
      onFieldChange("emails")(updatedEmails);
  };

  const handleEmergencyChange = (value, key, contactIndex) => {
    const objIndex = emergencyContactsValues.findIndex(
      (ob, index) => index === contactIndex
    );
    let updatedObj = {};
    let updatedContacts = [];

    if (key === "name") {
      updatedObj = {
        ...emergencyContactsValues[objIndex],
        name: value,
      };
      updatedContacts = [
        ...emergencyContactsValues.slice(0, objIndex),
        updatedObj,
        ...emergencyContactsValues.slice(objIndex + 1),
      ];

      onFieldChange("emergencyContact")(updatedContacts);
    } else if (key === "relation") {
      if (value === "")
        updatedObj = {
          ...emergencyContactsValues[objIndex],
          relation: "",
        };
      else
        updatedObj = {
          ...emergencyContactsValues[objIndex],
          relation: value,
        };

      updatedContacts = [
        ...emergencyContactsValues.slice(0, objIndex),
        updatedObj,
        ...emergencyContactsValues.slice(objIndex + 1),
      ];

      onFieldChange("emergencyContact")(updatedContacts);
    } else if (key === "phone") {
      updatedObj = {
        ...emergencyContactsValues[objIndex],
        phone: value,
      };

      updatedContacts = [
        ...emergencyContactsValues.slice(0, objIndex),
        updatedObj,
        ...emergencyContactsValues.slice(objIndex + 1),
      ];

      if (/^\d{10}$/g.test(value) || !value)
        onFieldChange("emergencyContact")(updatedContacts);
    } else {
      updatedObj = {
        ...emergencyContactsValues[objIndex],
        email: value,
      };

      updatedContacts = [
        ...emergencyContactsValues.slice(0, objIndex),
        updatedObj,
        ...emergencyContactsValues.slice(objIndex + 1),
      ];

      if (isValidEmail(value) || !value)
        onFieldChange("emergencyContact")(updatedContacts);
    }

    setEmergencyContactsValues(updatedContacts);
  };

  const cellPhoneObj = phones.find((p) => p.type === "cell");
  const homePhoneObj = phones.find((p) => p.type === "home");
  const workPhoneObj = phones.find((p) => p.type === "work");

  const cellPhoneRecordValue = cellPhoneObj ? cellPhoneObj.phone : "";
  const homePhoneRecordValue = homePhoneObj ? homePhoneObj.phone : "";
  const workPhoneRecordValue = workPhoneObj ? workPhoneObj.phone : "";

  const cellPhoneValue = phoneValues.length
    ? phoneValues.find((p) => p.type === "cell").phone
    : "";
  const homePhoneValue = phoneValues.length
    ? phoneValues.find((p) => p.type === "home").phone
    : "";
  const workPhoneValue = phoneValues.length
    ? phoneValues.find((p) => p.type === "work").phone
    : "";

  const editCellPhoneValue =
    (cellPhoneValue || cellPhoneValue === "") && isUpdated
      ? cellPhoneValue
      : cellPhoneRecordValue;
  const editHomePhoneValue =
    (homePhoneValue || homePhoneValue === "") && isUpdated
      ? homePhoneValue
      : homePhoneRecordValue;
  const editWorkPhoneValue =
    (workPhoneValue || workPhoneValue === "") && isUpdated
      ? workPhoneValue
      : workPhoneRecordValue;

  const primaryEmailObj = emails.find((e) => e.type === "primary");
  const otherEmailObj = emails.find((e) => e.type === "other");
  const workEmailObj = emails.find((e) => e.type === "work");

  const primaryEmailRecordValue = primaryEmailObj ? primaryEmailObj.email : "";
  const otherEmailRecordValue = otherEmailObj ? otherEmailObj.email : "";
  const workEmailRecordValue = workEmailObj ? workEmailObj.email : "";

  const primaryEmailValue = emailValues.length
    ? emailValues.find((p) => p.type === "primary").email
    : "";
  const otherEmailValue = emailValues.length
    ? emailValues.find((p) => p.type === "other").email
    : "";
  const workEmailValue = emailValues.length
    ? emailValues.find((p) => p.type === "work").email
    : "";

  const editPrimaryEmailValue =
    (primaryEmailValue || primaryEmailValue === "") && isUpdated
      ? primaryEmailValue
      : primaryEmailRecordValue;
  const editOtherEmailValue =
    (otherEmailValue || otherEmailValue === "") && isUpdated
      ? otherEmailValue
      : otherEmailRecordValue;
  const editWorkEmailValue =
    (workEmailValue || workEmailValue === "") && isUpdated
      ? workEmailValue
      : workEmailRecordValue;

  // Add this state to track the last update
  const [lastUpdate, setLastUpdate] = useState(null);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      <>
        <Row>
          <FieldContainer>
            <Record
              recordTitle="First Name"
              recordValue={defaultRecordValue(fields, "firstName", firstName)}
              onClearValue={() => onFieldChange("firstName")("")}
              onRecordUpdate={(value) => {
                const val = validateNameField(value);
                if (val) onFieldChange("firstName")(value);
              }}
              editMode={isEditMode}
              editable={true}
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Middle Name"
              recordValue={defaultRecordValue(fields, "middleName", middleName)}
              onClearValue={() => onFieldChange("middleName")("")}
              onRecordUpdate={(value) => {
                const val = validateNameField(value);
                if (val) onFieldChange("middleName")(value);
              }}
              editMode={isEditMode}
              editable={true}
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Surname"
              recordValue={defaultRecordValue(fields, "surname", surname)}
              onClearValue={() => onFieldChange("surname")("")}
              onRecordUpdate={(value) => {
                const val = validateNameField(value);
                if (val) onFieldChange("surname")(value);
              }}
              editMode={isEditMode}
              editable={true}
            />
          </FieldContainer>
        </Row>

        <Row>
          <FieldContainer>
            <Record
              recordTitle="Height (cm)"
              recordValue={defaultRecordValue(fields, "height", height)}
              onClearValue={() => onFieldChange("height")("")}
              onRecordUpdate={onFieldChange("height")}
              editMode={isEditMode}
              editable={true}
              keyboardType="decimal-pad"
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Weight (kg)"
              recordValue={defaultRecordValue(fields, "weight", weight)}
              onClearValue={() => onFieldChange("weight")("")}
              onRecordUpdate={onFieldChange("weight")}
              editMode={isEditMode}
              editable={true}
              keyboardType="decimal-pad"
            />
          </FieldContainer>

          <FieldContainer>
            <ContentResponsiveRecord
              recordTitle="BMI"
              content={
                <BMIConverter
                  recordTitle="BMI"
                  bmiValue={bmi}
                  bmiScale={bmiScale}
                />
              }
              handleRecordPress={() => handleBMIPress(bmi)}
            />
          </FieldContainer>
        </Row>

        <Row>
          <FieldContainer>
            <Record
              recordTitle="Date of Birth"
              recordValue={
                isEditMode
                  ? defaultRecordValue(fields, "dob", dob)
                  : dateOfBirth || "--"
              }
              editMode={isEditMode}
              editable={true}
              useDateField={true}
              maxDate={new Date()}
              onClearValue={() => onFieldChange("dob")("")}
              onRecordUpdate={(date) => {
                // Prevent duplicate updates within a short time window
                const now = Date.now();
                if (lastUpdate && now - lastUpdate < 1000) {
                  return; // Ignore updates within 1 second of the last update
                }
                
                if (date instanceof Date) {
                  setLastUpdate(now);
                  const formattedDate = moment(date).format('YYYY-MM-DD');
                  onFieldChange("dob")(formattedDate);
                }
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="TRN"
              recordValue={defaultRecordValue(fields, "trn", trn)}
              onClearValue={() => onFieldChange("trn")("")}
              onRecordUpdate={(value) => {
                const val = handleNumberValidation(value, 9);
                if (val || val === "") onFieldChange("trn")(val);
                console.log("this is a test TRN: ", val);
              }}
              editMode={isEditMode}
              editable={true}
              keyboardType="number-pad"
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Gender"
              recordValue={defaultRecordValue(fields, "gender", gender)}
              editMode={isEditMode}
              editable={true}
              useDropdown={true}
              onRecordUpdate={onFieldChange("gender")}
              options={
                <MenuOptions>
                  <MenuOption value="Male" text="Male" />
                  <MenuOption value="Female" text="Female" />
                </MenuOptions>
              }
            />
          </FieldContainer>
        </Row>

        <Row>
          <FieldContainer>
            <Record
              recordTitle="Passport"
              recordValue={defaultRecordValue(fields, "passport", passport)}
              onClearValue={() => onFieldChange("passport")("")}
              onRecordUpdate={(value) => {
                const val = handleNumberValidation(value, 9);
                if (val || val === "") onFieldChange("passport")(val);
              }}
              editMode={isEditMode}
              editable={true}
              keyboardType="number-pad"
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="National ID"
              recordValue={defaultRecordValue(fields, "national", national)}
              onClearValue={() => onFieldChange("national")("")}
              onRecordUpdate={(value) => {
                const val = handleNumberValidation(value, 9);
                if (val || val === "") onFieldChange("national")(val);
              }}
              editMode={isEditMode}
              editable={true}
              keyboardType="number-pad"
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Other ID"
              recordValue={defaultRecordValue(fields, "other", other)}
              onClearValue={() => onFieldChange("other")("")}
              onRecordUpdate={(value) => {
                const val = handleNumberValidation(value, 9);
                if (val || val === "") onFieldChange("other")(val);
              }}
              editMode={isEditMode}
              editable={true}
              keyboardType="number-pad"
            />
          </FieldContainer>
        </Row>

        <Row>
          <FieldContainer>
            <Record
              recordTitle="Ethnicity"
              recordValue={defaultRecordValue(fields, "ethnicity", ethnicity)}
              editMode={isEditMode}
              editable={true}
              useDropdown={true}
              onRecordUpdate={onFieldChange("ethnicity")}
              options={
                <MenuOptions>
                  <MenuOption
                    value="Black / African American"
                    text="Black / African American"
                  />
                  <MenuOption
                    value="White / Caucasian"
                    text="White / Caucasian"
                  />
                  <MenuOption value="Indian" text="Indian" />
                  <MenuOption value="Asian" text="Asian" />
                  <MenuOption value="Hispanic" text="Hispanic" />
                  <MenuOption value="Other" text="Other" />
                </MenuOptions>
              }
            />
          </FieldContainer>

          <FieldContainer>
            <Record
              recordTitle="Blood Type"
              recordValue={defaultRecordValue(fields, "bloodType", bloodType)}
              editMode={isEditMode}
              editable={true}
              useDropdown={true}
              onRecordUpdate={onFieldChange("bloodType")}
              options={
                <MenuOptions>
                  <MenuOption value="A+" text="A+" />
                  <MenuOption value="A-" text="A-" />
                  <MenuOption value="B+" text="B+" />
                  <MenuOption value="B-" text="B-" />
                  <MenuOption value="O+" text="O+" />
                  <MenuOption value="O-" text="O-" />
                  <MenuOption value="AB+" text="AB+" />
                  <MenuOption value="AB-" text="AB-" />
                </MenuOptions>
              }
            />
          </FieldContainer>

          <FieldContainer>
            <PersonalRecord
              recordTitle="Next Visit"
              recordValue={formatDate(nextVisit, "MMM DD, YYYY") || "n/a"}
            />
          </FieldContainer>
        </Row>
      </>
      <Divider />
      <>
        <Row>
          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Cell Phone Number"
                recordValue={editCellPhoneValue}
                onClearValue={() => handlePhoneChange("", "cell")}
                onRecordUpdate={(value) => {
                  const val = handleNumberValidation(value, 10);
                  if (val || val === "") handlePhoneChange(value, "cell");
                }}
                editMode={isEditMode}
                editable={true}
                keyboardType="number-pad"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Cell Phone Number"
                isPhone={true}
                recordValue={formatPhoneNumber(cellPhoneRecordValue)}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}

          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Home Phone Number"
                recordValue={editHomePhoneValue}
                onClearValue={() => handlePhoneChange("", "home")}
                onRecordUpdate={(value) => {
                  const val = handleNumberValidation(value, 10);
                  if (val || val === "") handlePhoneChange(value, "home");
                }}
                editMode={isEditMode}
                editable={true}
                keyboardType="number-pad"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Home Phone Number"
                isPhone={true}
                recordValue={formatPhoneNumber(homePhoneRecordValue)}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}

          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Work Phone Number"
                recordValue={editWorkPhoneValue}
                onClearValue={() => handlePhoneChange("", "work")}
                onRecordUpdate={(value) => {
                  const val = handleNumberValidation(value, 10);
                  if (val || val === "") handlePhoneChange(value, "work");
                }}
                editMode={isEditMode}
                editable={true}
                keyboardType="number-pad"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Work Phone Number"
                recordValue={formatPhoneNumber(workPhoneRecordValue)}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}
        </Row>

        <Row>
          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Primary Email"
                recordValue={editPrimaryEmailValue}
                onClearValue={() => handleEmailChange("", "primary")}
                onRecordUpdate={(value) => handleEmailChange(value, "primary")}
                editMode={isEditMode}
                editable={true}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Primary Email"
                isEmail={true}
                recordValue={primaryEmailRecordValue}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}

          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Alternate Email"
                recordValue={editOtherEmailValue}
                onClearValue={() => handleEmailChange("", "other")}
                onRecordUpdate={(value) => handleEmailChange(value, "other")}
                editMode={isEditMode}
                editable={true}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Alternate Email"
                recordValue={otherEmailRecordValue}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}

          {isEditMode ? (
            <FieldContainer>
              <Record
                recordTitle="Work Email"
                recordValue={editWorkEmailValue}
                onClearValue={() => handleEmailChange("", "work")}
                onRecordUpdate={(value) => handleEmailChange(value, "work")}
                editMode={isEditMode}
                editable={true}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </FieldContainer>
          ) : (
            <FieldContainer>
              <TouchableRecord
                recordTitle="Work Email"
                isEmail={true}
                recordValue={workEmailRecordValue}
                handleRecordPress={() => {}}
              />
            </FieldContainer>
          )}
        </Row>

        {isEditMode
          ? addressValues?.map((item, index) => (
              <Row key={index}>
                <FieldContainer>
                  <Record
                    recordTitle="Address 1"
                    recordValue={item?.line1}
                    onClearValue={() => updateAddress("", "line1", item._id)}
                    onRecordUpdate={(value) => {
                      const isValid = validateAddressField(value);
                      if (isValid) updateAddress(value, "line1", item._id);
                    }}
                    editMode={isEditMode}
                    editable={true}
                  />
                </FieldContainer>

                <FieldContainer>
                  <Record
                    recordTitle="Address 2"
                    recordValue={item.line2}
                    onClearValue={() => updateAddress("", "line2", item._id)}
                    onRecordUpdate={(value) => {
                      const isValid = validateAddressField(value);
                      if (isValid) updateAddress(value, "line2", item._id);
                    }}
                    editMode={isEditMode}
                    editable={true}
                  />
                </FieldContainer>
              </Row>
            ))
          : addresses?.map((item, index) => (
              <Row key={index}>
                <View style={{ flex: 2 }}>
                  <FieldContainer>
                    <PersonalRecord
                      recordTitle="Address 1"
                      recordValue={item?.line1}
                    />
                  </FieldContainer>
                </View>

                <FieldContainer>
                  <PersonalRecord
                    recordTitle="Address 2"
                    recordValue={item?.line2}
                  />
                </FieldContainer>
              </Row>
            ))}
      </>
      <Divider />
      <>
        {isEditMode
          ? emergencyContactsValues.map((contact, index) => {
              const {
                relation = "",
                email = "",
                phone = "",
                name = "",
              } = contact;
              return (
                <React.Fragment key={index}>
                  <Row>
                    <FieldContainer>
                      <Record
                        recordTitle="Emergency Contact Name"
                        recordValue={name}
                        onClearValue={() =>
                          handleEmergencyChange("", "name", index)
                        }
                        onRecordUpdate={(value) =>
                          handleEmergencyChange(value, "name", index)
                        }
                        editMode={isEditMode}
                        editable={true}
                      />
                    </FieldContainer>

                    <FieldContainer>
                      <Record
                        recordTitle="Emergency Contact Relation"
                        recordValue={relation}
                        onClearValue={() =>
                          handleEmergencyChange("", "relation", index)
                        }
                        onRecordUpdate={(value) =>
                          handleEmergencyChange(value, "relation", index)
                        }
                        editMode={isEditMode}
                        editable={true}
                      />
                    </FieldContainer>
                  </Row>

                  <Row>
                    <FieldContainer>
                      <Record
                        recordTitle="Emergency Contact Phone"
                        recordValue={phone}
                        onClearValue={() =>
                          handleEmergencyChange("", "phone", index)
                        }
                        onRecordUpdate={(value) => {
                          const val = handleNumberValidation(value, 10);
                          if (val || val === "")
                            handleEmergencyChange(value, "phone", index);
                        }}
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="number-pad"
                      />
                    </FieldContainer>

                    <FieldContainer>
                      <Record
                        recordTitle="Emergency Contact Email"
                        recordValue={email}
                        onClearValue={() =>
                          handleEmergencyChange("", "email", index)
                        }
                        onRecordUpdate={(value) =>
                          handleEmergencyChange(value, "email", index)
                        }
                        editMode={isEditMode}
                        editable={true}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </FieldContainer>
                  </Row>
                </React.Fragment>
              );
            })
          : emergencyContacts.map((contact, index) => {
              const {
                relation = "",
                email = "",
                phone = "",
                name = "",
              } = contact;
              return (
                <Row key={index}>
                  <FieldContainer>
                    <Record
                      recordTitle="Emergency Contact Name"
                      recordValue={`${
                        name && relation
                          ? `${name} (${relation})`
                          : name || "--"
                      }`}
                    />
                  </FieldContainer>

                  <FieldContainer>
                    <TouchableRecord
                      recordTitle="Emergency Contact Phone"
                      recordValue={formatPhoneNumber(phone)}
                      handleRecordPress={() => {}}
                      isPhone={true}
                    />
                  </FieldContainer>

                  <FieldContainer>
                    <TouchableRecord
                      recordTitle="Emergency Contact Email"
                      recordValue={email}
                      handleRecordPress={() => {}}
                      isEmail={true}
                    />
                  </FieldContainer>
                </Row>
              );
            })}
      </>
    </ScrollView>
  );
};

export default Details;
