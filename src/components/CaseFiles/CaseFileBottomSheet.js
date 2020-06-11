import React, {useState, useContext, useEffect} from "react";
import {View, StyleSheet, Text, ActivityIndicator} from "react-native";
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import CaseFileOverlayMenu from './CaseFileOverlayMenu';
import {colors} from "../../styles";

import PatientSelectedIcon from '../../../assets/svg/overlayPatientSelected';
import PatientDisabledIcon from '../../../assets/svg/overlayPatientDisabled';

import ProcedureSelectedIcon from '../../../assets/svg/overlayProcedureSelected';
import ProcedureDisabledIcon from '../../../assets/svg/overlayProcedureDisabled';

import MedicalSelectedIcon from '../../../assets/svg/overlayMedicalHistorySelected';
import MedicalDisabledIcon from '../../../assets/svg/overlayMedicalHistoryDisabled';

import StaffSelectedIcon from '../../../assets/svg/overlayMedicalStaffSelected';
import StaffDisabledIcon from '../../../assets/svg/overlayMedicalStaffDisabled';

import ChargeSheetSelectedIcon from '../../../assets/svg/overlayChargeSheetSelected';
import ChargeSheetDisabledIcon from '../../../assets/svg/overlayChargeSheetDisabled';

import {Patient, Procedures, MedicalStaff, MedicalHistory, ChargeSheet} from "./navigation/screens";

import {getCaseFileById} from "../../api/network";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import {useModal} from "react-native-modalfy";
import ActionItem from "../common/ActionItem";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RemoveIcon from "../../../assets/svg/remove2";
import DeleteIcon from "../../../assets/svg/deleteIcon";


