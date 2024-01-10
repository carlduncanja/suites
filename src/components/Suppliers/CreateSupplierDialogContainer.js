import React, { useState } from "react";
import { View } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import OverlayDialogContent from "../common/Dialog/OverlayContent";
import { useModal } from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import Row from "../common/Row";
import FieldContainer from "../common/FieldContainerComponent";
import ConfirmationComponent from "../ConfirmationComponent";
import { connect } from "react-redux";
import { createSupplier } from "../../api/network";
import { addSupplier } from "../../redux/actions/suppliersActions";
import LineDivider from "../common/LineDivider";
import _ from "lodash";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { validateNameField } from "../../utils";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const DividerContainer = styled.View`
  padding-bottom: ${({ theme }) => theme.space["--space-24"]};
`;

function CreateSupplierDialogContainer({ onCancel, onCreated, onUpdate }) {
  const modal = useModal();
  const dialogTabs = ["Details"];
  const theme = useTheme();

  const [selectedIndex, setSelectedTabIndex] = useState(0);
  const [fields, setFields] = useState({});
  const [representative, setRepresentative] = useState({});
  const [errorFields, setErrorFields] = useState({});
  const [number, setNumber] = useState(fields.phone);
  const [fax, setFax] = useState(fields.fax);
  const [repTele, setRepTele] = useState(representative.phone);

  const handleCloseDialog = () => {
    onCancel();
    modal.closeAllModals();
  };

  const openErrorConfirmation = () => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={true}
          isEditUpdate={false}
          onCancel={() => modal.closeModals("ConfirmationModal")}
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  const onPositiveClick = () => {
    let isValid = validateSupplier();
    let supplierToAdd = {};

    if (!isValid) {
      return;
    }

    if (selectedIndex < dialogTabs.length - 1) {
      setSelectedTabIndex(selectedIndex + 1);
    } else {
      if (Object.keys(representative).length !== 0) {
        supplierToAdd = { ...fields, representatives: { ...representative } };
      } else {
        supplierToAdd = { ...fields };
      }

      createSupplierCall(supplierToAdd);
    }
  };

  const onTabChange = (tab) => {
    let isValid = validateSupplier();
    if (!isValid) {
      return;
    }
    setSelectedTabIndex(dialogTabs.indexOf(tab));
  };

  const onFieldChange = (fieldName) => (value) => {
    const updatedFields = { ...fields };
    setFields({
      ...updatedFields,
      [fieldName]: value,
    });

    const updatedErrors = { ...errorFields };
    delete updatedErrors[fieldName];
    setErrorFields(updatedErrors);
  };

  const validateSupplier = () => {
    let isValid = true;
    let requiredFields = ["name", "phone", "fax"];
    let errorObj = { ...errorFields } || {};

    for (const requiredField of requiredFields) {
      if (!fields[requiredField]) {
        isValid = false;
        errorObj[requiredField] = "Value is required.";
      } else {
        delete errorObj[requiredField];
      }
    }

    setErrorFields(errorObj);
    console.log("Error obj: ", errorObj);

    return isValid;
  };

  const createSupplierCall = (supplier) => {
    console.log("Supplier: ", supplier);
    createSupplier(supplier)
      .then((data) => {
        modal.closeAllModals();
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isEditUpdate={false}
              isError={false}
              onCancel={() => {
                modal.closeAllModals();
                setTimeout(() => {
                  onCreated(data);
                }, 200);
              }}
              onAction={() => {
                modal.closeAllModals();
                setTimeout(() => {
                  onCreated(data);
                }, 200);
              }}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
            navigation.goBack();
          },
        });
      })
      .catch((error) => {
        console.log("failed to create supplier", error);
        openErrorConfirmation();
      })
      .finally((_) => onUpdate());
  };

  const handleRepresentative = (fieldName) => (value) => {
    const updatedFields = { ...representative };
    setRepresentative({
      ...updatedFields,
      [fieldName]: value,
    });
  };

  const handlePhonNumber = (value) => {
    setNumber(value);
    if (value === "") {
      onFieldChange("phone")(value);
    } else if (/^\d{10}$/g.test(value)) onFieldChange("phone")(value);
  };

  const handleFax = (value) => {
    setFax(value);
    if (value === "") {
      onFieldChange("fax")(value);
    } else if (/^\d{10}$/g.test(value)) onFieldChange("fax")(value);
  };

  const getTabContent = () => {
    switch (dialogTabs[selectedIndex]) {
      case "Details":
        return detailsTab;
      case "Representative":
        return representativeTab;
      default:
        return <View />;
    }
  };

  const detailsTab = (
    <>
      <Row>
        <FieldContainer>
          <InputField2
            label={"Supplier"}
            onChangeText={(value) => {
              const isvalid = validateNameField(value);
              if (isvalid) onFieldChange("name")(value);
            }}
            value={fields["name"]}
            onClear={() => onFieldChange("name")("")}
            hasError={errorFields["name"]}
            errorMessage="Name must be filled."
          />
        </FieldContainer>

        <FieldContainer>
          <InputField2
            label="Phone"
            onChangeText={(value) => {
              handlePhonNumber(value);
            }}
            value={number}
            onClear={() => handlePhonNumber("")}
            keyboardType="number-pad"
            hasError={errorFields.phone}
            errorMessage="Phone must be filled."
            maxLength={10}
          />
        </FieldContainer>
      </Row>

      <Row>
        <FieldContainer>
          <InputField2
            label={"Fax"}
            onChangeText={(value) => {
              handleFax(value);
            }}
            value={fax}
            onClear={() => handleFax("")}
            keyboardType={"number-pad"}
            hasError={errorFields["fax"]}
            errorMessage="Fax must be filled."
            maxLength={10}
          />
        </FieldContainer>

        <FieldContainer>
          <InputField2
            label={"Email"}
            maxLength={10}
            labelWidth={98}
            onChangeText={onFieldChange("email")}
            value={fields["email"]}
            keyboardType={"email-address"}
            onClear={() => onFieldChange("email")("")}
          />
        </FieldContainer>
      </Row>

      <DividerContainer theme={theme}>
        <LineDivider />
      </DividerContainer>

      <Row>
        <FieldContainer>
          <InputField2
            label={"Representative"}
            onChangeText={(value) => {
              const isvalid = validateNameField(value);
              if (isvalid) handleRepresentative("name")(value);
            }}
            value={representative["name"]}
            onClear={() => handleRepresentative("name")("")}
          />
        </FieldContainer>

        <FieldContainer>
          <InputField2
            label="Rep.TelePhone"
            onChangeText={(value) => {
              setRepTele(value);
              if (/^\d{10}$/g.test(value)) handleRepresentative("phone")(value);
            }}
            value={repTele}
            onClear={() => {
              setRepTele("");
              handleRepresentative("phone")("");
            }}
            keyboardType={"number-pad"}
            maxLength={10}
          />
        </FieldContainer>
      </Row>

      <Row>
        <FieldContainer maxWidth="50%">
          <InputField2
            label={"Rep. Email"}
            onChangeText={handleRepresentative("email")}
            value={representative["email"]}
            onClear={() => handleRepresentative("email")("")}
            keyboardType={"email-address"}
          />
        </FieldContainer>
      </Row>
    </>
  );

  return (
    <OverlayDialog
      title={"Add Supplier"}
      onPositiveButtonPress={onPositiveClick}
      onClose={handleCloseDialog}
      positiveText={selectedIndex === dialogTabs.length - 1 ? "DONE" : "NEXT"}
    >
      <>
        <DialogTabs
          tabs={dialogTabs}
          tab={selectedIndex}
          onTabPress={onTabChange}
        />

        <OverlayDialogContent height={320}>
          {getTabContent()}
        </OverlayDialogContent>
      </>
    </OverlayDialog>
  );
}

CreateSupplierDialogContainer.propTypes = {};
CreateSupplierDialogContainer.defaultProps = {};

const mapDispatcherToProps = {
  addSupplier,
};

export default connect(
  null,
  mapDispatcherToProps
)(CreateSupplierDialogContainer);
