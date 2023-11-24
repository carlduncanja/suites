import { useTheme } from "emotion-theming";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native-animatable";
import { useModal } from "react-native-modalfy";
import EditLockIcon from "../../../../assets/svg/editLockedIcon";
import SmallLeftTriangle from "../../../../assets/svg/smallLeftTriangle"; 
import styled from '@emotion/native';
import {
    endProcedure
} from "../../../api/network";
import { PageContext } from "../../../contexts/PageContext";
import ConfirmationCheckBoxComponent from "../../ConfirmationCheckBoxComponent";
import ConfirmationComponent from "../../ConfirmationComponent";
import Button from "../Buttons/Button";
import MultipleShadowsContainer from "../MultipleShadowContainer";

function PageHeader({
    onBack,
    caseId,
    timeStamp,
    status,
    appointmentObj,
    selectedTab,
    isArchive: isEditDisabled = false,
    headerChildren = [],
    separator = null,
    isEditable,
    editMessage = "now in edit mode",
}) {
    const theme = useTheme();

    const { pageState, setPageState } = useContext(PageContext);
    const [updated, setUpdated] = useState(false);
    const [endTime, setEndTime] = useState(new moment());

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (status == "In Progress") {
            setStarted(true);
        }
    }, [status]);

    const onEditPress = () => {
       

        setPageState({
            ...pageState,
            isEditMode: !pageState.isEditMode,
        });
    };

    const modal = useModal();

    const hanadleErrorModal = () => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    textAlign="center"
                    textPadding={15}
                    message="Ending this procedure could not be completed ,please ensure nurses storage is up to date with consumable and try again"
                    secondaryMessage="please ensure nurses storage is up to date with consumable and try again"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const endProcedureCall = (data) => {
        let appiontmentUpdateData = {
            appiontmentId: appointmentObj._id,
            description: appointmentObj.description,
            subject: appointmentObj.subject,
            startTime: appointmentObj.startTime,
            endTime: data,
            title: appointmentObj.title,
            location: appointmentObj.appLocation,
        };
        endProcedure(caseId, appiontmentUpdateData)
            .then(() => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            message="Nurses storage updated with consumables and may contain negative stock values. Please update storage location as soon as possible."
                            onAction={() => {
                                modal.closeModals("ConfirmationModal");
                                setTimeout(() => {
                                    modal.closeModals("ActionContainerModal");
                                }, 200);
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });

                setUpdated(true);
            })
            .catch(() => {
                
                hanadleErrorModal();
            });
    };

    const endConfirm = () => {
        setEndTime(new moment());
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={(data) => {
                        endProcedureCall(data);
                        modal.closeModals("ConfirmationModal");
                    }}
                    timeStamp={timeStamp}
                    caseFileActions={true}
                    time={new moment()}
                    onEndTime={(data) => {
                        setEndTime(data);
                    }}
                    endProcedure={true}
                    message="Please confirm the following updates"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const { isEditMode, isReview, locked, editMsg} = pageState;

    const getButtonProps = () => {
        const editModeProps = {
            backgroundColor: theme.colors["--default-shade-white"],
            color: isReview
                ? theme.colors["--color-gray-600"]
                : theme.colors["--accent-button"],
            title: "Done",
        };

        const defaultProps = {
            backgroundColor: theme.colors["--accent-button"],
            color: theme.colors["--default-shade-white"],
            title: "Edit",
        };

        const lockedProps = {
            backgroundColor: theme.colors["--color-gray-400"],
            color: theme.colors["--color-gray-600"],
            title: "Edit",
        };

        const editDisabled = {
            backgroundColor: theme.colors["--default-shade-white"],
            color: theme.colors["--color-gray-500"],
            title: "Edit",
        };

        if (locked) {
            return lockedProps;
        }
        if (isEditMode) {
            return editModeProps;
        }
        if (isEditDisabled) {
            return editDisabled;
        }
        return defaultProps;
    };

    const getEditBtnBackground = () => {
        const defaultColor = theme.colors["--accent-button"];
        const editMode = theme.colors["--default-shade-white"];
        const lockedBackground = theme.colors["--color-gray-400"];
        const disabled = theme.colors["--default-shade-white"];

        if (locked) {
            return lockedBackground;
        }
        if (isEditMode) {
            return editMode;
        }
        if (isEditDisabled) {
            return disabled;
        }
        return defaultColor;
    };

    const editColor = isReview
        ? theme.colors["--color-gray-600"]
        : theme.colors["--accent-button"];

    return (
        <MultipleShadowsContainer
            shadows={shadows}
            hasShadow={isEditMode ? true : false}
        >
            <HeaderWrapper
                theme={theme}
                isEditMode={isEditMode}
                isEditBackground={editColor}
            >
                <HeaderContainer theme={theme}>
                    {!isEditMode && (
                        <IconContainer theme={theme} onPress={onBack}>
                            <SmallLeftTriangle />
                        </IconContainer>
                    )}

                    {!isEditMode && (
                        <TextContainer>
                            {headerChildren.map((item, index) => {
                                const lastItem =
                                    index === headerChildren.length - 1;

                                return lastItem ? (
                                    <HeaderText
                                        key={index}
                                        theme={theme}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item}
                                    </HeaderText>
                                ) : (
                                    <React.Fragment key={index}>
                                        <SpecialText theme={theme}>
                                            {" "}
                                            {item}
                                        </SpecialText>
                                        <View
                                            style={{
                                                marginLeft: 15,
                                                marginRight: 10,
                                            }}
                                        >
                                            {separator}
                                        </View>
                                    </React.Fragment>
                                );
                            })}
                        </TextContainer>
                    )}

                    {isEditMode && (
                        <EditModeContainer theme={theme} isReview={isReview}>
                            {editMsg || editMessage}
                        </EditModeContainer>
                    )}

                    {((!isEditMode &&
                        timeStamp &&
                        selectedTab === "Consumables") ||
                        (started &&
                            selectedTab === "Consumables" &&
                            !isEditMode)) &&
                        !updated && (
                            <EditButtonWrapper style={{ width: 150 }}>
                                <EditButtonContainer
                                    theme={theme}
                                    backgroundColor={getEditBtnBackground()}
                                >
                                    <Button
                                        backgroundColor={
                                            theme.colors["--accent-button"]
                                        }
                                        color={
                                            theme.colors[
                                                "--default-shade-white"
                                            ]
                                        }
                                        title="End Procedure"
                                        buttonPress={endConfirm}
                                        font={theme.font["--text-sm-medium"]}
                                    />
                                </EditButtonContainer>
                            </EditButtonWrapper>
                        )}

                    {isEditable && !updated && (
                        <EditButtonWrapper theme={theme}>
                            <EditButtonContainer
                                theme={theme}
                                backgroundColor={getEditBtnBackground()}
                                hasBorder={isEditDisabled}
                            >
                                <Button
                                    {...getButtonProps()}
                                    buttonPress={onEditPress}
                                    disabled={!isEditDisabled ? locked : true}
                                    font={theme.font["--text-sm-medium"]}
                                    Icon={locked && <EditLockIcon />}
                                />
                            </EditButtonContainer>
                        </EditButtonWrapper>
                    )}
                </HeaderContainer>
            </HeaderWrapper>
        </MultipleShadowsContainer>
    );
}

