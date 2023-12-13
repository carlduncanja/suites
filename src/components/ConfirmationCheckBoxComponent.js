import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import ClearIcon from "../../assets/svg/clearIcon";
import CheckBoxComponent from "../components/common/Checkbox";
import IconButton from "./common/Buttons/IconButton";
import DateInputField from "./common/Input Fields/DateInputField";
import MultipleShadowsContainer from "./common/MultipleShadowContainer";
import { connect } from "react-redux";
import { setProcedureEndTimeRdx } from "../redux/actions/casePageActions";

const ModalWrapper = styled.View`
  width: 440px;
  position: relative;
  background-color: white;
  border-radius: 8px;
`;

const ModalContainer = styled.View`
  display: flex;
  height: 100%;
`;

const HeaderWrapper = styled.View`
  height: 40px;
  width: 100%;
  border-bottom-width: 0.25px;
  border-bottom-color: ${({ theme }) => theme.colors["--color-gray-1000"]};
`;

const HeadingContainer = styled.View`
  height: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 2px;
`;

const ModalText = styled.Text(
  ({ textColor = "--color-gray-600", theme, font = "--confirm-title" }) => ({
    ...theme.font[font],
    color: theme.colors[textColor],
    paddingTop: 2,
    textAlign: "center",
  })
);

const ClearIconContainer = styled.View`
  align-items: flex-end;
`;

const MessageWrapper = styled.View`
  height: 88px;
  width: 392px;
  justify-content: center;
  align-self: center;
  margin-top: ${({ theme }) => theme.space["--space-32"]};
  margin-bottom: ${({ theme }) => theme.space["--space-32"]};
`;
const MessageContainer = styled.View`
  display: flex;
  height: 100%;
  width: 318px;
  background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
`;

const ButtonView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  margin: ${({ theme }) => theme.space["--space-16"]};
  margin-top: 0;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: ${({ fullWidth }) => (fullWidth === true ? "100%" : null)};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.space["--space-16"]}`};
  border-radius: 8px;
  background-color: ${({ background, theme }) => theme.colors[background]};
  border: ${({ theme, borderColor }) =>
    borderColor ? `1px solid ${theme.colors[borderColor]}` : null};
`;

const CancelButtonContainer = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
  padding-top: 12px;
  border-radius: 10px;
  border-width: 1px;
  background-color: #FFFFFFF;
  width: 99px;
  height: 40px;
  border-color: #3182ce;
