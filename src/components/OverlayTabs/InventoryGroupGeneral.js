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
import { useModal } from 'react-native-modalfy';
import MultipleSearchableOptionsField from '../common/Input Fields/MultipleSearchableOptionsField';
import _ from "lodash";
import Footer from '../common/Page/Footer';

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

    const { description = "", categories = [], name = "" } = inventoryGroup;
    const theme = useTheme();
    const modal = useModal();
    const { pageState, setPageState } = useContext(PageContext);
    const { isEditMode } = pageState;

    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [initialCategories, setInitialCategpries] = useState(categories.map(category => category._id))
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    console.log('categories are', categories)

    // const [isUpdated, setIsUpdated] = useState(false);
    // const [fields, setFields] = useState({
    //     description,
    //     name
    // });
    // const [errorFields, setErrorFields] = useState({});

    // useEffect(()=>{
    //     if(isUpdated && isEditMode === false){
    //         onFinishEdit();
    //     }
    // },[isEditMode])

    useEffect(() => {
        baseStateRef.current = {
            description,
            categories,
            name
        }
        return () => {
            baseStateRef.current = {}
        }
    }, [])

    useEffect(() => {
        // console.log("Search: ", supplierSearchValue)
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
            })
    };


    // const onFieldChange = (fieldName) => (value) => {
    //     const updatedFields = {...fields}
    //     setFields({
    //         ...updatedFields,
    //         [fieldName]: value
    //     })
    //     setIsUpdated(true);
    //     const updatedErrors = {...errorFields}
    //     delete updatedErrors[fieldName]
    //     setErrorFields(updatedErrors)

    // };

    // const resetState = () => {
    //     setFields(baseStateRef.current);
    //     setIsUpdated(false);
    // }

    // const onFinishEdit = () =>{
    //     let isValid = validateUpdate();

    //     if(!isValid){ return }

    //     goToConfirmationScreen();
    // }

    // const validateUpdate = () => {
    //     let isValid = true
    //     let requiredFields = ['name']

    //     let errorObj = {...errorFields} || {}

    //     for (const requiredField of requiredFields) {
    //         if(!fields[requiredField]){
    //             // console.log(`${requiredField} is required`)
    //             isValid = false
    //             errorObj[requiredField] = "Value is required.";
    //         }else{
    //             delete errorObj[requiredField]
    //         }
    //     }

    //     setErrorFields(errorObj)
    //     return isValid
    // }

    // const goToConfirmationScreen = () => {
    //     modal.openModal('ConfirmationModal',
    //         {
    //             content: <ConfirmationComponent
    //                 isEditUpdate = {true}
    //                 onCancel = {()=> {
    //                     modal.closeModals('ConfirmationModal');
    //                     setPageState({
    //                         ...pageState,
    //                         isEditMode : true
    //                     });
    //                 }}
    //                 onAction = {()=>updateInventoryGroup()}
    //                 message = "Do you want to save your changes?"
    //             />
    //             ,
    //             onClose: () => {modal.closeModals('ConfirmationModal')}
    //         })
    // }

    // const updateInventoryGroup = () => {
    //     let updatedGroup = {
    //         ...inventoryGroup,
    //         description : fields['description'],
    //         name : fields['name'],
    //     }
    //     updateInventoryGroupById(inventoryGroup?._id, updatedGroup)
    //         .then(data => {
    //             // addInventory(data)
    //             modal.closeAllModals();
    //             modal.openModal('ConfirmationModal',
    //             {
    //                 content: <ConfirmationComponent
    //                     isEditUpdate = {false}
    //                     isError = {false}
    //                     onCancel = {()=> modal.closeModals('ConfirmationModal')}
    //                     onAction = {()=> modal.closeModals('ConfirmationModal')}
    //                 />
    //                 ,
    //                 onClose: () => {modal.closeModals('ConfirmationModal')}
    //             })
    //         })
    //         .catch(error => {
    //             // todo handle error
    //             console.log("failed to update inventory group", error);
    //             modal.openModal('ConfirmationModal',
    //             {
    //                 content: <ConfirmationComponent
    //                     isEditUpdate = {false}
    //                     isError = {true}
    //                     onCancel = {()=> modal.closeModals('ConfirmationModal')}
    //                     onAction = {()=>modal.closeModals('ConfirmationModal')}
    //                 />
    //                 ,
    //                 onClose: () => {modal.closeModals('ConfirmationModal')}
    //             })
    //             // Alert.alert("Failed", "failed to create inventory group")
    //         })
    //         .finally(_=>{
    //             onUpdate();
    //         })
    //         // console.log("Save data: ", updatedGroup);
    //     // console.log("Group: ", inventoryGroup);
    // }

    const onSelectShownIten = (item) => {
        let updatedCategories = [...groupCategories];
        updatedCategories = updatedCategories.filter(category => category !== item);
        // updatedCategories.pop();
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
    }

    return (
        <>
            <Row>
                {/* <FieldWrapper isEditMode> */}
                <Record
                    recordTitle="Group Name"
                    recordValue={fields['name']}
                    editMode={isEditMode}
                    editable={true}
                    onRecordUpdate={onFieldChange('name')}
                    onClearValue={() => { onFieldChange('name')(''); console.log("Clear") }}
                    flex={0.5}
                />
                {/* </FieldWrapper> */}


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

                <ListTextRecord
                    recordTitle="Category"
                    titleStyle={'--text-xs-medium'}
                    values={initialCategories}
                    editMode={isEditMode}
                    text={categorySearchValue}
                    oneOptionsSelected={(item) => { onCategorySelect(item); }}
                    onChangeText={value => { setCategorySearchValue(value) }}
                    onClear={() => {
                        setCategorySearchValue('');
                    }}
                    onSelectShownIten={onSelectShownIten}
                    selectedItems={groupCategories}
                    options={categorySearchResults}
                    handlePopovers={() => { }}
                    isPopoverOpen={categorySearchQuery}
                    maxNumItemsShown={4}

                />

                {/* <Record
                    recordTitle="Category"
                    recordValue={fields['categories']}
                    onClearValue={() => onFieldChange('categories')('')}
                    onRecordUpdate={onFieldChange('categories')}
                    editMode={isEditMode}
                    editable={true}
                    flex={0.8}
                />

            </Row> */}


            </Row>

            {/* {
                    isEditMode ?

                    <MultipleSearchableOptionsField
                        text={categorySearchValue}
                        oneOptionsSelected={(item) => {onCategorySelect(item);}}
                        onChangeText={value => {setCategorySearchValue(value)}}
                        onClear={() => {
                            setCategorySearchValue('');
                        }}
                        onSelectShownIten = {onSelectShownIten}
                        selectedItems = {groupCategories}
                        options={categorySearchResults}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {categorySearchQuery}
                        maxNumItemsShown = {4}
                    />
                    :

                    <ListTextRecord
                        recordTitle = "Category"
                        values = {categories}
                    />
                } */}


            <Footer
                hasActions={false}
                hasPaginator={false}
                hasActionButton={true}
            />

        </>
    )
}

export default InventoryGroupGeneral
