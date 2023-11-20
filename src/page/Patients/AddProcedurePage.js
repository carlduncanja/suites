import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";

import ProgressContainer from "../../components/common/Progress/ProgressContainer";
import ProcedureStep from "../../components/CaseFiles/ProceduresDialogTabs/ProcedureStep";
import StaffStep from "../../components/CaseFiles/StaffDialogTabs/StaffStep";
import {
    isValidCaseProcedureAppointment,
    getCaseFileByPatientId,
    addProcedureToPatientCall,
} from "../../api/network";

import ProcedureIcon from "../../../assets/svg/newCaseProcedure";
import PageButton from "../../components/common/Page/PageButton";
import Snackbar from "react-native-paper/src/components/Snackbar";
import ChevronLeft from "../../../assets/svg/ChevronLeft";
import ChevronRight from "../../../assets/svg/ChevronRight";
import MedicalIcon from "../../../assets/svg/newCaseMedical";

const PageWrapper = styled.View`
    flex: 1;
    display: flex;
    margin: 0;
    background-color: ${({ theme }) => theme.colors["--default-shade-white"]};
`;
const PageContentWrapper = styled.View`
    flex: 1;
`;
const HeaderWrapper = styled.View`
    display: flex;
    height: 47px;
    width: 100%;
    justify-content: center;
    padding-left: ${({ theme }) => theme.space["--space-24"]};
    padding-right: ${({ theme }) => theme.space["--space-24"]};
`;

const HeaderContainer = styled.View`
    /* flex: 1; */
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const PageTitle = styled.Text(({ theme }) => ({
    ...theme.font["--text-xl-medium"],
    color: theme.colors["--company"],
}));

const FooterWrapper = styled.View`
    bottom: 0;
    border: 1px solid ${({ theme }) => theme.colors["--color-gray-300"]};
    border-bottom-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    padding-top: ${({ theme }) => theme.space["--space-24"]};
    padding-bottom: ${({ theme }) => theme.space["--space-24"]};
    margin-left: ${({ theme }) => theme.space["--space-24"]};
    margin-right: ${({ theme }) => theme.space["--space-24"]};
`;

const FooterContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const FooterButtonContainer = styled.View`
    width: 145px;
    height: 48px;
