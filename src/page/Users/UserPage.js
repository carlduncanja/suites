import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from '@emotion/native';
import {PageContext} from "../../contexts/PageContext";
import DetailsPage from "../../components/common/DetailsPage/DetailsPage";
import TabsContainer from "../../components/common/Tabs/TabsContainerComponent";
import {useNavigation} from "@react-navigation/native"
import UserDetailsComponent from "../../components/Users/UserDetailsComponent";
import { useModal } from 'react-native-modalfy';
import ResetPasswordComponent from './ResetPasswordComponent';

function UserPage({route, ...props}) {

    const navigation = useNavigation();
    const {user, onUserUpdate} = route.params;
    const modal = useModal();

    const [pageState, setPageState] = useState({});
    const [selectedUser, setUser] = useState(user);
    const [currentTab, setCurrentTab] = useState('Details')
    const currentTabs = ['Details'];


    console.log("hello", selectedUser);

    const onBackTapped = () => {
        navigation.goBack()
    }

    const onTabPress = () => {

    }

    const handleUserUpdate = (updatedUser) => {
        setUser({...selectedUser, ...updatedUser});
        if (onUserUpdate) onUserUpdate({...selectedUser, ...updatedUser})
    };

    const getOverlayScreen = (currentTab) => {
        switch (currentTab) {
            case 'Details':
                return <UserDetailsComponent user={selectedUser} onUserUpdated={handleUserUpdate} onResetPassword={onResetPassword}/>
            default:
                return <View/>
        }
    };

    const onResetPassword = () => {
        // Navigate to rest password page
        // On success, show confirmation screen and go back to user page.
        // On failure, show confirmation (failure) screen and go back to user page.
        modal.openModal('OverlayInfoModal', {
            overlayContent: <ResetPasswordComponent
                onClose={() => modal.closeModals('OverlayInfoModal')}
                userId={selectedUser._id}
            />
        });

    };

    return (
        <PageContext.Provider value={{pageState, setPageState}}>
            <DetailsPage
                headerChildren={[`${selectedUser?.first_name || '--'} ${selectedUser?.last_name || ''} `]}
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
