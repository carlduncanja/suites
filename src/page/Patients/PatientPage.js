import { connect } from 'react-redux';
import PatientSelectedIcon from '../../../assets/svg/overlayPatientSelected';
import PatientDisabledIcon from '../../../assets/svg/overlayPatientDisabled';
import StaffSelectedIcon from '../../../assets/svg/overlayMedicalStaffSelected';
import StaffDisabledIcon from '../../../assets/svg/overlayMedicalStaffDisabled';
import MedicalSelectedIcon from '../../../assets/svg/overlayMedicalHistorySelected';
import MedicalDisabledIcon from '../../../assets/svg/overlayMedicalHistoryDisabled';
import ProcedureSelectedIcon from '../../../assets/svg/overlayProcedureSelected';
import ProcedureDisabledIcon from '../../../assets/svg/overlayProcedureDisabled';
import ChargeSheetSelectedIcon from '../../../assets/svg/overlayChargeSheetSelected';
import ChargeSheetDisabledIcon from '../../../assets/svg/overlayChargeSheetDisabled';
import { getPatientbyId } from '../../api/network';
import { useEffect, useState } from 'react';
import { PageContext } from '../../contexts/PageContext';
import TabsContainer from '../../components/common/Tabs/TabsContainerComponent';
import {useNavigation} from '@react-navigation/native'
import { MedicalHistory, MedicalStaff, Patient, Procedures } from '../../components/CaseFiles/navigation/screens';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import styled from '@emotion/native';
import CaseFileOverlayMenu from '../../components/CaseFiles/CaseFileOverlayMenu';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import { View } from 'react-native';
const overlayMenu = [
    {
        name: 'Patient',
        overlayTabs: ['Details', 'Insurance', 'Diagnosis', 'Patient Comments', 'Covid Test'],
        selectedIcon: <PatientSelectedIcon />,
        disabledIcon: <PatientDisabledIcon />
    },
    {
        name: 'Medical History',
        authenticationRequired: 'cases.read_medical_history',
        overlayTabs: ['Details', 'Family History', 'Lifestyle'],
        selectedIcon: <MedicalSelectedIcon />,
        disabledIcon: <MedicalDisabledIcon />
    },
    {
        name: 'Procedures',
        overlayTabs: ['Details'],
        selectedIcon: <ProcedureSelectedIcon />,
        disabledIcon: <ProcedureDisabledIcon />
    },
];

let initialMenuItem = overlayMenu[0].name;
const initialCurrentTabs = overlayMenu[0].overlayTabs;
const initialSelectedTab = initialCurrentTabs[0];

