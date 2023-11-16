import React, { useState, useEffect } from "react";
import { View } from "react-native";
import _, { isEmpty } from "lodash";
import { useModal } from "react-native-modalfy";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import ListItem from "../../components/common/List/ListItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ActionItem from "../../components/common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";

import { selectAll, checkboxItemPress } from "../../helpers/caseFilesHelpers";

import DataItem from "../../components/common/List/DataItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import WasteIcon from "../../../assets/svg/wasteIcon";
import Button from "../../components/common/Buttons/Button";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import { getPatients, deletePatient } from "../../api/network";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
const ButtonContainer = styled.View`
    width: 105px;
    height: 26px;
    border: 1px solid #a0aec0;
    box-sizing: border-box;
    border-radius: 6px;
    padding-top: 2px;
`;

const listHeaders = [
    {
        name: "Name",
        aligment: "flex-start",
        flex: 2,
    },
    {
        name: "Gender",
        aligment: "flex-end",
        flex: 1,
    },
    {
        name: "Contact #",
        aligment: "flex-start",
        flex: 1,
    },
    {
        name: "TRN",
        aligment: "flex-start",
        flex: 1,
    },
];

function PatientFiles(props) {
    const modal = useModal();
    const theme = useTheme();

    const { navigation } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPatientds, setSelectedPatientIds] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [patientData, setPatientData] = useState([]);

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchPatientFiles(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchPatientFiles, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

    const onSearchChange = (input) => {
        setSearchValue(input);
    };

    const handleOnSelectAll = () => {
        const updatedPatientData = selectAll(patientData, selectedPatientds);
        setSelectedPatientIds(updatedPatientData);
    };

    const fetchPatientFiles = async (pagePosition) => {
        setIsFetchingData(true);
        return getPatients(searchValue, RECORDS_PER_PAGE_MAIN, pagePosition)
            .then((patientResults) => {
                const { data = [] } = patientResults;
                setPatientData(data);
                return patientResults;
            })
            .finally(() => {
                setIsFetchingData(false);
            });
    };
    const patientItem = (item) => {
        const { firstName, middleName, surname, gender, contactInfo, trn } =
            item || {};

        const genderLetter = gender === "Male" ? "M" : "F";

        const phoneNumber = contactInfo?.phones[0]?.phone || "--";
        return (
            <>
                <RightBorderDataItem
                    text={`${firstName} ${
                        middleName === undefined ? "" : middleName
                    } ${surname}`}
                    flex={2}
                />
                <DataItem
                    text={genderLetter}
                    color="--color-blue-700"
                    flex={0.7}
                    align="flex-end"
                />
                <DataItem
                    text={phoneNumber}
                    color="--color-blue-700"
                    flex={1.2}
                    textAlign="center"
                />
                <DataItem text={trn} color="--color-blue-700" flex={1} />
            </>
        );
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        if (item !== null) {
            navigation.navigate("patient", {
                initial: false,
                patientPage: true,
                patientId: item._id,
                isEdit: isOpenEditable,
            });
        }
    };

    const renderFn = (item) => {
        return (
            <ListItem
                hasCheckBox={true}
                isChecked={selectedPatientds.includes(item._id || item.id)}
                itemView={patientItem(item)}
                onItemPress={handleOnItemPress(item, false)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
            />
        );
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

    const handleDataRefresh = () => {
        fetchPatientFiles();
    };

    const removePatientsCall = (data) => {
        deletePatient(data)
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals("ConfirmationModal");
                                setTimeout(() => {
                                    modal.closeModals("ActionContainerModal");
                                    handleDataRefresh();
                                }, 200);
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });

                setSelectedPatientIds([]);
            })
            .catch((error) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
                console.error("Failed to remove patient file: ", error);
            })
            .finally((_) => {
                setFloatingAction(false);
            });
    };

    const openDeletionConfirm = (data) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal");
                        removePatientsCall(data);
                    }}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const handleRemovePatient = async () => {
        openDeletionConfirm({ patientIds: [...selectedPatientds] });
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id, id } = item; // account for both drafts and created cases.
        const updateditems = checkboxItemPress(_id || id, selectedPatientds);
        setSelectedPatientIds(updateditems);
    };

    const openCreatePatient = () => {
        modal.closeModals("ActionContainerModal");
        navigation.navigate("PatientCreation", {
            initial: false,
            draftItem: null,
            intialPage: "Patient",
        });
    };

    const handleAddProcedure = () => {
        modal.closeModals("ActionContainerModal");
        navigation.navigate("AddProcedure", {
            initial: false,
            draftItem: null,
            patientId: selectedPatientds[0],
        });
    };

    const getFabActions = () => {
        const actionArray = [];
        const disabled = !!isEmpty(selectedPatientds);
        const enabled = selectedPatientds.length === 1;
        const deleteAction = (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={disabled}
                    onLongPress={() => handleRemovePatient()}
                >
                    <ActionItem
                        title="Hold to Delete Patient"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    disabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        touchable={false}
                        disabled={disabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createPatient = (
            <ActionItem
                title=" Create Patient"
                icon={<AddIcon />}
                onPress={openCreatePatient}
            />
        );

        const addProcedure = (
            <ActionItem
                title="Add Procedure"
                icon={
                    <AddIcon
                        strokeColor={
                            !enabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--color-green-700"]
                        }
                    />
                }
                disabled={!enabled}
                onPress={handleAddProcedure}
            />
        );

        actionArray.push(addProcedure);
        actionArray.push(createPatient);
        actionArray.push(deleteAction);

        return (
            <ActionContainer
                floatingActions={actionArray}
                title="PATIENT ACTIONS"
            />
        );
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "PATIENT ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    return (
        <PaginatedSection
            changeText={onSearchChange}
            currentPage={currentPage}
            fetchSectionDataCb={fetchPatientFiles}
            hasActionButton={true}
            hasActions={true}
            hasPaginator={true}
            inputText={searchValue}
            isDisabled={isFloatingActionDisabled}
            isFetchingData={isFetchingData}
            itemsSelected={selectedPatientds}
            listData={patientData}
            listHeaders={listHeaders}
            listItemFormat={renderFn}
            onSelectAll={handleOnSelectAll}
            placeholderText="Search Patient by First Name, Surname ,Contact Number or T.R.N"
            routeName="Patients"
            setCurrentPage={setCurrentPage}
            toggleActionButton={toggleActionButton}
            TopButton={() => (
                <ButtonContainer theme={theme}>
                    <Button
                        title="Archives"
                        color={theme.colors["--color-gray-500"]}
                        font="--text-sm-regular"
                    />
                </ButtonContainer>
            )}
        />
    );
}

export default PatientFiles;
