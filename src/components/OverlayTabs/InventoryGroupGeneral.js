import React, { useContext, useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

import Record from '../common/Information Record/Record';
import ListTextRecord from '../common/Information Record/ListTextRecord';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import InputField2 from '../common/Input Fields/InputField2';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { PageContext } from '../../contexts/PageContext';
import { updateInventoryGroupById, getCategories } from '../../api/network';
import TextArea from '../common/Input Fields/TextArea';
import ConfirmationComponent from '../ConfirmationComponent';
import Footer from '../common/Page/Footer';
import { useModal } from 'react-native-modalfy';
import MultipleSearchableOptionsField from '../common/Input Fields/MultipleSearchableOptionsField';
import _ from "lodash";
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
const FieldWrapper = styled.View`
    flex: 0.5;
    margin-bottom : ${({ isEditMode }) => isEditMode ? `32px` : 0};
`;

function InventoryGroupGeneral({
    inventoryGroup = {},
    onUpdate = () => { },
    fields = {},
    errorFields = {},
    onFieldChange = () => { },
    groupCategories = [],
    handleCategories = () => { }
}) {

    const baseStateRef = useRef();

    const { description = "", name = "" } = inventoryGroup;
    //const categories = inventoryGroup?.categories || []
    const theme = useTheme();
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [initialCategories, setInitialCategpries] = useState(categories.map(category => category._id))
    const [categorySearchQuery, setCategorySearchQuery] = useState({});


    useEffect(() => {
        baseStateRef.current = {
            description,
            categories,
            name
        };
        return () => {
            baseStateRef.current = {};
        };
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [categorySearchValue]);

    const fetchCategories = () => {
        getCategories("inventory", 1000, categorySearchValue)
        .then(data => {
            setCategorySearchResult(data.data.map(item => { return item.name }));
            categories.length == 0 && setCategories(data.data)
        })
            .catch(error => {
                console.log('Unable to retrieve iventory category items: ', error);
            });
    };

    const onSelectShownItem = (item) => {
        let updatedCategories = [...groupCategories];
        updatedCategories = updatedCategories.filter(category => category !== item);
        handleCategories(updatedCategories);
        console.log("Categories: ", updatedCategories);
    }

    const onCategorySelect = (item) => {
        let updatedCategories = []
        groupCategories.includes(item) ?
            updatedCategories = updatedCategories.filter(category => category !== item)
            :
            updatedCategories = [...groupCategories, item]

        // onFieldChange('category')(updatedCategories);
        console.log("Updated categores: ", updatedCategories);
        handleCategories(updatedCategories);
    };
    const createCategory = (name) => {
        if (!name) return;
        addCategory({ name: name, type: "inventory" })
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

    return (
        <>
            <Row>

                <Record
                    recordTitle="Group Name"
                    recordValue={fields['name']}
                    editMode={isEditMode}
                    editable={true}
                    onRecordUpdate={onFieldChange('name')}
                    onClearValue={() => { onFieldChange('name')(''); console.log("Clear") }}
                    flex={0.5}
                />
            </Row>

            <Row>

                <Record
                    recordTitle="Description"
                    recordValue={fields['description']}
                    onClearValue={() => onFieldChange('description')('')}
                    onRecordUpdate={onFieldChange('description')}
                    useTextArea={true}
                    editMode={isEditMode}
                    editable={true}
                    flex={0.8}
                />

            </Row>

            <Row>
                {isEditMode ? 
                    <MultipleSelectionsField
                    label={"Category"}
                    value={categories.map(x=> x.name)}
                    onOptionsSelected={(value) => handleCategorySelected(value)}
                    options={categorySearchResults}
                    createNew={() => createCategory(categorySearchValue)}
                    searchText={categorySearchValue}
                    onSearchChangeText={(value) => setCategorySearchValue(value)}
                    onClear={() => { setCategorySearchValue('') }}
                    handlePopovers={() => { }}
                    isPopoverOpen={true}
                /> :
                <Record
                        recordTitle="Categories"
                        recordValue={categories.map(x => x.name).join(', ')}
                        flex={0.8}
                    />
                }
                
            </Row>

            <Footer
                hasActions={false}
                hasPaginator={false}
                hasActionButton={true}
            />


        </>
    );
}

export default InventoryGroupGeneral;
