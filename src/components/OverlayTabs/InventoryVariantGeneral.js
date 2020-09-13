import React, {useEffect, useRef, useState} from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ComponentRecord from '../common/Information Record/ComponentRecord';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import LevelIndicator from "../common/LevelIndicator/LevelIndicator";


import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { currencyFormatter } from '../../utils/formatter';
import Footer from '../common/Page/Footer';
import {useModal} from "react-native-modalfy";
import {updateInventoryGroupCall, updateInventoryVariantCall} from "../../api/network";
import ConfirmationComponent from "../ConfirmationComponent";

const VariantGeneralWrapper = styled.View`
    flex:1;
`;
const VariantGeneralContainer = styled.View`
    height : 100%;
    width : 100%;
`;

function InventoryVariantGeneral({ inventoryVariant = {}, selectedData = {} , isEditMode}){

    const baseStateRef = useRef();
    const modal = useModal();

    const { name = "", inventoryGroup = {}, unitCost = 0, storageLocations = [], sku = "" } = inventoryVariant;
    const { description = "", category = [], unitOfMeasurement = "", } = inventoryGroup;
    const { stock = 0, levels = {} } = selectedData;
    let suppliers = [];

    const [fields, setFields] = useState({
        description,
        name
    });

    //const [isLoading, setLoading] = useState(false);
    const [isUpdated, setUpdated] = useState(false)

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
        setUpdated(true)
    };

    useEffect(() => {
        baseStateRef.current = {
            description,
        }
        return () => {
            baseStateRef.current = {}
        }
    }, [])

    useEffect(() => {
        if (isUpdated && !isEditMode) {
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        error={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            modal.closeAllModals();
                            resetState()
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
        }
    }, [isEditMode])


    const resetState = () => {
        setFields(baseStateRef.current);
        setUpdated(false);
    }

    const updateVariant = () => {
        updateInventoryVariantCall(_id, fields)
            .then( _ => {
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
                console.log("Failed to update theatre", error)
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
                                resetState()
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
            .finally()
    }


    return(
        <VariantGeneralWrapper>
            <VariantGeneralContainer>

                <>
                    <Row>
                        <Record
                            recordTitle = "Description"
                            recordValue = {description}
                            flex = {0.8}
                            editMode = {isEditMode}
                            editable = {true}
                            useTextArea ={true}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "SKU"
                            recordValue = {sku}
                            editMode = {isEditMode}
                            editable = {true}
                        />

                        <ListTextRecord
                            recordTitle = "Category"
                            values = {category}

                        />

                        <Record
                            recordTitle = "Last Received"
                            recordValue = {"n/a"}
                            editMode = {isEditMode}
                            editable = {true}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "In-stock"
                            recordValue = {stock}
                        />

                        <ComponentRecord
                            recordTitle = "Capacity"
                            content = {
                                <LevelIndicator
                                    max={levels.max}
                                    min={0}
                                    level={stock}
                                    ideal={levels.ideal}
                                    critical={levels.critical}

                                />
                            }
                        />

                        <Record
                            recordTitle = "Next Re-stock"
                            recordValue = {"n/a"}
                        />
                    </Row>

                    <Row>
                        <Record
                            recordTitle = "Unit"
                            recordValue = {unitOfMeasurement}
                        />

                        <Record
                            recordTitle = "Unit Price"
                            recordValue = {`$ ${currencyFormatter(unitCost)}`}
                            editMode = {isEditMode}
                            editable = {true}
                        />

                        <ListTextRecord
                            recordTitle = "Suppliers"
                            values = {suppliers}
                        />
                    </Row>
                </>

                <Footer
                    hasActions = {false}
                    hasPaginator = {false}
                    hasActionButton = {true}
                />
            </VariantGeneralContainer>
        </VariantGeneralWrapper>
    )
}

export default InventoryVariantGeneral