const HeaderWrapper = styled.View(
    ({ isEditMode, theme, isEditBackground }) => ({
        display: "flex",
        height: 55,
        backgroundColor: isEditMode
            ? isEditBackground
            : theme.colors["--default-shade-white"],
    })
);

const HeaderContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`;

const TextContainer = styled.View`
    flex: 1;
    margin-right: ${({ theme }) => theme.space["--space-14"]};
    margin-left: ${({ theme }) => theme.space["--space-14"]};
    flex-direction: row;
    align-items: center;
`;

const HeaderText = styled.Text`
    font: ${({ theme }) => theme.font["--text-xl-medium"]};
    color: ${({ theme }) => theme.colors["--accent-button"]};
    flex: 1;
`;

const IconContainer = styled.TouchableOpacity`
    margin-left: 10px;
`;

const SpecialText = styled.Text`
    margin-left: 8px;
    font: ${({ theme }) => theme.font["--text-sm-medium"]};
    color: ${({ theme }) => theme.colors["--company"]};
`;

const EditButtonWrapper = styled.View`
    height: 26px;
    width: 56px;
    margin-right: 10px;
`;

const EditButtonContainer = styled.View`
    height: 100%;
    //width: 100%;
    flex-direction: row;
    border-radius: 6px;
    padding: 4px;

    background-color: ${({ backgroundColor }) => backgroundColor};
    border: ${({ theme, hasBorder }) =>
        hasBorder && `1px solid ${theme.colors["--color-gray-300"]}`};
    align-items: center;
    justify-content: center;
`;


const EditModeContainer = styled.Text(({ theme, isReview }) => ({
    ...theme.font["--text-base-medium"],
    color: theme.colors["--color-white"],
    alignItems: "center",
    textAlign: "center",
}));

const shadows = [
    {
        shadowColor: "black",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    {
        shadowColor: "black",
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
];

export default PageHeader;
