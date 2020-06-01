import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import OverlayDialog from "../common/Dialog/OverlayDialog";
import DialogTabs from "../common/Dialog/DialogTabs";
import PatientStep from './PatientDialogTabs/PatientStep';
import StaffStep from './StaffDialogTabs/StaffStep';
import ProcedureStep from './ProceduresDialogTabs/ProcedureStep';
import ProgressContainer from '../common/Progress/ProgressContainer';
import CompleteCreateCase from './CompleteCreateCase';

import PatientIcon from '../../../assets/svg/newCasePatient';
import ProcedureIcon from '../../../assets/svg/newCaseProcedure';
import MedicalIcon from '../../../assets/svg/newCaseMedical';

import {createCaseFile} from "../../api/network";
import patient from "../../../assets/svg/newCasePatient";

const testData = {
    "name": "Julie Brown 2",
    "patient": {
        "firstName": "Juilie",
        "middleName": "",
        "surname": "Brown",
        "trn": "32991530",
        'dob': '1996-04-10',
        "contactInfo": {
            "phones": [
                {
                    "phone": "8764287313",
                    "type": "cell"
                },
                {
                    "phone": "8764287313",
                    "type": "cell"
                },
            ],
            "emails": [
                {
                    "email": "julie.brown@gmail.com",
                    "type": "work"
                }
            ],
            "emergencyContact": [
                {
                    "name": "Peach Brown",
                    "email": "peach.brown@gmail.com",
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


/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const CreateCaseDialogContainer = ({onCancel, onCreated}) => {

    // ########### CONST

    const wizard = [
        {
            step:
                {
                    name: 'Patient',
                    selectedIcon: <PatientIcon fillColor={'#0CB0E7'} strokeColor={'#64D8FF'}/>,
                    disabledIcon: <PatientIcon fillColor={'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
                    progress: 0
                },
            tabs: ['Details', 'Contact', 'Address', 'Insurance Coverage']
        },
        {
            step:
                {
                    name: 'Medical Team',
                    selectedIcon: <MedicalIcon fillColor={'#E53E3E'}/>,
                    disabledIcon: <MedicalIcon fillColor={'#CBD5E0'}/>,
                    progress: 0
                },
            tabs: ['Assignment 1', 'Assignment 2']
        },
        {
            step:
                {
                    name: 'Procedures',
                    selectedIcon: <ProcedureIcon fillColor={'#319795'} strokeColor={'#81E6D9'}/>,
                    disabledIcon: <ProcedureIcon fillColor={'#A0AEC0'} strokeColor={'#CCD6E0'}/>,
                    progress: 0
                },
            tabs: ['Procedure 1', 'Procedure 2']
        }
    ]
    const steps = [...wizard.map(step => step.step)]

    // ########### STATES

    const [fields, setFields] = useState(
        // {
        //     patient: {},
        //     staff: [],
        //     caseProcedures: []
        // }
        testData
    )

    const [patientInfo, setPatientInfo] = useState({})
    const [staffInfo, setStaffInfo] = useState([])
    const [caseProceduresInfo, setCaseProceduresInfo] = useState([])


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

    const onFieldChange = (fieldName) => (value) => {
        if (fieldName === 'patient') {
            const {firstName = "", surname = ""} = fields['patient'];
            setName(`${firstName} ${surname}'s Case`)
        }
        console.log("Fields: ", {
            ...fields,
            [fieldName]: value
        })
        setFields({
            ...fields,
            [fieldName]: value
        })
    }

    const onStaffUpdate = (value, selectedType) => {
        // update the current staff value at the index
        const newStaff = {...value, type: selectedType}

        const updatedStaffs = [...staffInfo]

        // check if value is at index
        if (updatedStaffs[selectedTabIndex]) {
            updatedStaffs[selectedTabIndex] = newStaff;
        } else {
            updatedStaffs.push(newStaff)
        }

        setStaffInfo(updatedStaffs)
    }

    const onProcedureUpdate = (value) => {
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
        if (selectedIndex === 3) {

            setTimeout(() => {
                onCreated({})
            }, 200);
            console.log("Hey Save my data and open bottom sheet with the data")

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

    const handleCloseDialog = () => {

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

        // console.log(fields);


        // createCaseFile()
    }

    const getTabContent = () => {

        switch (selectedIndex) {
            case 0:
                return <PatientStep
                    selectedTabIndex={selectedTabIndex}
                    onFieldChange={onFieldChange}
                    fields={fields}
                />

            case 1:
                return <StaffStep
                    selectedTabIndex={selectedTabIndex}
                    onStaffChange={onStaffUpdate}
                    staffs={staffInfo}
                    tabs={tabs}
                    completedTabs={completedTabs}
                />

            case 2:
                return <ProcedureStep
                    selectedTabIndex={selectedTabIndex}
                    onProcedureUpdate={onProcedureUpdate}
                    procedures={caseProceduresInfo}
                />

            case 3 :
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

    const title = name === "" ? "Add Create Case File" : name

    return (

        <OverlayDialog
            title={title}
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
        >
            <View style={styles.container}>
                <ProgressContainer
                    steps={steps}
                    handleStepPress={handleStepPress}
                    selectedIndex={selectedIndex}
                    completedSteps={completedSteps}
                    currentProgress={getTabsProgress()}
                />

                <DialogTabs
                    tabs={tabs}
                    tab={selectedTabIndex}
                    onTabPress={handleTabPress}
                />

                <TouchableOpacity
                    onPress={() => handlePopovers(false)()}
                    activeOpacity={1}
                >
                    {getTabContent()}
                </TouchableOpacity>
            </View>
        </OverlayDialog>
    )
}

CreateCaseDialogContainer.propTypes = {}
CreateCaseDialogContainer.defaultProps = {}

export default CreateCaseDialogContainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
})
