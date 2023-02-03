import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useModal} from 'react-native-modalfy';
import moment from 'moment';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import DialogTabs from '../common/Dialog/DialogTabs';
import {createPhysician} from '../../api/network';
import PhysicianDetailsTab from './PhysicianDetailsTab';
import ConfirmationComponent from '../ConfirmationComponent';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const CreatePhysicianDialogContainer = ({
    onCancel,
    onCreated
}) => {
    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [positiveText, setPositiveText] = useState('DONE');

    const [fields, setFields] = useState({
        // firstName : '',
        // middleName: '',
        // trn:'',
        // surname : '',
        // gender: '',
        // phones : [],
        // emails : [],
        // emergencyContact:[],
        // address:[]
    });

    const [errorFields, setErrorFields] = useState({});

    const onFieldChange = fieldName => value => {
        const updatedFields = {...fields};
        setFields({
            ...updatedFields,
            [fieldName]: value
        });

        const updatedErrors = {...errorFields};
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);
    };

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const validatePhysician = () => {
        let isValid = true;
        const requiredFields = ['firstName', 'surname', 'phone'];

        const errorObj = {...errorFields} || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                console.info(`${requiredField} is required`);
                isValid = false;
                errorObj[requiredField] = 'Value is required.';
            } else {
                delete errorObj[requiredField];
            }

            if (requiredField === 'dob') {
                // check if dob is valid
                const validaDob = moment()
                    .subtract(5, 'years');
                const dob = fields[requiredField];
                const validDob = moment(dob)
                    .isBefore(validaDob);
                if (!validDob) {
                    isValid = false;

                    errorObj[requiredField] = 'Invalid DOB entered.';
                }
            }
        }

        setErrorFields(errorObj);
        console.log('Error obj: ', errorObj);

        return isValid;
    };

    const onPositiveButtonPress = () => {
        let isValid = true;
        const updatedFields = {
            ...fields,
            phones: [{
                phone: fields['phone'],
                type: 'cell'
            }]
            // trn : parseInt(fields['trn']) || ''
        };

        isValid = validatePhysician();
        if (!isValid) {
            return;
        }

        createPhysicianCall(updatedFields);
    };

    const [aboveOpen, setAboveOpen] = useState(false);

    const getDialogContent = tab => {
        switch (tab) {
            case 'Details':
                return <PhysicianDetailsTab
                    setAboveOpen={setAboveOpen}
                    onFieldChange={onFieldChange}
                    fields={fields}
                    errorFields={errorFields}
                />;
            default:
                return <View/>;
        }
    };

    const createPhysicianCall = updatedFields => {
        createPhysician(updatedFields)
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
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    });
                });
                // Alert.alert('Success', 'New physician has been created.');
                // setTimeout(() => { onCreated(data); }, 200);
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
                // Alert.alert('Failed', 'Failed to create physician.');
                // console.log('failed to create physician', error);
            })
            .finally(_ => {
            });
    };

    return (
        <OverlayDialog
            isOpen={aboveOpen}
            title="Add Physician"
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
            max={174}
        >
            <View style={styles.container}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />
                {
                    getDialogContent(dialogTabs[selectedIndex])
                }
            </View>
        </OverlayDialog>
    );
};

CreatePhysicianDialogContainer.propTypes = {};
CreatePhysicianDialogContainer.defaultProps = {};

export default CreatePhysicianDialogContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: 'auto',
        // minWidth: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
        height: 225
    },
});
