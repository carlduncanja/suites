import React, {useEffect, useRef, useState} from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import ConfirmationComponent from "../ConfirmationComponent";
import {useModal} from "react-native-modalfy";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import {updateInventoryGroupCall} from "../../api/network";

function InventoryGroupGeneral({ inventoryGroup = {} , isEditMode}){

    const { description = "", categories = [], name, _id} = inventoryGroup
    const baseStateRef = useRef();
    const modal = useModal();

    const [fields, setFields] = useState({
        description,
        categories,
        name
    });


    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});


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
            categories
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
                            updateGroup();
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

    const updateGroup = () => {
        updateInventoryGroupCall(_id, fields)
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
        <>
            <Row>
                <Record
                    recordTitle = "Description"
                    recordValue = {fields['description']}
                    onRecordUpdate = {onFieldChange('description')}
                    editMode = {isEditMode}
                    editable = {true}
                    useTextArea ={true}
                    flex = {0.8}
                />
            </Row>

            <Row>

                <Record
                    recordTitle = "Name"
                    recordValue = {fields['name']}
                    onRecordUpdate = {onFieldChange('name')}
                    editMode = {isEditMode}
                    editable = {true}
                    flex = {0.5}
                />

                <ListTextRecord
                    recordTitle = "Category"
                    // values = {fields['categories']}
                    values = {['hello', "hello again"]}
                    onRecordUpdate = {onFieldChange('categories')}
                    editMode = {isEditMode}
                    editable = {true}
                    flex={0.4}
                />


                {/*<MultipleSelectionsField*/}
                {/*    label={"Category"}*/}
                {/*    onOptionsSelected={onFieldChange('category')}*/}
                {/*    options = {categorySearchResults}*/}
                {/*    searchText = {categorySearchValue}*/}
                {/*    onSearchChangeText = {(value)=> setCategorySearchValue(value)}*/}
                {/*    onClear={()=>{setCategorySearchValue('')}}*/}
                {/*    handlePopovers = {(value)=>handlePopovers(value)('category')}*/}
                {/*    isPopoverOpen = {catPop[0].status}*/}
                {/*/>*/}

            </Row>
        </>
    )
}

export default InventoryGroupGeneral
