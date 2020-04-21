import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */
function CreateStorageDialogContainer({onCancel, onCreated}) {

    const modal = useModal();

    // useEffect(() => {
    // }, []);


    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {



    };


    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
        >
            <View style={styles.container}>


            </View>
        </OverlayDialog>
    );
}

CreateStorageDialogContainer.propTypes = {

};
CreateStorageDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        height: 160,
        width: 636,
        backgroundColor: 'white',
    }
});

export default CreateStorageDialogContainer;
