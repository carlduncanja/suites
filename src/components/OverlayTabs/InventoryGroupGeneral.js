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
    const categories = inventoryGroup?.categories || []
    const theme = useTheme();
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

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
        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.
        const search = _.debounce(fetchCategories, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchCategories = () => {
        getCategories(categorySearchValue, 5)
            .then((categoryData = []) => {

                // console.log("Data: ", data)

                setCategorySearchResult(categoryData || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get Suppliers", error);
                setCategorySearchResult([]);
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

                <Record
                        recordTitle="Categories"
                        recordValue={categories.map(x => x.name).join(', ')}
                        flex={0.8}
                    />
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
