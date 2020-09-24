import React, {useState, useEffect, useContext} from "react";
import {View, Text, StyleSheet} from "react-native";
import Record from '../common/Information Record/Record';
import ResponsiveRecord from '../common/Information Record/ResponsiveRecord';
import Row from '../common/Row';
import LineDivider from '../common/LineDivider';

import {transformToSentence} from "../../utils/formatter";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import {PageContext} from "../../contexts/PageContext";
import {Input} from "react-native-elements";
import InputLabelComponent from "../common/InputLablel";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import _ from "lodash";
import {getInventories, getInventoriesGroup, updateSupplierProductsCall} from "../../api/network";
import {useModal} from "react-native-modalfy";
import ConfirmationComponent from "../ConfirmationComponent";
import LoadingIndicator from "../common/LoadingIndicator";

const LineDividerContainer = styled.View`
    margin-bottom : ${({theme}) => theme.space['--space-32']};
`;


const InputWrapper = styled.View`
    flex: 1;
    height: 46px;
    //position: relative;
    //flex-direction: column;
    //align-items: flex-start;
    //justify-content: flex-start;
    //z-index: ${({zIndex}) => zIndex};
    margin-right: 8px;
`


const RowWrapper = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: ${({theme}) => theme.space['--space-20']};
    margin-bottom: ${({theme}) => theme.space['--space-20']};
    z-index: ${({zIndex}) => zIndex};
`


const SupplierProductsDetailsTab = ({
                                        supplierId, product, isEdit, onUpdate = () => {
    }
                                    }) => {

    const pageState = useContext(PageContext)
    const modal = useModal();
    const theme = useTheme();

    const {
        _id,
        sku,
        name,
        inventoryVariant = {},
        unitPrice = 0
    } = product


    // Inventory Search
    const [inventorySearchValue, setInventorySearchValue] = useState();
    const [inventorySearchResults, setInventorySearchResult] = useState([]);
    const [inventorySearchQuery, setInventorySearchQuery] = useState({});

    const [isLoading, setLoading] = useState(false);
    const [isUpdated, setUpdated] = useState(false);
    const [fields, setFields] = useState({
        sku,
        name,
        inventoryVariant,
        unitPrice,
    })


    // Handle inventories search
    useEffect(() => {
        // console.log("Search: ", inventorySearchValue)
        if (!inventorySearchValue) {
            // empty search values and cancel any out going request.
            setInventorySearchResult([]);
            if (inventorySearchQuery.cancel) inventorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchInventories, 300);

        setInventorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [inventorySearchValue]);


    useEffect(() => {
        if (!isEdit && isUpdated) {

            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={false}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}
                        onCancel={() => {
                            modal.closeAllModals();
                        }}
                        onAction={() => {
                            modal.closeAllModals();
                            updateProduct()
                        }}
                        message={"Would you like to finish editing and save changes?"}
                        action="Yes"
                    />
                ),
                onClose: () => {
                    console.log('Modal closed');
                },
            });
        }
    }, [isEdit])

    const fetchInventories = () => {
        getInventories(inventorySearchValue, 5)
            .then((inventoryResults = {}) => {
                const {data = [], pages = 0} = inventoryResults
                const results = data.map(item => ({
                    ...item
                }));

                setInventorySearchResult(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories", error);
                setInventorySearchResult([]);
            })
    };

    const onRecordUpdate = (field) => (value) => {
        setUpdated(true);

        console.log(field, value);
        setFields({
            ...fields,
            [field]: value
        })
    }

    const updateProduct = () => {

        const data = {
            inventoryVariantId: fields.inventoryVariant?._id,
            unitPrice: fields.unitPrice,
            sku: fields.sku,
            name: fields.name,
        }

        setLoading(true)
        updateSupplierProductsCall(supplierId, _id, data)
            .then(response => {
                onUpdate(data)
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                // resetState()
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();

                            }}
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .catch(error => {
                console.log("Failed to update product", error);
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();

                            }}
                            action="Yes"
                        />
                    ),
                    onClose: () => {
                        console.log('Modal closed');
                    },
                });
            })
            .finally(_ => setLoading(false))
    }

    return (
        <>
            <Row theme={theme}>
                <InputWrapper>
                    <Record
                        recordTitle={'Product Name'}
                        recordValue={fields['name']}
                        editMode={isEdit}
                        onRecordUpdate={onRecordUpdate('name')}
                    />
                </InputWrapper>

                <InputWrapper/>
                <InputWrapper/>
            </Row>

            <Row>
                <InputWrapper>
                    <Record
                        recordTitle={'SKU'}
                        recordValue={fields['sku']}
                        editMode={isEdit}
                        onRecordUpdate={onRecordUpdate('sku')}
                    />
                </InputWrapper>


                <InputWrapper>

                    {
                        isEdit
                            ? <InputWrapper>
                                <InputLabelComponent label={"Inventory Reference"}/>
                                <SearchableOptionsField
                                    value={fields['inventoryVariant']}
                                    text={inventorySearchValue}
                                    oneOptionsSelected={(value) => {
                                        onRecordUpdate('inventoryVariant')(value);
                                        setInventorySearchValue('');
                                    }}
                                    onChangeText={setInventorySearchValue}
                                    onClear={() => {
                                        setInventorySearchValue('');
                                    }}
                                    options={inventorySearchResults}
                                    isPopoverOpen={inventorySearchQuery}
                                    errorMessage="Reference must be given."
                                />
                            </InputWrapper>
                            : <Record
                                recordTitle={"Inventory Reference"}
                                recordValue={fields['inventoryVariant'].name}
                                valueColor={'--color-blue-600'}
                            />
                    }
                </InputWrapper>

                <InputWrapper>
                    <Record
                        recordTitle={"Unit Price"}
                        recordValue={fields['unitPrice'] + ""}
                        editMode={isEdit}
                        onRecordUpdate={(value) => {
                            if (!isNaN(value)) onRecordUpdate('unitPrice')(value)
                        }}
                    />
                </InputWrapper>
            </Row>


            {
                isLoading &&
                <LoadingIndicator/>
            }
        </>
    )
}

SupplierProductsDetailsTab.propTypes = {};
SupplierProductsDetailsTab.defaultProps = {};

export default SupplierProductsDetailsTab;

