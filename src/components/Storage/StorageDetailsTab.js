import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {useModal} from 'react-native-modalfy';
import {formatDate} from '../../utils/formatter';
import InputField2 from '../common/Input Fields/InputField2';
import TextArea from '../common/Input Fields/TextArea';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import {updateStorageLocationCall} from '../../api/network';
import ConfirmationComponent from '../ConfirmationComponent';
import {PageContext} from '../../contexts/PageContext';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import Record from '../common/Information Record/Record';
import Footer from '../common/Page/Footer';

function StorageDetailsTab({
    storageLocationId,
    name = '--',
    description = '',
    onUpdated = () => {
    },
}) {
    const baseStateRef = useRef();
    const modal = useModal();
    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;

    const [fields, setFields] = useState({
        description,
        name
    });

    const [isLoading, setLoading] = useState(false);
    const [isUpdated, setUpdated] = useState(false);

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });
        setUpdated(true);
    };

    useEffect(() => {
        baseStateRef.current = {
            description,
            name
        };
        return () => {
            baseStateRef.current = {};
        };
    }, []);

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        error={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            // resetState()
                            setPageState({
                                ...pageState,
                                isEditMode: true
                            });
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            updateStorageLocation();
                        }}
                        message="Do you want to save changes?"//general message you can send to be displayed
                        action="Yes"
                    />
                ),
                onClose: () => {
                    console.log('Modal closed');
                },
            });
        }
    }, [isEditMode]);

    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    };

    const updateStorageLocation = () => {
        const data = {...fields};

        console.log('params', storageLocationId, data);

        setLoading(true);
        updateStorageLocationCall(storageLocationId, data)
            .then(_ => {
                onUpdated(data);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="Changes were successful."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log('Failed to update storage location', error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                resetState();
                            }}
                            message="Something went wrong when applying changes."//general message you can send to be displayed
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => {
                setLoading(false);
            });
    };

    return (
        <>
            <Row>
                <Record
                    recordTitle="Description"
                    recordValue={fields.description}
                    onClearValue={() => onFieldChange('description')('')}
                    onRecordUpdate={onFieldChange('description')}
                    useTextArea={true}
                    editMode={isEditMode}
                    editable={true}
                    flex={0.8}
                />
            </Row>

            <Row>
                <Record
                    recordTitle="Room Name"
                    recordValue={fields.name}
                    editMode={isEditMode}
                    editable={true}
                    onRecordUpdate={onFieldChange('name')}
                    onClearValue={() => onFieldChange('name')('')}
                    flex={0.5}
                />
            </Row>

            <Footer
                hasActionButton={true}
                hasActions={false}
                hasPaginator={false}
            />
        </>
    );
}

StorageDetailsTab.propTypes = {};
StorageDetailsTab.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 24,
        // paddingTop: 32
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 20,
        marginTop: 10,
    },
    textLabel: {
        color: '#718096',
        marginBottom: 12,
        fontSize: 16,
        fontWeight: 'normal',
    },
    textDefault: {
        color: '#323843',
        fontSize: 16,
        fontWeight: 'normal',
    },
    textLink: {color: '#3182CE'}
});

export default StorageDetailsTab;
