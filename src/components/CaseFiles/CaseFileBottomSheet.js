import React,{ useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import CaseFileOverlayMenu from './CaseFileOverlayMenu';
import Navigation from '../CaseFiles/navigation/ContentNavigationStack';
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

import { Patient, Procedures, MedicalStaff, MedicalHistory, ChargeSheet  } from "./navigation/screens";

import { getCaseFileById } from "../../api/network";


const CaseFileBottomSheet = ({caseItem, isOpenEditable}) =>{

    const overlayMenu = [
        {
            name:"Patient",
            overlayTabs:["Details","Insurance","Diagnosis","Patient Risk"],
            selectedIcon : <PatientSelectedIcon/>,
            disabledIcon : <PatientDisabledIcon/>
        },
        {
            name:"Medical Staff",
            overlayTabs:["Details"],
            selectedIcon : <StaffSelectedIcon/>,
            disabledIcon : <StaffDisabledIcon/>
        },
        {
            name:"Medical History",
            overlayTabs:["General","Family History","Lifestyle","Other"],
            selectedIcon : <MedicalSelectedIcon/>,
            disabledIcon : <MedicalDisabledIcon/>
        },
        {
            name:"Procedures",
            overlayTabs:["Details"],
            selectedIcon : <ProcedureSelectedIcon/>,
            disabledIcon : <ProcedureDisabledIcon/>
        },
        {
            name:"Charge Sheet",
            overlayTabs:["Consumables","Equipment","Billing","Quotation","Invoices"],
            selectedIcon : <ChargeSheetSelectedIcon/>,
            disabledIcon : <ChargeSheetDisabledIcon/>
        }
    ]

    const initialMenuItem = overlayMenu[0].name
    const initialCurrentTabs = overlayMenu[0].overlayTabs
    const intialSelectedTab = initialCurrentTabs[0]

    const {_id, patient, caseNumber } = caseItem
    patient ? name = `${patient.firstName} ${patient.surName}` : name = ""

    // ############### State

    const [selectedTab, setSelectedTab] = useState(intialSelectedTab)
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs)
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem)

    const [isEditMode, setEditMode] = useState(false)
    const [selectedCase, setSelectedCase] = useState({})
    const [isFetching, setFetching] = useState(false);

    // ############### Lifecycle Methods
    useEffect(() => {
        fetchCase(_id)
    }, []);

    // ############### Event Handlers
    const handleTabPressChange = (tab) => {
        if ( isEditMode === false){
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

    const onEditPress = (tab) =>{
        // setEditableTab(tab)
        setEditMode(!isEditMode)

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

    // ############### Data

    const getOverlayContent = () => {
        const { patient = {}, staff = {}, chargeSheets = [], caseProcedures = []} = selectedCase
        const { medicalInfo = {} } = patient

        switch(selectedMenuItem) {
            case "Patient" :
                return <Patient
                    patient = {patient}
                    selectedTab = {selectedTab}
                    isEditMode = {isEditMode}
                />

            case "Medical Staff" :
                return <MedicalStaff
                    staff = {staff}
                    selectedTab = {selectedTab}
                    isEditMode = {isEditMode}
                />
            case "Medical History" :
                return <MedicalHistory
                    medicalInfo = {medicalInfo}
                    selectedTab = {selectedTab}
                    isEditMode = {isEditMode}
                />
            case "Procedures" :
                return <Procedures
                    procedures = {caseProcedures}
                    selectedTab = {selectedTab}
                    isEditMode = {isEditMode}
                />

            case "Charge Sheet" :
                return <ChargeSheet
                    chargeSheets = {chargeSheets}
                    selectedTab = {selectedTab}
                    isEditMode = {isEditMode}
                />

            default :
                return <View/>

        }

    }

    // const overlayContent = <Navigation
    //     item = {caseItem}
    //     overlayMenu = {overlayMenu}
    //     handleOverlayMenuPress = {handleOverlayMenuPress}
    //     selectedTab = {selectedTab}
    //     isEditMode = {isEditMode}
    // />


    return (
        <View style={{flex:1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                    <>
                        <SlideOverlay
                            overlayId = {caseNumber}
                            overlayTitle = {name}
                            onTabPressChange = {handleTabPressChange}
                            currentTabs = {currentTabs}
                            selectedTab = {selectedTab}
                            isEditMode = {isEditMode}
                            overlayContent = {
                                <View style={{flex:1, padding:25, paddingTop:30}}>
                                    {getOverlayContent()}
                                </View>
                            }
                            onEditPress = {onEditPress}
                        />

                        <View style={styles.footer}>
                            <CaseFileOverlayMenu
                                selectedMenuItem = {selectedMenuItem}
                                overlayMenu = {overlayMenu}
                                handleTabPress = {handleOverlayMenuPress}
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
    footer:{
        position:'absolute',
        bottom:20,
        alignSelf:'center'
    }
})
