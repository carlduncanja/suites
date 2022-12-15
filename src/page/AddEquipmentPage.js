import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import { withModal } from "react-native-modalfy";
import AddEquipmentDetailsTab from "../components/OverlayTabs/AddEquipmentDetailsTab";
import { useTheme } from "emotion-theming";
import { Text, View, TouchableOpacity } from "react-native";
import ConfirmationComponent from "../components/ConfirmationComponent";
import { createEquipment } from "../api/network";
import CreatePageHeader from '../components/common/DetailsPage/CreatePageHeader'
import TabsContainer from "../components/common/Tabs/TabsContainerComponent"
import Footer from '../components/common/Page/Footer';
import { Divider, Modal } from 'react-native-paper';
import CreatePageDoneFooter from "../components/common/DetailsPage/CreatePageDoneFooter";



const AddEquipmentPageWrapper = styled.View`
        background-color: ${({ theme }) => theme.colors['--default-shade-white']};
    `;

const AddEquipmentPageContainer = styled.View`
        height:100%;
        width:100%;
    `;

const HeaderContainer = styled.View`
    flex-direction:row;
    height:47px;
    width:681px;
    align-items:center;
    padding:10px;
`;

const HeaderText = styled.Text`
    font:${({ theme }) => theme.font["--text-xl-medium"]};
    color:${({ theme }) => theme.colors["--company"]};
    `;

const CloseButtonWrapper = styled.View`
    align-items:flex-end;
    width:540px;
    `;
const CloseButtonContainer = styled.TouchableOpacity`
    background-color:${({ theme }) => theme.colors["--color-gray-300"]};
    width:68px;
    height:26px;
    padding:4px 14px;
    border-radius:6px;
    justify-content:center;
`;
const CloseText = styled.Text`
    color:${({ theme }) => theme.colors["--color-gray-600"]};
    font:${({ theme }) => theme.font["--text-sm-bold"]};
`;

const AddEquipmentPageContentWrapper = styled.View`
        flex:1;
        margin : 0;
        padding-top: ${({ theme }) => theme.space['--space-32']};
        padding-left: ${({ theme }) => theme.space['--space-24']};
        padding-right: ${({ theme }) => theme.space['--space-24']};
`

const AddEquipmentPageContentContainer = styled.View`
        display: flex;
        flex:1;
        border-bottom-width : 1px;
        border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-300']};
`

const TabsViewContainer = styled.View`
    height: 54px;
`;

const FooterWrapper = styled.View`
     width : 100%;
    /* position : absolute;
    bottom : 0; */
    margin-bottom : ${({theme}) => theme.space['--space-24']};
    /* margin-top : ${({theme}) => theme.space['--space-24']}; */
    padding-left : ${({theme}) => theme.space['--space-24']};
    padding-right :${({theme}) => theme.space['--space-24']};
`;


const FooterContainer = styled.View`
    display : flex;
`;

const testData = {
    Sku: "",
    Assignment: "Location",
    Quantity: "1",
    Status: "Available"
}

const AddEquipmentPage = ({ navigation, route, modal }) => {
    const { equipment, onCreated } = route.params;
    const currentTabs = ["Details"];
    const theme = useTheme();
    const [equipmentData, setEquipmentData] = useState(testData);
    const [locations, setLocations] = useState([]);
    const [physicians, setPhysicians] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);

    const onFieldChange = (fieldName) => (value) => {
        const updateFields = { ...equipmentData }
        setEquipmentData({
            ...updateFields,
            [fieldName]: value
        })
    }

    const onLocationUpdate = (value) => {
        const updatedLocations = [...locations]

        // check if value is at index
        updatedLocations[selectedIndex] = value;
        console.log("Updated locations:", updatedLocations)
        setLocations(updatedLocations);
    }

    const onPhysicianUpdate = (value) => {
        const updatePhysicians = [...physicians]
        console.log("Updated Physician:", updatePhysicians);
        updatePhysicians[selectedIndex] = value;
        setPhysicians(updatePhysicians)
    }

    useEffect(() => {

    }, [])

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const closeTapped = () => {
        navigation.navigate("Equipment")
    }

    const onDonePress = () => {
        const fieldsToPass =
        {
            sku: equipmentData['Sku'],
            quantity: equipmentData['Quantity'],
            type: equipment._id,
            status: equipmentData['Status']
        };
        createEquipmentCall(fieldsToPass);

    }

    const createdSuccessfully = () => {
        modal.closeModals("ConfirmationModal");
        navigation.navigate("Equipment");
        onCreated();

    }

    const onCancel = () => {
        modal.closeModals("ConfirmationModal");
    }

    const createEquipmentCall = (updatedFields) => {
        createEquipment(updatedFields)
            .then(data => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={onCancel}
                            onAction={createdSuccessfully}
                            action="Archive"
                        />
                    ), onClose: () => {
                        console.log("Modal closed");
                    },
                })


            })
            .catch(error => {
                console.log(error);

                // TODO handle error
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={onCancel}
                            onAction={createdSuccessfully}
                            message="There was an error performing this task "//general message you can send to be displayed
                            action="Archive"
                        />
                    ), onClose: () => {
                        console.log("Modal closed");
                    },
                })
            })
            .finally(_ => {
            })
    };


    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <AddEquipmentDetailsTab
                    // onDonePress={onDonePress}
                    equipmentDetails={equipment}
                    data={equipmentData}
                    locations={locations[selectedIndex]}
                    onFieldChange={onFieldChange}
                    onLocationUpdate={onLocationUpdate}
                    onPhysicianUpdate={onPhysicianUpdate}
                    physicians={physicians[selectedIndex]}
                />
            default:
                return <View />
        }
    };
    return (
        <AddEquipmentPageWrapper theme={theme}>
            <AddEquipmentPageContainer theme={theme}>

                <CreatePageHeader title='Add Equipment' onClose={closeTapped} />

                <TabsViewContainer>
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                </TabsViewContainer>

                <AddEquipmentPageContentWrapper>
                    <AddEquipmentPageContentContainer theme = {theme}>
                        {getTabContent(currentTab)}


                    </AddEquipmentPageContentContainer>
                </AddEquipmentPageContentWrapper>

                <FooterWrapper theme = {theme}>
                    {/* <FooterContainer> */}
                        <CreatePageDoneFooter onFooterPress={onDonePress}/>
                    {/* </FooterContainer> */}
                </FooterWrapper>

            </AddEquipmentPageContainer>
        </AddEquipmentPageWrapper>




    );
}


export default withModal(AddEquipmentPage);