`;

const CASE_PROCEDURE_TABS = {
    MEDICAL_STAFF: 0,
    PROCEDURES: 1,
    FINAL: 2,
};

function AddProcedurePage({
    navigation,
    addCaseFile,
    saveDraft,
    removeDraft,
    route,
    pageTitle,
}) {
    const theme = useTheme();
    const modal = useModal();
    const { draftItem } = route.params || {};
    const { patientId } = route.params;

    const [wizard, setWizard] = useState([
        {
            step: {
                name: "Medical Team",
                selectedIcon: <MedicalIcon fillColor="#E53E3E" />,
                disabledIcon: <MedicalIcon fillColor="#CBD5E0" />,
                progress: 0,
            },
            tabs: ["Assignment 1"],
            tabName: "Assignment",
        },
        {
            step: {
                name: "Procedure",
                selectedIcon: (
                    <ProcedureIcon fillColor="#319795" strokeColor="#81E6D9" />
                ),
                disabledIcon: (
                    <ProcedureIcon fillColor="#A0AEC0" strokeColor="#CCD6E0" />
                ),
                progress: 0,
            },
            tabName: "Procedure",
            tabs: ["Procedure 1"],
            onAdd: () => {
                // add new procedure
                const updatedWizard = [...wizard];
                const { tabs } = updatedWizard[1];
                const assignment = `Procedure ${tabs.length + 1}`;
                wizard[2].tabs.push();
                updatedWizard[1].tabs.push(assignment);
                setWizard(updatedWizard);
            },
        },
    ]);

    const steps = [...wizard.map((step) => step.step)];

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [selectedStep, setSelectedStep] = useState(steps[0].name);
    const [tabs, setTabs] = useState(wizard[0].tabs);
    const [positiveText, setPositiveText] = useState("NEXT");

    const [completedSteps, setCompletedSteps] = useState([]);
    const [completedTabs, setCompletedTabs] = useState([]);
    const [caseCreated, setCaseCreated] = useState(false);

    const [caseProceduresInfo, setCaseProceduresInfo] = useState(
        !isEmpty(draftItem) && draftItem.procedures?.length
            ? draftItem.procedures
            : []
    );
    const [procedureErrors, setProcedureErrors] = useState([]);
    const [patientFields, setPatientFields] = useState(
        !isEmpty(draftItem) ? draftItem.patient : {}
    );
    const [patientData, setPatientData] = useState({});

    const [staffInfo, setStaffInfo] = useState(
        !isEmpty(draftItem) && draftItem.staff?.length ? draftItem.staff : []
    );
    const [staffErrors, setStaffErrors] = useState([]);
    const [loadDraft, setLoadDraft] = useState(false);

    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: "",
    });

    const onClose = () => {
        navigation.navigate("Patients");
    };

    const clearSnackBar = () => {
        setSnackbar({
            visible: false,
            message: "",
        });
    };

    useEffect(() => {
        //used to get patient data
        fetchPatientCases(patientId);
    }, []);

    const fetchPatientCases = (id) => {
        getCaseFileByPatientId(id)
            .then((data) => {
                setPatientData(data);
            })
            .catch((error) => {
                console.log("Failed to get case", error);
            });
    };

    const handleStepPress = (name) => {
        if (completedSteps.includes(name)) {
            let updatedSteps = [...completedSteps];

            const selectedIndex = updatedSteps.findIndex(
                (step) => step === name
            );
            const stepsIndex = steps.findIndex((step) => step.name === name);

            const stepObj = wizard.filter((item) => item.step.name === name);
            const stepTabs = stepObj[0].tabs;
            updatedSteps = updatedSteps.slice(0, selectedIndex);

            if (stepsIndex !== steps.length - 1) {
                setPositiveText("NEXT");
            }

            setSelectedIndex(stepsIndex);
            setSelectedStep(name);
            setCompletedSteps(updatedSteps);
            setTabs(stepTabs);
            setCompletedTabs([]);
            setSelectedTabIndex(0);
        }
    };

    const handleTabPress = (name) => {
        if (completedTabs.includes(name)) {
            let newTabs = [...tabs];
            if (selectedIndex === 1) {
                tabs.length === 3
                    ? (newTabs = newTabs)
                    : (newTabs = [...newTabs, `Assignment ${tabs.length + 1}`]);
            }
            const tabsCopy = completedTabs;
            const completedFilterTabIndex = completedTabs.findIndex(
                (tab) => tab === name
            );
            const selectedFilterTabIndex = tabs.findIndex(
                (tab) => tab === name
            );
            const updatedTabs = tabsCopy.slice(0, completedFilterTabIndex);

            setSelectedTabIndex(selectedFilterTabIndex);
            setCompletedTabs(updatedTabs);
            setTabs(newTabs);
        }
    };

    const handleOnComplete = () => {
        staffInfo[0].tag = "Lead Surgeon";

        let staffBreakDown = {
            leadPhysician: staffInfo[0],
            nurses: [],
            physicians: [],
        };
        let appiontmentInfo = {
            duration: caseProceduresInfo[0].duration,
            location: caseProceduresInfo[0].location._id,
            patient: patientId,
            procedure: caseProceduresInfo[0].procedure._id,
            roleKeys: staffInfo,
            staff: staffBreakDown,
            startTime: caseProceduresInfo[0].startTime,
            subject: staffInfo[0].name,
        };

        addProcedureToPatientCall(appiontmentInfo)
            .then((data) => {
                navigation.replace("patient", {
                    patientId: patientId,
                });
            })
            .catch((error) => {
                Alert.alert(
                    "Sorry",
                    "Something went wrong when adding procedure."
                );
            });
    };

    const getTabContent = () => {
        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PROCEDURES:
                return (
                    <ProcedureStep
                        selectedTabIndex={selectedTabIndex}
                        onProcedureUpdate={onProcedureUpdate}
                        procedures={caseProceduresInfo}
                        errors={procedureErrors}
                        onErrorUpdate={(value) => setProcedureErrors(value)}
                    />
                );

            case CASE_PROCEDURE_TABS.FINAL:
                return (
                    <View
                        style={{ flex: 1, alignSelf: "center", marginTop: 50 }}
                    >
                        <View style={styles.textBox}>
                            <Text style={styles.text}>
                                Tap{" "}
                                <Text style={{ color: "#3182CE" }}>
                                    CONTINUE
                                </Text>{" "}
                                to finish filling out your new Case File
                            </Text>
                        </View>
                    </View>
                );

            case CASE_PROCEDURE_TABS.MEDICAL_STAFF:
                return (
                    <StaffStep
                        selectedTabIndex={selectedTabIndex}
                        onStaffChange={onStaffUpdate}
                        staffs={staffInfo}
                        tabs={tabs}
                        completedTabs={completedTabs}
                        errors={staffErrors}
                        onErrorsUpdate={(value) => setStaffErrors(value)}
                    />
                );
            default:
                break;
        }
    };

    const onProcedureUpdate = (value) => {
        setCaseProceduresInfo([...value]);
    };

    const onStaffUpdate = (value) => {
        setStaffInfo(value);
    };

    const getTabsProgress = () => ((selectedTabIndex + 1) / tabs.length) * 100;

    const onPreviousButtonPress = () => {
        if (selectedIndex === 0 && selectedTabIndex === 0) {
        } else if (selectedTabIndex !== 0) {
            const updatedTabIndex = selectedTabIndex - 1;
            const tabs = [...completedTabs];
            tabs.pop();
            setCompletedTabs(tabs);

            setSelectedTabIndex(updatedTabIndex);
        } else {
            const updatedIndex = selectedIndex - 1;
            const steps = [...completedSteps];
            steps.pop();
            setCompletedSteps(steps);
            setSelectedIndex(updatedIndex);
            setSelectedStep(steps[updatedIndex]?.name);

            setSelectedTabIndex(0);
            setCompletedTabs([]);
        }
    };

    const onPositiveButtonPress = async () => {
        const isFinalTab = selectedTabIndex === tabs.length - 1;

        const currentTab =
            wizard[selectedIndex] &&
            wizard[selectedIndex].tabs[selectedTabIndex];

        let isValid = true;

        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PROCEDURES: {
                isValid = await validateProcedureInfo(selectedTabIndex);
                break;
            }

            case CASE_PROCEDURE_TABS.MEDICAL_STAFF: {
                isValid = validateStaffInfo(selectedTabIndex);
                break;
            }

            case CASE_PROCEDURE_TABS.FINAL: {
                break;
            }
        }

        if (!isValid) {
            return;
        }

        if (selectedIndex === 2) {
            // we are on the final tab
            handleOnComplete();
        } else if (selectedTabIndex !== tabs.length - 1) {
            const updatedTabIndex = selectedTabIndex + 1;
            setCompletedTabs([...completedTabs, tabs[selectedTabIndex]]);
            setSelectedTabIndex(updatedTabIndex);
        } else if (
            selectedIndex === steps.length - 1 &&
            selectedTabIndex === tabs.length - 1
        ) {
            setPositiveText("CONTINUE");
            setCompletedSteps([...completedSteps, steps[selectedIndex].name]);
            setSelectedIndex(2);
            setSelectedTabIndex(0);
            setTabs([
                `${patientFields.firstName} ${patientFields.surname} Case Created`,
            ]);
        } else {
            const updatedIndex = selectedIndex + 1;
            setCompletedSteps([...completedSteps, steps[selectedIndex].name]);
            setSelectedIndex(updatedIndex);
            setSelectedStep(steps[updatedIndex].name);

            const { tabs } = wizard[updatedIndex];
            setTabs(tabs);
            setSelectedTabIndex(0);
            setCompletedTabs([]);
        }
    };

    const validateProcedureInfo = async (procedureIndex) => {
        let isValid = true;
        const requiredParams = [
            "date",
            "startTime",
            "location",
            "procedure",
            "duration",
        ];

        const procedureInfo = caseProceduresInfo[procedureIndex] || {};

        const updateErrors = [...procedureErrors];
        const errorObj = updateErrors[procedureIndex] || {};


        for (const requiredParam of requiredParams) {
            if (!procedureInfo[requiredParam]) {
                isValid = false;
                errorObj[requiredParam] = "Please enter a value";
                updateErrors[+procedureIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+procedureIndex] = errorObj;
            }
        }

        setProcedureErrors(updateErrors);

        if (!isValid) return isValid;

        // TODO validate time.
        const { procedure, location, startTime, duration } = procedureInfo;
        isValid = await validateProcedureAsync(
            procedure._id,
            location._id,
            startTime,
            duration
        );

        return isValid;
    };

    const validateStaffInfo = (staffIndex) => {
        let isValid = true;
        const requiredParams = ["name"];

        const staff = staffInfo[staffIndex] || {};

        const updateErrors = [...staffErrors];
        const errorObj = updateErrors[staffIndex] || {};


        for (const requiredParam of requiredParams) {
            if (!staff[requiredParam]) {
                isValid = false;
                errorObj[requiredParam] = "Please enter a value";
                updateErrors[+staffIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+staffIndex] = errorObj;
            }
        }

        setStaffErrors(updateErrors);

        return isValid;
    };

    const validateProcedureAsync = (procedure, location, startTime, duration) =>
        isValidCaseProcedureAppointment(
            procedure,
            location,
            startTime,
            duration
        )
            .then((results) => {
                const { errors = [], isValid } = results;

                const messages = errors.map((item) => item.message);

                if (messages.length) {
                    const message = messages.join("\n");
                    setSnackbar({
                        visible: true,
                        message,
                    });
                }

                return isValid;
            })
            .catch(( ) => {
                setSnackbar({
                    visible: true,
                    message: "Something went wrong",
                });
                return false;
            });

    // ### Return state
    return (
        <PageWrapper>
            <HeaderWrapper theme={theme}>
                <HeaderContainer theme={theme}>
                    <PageTitle>{"Add Procedure"}</PageTitle>
                    <TouchableOpacity
                        style={[
                            styles.closeButton,
                            {
                                backgroundColor:
                                    theme.colors["--color-blue-500"],
                            },
                        ]}
                        onPress={onClose}
                    >
                        <Text style={{ color: "white" }}>Close</Text>
                    </TouchableOpacity>
                </HeaderContainer>
            </HeaderWrapper>

            <View style={{ height: 140 }}>
                <ProgressContainer
                    steps={steps}
                    handleStepPress={handleStepPress}
                    selectedIndex={selectedIndex}
                    completedSteps={completedSteps}
                    currentProgress={getTabsProgress()}
                />
            </View>

            <PageContentWrapper>
                <View style={{ flex: 1 }}>{getTabContent()}</View>
            </PageContentWrapper>

            <FooterWrapper>
                <FooterContainer>
                    <FooterButtonContainer>
                        <PageButton
                            text="PREVIOUS"
                            backgroundColor={theme.colors["--color-gray-200"]}
                            fontColor={theme.colors["--color-gray-600"]}
                            IconLeft={
                                <ChevronLeft
                                    strokeColor={
                                        theme.colors["--color-gray-600"]
                                    }
                                />
                            }
                            onPress={onPreviousButtonPress}
                        />
                    </FooterButtonContainer>

                    <FooterButtonContainer>
                        <PageButton
                            text={positiveText}
                            backgroundColor={theme.colors["--color-blue-500"]}
                            fontColor={theme.colors["--default-shade-white"]}
                            IconRight={
                                <ChevronRight
                                    strokeColor={
                                        theme.colors["--default-shade-white"]
                                    }
                                />
                            }
                            onPress={onPositiveButtonPress}
                        />
                    </FooterButtonContainer>
                </FooterContainer>
            </FooterWrapper>

            <Snackbar
                visible={snackbar?.visible}
                onDismiss={clearSnackBar}
                duration={Snackbar.DURATION_MEDIUM}
                theme={{
                    colors: {
                        accent: theme.colors["--color-red-700"],
                        surface: theme.colors["--color-red-700"],
                    },
                }}
                style={{
                    backgroundColor: theme.colors["--color-red-200"],
                    color: theme.colors["--color-red-700"],
                }}
                action={{
                    label: "X",
                    onPress: clearSnackBar,
                }}
            >
                {snackbar?.message || "Something went wrong"}
            </Snackbar>
        </PageWrapper>
    );
}

const mapStateToProps = (state) => {};
const mapDispatcherToProp = {};

export default connect(mapStateToProps, mapDispatcherToProp)(AddProcedurePage);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    footerButton: {
        height: 57,
        width: "100%",
        bottom: 0,
        flexDirection: "row",
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: "#E3E8EF",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
    },
    closeButton: {
        borderRadius: 6,
        padding: 4,
        alignItems: "center",
        width: 64,
        height: 26,
    },
    footerText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "bold",
        color: "#3182CE",
    },
    headingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 47,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E3E8EF",
    },
    textBox: {
        borderWidth: 1,
        borderColor: "#CCD6E0",
        borderRadius: 8,
        height: 64,
        width: 304,
        padding: 12,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#4E5664",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
});