`;

const shadows = [
  {
    shadowColor: "black",
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
];

function ConfirmationCheckBoxComponent({
  caseFileActions,
  caseId,
  confirmMessage = "Yes, I want to delete",
  endProcedure,
  message = "",
  onAction = () => {},
  onCancel = () => {},
  onEndTime,
  procedureEndTime,
  setProcedureEndTimeRdx,
  time,
  titleText = "Confirm Action",
}) {
  const theme = useTheme();

  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  let actions = [
    {
      id: 1,
      name: "Consumables updated",
      time: "",
    },
    {
      id: 2,
      name: "Equipment used updated",
      time: "",
      isChecked: false,
    },
    {
      id: 3,
      name: "Procedure End Time",
      time: time,
      isChecked: false,
    },
  ];

  const [actionsData, setActionsData] = useState(actions);

  const onCheckBoxPress = () => {
    setIsChecked(!isChecked);
  };

  const onCheckBoxPress1 = (index) => {
    if (index == 0) {
      setIsChecked1(!isChecked1);
    }
    if (index == 1) {
      setIsChecked2(!isChecked2);
    }
    if (index == 2) {
      setIsChecked3(!isChecked3);
    }
  };

  const onTimeUpdate = (dateTime) => {
    let newTime = moment(dateTime);
    console.log({ newTime, caseId });
    setProcedureEndTimeRdx(newTime, caseId);
    onEndTime(newTime);
  };

  const typeDecipher = () => {
    return (
      <>
        <MessageWrapper>
          <MessageContainer theme={theme}>
            <ModalText
              theme={theme}
              color="--color-gray-700"
              font="--confirm-message"
            >
              {message}
            </ModalText>

            {!caseFileActions ? (
              <View style={styles.rowContianer}>
                <View style={styles.sideBox} />

                <View style={styles.centerCheckBox}>
                  <CheckBoxComponent
                    isCheck={isChecked}
                    onPress={onCheckBoxPress}
                  />
                </View>
                <View style={styles.centerContent}>
                  <Text>{confirmMessage}</Text>
                </View>
              </View>
            ) : (
              <>
                {actionsData.map((message, index) => {
                  return (
                    <View style={styles.rowContianer}>
                      <View style={styles.sideBox} />

                      {index == 0 && (
                        <View style={styles.centerCheckBox}>
                          <CheckBoxComponent
                            isCheck={isChecked1}
                            onPress={() => onCheckBoxPress1(index)}
                          />
                        </View>
                      )}

                      {index == 1 && (
                        <View style={styles.centerCheckBox}>
                          <CheckBoxComponent
                            isCheck={isChecked2}
                            onPress={() => onCheckBoxPress1(index)}
                          />
                        </View>
                      )}

                      {index == 2 && (
                        <View style={styles.centerCheckBox}>
                          <CheckBoxComponent
                            isCheck={isChecked3}
                            onPress={() => onCheckBoxPress1(index)}
                          />
                        </View>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10,
                        }}
                      >
                        <Text>{message.name}</Text>
                        {message.time != "" && (
                          <View style={styles.inputWrapper}>
                            <DateInputField
                              onDateChange={(data) => onTimeUpdate(data)}
                              value={procedureEndTime[caseId]}
                              mode={"time"}
                              format={"hh:mm A"}
                              onClear={() => {
                                setProcedureEndTimeRdx(undefined, caseId);
                              }}
                              placeholder="HH:MM"
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </MessageContainer>
        </MessageWrapper>

        <ButtonView theme={theme}>
          <CancelButtonContainer
            onPress={onCancel}
            theme={theme}
            background="--color-gray-300"
          >
            <ModalText
              theme={theme}
              textColor="--color-blue-600"
              font="--text-base-bold"
            >
              CANCEL
            </ModalText>
          </CancelButtonContainer>
          {isChecked || (isChecked1 && isChecked2 && isChecked3) ? (
            <ButtonContainer
              onPress={
                endProcedure
                  ? () => onAction(procedureEndTime[caseId])
                  : onAction
              }
              theme={theme}
              background="--color-blue-600"
            >
              <ModalText
                theme={theme}
                textColor="--default-shade-white"
                font="--text-base-bold"
              >
                CONFIRM
              </ModalText>
            </ButtonContainer>
          ) : (
            <ButtonContainer
              onPress={() => {}}
              theme={theme}
              background="--color-gray-300"
            >
              <ModalText
                theme={theme}
                textColor="--default-shade-white"
                font="--text-base-bold"
              >
                CONFIRM
              </ModalText>
            </ButtonContainer>
          )}
        </ButtonView>
      </>
    );
  };

  //add a wrapper for header

  return (
    <MultipleShadowsContainer shadows={shadows}>
      <ModalWrapper
        theme={theme}
        style={{ height: !caseFileActions ? 250 : 400 }}
      >
        <ModalContainer>
          <HeaderWrapper theme={theme}>
            <HeadingContainer theme={theme}>
              <ModalText theme={theme}>{titleText}</ModalText>
              <ClearIconContainer>
                <IconButton Icon={<ClearIcon />} onPress={onCancel} />
              </ClearIconContainer>
            </HeadingContainer>
          </HeaderWrapper>
          {typeDecipher()}
        </ModalContainer>
      </ModalWrapper>
    </MultipleShadowsContainer>
  );
}

const styles = StyleSheet.create({
  rowContianer: {
    flexDirection: "row",
    backgroundColor: "#FFFAF0",
    width: 392,
    height: 48,
    marginTop: 20,
    padding: 5,
  },

  inputWrapper: {
    width: "52%",
    flexDirection: "row",
    marginLeft: 15,
  },

  centerContent: {
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  centerCheckBox: {
    alignSelf: "center",
  },
  sideBox: {
    backgroundColor: "#D69E2E",
    width: 5,
  },
});

const mapStateToProps = (state) => ({
  procedureEndTime: state.casePage.procedureEndTime,
});
const mapDispatchToProps = { setProcedureEndTimeRdx };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationCheckBoxComponent);
