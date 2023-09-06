import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import styled from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Snackbar from 'react-native-paper/src/components/Snackbar';
import { createCaseFile, isValidCaseProcedureAppointment } from '../../api/network';
import DialogTabs from '../../components/common/Dialog/DialogTabs';
import PatientIcon from '../../../assets/svg/newCasePatient';
import MedicalIcon from '../../../assets/svg/newCaseMedical';
import ProcedureIcon from '../../../assets/svg/newCaseProcedure';
import PatientStep from '../../components/CaseFiles/PatientDialogTabs/PatientStep';
import StaffStep from '../../components/CaseFiles/StaffDialogTabs/StaffStep';
import ProcedureStep from '../../components/CaseFiles/ProceduresDialogTabs/ProcedureStep';
import CompleteCreateCase from '../../components/CaseFiles/CompleteCreateCase';
import ProgressContainer from '../../components/common/Progress/ProgressContainer';
import { addCaseFile } from '../../redux/actions/caseFilesActions';
import { removeDraft, saveDraft } from '../../redux/actions/draftActions';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import PageButton from '../../components/common/Page/PageButton';
import ChevronRight from '../../../assets/svg/ChevronRight';
import ChevronLeft from '../../../assets/svg/ChevronLeft';
import _ from 'lodash';
import LoadingComponent from "../../components/LoadingComponent";

const PATIENT_TABS = {
    DETAILS: 'Details',
    CONTACT: 'Contact',
    ADDRESS: 'Address',
    INSURANCE: 'Insurance Coverage',
};

const CASE_PROCEDURE_TABS = {
    PATIENT_DETAILS: 0,
    MEDICAL_STAFF: 1,
    PROCEDURES: 2,
    FINAL: 3,
};

const PageWrapper = styled.View`
  flex: 1;
  display: flex;
  margin: 0;
  background-color: ${({ theme }) => theme.colors['--default-shade-white']};
`;
const PageContentWrapper = styled.View`
  flex: 1;

`;
/* padding: ${({theme}) => theme.space['--space-32']} */

const HeaderWrapper = styled.View`
  display: flex;
  height: 47px;
  width: 100%;
  justify-content: center;
  padding-left: ${({ theme }) => theme.space['--space-24']};
  padding-right: ${({ theme }) => theme.space['--space-24']};

`;

const HeaderContainer = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.Text(({ theme }) => ({
    ...theme.font['--text-xl-medium'],
    color: theme.colors['--company']
}));

const FooterWrapper = styled.View`
  bottom: 0;
  border: 1px solid ${({ theme }) => theme.colors['--color-gray-300']};
  border-bottom-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  padding-top: ${({ theme }) => theme.space['--space-24']};
  padding-bottom: ${({ theme }) => theme.space['--space-24']};
  margin-left: ${({ theme }) => theme.space['--space-24']};
  margin-right: ${({ theme }) => theme.space['--space-24']};
`;

const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FooterButtonContainer = styled.View`
  width: 145px;
  height: 48px;
`;

