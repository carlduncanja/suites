import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styled from "@emotion/native";
import Row from "../common/Row";
import Record from "../common/Information Record/Record";
import TouchableRecord from "../common/Information Record/TouchableRecord";
import { PageContext } from "../../contexts/PageContext";
import InputLabelComponent from "../common/InputLablel";
import { MenuOption, MenuOptions } from "react-native-popup-menu";
import OptionsField from "../common/Input Fields/OptionsField";
import { getRolesCall, updateUserCall } from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";
import { useModal } from "react-native-modalfy";
import LoadingComponent from "../LoadingComponent";
import Footer from "../common/Page/Footer";
import FieldContainer from "../common/FieldContainerComponent";
import { validateNameField } from "../../utils";

const InputWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  z-index: ${({ zIndex }) => zIndex};
  margin-right: 8px;
`;

function UserDetailsComponent({
  user,
  onUserUpdated = () => {},
  onResetPassword = () => {},
}) {
  const baseStateRef = useRef();
  const { pageState, setPageState } = useContext(PageContext);
  const modal = useModal();

  const [userFields, setUserFields] = useState({
    first_name: user["first_name"],
    last_name: user["last_name"],
    email: user["email"],
    password: user["password"],
    role: user["role"],
  });

  const { isEditMode } = pageState;

  const [roles, setRoles] = useState([]);
  const [fieldErrors, setErrors] = useState({});
  const [isUpdated, setUpdated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      baseStateRef.current = userFields; // save the base state for as we enter edit mode.
    }

    if (isUpdated && !isEditMode) {
      confirmChanges();
    }
  }, [isEditMode]);

  const onFieldChange = (field) => (value) => {
    setUserFields({
      ...userFields,
      [field]: value,
    });

    setErrors({
      ...fieldErrors,
      [field]: undefined,
    });

    setUpdated(true);
  };

  const getRoles = () => {
    getRolesCall()
      .then((data) => setRoles(data))
      .catch((error) => {
        console.log("failed to get user role");
      });
  };

  const confirmChanges = () => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          error={false} //boolean to show whether an error icon or success icon
          isEditUpdate={true}
          onCancel={() => {
            setPageState({ ...pageState, isEditMode: false });
            setUserFields(baseStateRef.current);
            modal.closeAllModals();
          }}
          onAction={() => {
            modal.closeAllModals();
            updateUser(user?._id, convertUserFieldsToUpdateData(userFields));
          }}
          message="Would you like to finish edit and save changes?" //general message you can send to be displayed
          action="Yes"
        />
      ),
      onClose: () => {
        console.log("Modal closed");
      },
    });
  };

  const updateUser = (userId, data) => {
    setLoading(true);
    updateUserCall(userId, data)
      .then((_) => {
        onUserUpdated(userFields);
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={false}
              isEditUpdate={false}
              onCancel={modal.closeAllModals}
              onAction={modal.closeAllModals}
              message={"User information updated."}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .catch((error) => {
        console.log("failed to update user", error);
        setPageState({ ...pageState, isEditMode: true });
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={true}
              isEditUpdate={false}
              onCancel={modal.closeAllModals}
              onAction={modal.closeAllModals}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .finally((_) => {
        setLoading(false);
      });
  };

  const convertUserFieldsToUpdateData = () => {
    return {
      email: userFields["email"],
      first_name: userFields["first_name"],
      last_name: userFields["last_name"],
      role: userFields.role?._id,
    };
  };

  return (
    <>
      <>
        <Row>
          <FieldContainer maxWidth="50%">
            <Record
              recordValue={userFields["first_name"]}
              recordTitle="First Name"
              editMode={isEditMode}
              onRecordUpdate={(value) => {
                const isValid = validateNameField(value);
                if (isValid) onFieldChange("first_name")(value);
              }}
              onClearValue={onFieldChange("first_name")}
            />
          </FieldContainer>

          <FieldContainer maxWidth="50%">
            <Record
              recordValue={userFields["last_name"]}
              recordTitle="Last Name"
              editMode={isEditMode}
              onRecordUpdate={(value) => {
                const isvalid = validateNameField(value);
                if (isvalid) onFieldChange("last_name")(value);
              }}
              onClearValue={onFieldChange("last_name")}
            />
          </FieldContainer>
        </Row>

        <Row>
          <FieldContainer maxWidth="50%">
            <Record
              recordValue={userFields["email"]}
              recordTitle="Email"
              editMode={isEditMode}
              onRecordUpdate={onFieldChange("email")}
              onClearValue={onFieldChange("email")}
            />
          </FieldContainer>

          {isEditMode ? (
            <FieldContainer maxWidth="50%">
              <InputWrapper>
                <InputLabelComponent label={"Role"} />
                <OptionsField
                  text={userFields["role"].name}
                  hasError={!!fieldErrors["role"]}
                  errorMessage={fieldErrors["role"]}
                  oneOptionsSelected={onFieldChange("role")}
                  menuOption={
                    <MenuOptions>
                      {roles?.map((item) => (
                        <MenuOption
                          key={item._id}
                          value={item}
                          text={item.name}
                        />
                      ))}
                    </MenuOptions>
                  }
                />
              </InputWrapper>
            </FieldContainer>
          ) : (
            <Record recordValue={userFields["role"].name} recordTitle="Role" />
          )}
        </Row>
        <FieldContainer>
          <Row>
            <TouchableRecord
              recordTitle="Password"
              recordValue="Reset Password"
              handleRecordPress={() => {
                onResetPassword();
              }}
            />
          </Row>
        </FieldContainer>

        {isLoading && <LoadingComponent />}
      </>
      <Footer hasActions={false} hasPaginator={false} />
    </>
  );
}

export default UserDetailsComponent;
