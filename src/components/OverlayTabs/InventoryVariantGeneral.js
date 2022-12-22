import React, {useEffect, useRef, useState, useContext} from 'react';
import {View} from 'react-native';

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {useModal} from 'react-native-modalfy';
import Record from '../common/Information Record/Record';
import ComponentRecord from '../common/Information Record/ComponentRecord';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import LevelIndicator from '../common/LevelIndicator/LevelIndicator';

import {currencyFormatter} from '../../utils/formatter';
import Footer from '../common/Page/Footer';
import {PageContext} from '../../contexts/PageContext';
import {getInventoriesGroup, updateInventoryVariantCall} from '../../api/network';
import ConfirmationComponent from '../ConfirmationComponent';
import {setInventory} from '../../redux/actions/InventorActions';
import {connect, useDispatch} from 'react-redux';

const VariantGeneralWrapper = styled.View`
  flex: 1;
`;
const VariantGeneralContainer = styled.View`
  height: 100%;
  width: 100%;
`;

function InventoryVariantGeneral({
                                     inventoryVariant = {},
                                     selectedData = {},
                                     onUpdateItem = () => {
                                     },
                                     // isEditMode,
                                     // fields = {},
                                     // errorFields={},
                                     // onFieldChange = ()=>{}
                                 }) {

    const baseStateRef = useRef();
    const modal = useModal();

    const {pageState, setPageState} = useContext(PageContext);
    const {isEditMode} = pageState;
    const dispatch = useDispatch();
    const {name = '', inventoryGroup = {}, unitCost = 0, storageLocations = [], sku = '', _id} = inventoryVariant;
    const {description = '', category = [], unitOfMeasurement = '',} = inventoryGroup;
    const {stock = 0, levels = {}} = selectedData;
    const suppliers = [];

    console.log('inventoryVariant', inventoryVariant);

    const [fields, setFields] = useState({
        description,
        name,
        unitCost,
        unitOfMeasurement
    });
    const [errorFields, setErrorFields] = useState({});
    const [isUpdated, setUpdated] = useState(false);
    const [unitPriceText, setUnitPriceText] = useState(unitCost);

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });
        setUpdated(true);
        const updatedErrors = {...errorFields};
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);
    };

    useEffect(() => {
        baseStateRef.current = {
            name,
            unitCost,
            unitOfMeasurement,
            description,
        };
        return () => {
            baseStateRef.current = {};
        };
    }, []);



    useEffect(() => {
        setFields({
            description,
            name,
            unitCost,
            unitOfMeasurement
        })
    }, [inventoryVariant]);


    useEffect(() => {
        if (isUpdated && !isEditMode) {
            onFinishEdit();
        }
    }, [isEditMode]);

    const onFinishEdit = () => {
        const isValid = validateUpdate();

        if (!isValid) {
            return;
        }

        modal.openModal('ConfirmationModal', {
            content: (
                <ConfirmationComponent
                    error={false}//boolean to show whether an error icon or success icon
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeAllModals();
                        resetState();
                    }}
                    onAction={() => {
                        modal.closeAllModals();
                        updateVariant();
                    }}
                    message="Do you want to save changes?"//general message you can send to be displayed
                    action="Yes"
                />
            ),
            onClose: () => {
                console.log('Modal closed');
            },
        });
    };
    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    };

    const validateUpdate = () => {
        let isValid = true;
        const requiredFields = ['name', 'unitCost'];

        const errorObj = {...errorFields} || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                // console.log(`${requiredField} is required`)
                isValid = false;
                errorObj[requiredField] = 'Value is required.';
            } else {
                delete errorObj[requiredField];
            }
        }

        setErrorFields(errorObj);
        return isValid;
    };


    const fetchInventory = () => {
        getInventoriesGroup()
            .then(inventoryResult => {
                const {data = [], pages = 0} = inventoryResult;
                dispatch(setInventory(data));
            })
            .catch(error => {
                // handle error
                console.log('Failed to fetch inventory', error);
            })
            .finally(_ => {

            });
    };
    const updateVariant = () => {
        const groupId = inventoryGroup?._id;

        updateInventoryVariantCall(_id, groupId, fields)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            error={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                setTimeout(() => {
                                    fetchInventory()
                                }, 100)
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
                console.log('Failed to update theatre', error);
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
                onUpdateItem()

            });
    };

    const onUnitPriceChange = value => {
        const price = value.replace(/[^0-9.]/g, ''); // strip on non-numeric values

        if (!isNaN(price)) {
            onFieldChange('unitCost')(parseFloat(price));
        } else {
            onFieldChange('unitCost')('')
        }
        // if (/^\d+(\.\d{1,2})?$/g.test(price) || /^\d+$/g.test(price) || !price) {
        //     onFieldChange('unitCost')(parseFloat(price));
        // }

        // if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(price) || !price) {
        //     setUnitPriceText(price);
        // }
    };


    return (
        <VariantGeneralWrapper>
            <VariantGeneralContainer>

                <>
                    <Row>
                        <Record
                            recordTitle="Item Name"
                            recordValue={fields.name}
                            editMode={isEditMode}
                            editable={true}
                            onRecordUpdate={onFieldChange('name')}
                            onClearValue={() => {
                                onFieldChange('name')('');
                            }}
                        />

                        <Record
                            recordTitle="SKU"
                            recordValue={sku}
                        />

                        <Record
                            recordTitle="Last Received"
                            recordValue="n/a"
                        />

                    </Row>

                    <Row>

                        <Record
                            recordTitle="Unit"
                            recordValue={fields.unitOfMeasurement}
                            editable={true}
                            editMode={isEditMode}
                            onRecordUpdate={onFieldChange('unitOfMeasurement')}
                            onClearValue={() => {
                                onFieldChange('unitOfMeasurement')('');
                            }}
                        />

                        <Record
                            recordTitle="Unit Price"
                            recordValue={ isEditMode
                                ? fields.unitCost.toString()
                                : `$ ${currencyFormatter(fields.unitCost)}`
                            }
                            editMode={isEditMode}
                            editable={true}
                            onRecordUpdate={value => onUnitPriceChange(value)}
                            onClearValue={() => onUnitPriceChange('')}
                        />

                        <Record
                            recordTitle="In-stock"
                            recordValue={stock}
                        />

                    </Row>

                    <Row>

                        <ComponentRecord
                            recordTitle="Capacity"
                            flex={0.5}
                            content={(
                                <LevelIndicator
                                    max={levels.max}
                                    min={0}
                                    level={stock}
                                    ideal={levels.ideal}
                                    critical={levels.critical}

                                />
                            )}
                        />

                        <ListTextRecord

                            recordTitle="Suppliers"
                            values={suppliers}
                        />

                    </Row>

                </>

                <Footer
                    hasActions={false}
                    hasPaginator={false}
                    hasActionButton={true}
                />
            </VariantGeneralContainer>
        </VariantGeneralWrapper>
    );
}

export default InventoryVariantGeneral;
