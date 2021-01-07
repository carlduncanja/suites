import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Switch, Picker, Alert } from 'react-native';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import { useModal } from 'react-native-modalfy';
import DialogTabs from '../common/Dialog/DialogTabs';
import InputField from '../common/Input Fields/InputField';
import InputField2 from '../common/Input Fields/InputField2';
import { createStorageLocation, createTheatre } from '../../api/network';
// import NumberInputField from "../common/Input Fields/NumberInputField";
import { addStorageLocation } from '../../redux/actions/storageActions';
import { connect } from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import DropDownIcon from '../../../assets/svg/dropDown';
import OptionsField from '../common/Input Fields/OptionsField';
import TheatresPage from '../../page/Theatres/TheatresPage';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import ConfirmationComponent from '../ConfirmationComponent';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */
function CreateTheatreDialogContainer({ onCancel, onCreated, addTheatre }) {

    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [fields, setFields] = useState({
        name: '',
        isRecovery: false,
    });

    const [errorFields, setErrorFields] = useState({
        name: false,
        isRecovery: false
    })

    // useEffect(() => {
    // }, []);

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        let nameBool = errorFields.name
        fields.name === '' || null ? nameBool = true : nameBool = false
        setErrorFields({
            ...errorFields,
            name: nameBool
        })

        if (nameBool === false) {
            console.log('Success')
            createTheatreCall()
        }
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
                setTimeout(() => {
                    modal.openModal('ConfirmationModal', {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={false}
                            onCancel={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCreated(data);
                                }, 200);
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCreated(data);
                                }, 200);
                            }}
                        />,
                        onClose: () => { modal.closeModals('ConfirmationModal'); }
                    });
                });
                // Alert.alert("Success", `New theatre, ${fields['name']} successfully created.`)
                // setTimeout(() => { onCreated(data) }, 200);
            })
            .catch(error => {
                modal.closeAllModals();
                setTimeout(() => {
                    modal.openModal('ConfirmationModal', {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onCancel={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCancel();
                                }, 200);
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCancel();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        },
                    });
                });
                // console.log('failed to create theatre', error);
                // Alert.alert('Failed', 'Theatre failed to be created.')
                // TODO handle error
            })
            .finally(_ => {
            })
    };

    const recoveryText = {
        true: 'Yes',
        false: 'No'
    };

    return (
        <OverlayDialog
            title="Create Theatre"
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText="DONE"
        >

            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <OverlayDialogContent height = {208}>
                    <>
                        <Row>
                            <FieldContainer>
                                <InputField2
                                    label="Room"
                                    onChangeText={onFieldChange('name')}
                                    value={fields.name}
                                    onClear={() => onFieldChange('name')('')}
                                    hasError={errorFields.name}
                                    errorMessage="Name must be filled."
                                />
                            </FieldContainer>

                            <FieldContainer>
                                <OptionsField
                                    label="Recovery"
                                    text={recoveryText[fields.isRecovery]}
                                    oneOptionsSelected={onFieldChange('isRecovery')}
                                    menuOption={(
                                        <MenuOptions>
                                            <MenuOption value={true} text="Yes" />
                                            <MenuOption value={false} text="No" />
                                        </MenuOptions>
                                    )}
                                />
                            </FieldContainer>
                        </Row>
                    </>
                </OverlayDialogContent>
            </>
            {/*
            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <View style={styles.sectionContainer}>
                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <InputField2
                                label={"Theatre Name"}
                                onChangeText={onFieldChange('name')}
                                value={fields['name']}
                                onClear={() => onFieldChange('name')('')}
                                hasError={errorFields['name']}
                                errorMessage="Name must be filled."
                            />
                        </View>
                    </View>

                    <View style={[styles.row, { width: 150 }]}>
                        <OptionsField
                            label={"Recovery"}
                            text={recoveryText[fields['isRecovery']]}
                            oneOptionsSelected={onFieldChange('isRecovery')}
                            menuOption={<MenuOptions>
                                <MenuOption value={true} text='Yes' />
                                <MenuOption value={false} text='No' />
                            </MenuOptions>}
                        />
                    </View>

                </View>
            </View>
 */}

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

const mapDispatcherToProps = {};

export default
connect(null, mapDispatcherToProps)(CreateTheatreDialogContainer);
