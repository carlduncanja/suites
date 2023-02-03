import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { connect } from 'react-redux';
import _ from 'lodash';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import DialogTabs from '../common/Dialog/DialogTabs';
import InputField2 from '../common/Input Fields/InputField2';

import { formatDate } from '../../utils/formatter';

import { createEquipmentType, getEquipmentTypes, getCategories, addCategory } from '../../api/network';
import { addEquipmentType } from '../../redux/actions/equipmentTypesActions';
import ConfirmationComponent from '../ConfirmationComponent';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addWorkItem
 * @returns {*}
 * @constructor
 */

const CreateEquipmentTypeDialogContainer = ({
    onCancel,
    onCreated,
    equipmentTypes,
    addEquipmentType,
}) => {
    const modal = useModal();
    const dialogTabs = ['Details'];
    const selectedIndex = 0;

    const [positiveText, setPositiveText] = useState('DONE');
    const [equipmentTypeArray, setequipmentTypeArray] = useState([
        equipmentTypes,
    ]);

    // Category Search
    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);

    const [fields, setFields] = useState({
        name: '',
        unitPrice: '',
    });

    const [errorFields, setErrorFields] = useState({
        name: false,
        unitPrice: false,
    });

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value,
        });
    };

    const [unitPriceText, setUnitPriceText] = useState(fields.unitPrice);

    useEffect(() => {
        fetchCategories();
    }, [categorySearchValue])

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveButtonPress = () => {
        console.log('clicked done!');
        modal.closeAllModals();
        let isNameError = errorFields.name;
        let isPriceError = errorFields.unitPrice;

        fields.name === '' || null ?
            (isNameError = true) :
            (isNameError = false);
        fields.unitPrice === '' || null ?
            (isPriceError = true) :
            (isPriceError = false);

        setErrorFields({
            ...errorFields,
            name: isNameError,
            unitPrice: isPriceError,
        });

        if (isNameError === false && isPriceError === false) {
            console.log('Success: ', fields);
            createEquipmentTypeCall();
        }
    };

    const handleUnitPrice = price => {
        if (/^-?[0-9][0-9.]+$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('unitPrice')(price);
        }
        setUnitPriceText(price);
    };

    const fetchCategories = () => {
        getCategories("equipment", 1000, categorySearchValue)
            .then(data => {
                setCategorySearchResult(data.data.map(item => { return item.name }));
                categories.length == 0 && setCategories(data.data);
            })
            .catch(error => {
                console.log('Unable to retrieve iventory category items: ', error);
            });
    }

    const createCategory = (name) => {
        if(!name) return;
        addCategory({ name: name, type: "equipment" })
            .then(_ => {
                setCategories([]);
                fetchCategories();
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
            })
            .catch(error => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    },
                });
                console.log(error);
            })
    }

    const handleCategorySelected = (checkCategories) => {
        const categoryIds = [];
        checkCategories.map((name) => {
            const value = categories.find(item => item.name === name);
            value && categoryIds.push(value._id);
        })
        onFieldChange('categories')(categoryIds)
    }

    const getDialogContent = () => (
        <View>
            <Row>
                <FieldContainer>
                    <InputField2
                        label="Equipment"
                        onChangeText={onFieldChange('name')}
                        value={fields.name}
                        onClear={() => onFieldChange('name')('')}
                        hasError={errorFields.name}
                        errorMessage="Name must be filled."
                    />
                </FieldContainer>
                <FieldContainer>
                <FieldContainer>
                    <InputField2
                        label="Unit Price"
                        onChangeText={value => {
                            handleUnitPrice(value);
                        }}
                        value={unitPriceText}
                        keyboardType="number-pad"
                        onClear={() => handleUnitPrice('')}
                        hasError={errorFields.unitPrice}
                        errorMessage="Price must be provided."
                    />
                </FieldContainer>
                </FieldContainer>
            </Row>
            <Row>
                <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={(value) => handleCategorySelected(value)}
                        options={categorySearchResults}
                        createNew={() => createCategory(categorySearchValue)}
                        searchText={categorySearchValue}
                        onSearchChangeText={(value) => setCategorySearchValue(value)}
                        onClear={() => { setCategorySearchValue('') }}
                        handlePopovers={() => { }}
                        isPopoverOpen={true}
                        height={125}
                        
                    />
            </Row>
        </View>
    );

    const createEquipmentTypeCall = () => {
        createEquipmentType(fields)
            .then(data => {
                //addEquipment(data);
                addEquipmentType(data);
                modal.closeAllModals();
                setTimeout(() => {
                    modal.openModal('ConfirmationModal', {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={false}
                            onCancel={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCreated();
                                }, 200);
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                setTimeout(() => {
                                    onCreated();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        },
                    });
                });
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
                // todo handle error
                // Alert.alert('Failed','Failed to create a new item.')
                // console.log('failed to create equipment type', error);
            })
            .finally(_ => {
                modal.closeAllModals();
            });
    };

    return (
        <OverlayDialog
            title="Create Equipment Group"
            onPositiveButtonPress={onPositiveButtonPress}
            onClose={handleCloseDialog}
            positiveText={positiveText}
            footerIndex={1}
        >
            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />

                <OverlayDialogContent height={210}>
                    {getDialogContent()}
                </OverlayDialogContent>
            </>

        </OverlayDialog>
    );
};

CreateEquipmentTypeDialogContainer.propTypes = {};
CreateEquipmentTypeDialogContainer.defaultProps = {};

const mapDispatchToProp = {
    addEquipmentType,
};

export default connect(
    null,
    mapDispatchToProp
)(CreateEquipmentTypeDialogContainer);

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
        marginBottom: 20,
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
});
