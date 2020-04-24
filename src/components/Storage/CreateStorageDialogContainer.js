import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField from "../common/Input Fields/InputField";
import InputField2 from "../common/Input Fields/InputField2";
import {createStorageLocation} from "../../api/network";
import NumberInputField from "../common/Input Fields/NumberInputField";
import {addStorageLocation} from "../../redux/actions/storageActions";
import {connect} from "react-redux";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addStorageLocation
 * @returns {*}
 * @constructor
 */
function CreateStorageDialogContainer({onCancel, onCreated, addStorageLocation}) {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({});

    // useEffect(() => {
    // }, []);

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        createStorageCall()
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };


    const createStorageCall = () => {
        createStorageLocation(fields)
            .then(data => {
                addStorageLocation(data);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create storage location", error)
            })
            .finally(_ => {
                modal.closeAllModals()
            });
    };


    return (
        <OverlayDialog
            title={"New Location"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
        >

            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <View style={styles.sectionContainer}>
                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <InputField2 label={"Location Name"}
                                         onChangeText={onFieldChange('name')}
                                         value={fields['name']}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <InputField2
                                label={"Capacity"}
                                onChangeText={(value) => {
                                    if (/^\d+$/g.test(value) || !value) {
                                        onFieldChange('capacity')(value)
                                    }
                                }}
                                value={fields['capacity']}
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <InputField2 label={"Theatre"} onChangeText={onFieldChange('theatre')}/>
                        </View>
                        <View style={styles.inputWrapper}/>
                    </View>
                </View>
            </View>


        </OverlayDialog>
    );
}

CreateStorageDialogContainer.propTypes = {};
CreateStorageDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height: 160,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    }
});

const mapDispatcherToProps = {
    addStorageLocation
};

export default connect(null, mapDispatcherToProps)(CreateStorageDialogContainer);
