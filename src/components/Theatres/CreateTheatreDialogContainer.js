import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField from "../common/Input Fields/InputField";
import InputField2 from "../common/Input Fields/InputField2";
import {createStorageLocation, createTheatre} from "../../api/network";
import NumberInputField from "../common/Input Fields/NumberInputField";
import {addStorageLocation} from "../../redux/actions/storageActions";
import {connect} from "react-redux";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import DropDownIcon from "../../../assets/svg/dropDown";
import OptionsField from "../common/Input Fields/OptionsField";
import TheatresBottomSheetContainer from "./TheatresBottomSheetContainer";

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */
function CreateTheatreDialogContainer({onCancel, onCreated, addTheatre}) {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({
        name: '',
        isRecovery: false,
    });

    // useEffect(() => {
    // }, []);

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        createTheatreCall()
    };

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const createTheatreCall = () => {
        createTheatre(fields)
            .then(data => {
                modal.closeAllModals();
                setTimeout(() => {onCreated(data)}, 200);
            })
            .catch(error => {
                console.log("failed to create theatre", error);
                // TODO handle error
            })
            .finally(_ => {
            })
    };

    const recoveryText = {
        true: "Yes",
        false: "No"
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
                            <InputField2 label={"Theatre Name"}
                                         onChangeText={onFieldChange('name')}
                                         value={fields['name']}
                                         onClear={() => onFieldChange('name')('')}
                            />
                        </View>
                    </View>

                    <View style={[styles.row, {width: 150}]}>
                        <OptionsField
                            label={"Recovery"}
                            text={recoveryText[fields['isRecovery']]}
                            oneOptionsSelected={onFieldChange('isRecovery')}
                            menuOption={<MenuOptions>
                                <MenuOption value={true} text='Yes'/>
                                <MenuOption value={false} text='No'/>
                            </MenuOptions>}
                        />
                    </View>

                    
                </View>
            </View>


        </OverlayDialog>
    );
}

CreateTheatreDialogContainer.propTypes = {};
CreateTheatreDialogContainer.defaultProps = {};

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
        alignItems: 'center',
        marginBottom: 20
    },
    inputField: {
        // flex: 1,
        width: 64,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E3E8EF',
        borderRadius: 4,
        height: 32,
    },
    inputWrapper: {
        // flex: 1,
        width: 260,
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    textLabel: {
        marginRight: 20,
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },
});

const mapDispatcherToProps = {

};

export default
connect(null, mapDispatcherToProps)(CreateTheatreDialogContainer);