const CaseFileBottomSheet = ({caseItem, isOpenEditable}) => {

    const modal = useModal();

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const overlayMenu = [
        {
            name: "Patient",
            overlayTabs: ["Details", "Insurance", "Diagnosis", "Patient Risk"],
            selectedIcon: <PatientSelectedIcon/>,
            disabledIcon: <PatientDisabledIcon/>
        },
        {
            name: "Medical Staff", 
            overlayTabs: ["Details"],
            selectedIcon: <StaffSelectedIcon/>,
            disabledIcon: <StaffDisabledIcon/>
        },
        {
            name: "Medical History",
            overlayTabs: ["General", "Family History", "Lifestyle", "Other"],
            selectedIcon: <MedicalSelectedIcon/>,
            disabledIcon: <MedicalDisabledIcon/>
        },
        {
            name: "Procedures",
            overlayTabs: ["Details"],
            selectedIcon: <ProcedureSelectedIcon/>,
            disabledIcon: <ProcedureDisabledIcon/>
        },
        {
            name: "Charge Sheet",
            overlayTabs: ["Consumables", "Equipment", "Billing", "Quotation", "Invoices"],
            selectedIcon: <ChargeSheetSelectedIcon/>,
            disabledIcon: <ChargeSheetDisabledIcon/>
        }
    ]

    const initialMenuItem = overlayMenu[0].name
    const initialCurrentTabs = overlayMenu[0].overlayTabs
    const intialSelectedTab = initialCurrentTabs[0]

    const {_id, patient, caseNumber} = caseItem
    let name = patient ? `${patient.firstName} ${patient.surname}` : ""
    // patient ? name = `${patient.firstName} ${patient.surname}` : name = ""

    // ############### State

    const [selectedTab, setSelectedTab] = useState(intialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem)

    const [isEditMode, setEditMode] = useState(isOpenEditable)
    const [selectedCase, setSelectedCase] = useState({})
    const [isFetching, setFetching] = useState(false);

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(_id)
    }, []);

    // ############### Event Handlers
    const handleTabPressChange = (tab) => {
        if (isEditMode === false) {
            setSelectedTab(tab)
        }
    }

    const handleOverlayMenuPress = (selectedItem) => {
        const selectedMenu = overlayMenu.filter(item => item.name === selectedItem)
        const menuItem = selectedMenu[0].name
        const currentTabs = selectedMenu[0].overlayTabs
        const selectedTab = currentTabs[0]
        setSelectedMenuItem(menuItem)
        setCurrentTabs(currentTabs)
        setSelectedTab(selectedTab)
    }

    const onEditPress = (tab) => {
        // setEditableTab(tab)
        setEditMode(!isEditMode)
    }

    /**
     * Displays floating actions
     */
    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "CASE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }


    // ############### Helper Function
    const fetchCase = (id) => {
        setFetching(true);
        getCaseFileById(id)
            .then(data => {
                setSelectedCase(data)
            })
            .catch(error => {
                console.log("Failed to get case", error)
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    /**
     * Get the list of actions based on the current tab and sections
     */
    const getFabActions = () => {
        let title = "Actions";
        let floatingAction = [];

        console.log("getFabActions: selected tab", selectedTab);
        switch (selectedTab) {
            case "Consumables": {
                const addNewLineItemAction = <ActionItem title={"Update Consumable"} icon={<AddIcon/>} onPress={_ => {
                }}/>;
                const removeLineItemAction = <ActionItem title={"Remove Consumable"} icon={<DeleteIcon/>}
                                                         onPress={_ => {
                                                         }}/>;
                floatingAction.push(addNewLineItemAction, /*removeLineItemAction*/)
                title = "CONSUMABLE'S ACTIONS"
                break;
            }
            case "Equipment": {
                const addNewLineItemAction = <ActionItem title={"Update Equipments"} icon={<AddIcon/>} onPress={_ => {
                }}/>;
                const removeLineItemAction = <ActionItem title={"Remove Equipment"} icon={<RemoveIcon/>}
                                                         onPress={_ => {
                                                         }}/>;
                floatingAction.push(addNewLineItemAction, /*removeLineItemAction*/)
                title = "EQUIPMENT'S ACTIONS"
                break;
            }
        }


        return <ActionContainer
            floatingActions={floatingAction}
            title={title}
        />

    }

    // ############### Data

    const getOverlayContent = () => {
        const {patient = {}, staff = {}, chargeSheet = {}, caseProcedures = [], quotations = []} = selectedCase
        const {medicalInfo = {}} = patient

        switch (selectedMenuItem) {
            case "Patient" :
                return <Patient
                    patient={patient}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />

            case "Medical Staff" :
                return <MedicalStaff
                    staff={staff}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />
            case "Medical History" :
                return <MedicalHistory
                    medicalInfo={medicalInfo}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />
            case "Procedures" :
                return <Procedures
                    procedures={caseProcedures}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                />

            case "Charge Sheet" :
                return <ChargeSheet
                    chargeSheet={chargeSheet}
                    procedures={caseProcedures}
                    selectedTab={selectedTab}
                    isEditMode={isEditMode}
                    quotations = {quotations}
                />

            default :
                return <View/>

        }

    }

    return (
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <>
                        <SlideOverlay
                            overlayId={caseNumber}
                            overlayTitle={name}
                            onTabPressChange={handleTabPressChange}
                            currentTabs={currentTabs}
                            selectedTab={selectedTab}
                            isEditMode={isEditMode}
                            overlayContent={
                                <View style={{flex: 1, padding: 25, paddingTop: 30}}>
                                    {getOverlayContent()}
                                </View>
                            }
                            onEditPress={onEditPress}
                        />

                        <View style={styles.footer}>
                            <CaseFileOverlayMenu
                                selectedMenuItem={selectedMenuItem}
                                overlayMenu={overlayMenu}
                                handleTabPress={handleOverlayMenuPress}
                            />
                        </View>

                        <View style={styles.actionWrapper}>
                            <FloatingActionButton
                                isDisabled={isFloatingActionDisabled}
                                toggleActionButton={toggleActionButton}
                            />
                        </View>

                    </>
            }
        </View>
    )
}
CaseFileBottomSheet.propTypes = {};
CaseFileBottomSheet.defaultProps = {};

export default CaseFileBottomSheet

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        flex: 1,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center'
    },
    actionWrapper: {
        position: 'absolute',
        bottom: 20,
        right: 40
    }
})
