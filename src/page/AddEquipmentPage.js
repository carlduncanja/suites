import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import AddEquipmentDetailsTab from "../components/OverlayTabs/AddEquipmentDetailsTab";
import { useTheme } from "emotion-theming";
import { Text, View, TouchableOpacity } from "react-native";
import TabsContainer from "../components/common/Tabs/TabsContainerComponent"
import Footer from '../components/common/Page/Footer';
import { Divider } from 'react-native-paper';


const AddEquipmentPageWrapper = styled.View`
        margin:0;
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
    color:${({ theme }) => theme.colors["--company"]}
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
    font:${({ theme }) => theme.font["--text-sm-bold"]}
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
`

const TabsViewContainer = styled.View`
    height: 54px;
`;

const testData = {
    Assignment: "Choice",
    Quantity: "1",
    Status: "Available"
}

const AddEquipmentPage = ({ navigation, route }) => {
    const { equipment } = route.params;
    const currentTabs = ["Details"];
    const theme = useTheme();
    const [equipmentData, setEquipmentData] = useState(testData);
    const [locations, setLocations] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);

    const onFieldChange = (fieldName) => (value) => {
        const updateFields = { ...equipmentData }
        setEquipmentData({
            ...updateFields,
            [fieldName]: value
        })
        console.log(equipmentData);
    }

    const onLocationUpdate = (value) => {
        const updatedLocations = [...locations]

        // check if value is at index
        updatedLocations[selectedIndex] = value;
        console.log("Updated locations:", updatedLocations)
        setLocations(updatedLocations);
    }





    useEffect(() => {

    }, [])

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const closeTapped = () => {
        navigation.navigate("Equipment")
    }


    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <AddEquipmentDetailsTab
                    equipmentDetails={equipment}
                    data={equipmentData}
                    locations={locations[selectedIndex]}
                    onFieldChange={onFieldChange}
                    onLocationUpdate={onLocationUpdate}
                />
            default:
                return <View />
        }
    };
    return (
        <AddEquipmentPageWrapper theme={theme}>
            <AddEquipmentPageContainer theme={theme}>


                <HeaderContainer >
                    <HeaderText theme={theme} >Add Equipment</HeaderText>
                    <CloseButtonWrapper>
                        <CloseButtonContainer onPress={closeTapped} >
                            <CloseText>Close</CloseText>
                        </CloseButtonContainer>
                    </CloseButtonWrapper>
                </HeaderContainer>

                <TabsViewContainer>
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                </TabsViewContainer>

                <AddEquipmentPageContentWrapper>
                    <AddEquipmentPageContentContainer>
                        {getTabContent(currentTab)}


                    </AddEquipmentPageContentContainer>
                </AddEquipmentPageContentWrapper>

            </AddEquipmentPageContainer>
        </AddEquipmentPageWrapper>




    );
}


export default AddEquipmentPage;