function CreateCasePage({ navigation, addCaseFile, saveDraft, removeDraft, route, pageTitle }) {
    // ########### CONST
    const [wizard, setWizard] = useState([
        {
            step: {
                name: 'Patient',
                selectedIcon: (
                    <PatientIcon fillColor="#0CB0E7" strokeColor="#64D8FF" />
                ),
                disabledIcon: (
                    <PatientIcon fillColor="#A0AEC0" strokeColor="#CCD6E0" />
                ),
                progress: 0,
            },
            tabs: [
                PATIENT_TABS.DETAILS,
                PATIENT_TABS.CONTACT,
                PATIENT_TABS.ADDRESS,
                PATIENT_TABS.INSURANCE,
            ],
        },
        {
            step: {
                name: 'Medical Team',
                selectedIcon: <MedicalIcon fillColor="#E53E3E" />,
                disabledIcon: <MedicalIcon fillColor="#CBD5E0" />,
                progress: 0,
            },
            tabs: ['Assignment 1'],
            tabName: 'Assignment',
            onAdd: () => {
                // add new assignment
                const updatedWizard = [...wizard];
                const { tabs } = updatedWizard[1];
                if (tabs.length === 3) return;

                const assignment = `Assignment ${tabs.length + 1}`;
                // wizard[2].tabs.push()
                updatedWizard[1].tabs.push(assignment);
                setWizard(updatedWizard);
            },
        },
        {
            step: {
                name: 'Procedures',
                selectedIcon: (
                    <ProcedureIcon fillColor="#319795" strokeColor="#81E6D9" />
                ),
                disabledIcon: (
                    <ProcedureIcon fillColor="#A0AEC0" strokeColor="#CCD6E0" />
                ),
                progress: 0,
            },
            tabName: 'Procedure',
            tabs: ['Procedure 1'],
            onAdd: () => {
                // add new procedure
                const updatedWizard = [...wizard];
                const { tabs } = updatedWizard[2];
                if (tabs.length === 3) return;

                const assignment = `Procedure ${tabs.length + 1}`;
                // wizard[2].tabs.push()
                updatedWizard[2].tabs.push(assignment);
                setWizard(updatedWizard);
            },
        },
    ]);
    const theme = useTheme();
    const steps = [...wizard.map(step => step.step)];
    const modal = useModal();
    const { draftItem } = route.params || {};

    //console.log("what's in route", route.params);
    // ########### STATES

    const [patientFields, setPatientFields] = useState(!isEmpty(draftItem) ? draftItem.patient : {});
    const [patientFieldErrors, setPatientErrors] = useState({});

    const [staffInfo, setStaffInfo] = useState(!isEmpty(draftItem) && draftItem.staff?.length ? draftItem.staff : []);
    const [staffErrors, setStaffErrors] = useState([]);
    const [loadDraft, setLoadDraft] = useState(false);

    const [caseProceduresInfo, setCaseProceduresInfo] = useState(!isEmpty(draftItem) && draftItem.procedures?.length ? draftItem.procedures : []);
    const [procedureErrors, setProcedureErrors] = useState([]);

    const [positiveText, setPositiveText] = useState('NEXT');
    const [isLoading, setLoading] = useState(false);

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [selectedStep, setSelectedStep] = useState(steps[0].name);
    const [tabs, setTabs] = useState(wizard[0].tabs);

    const [completedSteps, setCompletedSteps] = useState([]);
    const [completedTabs, setCompletedTabs] = useState([]);
    const [caseCreated, setCaseCreated] = useState(false);

    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: ''
    });

    useEffect(
        () =>

            navigation.addListener('beforeRemove', (e) => {
                if (caseCreated || _.isEmpty(patientFields)) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();

                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={true}
                            onAction={() => {
                                modal.closeAllModals();
                                createDraft()
                                navigation.dispatch(e.data.action)
                            }}
                            action="Save"
                            titleText="Save Draft?"
                            onCancel={() => {
                                navigation.dispatch(e.data.action)
                                modal.closeAllModals();
                            }}
                            message={`You haven't finished creating the Case File for "${patientFields?.firstName || 'Unknown'}". Do you wish to save your progress?`}
                        />
                    ),
                });
            }),
        [navigation, caseCreated, patientFields, staffInfo, caseProceduresInfo]
    );

    useEffect(() => {
        
        if (route.params.intialPage == 'Patient') {
            setName("New Patient");
        }
        else{
            setName('')
        }

    }, [])

    //put fields in redux make one big object put it in redux maybe draft case file as redux, once they leave the page they should br prompted to save as draft
    //action to save the data
    //create new state in redux
    const [name, setName] = useState('');

    //#region Event Handlers

    const onPatientInfoUpdate = value => {
        setPatientFields(value);
    };

    const onStaffUpdate = value => {
        setStaffInfo(value);
    };

    const onProcedureUpdate = value => {
        console.log('procedure update', value);

        setCaseProceduresInfo([...value]);
    };

    const handleStepPress = name => {
        if (completedSteps.includes(name)) {
            let updatedSteps = [...completedSteps];

            const selectedIndex = updatedSteps.findIndex(step => step === name);
            const stepsIndex = steps.findIndex(step => step.name === name);

            const stepObj = wizard.filter(item => item.step.name === name);
            const stepTabs = stepObj[0].tabs;
            updatedSteps = updatedSteps.slice(0, selectedIndex);

            if (stepsIndex !== steps.length - 1) {
                setPositiveText('NEXT');
            }

            setSelectedIndex(stepsIndex);
            setSelectedStep(name);
            setCompletedSteps(updatedSteps);
            setTabs(stepTabs);
            setCompletedTabs([]);
            setSelectedTabIndex(0);
        }
    };

    const handleTabPress = name => {
        if (completedTabs.includes(name)) {
            let newTabs = [...tabs];
            if (selectedIndex === 1) {
                tabs.length === 3 ?
                    (newTabs = newTabs) :
                    (newTabs = [...newTabs, `Assignment ${tabs.length + 1}`]);
            }
            const tabsCopy = completedTabs;
            const completedFilterTabIndex = completedTabs.findIndex(
                tab => tab === name
            );
            const selectedFilterTabIndex = tabs.findIndex(tab => tab === name);
            const updatedTabs = tabsCopy.slice(0, completedFilterTabIndex);

            setSelectedTabIndex(selectedFilterTabIndex);
            setCompletedTabs(updatedTabs);
            setTabs(newTabs);
        }
    };

    const onPositiveButtonPress = async () => {
        const incrementTab = () => {
            const updatedTabIndex = selectedTabIndex + 1;
            setCompletedTabs([...completedTabs, tabs[selectedTabIndex]]);
            setSelectedTabIndex(updatedTabIndex);
        };

        const incrementStep = () => {
            const updatedIndex = selectedIndex + 1;
            setCompletedSteps([...completedSteps, steps[selectedIndex].name]);
            setSelectedIndex(updatedIndex);
            setSelectedStep(steps[updatedIndex].name);

            const { tabs } = wizard[updatedIndex];
            setTabs(tabs);
            setSelectedTabIndex(0);
            setCompletedTabs([]);
        };

        const isFinalTab = selectedTabIndex === tabs.length - 1;

        const currentTab =
            wizard[selectedIndex] && wizard[selectedIndex].tabs[selectedTabIndex];

        console.log(
            `selected index ${selectedIndex}, selected tab index ${selectedTabIndex}, current tab ${currentTab}`
        );

        let isValid = true;  

        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PATIENT_DETAILS: {
                isValid = validatePatientDetailsTab(currentTab);
                break;
            }
            case CASE_PROCEDURE_TABS.PROCEDURES: {
                isValid = await validateProcedureInfo(selectedTabIndex);
                break;
            }
            case CASE_PROCEDURE_TABS.MEDICAL_STAFF: {
                isValid = validateStaffInfo(selectedTabIndex);
                break;
            }
            case CASE_PROCEDURE_TABS.FINAL: {
                console.log('validation procedure info');

                break;
            }
        }

        if (!isValid) {
            return;
        }

        // if (isFinalTab) {
        //     incrementStep()
        // } else {
        //     incrementTab();
        // }

        if (selectedIndex === 3) {
            // we are on the final tab
            console.log('Hey Save my data and open bottom sheet with the data');

            handleOnComplete();
        } else if (selectedTabIndex !== tabs.length - 1) {
            const updatedTabIndex = selectedTabIndex + 1;
            setCompletedTabs([...completedTabs, tabs[selectedTabIndex]]);
            setSelectedTabIndex(updatedTabIndex);
        } else if (
            selectedIndex === steps.length - 1 &&
            selectedTabIndex === tabs.length - 1
        ) {
            setPositiveText('CONTINUE');
            setCompletedSteps([...completedSteps, steps[selectedIndex].name]);
            setSelectedIndex(3);
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

            const { tabs } = wizard[updatedIndex];
            setTabs(tabs);
            setSelectedTabIndex(0);
            setCompletedTabs([]);
        }
    };

    const validatePatientDetailsTab = tab => {
        let isValid = true;

        let requiredFields = [];
        switch (tab) {
            case PATIENT_TABS.DETAILS: {
                // validate the fields on the details tab that are required
                requiredFields = ['firstName', 'surname', 'trn', 'passport', 'national', 'other'];

                const { trn, passport, national, other } = patientFields

                if (trn) {
                    requiredFields = requiredFields.filter(item => (
                        item !== 'passport' &&
                        item !== 'national' &&
                        item !== 'other'
                    ));
                }

                if (passport) {
                    requiredFields = requiredFields.filter(item => (
                        item !== 'trn' &&
                        item !== 'national' &&
                        item !== 'other'
                    ));
                }

                if (national) {
                    requiredFields = requiredFields.filter(item => (
                        item !== 'passport' &&
                        item !== 'trn' &&
                        item !== 'other'
                    ));
                }

                if (other) {
                    requiredFields = requiredFields.filter(item => (
                        item !== 'passport' &&
                        item !== 'national' &&
                        item !== 'trn'
                    ));
                }

                break;
            }
            case PATIENT_TABS.ADDRESS: {
                // validate the fields on the details tab that are required
                requiredFields = [];

                break;
            }
        }

        let updateErrors = { ...patientFieldErrors };

        for (const requiredField of requiredFields) {

            if (requiredField === 'trn') {
                // check if trn field is 9

                const trn = patientFields[requiredField];
                if (trn?.length !== 9) {
                    isValid = false;

                    updateErrors = {
                        ...updateErrors,
                        [requiredField]: `Valid TRN of an adult, child or child's parent is required`,
                    };
                }
            } else if (requiredField === 'dob') {
                // check if dob is valid
                const validaDob = moment()
                    .subtract(5, 'years');
                const dob = patientFields[requiredField];
                const validDob = moment(dob)
                    .isBefore(validaDob);
                if (!validDob) {
                    isValid = false;
                    updateErrors = {
                        ...updateErrors,
                        [requiredField]: 'DOB Required',
                    };
                }
            } else if (patientFields[requiredField] || (tab === PATIENT_TABS.ADDRESS && patientFields.addressInfo && patientFields.addressInfo[requiredField])) {
                delete updateErrors[requiredField];
                console.log(`${requiredField} is valid`);
            } else {
                isValid = false;

                updateErrors = {
                    ...updateErrors,
                    [requiredField]: `${requiredField.charAt(0)
                        .toUpperCase() + requiredField.slice(1)
                            .replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2')} is required`, // capitalize and separate camelcase named field
                    // [requiredField]: `${requiredField} is required`,
                };
            }
        }

        if (patientFields['trn']?.length !== 9 && patientFields['trn']) {
            isValid = false;

            updateErrors = {
                ...updateErrors,
                ['trn']: `Valid TRN of an adult, child or child's parent is required`,
            };
        }
        setPatientErrors(updateErrors);

        return isValid;
    };

    const validateProcedureInfo = async procedureIndex => {
        let isValid = true;
        const requiredParams = ['date', 'startTime', 'location', 'procedure', 'duration'];

        const procedureInfo = caseProceduresInfo[procedureIndex] || {};

        const updateErrors = [...procedureErrors];
        const errorObj = updateErrors[procedureIndex] || {};

        console.log('error index at', procedureIndex);

        for (const requiredParam of requiredParams) {
            if (!procedureInfo[requiredParam]) {
                console.log(`${requiredParam} is required`);
                isValid = false;
                errorObj[requiredParam] = 'Please enter a value';
                updateErrors[+procedureIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+procedureIndex] = errorObj;
            }
        }

        setProcedureErrors(updateErrors);
        // console.log("procedure errors", procedureErrors);
        if (!isValid) return isValid;

        // TODO validate time.
        const { procedure, location, startTime, duration } = procedureInfo;
        isValid = await validateProcedureAsync(procedure._id, location._id, startTime, duration);

        // TODO validate theatre location.
        // TODO validate recovery.
        // TODO validate equipment and inventory.

        return isValid;
    };

    const validateStaffInfo = staffIndex => {
        let isValid = true;
        const requiredParams = ['name'];

        const staff = staffInfo[staffIndex] || {};

        const updateErrors = [...staffErrors];
        const errorObj = updateErrors[staffIndex] || {};

        console.log('error index at', staffIndex, staff, staffInfo);

        for (const requiredParam of requiredParams) {
            if (!staff[requiredParam]) {
                console.log(`${requiredParam} is required`);
                isValid = false;
                errorObj[requiredParam] = 'Please enter a value';
                updateErrors[+staffIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+staffIndex] = errorObj;
            }
        }

        setStaffErrors(updateErrors);
        console.log('staff errors', staffErrors);

        return isValid;
    };

    const clearSnackBar = () => {
        setSnackbar({
            visible: false,
            message: ''
        });
    };

    const handleOnComplete = () => {
        // prepare request create case file request
        console.log('handleOnComplete patientfields', patientFields);
        console.log('handleOnCompleted', staffInfo);
        console.log('handleOnCompleted', caseProceduresInfo);

        const caseFileData = {
            name: `${patientFields.firstName} ${patientFields.surname}`,
            patient: {},
            caseProcedures: [],
            staff: {
                physicians: [],
                nurses: [],
            },
        };
        // adding patient info
        caseFileData.patient = patientFields;

        // adding staff info
        for (const staffInfoElement of staffInfo) {
            if (staffInfoElement.type === 'Physician') {
                caseFileData.staff.physicians.push(staffInfoElement._id);
            } else {
                caseFileData.staff.nurses.push(staffInfoElement._id);
            }
        }
        caseFileData.staff.leadPhysician = caseFileData.staff.physicians[0];

        // adding procedure info
        caseFileData.caseProcedures = caseProceduresInfo.map(item => ({
            // ...item,
            procedure: item.procedure._id,
            location: item.location._id,
            startTime: item.startTime,
            duration: item.duration,
        }));

        // remove draft from redux state
        if (draftItem?.id) removeDraft(draftItem?.id);

        setLoading(true);
        setCaseCreated(true);
        createCaseFile(caseFileData)
            .then(data => {
                addCaseFile(data);
                navigation.replace('Case', {
                    caseId: data._id,
                    isEdit: true,
                });
            })
            .catch(error => {
                console.log('failed to create case file', error.message);
                console.log('failed to create case file', error.response);
                Alert.alert('Sorry', 'Something went wrong when creating case.');
            })
            .finally(_ => {
                setLoading(false)
            });

    };

    const createDraft = () => {
        const draftData = {
            // pass back existing draft id to overwrite existing draft
            id: draftItem?.id || Math.floor(Math.random() * 10000),
            patient: patientFields,
            staff: staffInfo,
            procedures: caseProceduresInfo
        };
        saveDraft([draftData]);
    };

    const onClose = () => {
        if (route.params.intialPage == 'Patient') {
            navigation.navigate('PatientFiles')
        }
        else{
            navigation.navigate('CaseFiles')
        }
       
    };

    const getTabContent = () => {
        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PATIENT_DETAILS:
                return (
                    <PatientStep
                        selectedTabIndex={selectedTabIndex}
                        patient={patientFields}
                        onPatientUpdate={onPatientInfoUpdate}
                        errors={patientFieldErrors}
                        onErrorUpdate={value => setPatientErrors(value)}
                    />
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
                        onErrorsUpdate={value => setStaffErrors(value)}
                    />
                );

            case CASE_PROCEDURE_TABS.PROCEDURES:
                return (
                    <ProcedureStep
                        selectedTabIndex={selectedTabIndex}
                        onProcedureUpdate={onProcedureUpdate}
                        procedures={caseProceduresInfo}
                        errors={procedureErrors}
                        onErrorUpdate={value => setProcedureErrors(value)}
                    />
                );

            case CASE_PROCEDURE_TABS.FINAL:
                return (
                    <CompleteCreateCase
                        name={`${patientFields.firstName} ${patientFields.surname}`}
                        onComplete={handleOnComplete}
                    />
                );
            default:
                break;
        }
    };

    const getTabsProgress = () => ((selectedTabIndex + 1) / tabs.length) * 100;

    const validateProcedureAsync = (procedure, location, startTime, duration) => isValidCaseProcedureAppointment(procedure, location, startTime, duration)
        .then(results => {
            const { errors = [], isValid } = results;

            // loop through and show all errors.
            const messages = errors.map(item => item.message);

            if (messages.length) {
                const message = messages.join('\n');
                setSnackbar({
                    visible: true,
                    message
                });
            }

            return isValid;
        })
        .catch(error => {
            console.log('Failed to validate procedure', error);
            setSnackbar({
                visible: true,
                message: 'Something went wrong'
            });
            return false;
        });

    //#endregion

    const title = name === '' ? 'New Case' : name;

    return (
        <PageWrapper theme={theme}>

            <HeaderWrapper theme={theme}>
                <HeaderContainer theme={theme}>
                    <PageTitle>{title}</PageTitle>

                    <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.colors["--color-blue-500"] }]} onPress={onClose}>
                        <Text style={{ color: 'white' }}>Close</Text>
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

            <View style={{ height: 40 }}>
                <DialogTabs
                    tabs={tabs}
                    tab={selectedTabIndex}
                    tabName={wizard[selectedIndex] && wizard[selectedIndex].tabName}
                    onAddTab={wizard[selectedIndex] && wizard[selectedIndex].onAdd}
                    onTabPress={handleTabPress}
                />
            </View>

            <PageContentWrapper>
                <View style={{ flex: 1 }}>{getTabContent()}</View>
            </PageContentWrapper>

            <FooterWrapper>
                <FooterContainer>
                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-gray-200']}
                            fontColor={theme.colors['--color-gray-600']}
                            text="PREVIOUS"
                            onPress={onPreviousButtonPress}
                            IconLeft={<ChevronLeft strokeColor={theme.colors['--color-gray-600']} />}
                        />
                    </FooterButtonContainer>

                    <FooterButtonContainer>
                        <PageButton
                            backgroundColor={theme.colors['--color-blue-500']}
                            fontColor={theme.colors['--default-shade-white']}
                            text={positiveText}
                            onPress={onPositiveButtonPress}
                            IconRight={<ChevronRight strokeColor={theme.colors['--default-shade-white']} />}
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
                        accent: theme.colors['--color-red-700'],
                        surface: theme.colors['--color-red-700'],
                    }
                }}
                style={{
                    backgroundColor: theme.colors['--color-red-200'],
                    color: theme.colors['--color-red-700']
                }}
                action={{
                    label: 'X',
                    onPress: clearSnackBar,
                }}
            >
                {snackbar?.message || 'Something went wrong'}
            </Snackbar>

            {
                isLoading &&
                <LoadingComponent />
            }

        </PageWrapper>
    );
}

CreateCasePage.propTypes = {};
CreateCasePage.defaultProps = {};

const mapStateToProps = state => ({});

const mapDispatchToProp = {
    addCaseFile,
    saveDraft,
    removeDraft
};

export default connect(mapStateToProps, mapDispatchToProp)(CreateCasePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    footerButton: {
        height: 57,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#E3E8EF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    closeButton: {
        borderRadius: 6,
        padding: 4,
        alignItems: 'center',
        width: 64,
        height: 26,
    },
    footerText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#3182CE',
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 47,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E8EF',
    },
});
