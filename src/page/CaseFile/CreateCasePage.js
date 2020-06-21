import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from 'prop-types';
import {useModal} from "react-native-modalfy";
import {createCaseFile, createTheatre} from "../../api/network";
import OverlayDialog from "../../components/common/Dialog/OverlayDialog";
import DialogTabs from "../../components/common/Dialog/DialogTabs";
import InputField2 from "../../components/common/Input Fields/InputField2";
import OptionsField from "../../components/common/Input Fields/OptionsField";
import {MenuOption, MenuOptions} from "react-native-popup-menu";
import PatientIcon from "../../../assets/svg/newCasePatient";
import MedicalIcon from "../../../assets/svg/newCaseMedical";
import ProcedureIcon from "../../../assets/svg/newCaseProcedure";
import PatientStep from "../../components/CaseFiles/PatientDialogTabs/PatientStep";
import StaffStep from "../../components/CaseFiles/StaffDialogTabs/StaffStep";
import ProcedureStep from "../../components/CaseFiles/ProceduresDialogTabs/ProcedureStep";
import CompleteCreateCase from "../../components/CaseFiles/CompleteCreateCase";
import ProgressContainer from "../../components/common/Progress/ProgressContainer";
import ClearIcon from "../../../assets/svg/clearIcon";

const PATIENT_TABS = {
    DETAILS: 'Details',
    CONTACT: 'Contact',
    ADDRESS: 'Address',
    INSURANCE: 'Insurance Coverage'
}

const CASE_PROCEDURE_TABS = {
    PATIENT_DETAILS: 0,
    MEDICAL_STAFF: 1,
    PROCEDURES: 2,
    FINAL: 3
}


