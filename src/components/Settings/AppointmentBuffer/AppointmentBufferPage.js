import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

import { getConfigurations, updateBuffer } from "../../../api/network";

import DetailsPage from "../../common/DetailsPage/DetailsPage";
import TabsContainer from "../../common/Tabs/TabsContainerComponent";
import DataItem from "../../common/List/DataItem";
import InputUnitFields from "../../common/Input Fields/InputUnitFields";
import ContentDataItem from "../../common/List/ContentDataItem";
import ConfirmationComponent from "../../ConfirmationComponent";

import { PageContext } from "../../../contexts/PageContext";
import Header from "../../common/Table/Header";
import { useModal } from "react-native-modalfy";

const ContentContainer = styled.View`
  height: 32px;
  flex-direction: row;
`;

const HeaderContainer = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors["--color-gray-400"]};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  margin-bottom: 24px;
`;

function AppointmentBufferPage({ navigation }) {
  const theme = useTheme();
  const modal = useModal();
  const currentTabs = ["Details"];
  const headers = [
    {
      name: "Item",
      alignment: "flex-start",
      flex: 2.5,
    },
    {
      name: "Units",
      alignment: "flex-start",
      flex: 1,
    },
  ];

  const currentTab = currentTabs[0];
  const [pageState, setPageState] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  const [bufferTime, setBufferTime] = useState(1);
  const [localAnaesthesia, setLocalAnaesthesia] = useState(1);
  const [generalAnaesthesia, setGeneralAnaesthesia] = useState(1);
  const [errorFields, setErrorFields] = useState({
    buffer: false,
    local: false,
    general: false,
  });
  const { isEditMode = false } = pageState;

  useEffect(() => {
    getConfigurations()
      .then((data) => {
        const {
          bufferTime = 0,
          localAnaesthesia = 0,
          generalAnaesthesia = 0,
        } = data;
        setBufferTime(bufferTime);
        setLocalAnaesthesia(localAnaesthesia);
        setGeneralAnaesthesia(generalAnaesthesia);
      })
      .catch((error) => {
        console.log("Unable to retrieve buffer time: ", error);
      });
  }, []);

  useEffect(() => {
    if (isUpdated && isEditMode === false) {
      onFinishEdit();
    }
  }, [isEditMode]);

  const onFinishEdit = () => {
    if (bufferTime < 1) {
      setErrorFields({
        ...errorFields,
        buffer: true,
      });
      setPageState({ ...pageState, isEditMode: true });
      return;
    }

    goToConfirmationScreen();
  };

  const onValueChange = (value, type) => {
    if (type === "local") {
      setLocalAnaesthesia(value);
      setIsUpdated(true);
      if (value > 1) {
        setErrorFields({
          ...errorFields,
          local: false,
        });
      }
    }

    if (type === "buffer") {
      setBufferTime(value);
      setIsUpdated(true);
      if (value > 1) {
        setErrorFields({
          ...errorFields,
          buffer: false,
        });
      }
    }

    if (type === "general") {
      setGeneralAnaesthesia(value);
      setIsUpdated(true);
      if (value > 1) {
        setErrorFields({
          ...errorFields,
          general: false,
        });
      }
    }
  };

  const goToConfirmationScreen = () => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isEditUpdate={true}
          onCancel={() => {
            modal.closeModals("ConfirmationModal");
            setPageState({
              ...pageState,
              isEditMode: true,
            });
          }}
          onAction={() => updateBufferTime()}
          message="Do you want to save your changes?"
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
    setErrorFields({ buffer: false, local: false, general: false });
  };

  const updateBufferTime = () => {
    modal.closeAllModals();
    const buffer = { bufferTime, localAnaesthesia, generalAnaesthesia };

    updateBuffer(buffer)
      .then((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isEditUpdate={false}
              isError={false}
              onCancel={() => modal.closeAllModals()}
              onAction={() => modal.closeAllModals()}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .catch((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isEditUpdate={false}
              isError={true}
              onCancel={() => modal.closeAllModals()}
              onAction={() => modal.closeAllModals()}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      });
  };

  const itemFormat = () => (
    <>
      <ContentContainer>
        <DataItem
          color="--color-gray-800"
          fontStyle="--text-base-medium"
          flex={2.5}
          text="Buffer time"
        />

        <ContentDataItem
          flex={1}
          content={
            <InputUnitFields
              value={bufferTime}
              units={["mins"]}
              enabled={isEditMode}
              onChangeText={(value) => {
                if (/^\d+$/g.test(value) || !value) {
                  onValueChange(value, "buffer");
                }
              }}
              keyboardType="number-pad"
              hasError={errorFields["buffer"]}
              errorMessage="Input a value excluding 0"
            />
          }
        />
      </ContentContainer>

      <View style={{ marginTop: 20 }}>
        <ContentContainer>
          <DataItem
            color="--color-gray-800"
            fontStyle="--text-base-medium"
            flex={2.5}
            text="Local Anaesthesia Hourly Cost"
          />

          <ContentDataItem
            flex={1}
            content={
              <InputUnitFields
                value={
                  !isEditMode
                    ? localAnaesthesia.toLocaleString()
                    : localAnaesthesia
                }
                units={["$"]}
                enabled={isEditMode}
                onChangeText={(value) => {
                  if (/^\d+$/g.test(value) || !value) {
                    onValueChange(value, "local");
                  }
                }}
                keyboardType="number-pad"
                hasError={errorFields["local"]}
                errorMessage="Input must be greater than 0"
              />
            }
          />
        </ContentContainer>
      </View>

      <View style={{ marginTop: 20 }}>
        <ContentContainer>
          <DataItem
            color="--color-gray-800"
            fontStyle="--text-base-medium"
            flex={2.5}
            text="General Anaesthesia Hourly Cost"
          />

          <ContentDataItem
            flex={1}
            content={
              <InputUnitFields
                value={
                  !isEditMode
                    ? generalAnaesthesia.toLocaleString()
                    : generalAnaesthesia
                }
                units={["$"]}
                enabled={isEditMode}
                onChangeText={(value) => {
                  if (/^\d+$/g.test(value) || !value) {
                    onValueChange(value, "general");
                  }
                }}
                keyboardType="number-pad"
                hasError={errorFields["general"]}
                errorMessage="Input must be greater than 0"
              />
            }
          />
        </ContentContainer>
      </View>
    </>
  );

  const details = (
    <>
      <HeaderContainer theme={theme}>
        <Header headers={headers} isCheckbox={false} />
      </HeaderContainer>

      {itemFormat()}
    </>
  );

  const getTabContent = (selectedTab) => {
    switch (selectedTab) {
      case "Details":
        return details;
      default:
        return <View />;
    }
  };

  const getIsEditable = () => {
    switch (currentTab) {
      case "Details":
        return false;
      default:
        return false;
    }
  };

  return (
    <PageContext.Provider
      value={{
        pageState,
        setPageState,
      }}
    >
      <DetailsPage
        isEditable={true}
        headerChildren={["Custom types", "Procedure/Appointment Configuration"]}
        onBackPress={() => {
          navigation.navigate("Settings");
        }}
        isArchive={getIsEditable()}
        pageTabs={<TabsContainer tabs={currentTabs} selectedTab={currentTab} />}
      >
        {getTabContent(currentTab)}
      </DetailsPage>
    </PageContext.Provider>
  );
}
export default AppointmentBufferPage;
