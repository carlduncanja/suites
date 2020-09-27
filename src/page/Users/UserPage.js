import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import {PageContext} from "../../contexts/PageContext";
import DetailsPage from "../../components/common/DetailsPage/DetailsPage";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent";
import {useNavigation} from "@react-navigation/native"

function UserPage({user, ...props}) {

    const navigation = useNavigation()

    const [pageState, setPageState] = useState({});
    const [selectedUser, setUser] = useState(user);
    const [currentTab, setCurrentTab] = useState('Details')
    const currentTabs = ['Details']


    console.log("hello", selectedUser);

    const onBackTapped = () => {
        navigation.goBack()
    }

    const onTabPress = () => {

    }

    const getOverlayScreen = (currentTab) => {
        switch (currentTab) {
            default:
                return <View/>
        }
    }

    return (
        <PageContext.Provider value={{pageState, setPageState}}>
            <DetailsPage
                headerChildren={[`${selectedUser?.first_name} ${selectedUser?.last_name}`|| '--']}
                onBackPress={onBackTapped}
                pageTabs={(
                    <TabsContainer
                        tabs={currentTabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                )}
            >
                {getOverlayScreen(currentTab)}
            </DetailsPage>
        </PageContext.Provider>
    );
}

UserPage.propTypes = {};
UserPage.defaultProps = {};

export default UserPage;
