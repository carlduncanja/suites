import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from '@emotion/native';
import AppointmentTab from "../../components/OverlayTabs/AppointmentTab";
import { useTheme } from "emotion-theming";
import { Text, View } from "react-native";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent"
import { TouchableOpacity } from 'react-native-gesture-handler';


const AppointmentPageWrapper = styled.View`
        margin:0;
        background-color: ${({ theme }) => theme.colors['--default-shade-white']};
    `;

const AppointmentPageContainer = styled.View`
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

const AppointmentPageContentWrapper = styled.View`
        flex:1;
        margin : 0;
        padding-top: ${({ theme }) => theme.space['--space-32']};
        padding-left: ${({ theme }) => theme.space['--space-24']};
        padding-right: ${({ theme }) => theme.space['--space-24']};
`

const AppointmentPageContentContainer = styled.View`
        display: flex;
        flex:1;
`

const TabsViewContainer = styled.View`
    height: 54px;
`;


function AppointmentPage({ navigation }) {
    const currentTabs = ["Appointment", "Recovery", "Consumables", "Equipment"];
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(false);

    useEffect(() => {

    }, [])

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const closeTapped = () => {
        navigation.navigate("CaseFiles")
    }


    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Appointment":
                return <AppointmentTab />
            case "Recovery":
                return
            case "Consumables":
                return
            case "Equipment":
                return
            default:
                return <View />
        }
    };
    return (
        <AppointmentPageWrapper theme={theme}>
            <AppointmentPageContainer theme={theme}>


                <HeaderContainer >
                    <HeaderText theme={theme} >Add Appointment</HeaderText>
                    <CloseButtonWrapper>
                        <CloseButtonContainer onPress={closeTapped} >
                            <CloseText>Close</CloseText>
                        </CloseButtonContainer>
                    </CloseButtonWrapper>
                </HeaderContainer>

                <TabsViewContainer><TabsContainer
                    tabs={currentTabs}
                    selectedTab={currentTab}
                    onPressChange={onTabPress}
                />
                </TabsViewContainer>

                <AppointmentPageContentWrapper>
                    <AppointmentPageContentContainer>
                        {getTabContent(currentTab)}

                    </AppointmentPageContentContainer>
                </AppointmentPageContentWrapper>

            </AppointmentPageContainer>
        </AppointmentPageWrapper>




    );
}

AppointmentPage.propTypes = {};
AppointmentPage.defaultProps = {};

export default AppointmentPage;
