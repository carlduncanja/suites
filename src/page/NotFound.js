import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withModal, useModal } from 'react-native-modalfy';
import { render } from 'react-dom';
import Notifier from '../components/notifications/Notifier';
import ConfirmationComponent from '../components/ConfirmationComponent';
import { signOut } from '../redux/actions/authActions';
import { addNotification } from '../redux/actions/NotificationActions';
import PageHeader from '../components/common/Page/PageHeader';

function NotFound({ addNotification, signOut, route = {} }) {
    //ensure to destructer redux function
    const { name = '' } = route;
    const { openModal, closeModals } = useModal();

    const message = 'items added to inventory';
    const title = 'Group';
    const special = '';

    const handleOnLogout = async () => {
        await AsyncStorage.clear();
        signOut();
    };

    const handleNotif = () => {
        addNotification(message, title, special);
    };

    const actionClicked = () => {
        console.log('Clicked the action');
    }

    const toggleConfirmation = () => {
        console.log('Opening Modal!');
        openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    isError={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}//use this specification to either get the confirm an edit or update
                    onCancel={cancelClicked}
                    onAction={actionClicked}
                    message="You will need to manually move these items from the system once the have been removed from records. "//general message you can send to be displayed
                    action="Save"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };

    const cancelClicked = () => {
        console.log('Gonna close the modal');
        closeModals('ConfirmationModal');
    //alert("Are you sure? Your changes won't be reflected");
    };

    const backClicked = () => {
        Alert.alert('Back Clicked');
    };

    return (
        <>
            {/* <PageHeader onBack={backClicked} headerMessage="Trevaughn Douglas" /> */}

            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ margin: 50 }}> {name} Page Not Found</Text>

                {/* <Notif notifications={notifs} /> */}

                {/* <Button onPress={toggleConfirmation} title="Toggle Confirmation" /> */}

                <Button onPress={handleOnLogout} title="LOGOUT" />
            </View>
        </>
    );
}

NotFound.propTypes = {};
NotFound.defaultProps = {};

const mapDispatcherToProps = (dispatch) =>
    bindActionCreators(
        {
            signOut,
            addNotification,
        },
        dispatch
    );

export default connect(null, mapDispatcherToProps)(withModal(NotFound));
