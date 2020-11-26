import React, {useContext, useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import {useModal, withModal} from 'react-native-modalfy';
import {useTheme} from 'emotion-theming';
import {Text, View, TouchableOpacity} from 'react-native';
import {Divider, Modal} from 'react-native-paper';
import moment from 'moment';
import AddEquipmentDetailsTab from '../components/OverlayTabs/AddEquipmentDetailsTab';
import ConfirmationComponent from '../components/ConfirmationComponent';
import {assignEquipmentGivenLocation} from '../api/network';
import TabsContainer from '../components/common/Tabs/TabsContainerComponent';
import Footer from '../components/common/Page/Footer';
import AssignEquipmentDetailsTab from '../components/OverlayTabs/AssignEquipmentDetailsTab';

const AssignEquipmentPageWrapper = styled.View`
        margin:0;
        background-color: ${({theme}) => theme.colors['--default-shade-white']};
    `;

const AssignEquipmentPageContainer = styled.View`
        height:100%;
        width:100%;
    `;
const HeaderWrapper = styled.View`
    display: flex;
    height:47px;
    justify-content: center;
    padding-left: ${({theme}) => theme.space['--space-24']};
    padding-right: ${({theme}) => theme.space['--space-24']};
    
    
    `;

const HeaderContainer = styled.View`
    flex-direction:row;
    justify-content: space-between;
    align-items:center;
   
`;

const HeaderText = styled.Text`
    font:${({theme}) => theme.font['--text-xl-medium']};
    color:${({theme}) => theme.colors['--company']};
    `;

const CloseButtonWrapper = styled.View`
//    align-self:flex-end;
//     width:540px;
    `;
const CloseButtonContainer = styled.TouchableOpacity`
    background-color:${({theme}) => theme.colors['--color-gray-300']};
    width:68px;
    height:26px;
    padding:4px 14px;
    border-radius:6px;
    justify-content:center;
    `;
const CloseText = styled.Text`
    color:${({theme}) => theme.colors['--color-gray-600']};
    font:${({theme}) => theme.font['--text-sm-bold']};
    `;

const AssignEquipmentPageContentWrapper = styled.View`
        flex:1;
        margin : 0;
        padding-top: ${({theme}) => theme.space['--space-32']};
        // padding-left: ${({theme}) => theme.space['--space-24']};
        // padding-right: ${({theme}) => theme.space['--space-24']};
`;

const AssignEquipmentPageContentContainer = styled.View`
        display: flex;
        flex:1;
`;

const TabsViewContainer = styled.View`
    height: 54px;
`;

const AssignEquipmentPage = ({navigation, route}) => {
    const {equipment, onCreated} = route.params;
    const modal = useModal();
    const currentTabs = ['Details'];
    const theme = useTheme();

    const [equipmentData, setEquipmentData] = useState({});

    const [locations, setLocations] = useState([]);
    const [theatres, setTheatres] = useState([]);
    const [physicians, setPhysicians] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);

    const onFieldChange = fieldName => value => {
        const updateFields = {...equipmentData};
        setEquipmentData({
            ...updateFields,
            [fieldName]: value
        });
    };

    const onLocationUpdate = value => {
        const updatedLocations = [...locations];

        /* check if value is at index */
        updatedLocations[selectedIndex] = value;
        console.log('Updated Locations:', updatedLocations);
        setLocations(updatedLocations);
    };

    const onTheatreUpdate = value => {
        const updatedTheatres = [...theatres];

        // check if value is at index
        updatedTheatres[selectedIndex] = value;
        console.log('Updated Theatres:', updatedTheatres);
        setTheatres(updatedTheatres);
    };

    const onPhysicianUpdate = value => {
        const updatePhysicians = [...physicians];

        // check if value is at index
        console.log('Updated Physicians:', updatePhysicians);
        updatePhysicians[selectedIndex] = value;
        setPhysicians(updatePhysicians);
    };

    const onTabPress = selectedTab => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const closeTapped = () => {
        navigation.navigate('Equipment');
    };

    const onDonePress = () => {
        // console.log('the equipment type', equipment.type);
        // console.log('the equipment child', equipment._id);
        // console.log('the equipment data', equipmentData);

        const evalAssignmentValues = assignment => {
            if (assignment === 'Location' && locations) {
                return {type: 'location', referenceId: locations[0]._id};
            }
            if (assignment === 'Theatre' && theatres) {
                return {type: 'theatre', referenceId:  theatres[0]._id};
            }
            if (assignment === 'Person' && physicians) {
                return {type: 'physician', referenceId: physicians[0]._id};
            }
        };

        const {type, referenceId} = evalAssignmentValues(equipmentData.assignment);

        // console.log('the type', type);
        // console.log('the referenceId', referenceId);

        const fieldsToPass = {
            type,
            referenceId,
            startTime: equipmentData.date || moment().add(1, 'days').toDate(),
            duration: equipmentData.duration || 0,
        };
        console.log('fields', fieldsToPass);
        AssignEquipmentCall(fieldsToPass);
    };

    const createdSuccessfully = () => {
        // return;

        modal.closeModals('ConfirmationModal');
        navigation.navigate('Equipment');
        onCreated();
    };

    const onCancel = () => {
        modal.closeModals('ConfirmationModal');
    };

    const AssignEquipmentCall = updatedFields => {
        assignEquipmentGivenLocation(equipment.type, equipment._id, updatedFields)
            .then(data => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={onCancel}
                            onAction={createdSuccessfully}
                            message="Completed Successfully"//general message you can send to be displayed
                            action="Archive"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log(error);

                // TODO handle error
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={onCancel}
                            onAction={createdSuccessfully}
                            message="Successfully Assigned Equipment."//general message you can send to be displayed
                            action="Archive"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
            });
    };

    const getTabContent = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return <AssignEquipmentDetailsTab
                    onDonePress={onDonePress}
                    equipmentDetails={equipment}
                    data={equipmentData}
                    onFieldChange={onFieldChange}
                    locations={locations[selectedIndex]}
                    theatres={theatres[selectedIndex]}
                    physicians={physicians[selectedIndex]}
                    onLocationUpdate={onLocationUpdate}
                    onTheatreUpdate={onTheatreUpdate}
                    onPhysicianUpdate={onPhysicianUpdate}
                />;
            default:
                return <View/>;
        }
    };
    return (
        <AssignEquipmentPageWrapper theme={theme}>
            <AssignEquipmentPageContainer theme={theme}>

                <HeaderWrapper>
                    <HeaderContainer>
                        <HeaderText theme={theme}>Assign Equipment</HeaderText>
                        <CloseButtonWrapper>
                            <CloseButtonContainer onPress={closeTapped}>
                                <CloseText>Close</CloseText>
                            </CloseButtonContainer>
                        </CloseButtonWrapper>
                    </HeaderContainer>
                </HeaderWrapper>

                <TabsViewContainer>
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                </TabsViewContainer>

                <AssignEquipmentPageContentWrapper>
                    <AssignEquipmentPageContentContainer>
                        {getTabContent(currentTab)}

                    </AssignEquipmentPageContentContainer>
                </AssignEquipmentPageContentWrapper>

            </AssignEquipmentPageContainer>
        </AssignEquipmentPageWrapper>

    );
};

export default withModal(AssignEquipmentPage);