const createCaseWizard = [
    {
        step: {
            name: 'Patient',
            selectedIcon: <PatientIcon fillColor={'#0CB0E7'} strokeColor={'#64D8FF'}/>,
            disabledIcon: <PatientIcon fillColor={'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
            progress: 0
        },
        tabs: [PATIENT_TABS.DETAILS, PATIENT_TABS.CONTACT, PATIENT_TABS.ADDRESS, PATIENT_TABS.INSURANCE]
    },
    {
        step:
            {
                name: 'Medical Team',
                selectedIcon: <MedicalIcon fillColor={'#E53E3E'}/>,
                disabledIcon: <MedicalIcon fillColor={'#CBD5E0'}/>,
                progress: 0
            },
        tabs: ['Assignment 1'],
        tabName: "Assignment",
        onAdd: () => {
            // add new assignment
            const updatedWizard = [...wizard];
            const tabs = updatedWizard[1].tabs;
            if (tabs.length === 3) return;

            const assignment = `Assignment ${tabs.length + 1}`
            // wizard[2].tabs.push()
            updatedWizard[1].tabs.push(assignment)
            setWizard(updatedWizard)
        }
    },
    {
        step:
            {
                name: 'Procedures',
                selectedIcon: <ProcedureIcon fillColor={'#319795'} strokeColor={'#81E6D9'}/>,
                disabledIcon: <ProcedureIcon fillColor={'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
                progress: 0
            },
        tabName: "Procedure",
        tabs: ['Procedure 1'],
        onAdd: () => {
            // add new procedure
            const updatedWizard = [...wizard];
            const tabs = updatedWizard[2].tabs;
            if (tabs.length === 3) return;

            const assignment = `Procedure ${tabs.length + 1}`
            // wizard[2].tabs.push()
            updatedWizard[2].tabs.push(assignment)
            setWizard(updatedWizard);
        }
    }
]


const testData = {
    "name": "John Doe",
    "patient": {
        "firstName": "John",
        "middleName": "",
        "surname": "Doe",
        "gender": "female",
        "trn": "42991536",
        'dob': "2020-06-02",
        "contactInfo": {
            "phones": [
                {
                    "phone": "8764287313",
                    "type": "cell"
                }
            ],
            "emails": [
                {
                    "email": "john.doe@gmail.com",
                    "type": "work"
                }
            ],
            "emergencyContact": [
                {
                    "name": "Bob Brown",
                    "email": "Bob.brown@gmail.com",
                    "phone": "8765232141",
                    "relation": "mother"
                }
            ]
        },
        "addressInfo": {
            "line1": "23 Ruthven Road",
            "line2": "",
            "city": "Kingston",
            "parish": "Kingston 8"
        },
        "insurance": {
            "name": "Sagicor Life",
            "coverage": 45000.00,
            "policyNumber": "7311239-122"
        }
    },
    "staff": {
        "physicians": [
            "5ea05a51a5ba16247dac651d"
        ],
        "leadPhysician": "5ea05a51a5ba16247dac651d"
    },
    "caseProcedures": [
        {
            "procedure": "5ea060219a60bdf9e4b15783",
            "startTime": "2020-04-10T09:00:00.000Z",
            "endTime": "2020-04-10T10:00:00.000Z",
            "location": "5ea05bd848a2d72ff86e5151"
        }
    ]
}


function CreateCasePage({onCancel, onCreated}) {

    // ########### CONST
    const [wizard, setWizard] = useState(createCaseWizard)
    const steps = [...wizard.map(step => step.step)]
    const modal = useModal()

    // ########### STATES

    const [patientFields, setPatientFields] = useState(
        testData.patient
        // {}
    )
    const [patientFieldErrors, setPatientErrors] = useState({})

    const [staffInfo, setStaffInfo] = useState([])
    const [staffErrors, setStaffErrors] = useState([])

    const [caseProceduresInfo, setCaseProceduresInfo] = useState([])
    const [procedureErrors, setProcedureErrors] = useState([]);

    const [positiveText, setPositiveText] = useState("NEXT")
    const [popoverList, setPopoverList] = useState([])

    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [selectedStep, setSelectedStep] = useState(steps[0].name)
    const [tabs, setTabs] = useState(wizard[0].tabs)

    const [completedSteps, setCompletedSteps] = useState([])
    const [completedTabs, setCompletedTabs] = useState([])

    const [name, setName] = useState("")

    // ########### EVENT HANDLERS

    const onPatientInfoUpdate = (value) => {
        // if (fieldName === 'patient') {
        //     const {firstName = "", surname = ""} = patientFields['patient'];
        //     setName(`${firstName} ${surname}'s Case`)
        // }
        //
        // setPatientFields({
        //     ...patientFields,
        //     [fieldName]: value
        // })
        //
        // const errors = {...patientFieldErrors}
        // delete errors[fieldName];
        // setPatientErrors(errors);

        setPatientFields(value)
    }

    const onStaffUpdate = (value) => {
        setStaffInfo(value)
    }

    const onProcedureUpdate = (value) => {

        console.log("procedure update", value);

        setCaseProceduresInfo([...value])
    }

    const handleStepPress = (name) => {

        if (completedSteps.includes(name)) {

            let updatedSteps = [...completedSteps]

            const selectedIndex = updatedSteps.findIndex(step => step === name)
            const stepsIndex = steps.findIndex(step => step.name === name)

            const stepObj = wizard.filter(item => item.step.name === name)
            const stepTabs = stepObj[0].tabs
            updatedSteps = updatedSteps.slice(0, selectedIndex)

            if (stepsIndex !== steps.length - 1) {
                setPositiveText('NEXT')
            }

            setSelectedIndex(stepsIndex)
            setSelectedStep(name)
            setCompletedSteps(updatedSteps)
            setTabs(stepTabs)
            setCompletedTabs([])
            setSelectedTabIndex(0)
        }
    }

    const handleTabPress = (name) => {

        if (completedTabs.includes(name)) {
            let newTabs = [...tabs]
            if (selectedIndex === 1) {
                tabs.length === 3 ? newTabs = newTabs :
                    newTabs = [...newTabs, `Assignment ${tabs.length + 1}`]
            }
            const tabsCopy = completedTabs
            const completedFilterTabIndex = completedTabs.findIndex(tab => tab === name)
            const selectedFilterTabIndex = tabs.findIndex(tab => tab === name)
            const updatedTabs = tabsCopy.slice(0, completedFilterTabIndex)

            setSelectedTabIndex(selectedFilterTabIndex)
            setCompletedTabs(updatedTabs)
            setTabs(newTabs)
        }
    }

    const onPositiveButtonPress = () => {


        const incrementTab = () => {
            const updatedTabIndex = selectedTabIndex + 1
            setCompletedTabs([...completedTabs, tabs[selectedTabIndex]])
            setSelectedTabIndex(updatedTabIndex)
        }

        const incrementStep = () => {
            const updatedIndex = selectedIndex + 1
            setCompletedSteps([...completedSteps, steps[selectedIndex].name])
            setSelectedIndex(updatedIndex)
            setSelectedStep(steps[updatedIndex].name)

            const tabs = wizard[updatedIndex].tabs
            setTabs(tabs)
            setSelectedTabIndex(0)
            setCompletedTabs([])
        }

        const isFinalTab = (selectedTabIndex === tabs.length - 1)

        const currentTab = wizard[selectedIndex] && wizard[selectedIndex].tabs[selectedTabIndex]


        console.log(`selected index ${selectedIndex}, selected tab index ${selectedTabIndex}, current tab ${currentTab}`)

        let isValid = true;

        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PATIENT_DETAILS: {
                isValid = validatePatientDetailsTab(currentTab);
                break
            }
            case CASE_PROCEDURE_TABS.PROCEDURES: {
                isValid = validateProcedureInfo(selectedTabIndex)
                break;
            }
            case CASE_PROCEDURE_TABS.MEDICAL_STAFF: {
                isValid = validateStaffInfo(selectedTabIndex);
                break;
            }
            case CASE_PROCEDURE_TABS.FINAL: {
                console.log("validation procedure info")

                break;
            }
        }

        if (!isValid) {
            return
        }

        // if (isFinalTab) {
        //     incrementStep()
        // } else {
        //     incrementTab();
        // }

        if (selectedIndex === 3) {
            // we are on the final tab
            console.log("Hey Save my data and open bottom sheet with the data")

            handleOnComplete()
        } else if (selectedTabIndex !== tabs.length - 1) {

            const updatedTabIndex = selectedTabIndex + 1
            setCompletedTabs([...completedTabs, tabs[selectedTabIndex]])
            setSelectedTabIndex(updatedTabIndex)

        } else if (selectedIndex === steps.length - 1 && selectedTabIndex === tabs.length - 1) {
            setPositiveText('CONTINUE')
            setCompletedSteps([...completedSteps, steps[selectedIndex].name])
            setSelectedIndex(3)
            setSelectedTabIndex(0)
            setTabs(["Julie Brown's Case Created"])

        } else {

            const updatedIndex = selectedIndex + 1
            setCompletedSteps([...completedSteps, steps[selectedIndex].name])
            setSelectedIndex(updatedIndex)
            setSelectedStep(steps[updatedIndex].name)

            const tabs = wizard[updatedIndex].tabs
            setTabs(tabs)
            setSelectedTabIndex(0)
            setCompletedTabs([])
        }
    }

    const validatePatientDetailsTab = (tab) => {

        let isValid = true

        let requiredFields = [];
        switch (tab) {
            case PATIENT_TABS.DETAILS: {
                // validate the fields on the details tab that are required
                requiredFields = ['firstName', 'surname', 'trn', 'dob']

                break;
            }
            case PATIENT_TABS.ADDRESS: {
                // validate the fields on the details tab that are required
                requiredFields = ['line1', 'city', 'parish']

                break;
            }
        }

        let updateErrors = {...patientFieldErrors};

        console.log(patientFields);

        for (const requiredField of requiredFields) {


            if (patientFields[requiredField] || (tab === PATIENT_TABS.ADDRESS && patientFields.addressInfo[requiredField])) {
                delete updateErrors[requiredField];
                console.log(`${requiredField} is valid`)
            } else {
                isValid = false;

                updateErrors = {
                    ...updateErrors,
                    [requiredField]: `${requiredField} is required`,
                }

                console.log(patientFields.addressInfo[requiredField])
            }
        }

        setPatientErrors(updateErrors);
        console.log(patientFieldErrors)

        return isValid;
    }

    const validateProcedureInfo = (procedureIndex) => {
        let isValid = true;
        const requiredParams = ['date', 'startTime', 'location', 'procedure'];

        const procedure = caseProceduresInfo[procedureIndex] || {}

        let updateErrors = [...procedureErrors];
        let errorObj = updateErrors[procedureIndex] || {};


        console.log('error index at', procedureIndex);

        for (const requiredParam of requiredParams) {

            if (!procedure[requiredParam]) {
                console.log(`${requiredParam} is required`)
                isValid = false
                errorObj[requiredParam] = "Please enter a value";
                updateErrors[+procedureIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+procedureIndex] = errorObj;
            }

        }

        setProcedureErrors(updateErrors)
        console.log("procedure errors", procedureErrors)

        return isValid;
    }

    const validateStaffInfo = (staffIndex) => {
        let isValid = true;
        const requiredParams = ['name'];

        const staff = staffInfo[staffIndex] || {}

        let updateErrors = [...staffErrors];
        let errorObj = updateErrors[staffIndex] || {};

        console.log('error index at', staffIndex, staff, staffInfo);

        for (const requiredParam of requiredParams) {

            if (!staff[requiredParam]) {
                console.log(`${requiredParam} is required`)
                isValid = false
                errorObj[requiredParam] = "Please enter a value";
                updateErrors[+staffIndex] = errorObj;
            } else {
                delete errorObj[requiredParam];
                updateErrors[+staffIndex] = errorObj;
            }

        }

        setStaffErrors(updateErrors)
        console.log("staff errors", staffErrors)

        return isValid;
    }

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    }

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = {...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

    const handleOnComplete = () => {
        // prepare request create case file request
        console.log("handleOnComplete", patientFields);
        console.log("handleOnCompleted", staffInfo);
        console.log("handleOnCompleted", caseProceduresInfo);

        const caseFileData = {
            name: `${patientFields.firstName} ${patientFields.surname}`,
            patient: {},
            caseProcedures: [],
            staff: {
                physicians: [],
                nurses: []
            }
        };
        // adding patient info
        caseFileData.patient = patientFields;


        // adding staff info
        for (const staffInfoElement of staffInfo) {
            if (staffInfoElement.type === "Physician") {
                caseFileData.staff.physicians.push(staffInfoElement._id)
            } else {
                caseFileData.staff.nurses.push(staffInfoElement._id)
            }
        }
        caseFileData.staff.leadPhysician = caseFileData.staff.physicians[0]


        // adding procedure info
        caseFileData.caseProcedures = caseProceduresInfo.map(item => ({
            // ...item,
            procedure: item.procedure._id,
            location: item.location._id,
            startTime: item.startTime,
            duration: item.duration
        }))

        console.log("handleOnComplete: caseProcedure Info", caseFileData);
        createCaseFile(caseFileData)
            .then((data) => {
                console.log("Case File Created", data)

                modal.closeAllModals();
                setTimeout(() => {
                    onCreated(data, false)
                }, 300);
            }).catch(error => {
            console.log("failed to create case file", error);
            Alert.alert("Sorry", "Something went wrong when creating case.");
        })
    }

    const getTabContent = () => {
        switch (selectedIndex) {
            case CASE_PROCEDURE_TABS.PATIENT_DETAILS:
                return <PatientStep
                    selectedTabIndex={selectedTabIndex}
                    patient={patientFields}
                    onPatientUpdate={onPatientInfoUpdate}
                    errors={patientFieldErrors}
                    onErrorUpdate={(value) => setPatientErrors(value)}
                />

            case CASE_PROCEDURE_TABS.MEDICAL_STAFF:
                return <StaffStep
                    selectedTabIndex={selectedTabIndex}
                    onStaffChange={onStaffUpdate}
                    staffs={staffInfo}
                    tabs={tabs}
                    completedTabs={completedTabs}
                    errors={staffErrors}
                    onErrorsUpdate={(value) => setStaffErrors(value)}
                />

            case CASE_PROCEDURE_TABS.PROCEDURES:
                return <ProcedureStep
                    selectedTabIndex={selectedTabIndex}
                    onProcedureUpdate={onProcedureUpdate}
                    procedures={caseProceduresInfo}
                    errors={procedureErrors}
                    onErrorUpdate={(value) => setProcedureErrors(value)}
                />

            case CASE_PROCEDURE_TABS.FINAL :
                return <CompleteCreateCase
                    name={'Julie Brown'}
                    onComplete={handleOnComplete}
                />
            default:
                break;
        }
    }

    const getTabsProgress = () => {
        return (selectedTabIndex + 1) / tabs.length * 100
    }

    const title = name === "" ? "New Case" : name

    return (
        <View style={styles.container}>

            <View style={styles.headingContainer}>
                <Text>{title}</Text>
            </View>

            <View style={{height: 140}}>
                <ProgressContainer
                    steps={steps}
                    handleStepPress={handleStepPress}
                    selectedIndex={selectedIndex}
                    completedSteps={completedSteps}
                    currentProgress={getTabsProgress()}
                />
            </View>

            <View style={{flex: 1,}}>
                <View style={{height: 40}}>
                    <DialogTabs
                        tabs={tabs}
                        tab={selectedTabIndex}
                        onAddTab={wizard[selectedIndex] && wizard[selectedIndex].onAdd}
                        onTabPress={handleTabPress}
                        tabName={wizard[selectedIndex] && wizard[selectedIndex].tabName}
                    />
                </View>

                <View style={{flex: 1}}>
                    <TouchableOpacity
                        onPress={() => handlePopovers(false)()}
                        activeOpacity={1}
                    >
                        {getTabContent()}
                    </TouchableOpacity>
                </View>

            </View>


            <TouchableOpacity style={styles.footerButton} onPress={onPositiveButtonPress}>
                <View>
                    <Text style={styles.footerText}>{positiveText}</Text>
                    {/*{*/}
                    {/*    buttonIcon*/}
                    {/*}*/}
                </View>
            </TouchableOpacity>

        </View>
    )
}

CreateCasePage.propTypes = {};
CreateCasePage.defaultProps = {};

export default CreateCasePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    footerButton: {
        position: 'absolute',
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
    footerText: {
        fontSize: 16,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        color: "#3182CE",
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
        borderBottomColor: '#E3E8EF'
    },
})