function PatientPage( {route}) {
    const patientPage = route.params.patientPage
    const patientId = route.params.patientId
    const permissions = route.params.permissions

    const [selectedPatient, setSelectedPatient] = useState({});
    const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
    const [currentTabs, setCurrentTabs] = useState(initialCurrentTabs);
    const [selectedMenuItem, setSelectedMenuItem] = useState(initialMenuItem);
    const [pageState, setPageState] = useState({
        isEditMode: false,
    });
    const navigation = useNavigation();

    const onPatientUpdated = data => fetchPatient(patientId);

    useEffect(() => {

        fetchPatient(patientId)
        
    }, []);

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const fetchPatient = id => {
        console.log('fetching patient');
        setPageLoading(true);
        getPatientbyId(id)
            .then(data => {
                setSelectedPatient(data);
            })
            .catch(error => {
                console.log('Failed to get case', error);
                //navigation.replace("CaseFiles");
                //Alert.alert(('Failed', 'Failed to get details for case'));
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };


    const getOverlayContent = () => {
  
        const { medicalInfo= {} } = selectedPatient;
       
        switch (selectedMenuItem) {
            case 'Patient':
                return <Patient
                    patient={selectedPatient}
                    selectedTab={selectedTab}
                    onPatientUpdated={onPatientUpdated}
                    onRiskUpdate={onPatientUpdated}
                    isEditMode={pageState.isEditMode}
                />;
            case 'Medical History':
                    return <MedicalHistory
                        medicalInfo={medicalInfo}
                        selectedTab={selectedTab}
                        patient={selectedPatient}
                        setPageState = {setPageState}
                        fetchCase={() => fetchPatient(patientId)}
                    />;
            
        
            default:
                return <View />;
        }
    };

    const handleOverlayMenuPress = selectedItem => {
        if (pageState.isEditMode) return;

        const selectedMenu = overlayMenu.filter(item => item.name === selectedItem);
        const menuItem = selectedMenu[0].name;
        const currentTabs = selectedMenu[0].overlayTabs;
        const selectedTab = currentTabs[0];
        setSelectedMenuItem(menuItem);
        setCurrentTabs(currentTabs);
        setSelectedTab(selectedTab);
    };

    const getIsEditable = () => {
        switch (selectedMenuItem) {
            case 'Medical Staff':
                return selectedTab === 'Insurance' || selectedTab === 'Diagnosis' || selectedTab === 'Patient Comments';
            case 'Medical History':
                true

            case 'Medical Staff':
                return selectedTab === 'Insurance' || selectedTab === 'Diagnosis' || selectedTab === 'Patient Comments';
            default:
                return false;
        }
    };

    const handleTabPressChange = tab => {
        if (!pageState.isEditMode) {
            setSelectedTab(tab);
        }
    };

    const {patientNumber, firstName,  surname} =  selectedPatient
    const patientName =  firstName + " " + surname

    return (
        <>
            <PageContext.Provider value={{
                pageState,
                setPageState,
                fetchPatient
            }}
            >
                <DetailsPage
                    isEditable={true}
                    caseId =  {selectedPatient._id}
                    headerChildren={[ patientName, `#${ patientNumber}`]} 
                    onBackPress={() => {
                        navigation.navigate('PatientFiles');
                    }}
                    selectedTab =  {selectedTab}
                    isArchive={getIsEditable()}
                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={selectedTab}
                            onPressChange={handleTabPressChange}
                        />
                    )}
                >

                    <CasePageContent
                        overlayContent={getOverlayContent()}
                        overlayMenu={overlayMenu}
                        userPermissions={permissions}
                        //toggleActionButton={toggleActionButton}
                        actionDisabled={false}
                        selectedMenuItem={selectedMenuItem}
                        onOverlayTabPress={handleOverlayMenuPress}
                    />

                </DetailsPage>
            </PageContext.Provider>
        </>
    );




}


const mapStateToProps = state => {

}
const mapDispatcherToProp = {}

export default connect(mapStateToProps, mapDispatcherToProp)(PatientPage);


function CasePageContent({
    overlayContent,
    overlayMenu,
    userPermissions,
    selectedMenuItem,
    onOverlayTabPress,
    toggleActionButton,
    actionDisabled
}) {
    useEffect(() => {
        console.log('Case Page Create');
    }, []);

    useEffect(() => {
        console.log('Case Page Update');
    });

    const FooterWrapper = styled.View`
      width: 100%;
      padding-right: 30px;
      padding-left: 30px;
      padding-bottom: 17px;
      position: absolute;
      bottom: 0;
      height: 60px;
    `;

    const FooterContainer = styled.View`
      width: 100%;
      height: 100%;
      flex-direction: row;
    `;

    return (
        <>
            {
                overlayContent
            }
            <FooterWrapper>
                <FooterContainer>
                    <CaseFileOverlayMenu
                        selectedMenuItem={selectedMenuItem}
                        overlayMenu={overlayMenu}
                        permissions={userPermissions}
                        handleTabPress={onOverlayTabPress}
                    />
                    <FloatingActionButton
                        isDisabled={actionDisabled}
                        toggleActionButton={toggleActionButton}
                        hasActions={true}
                    />
                </FooterContainer>
            </FooterWrapper>
        </>
    );
}