import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker, Alert, TouchableOpacity} from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import {useModal} from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import AutoFillField from "../common/Input Fields/AutoFillField";

import {connect} from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import {createInventoryGroup, getInventories, getCategories, getSuppliers,} from "../../api/network";
import { addInventory } from "../../redux/actions/InventorActions";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import TextArea from '../common/Input Fields/TextArea';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import ConfirmationComponent from '../ConfirmationComponent';
import _ from "lodash";

import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import OverlayDialogContent from '../common/Dialog/OverlayContent';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

 
const Divider = styled.View`
    border-width : 1px;
    border-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    margin-top : ${ ({theme}) => theme.space['--space-20']};
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

function CreateInventoryGroupDialogContainer({onCancel, onCreated}) {

    // ######### CONST
    const modal = useModal();
    const dialogTabs = ['Details'];
    const theme = useTheme();

    // ######### STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);

    const [fields, setFields] = useState({});
    const [errorFields, setErrorFields] = useState({})
    const [popoverList, setPopoverList] = useState([
        {
            name : "category",
            status : false
        }
    ])

    // Category Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});


    // ######### LIFECYCLE FUNCTIONS

    // Handle category search
    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            setCategorySearchResult([]);
            if (categorySearchQuery.cancel) categorySearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchCategory, 300);

        setCategorySearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [categorySearchValue]);

    const fetchCategory = () => {
        getCategories(categorySearchValue,5)
            .then((data = [])=>{
                const results = data.map(item => ({
                    _id : item,
                    name : item
                }));
                setCategorySearchResult(results || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }

    // ######### EVENT HANDLERS

    const handlePopovers = (popoverValue) => (popoverItem) =>{

        if(!popoverItem){
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})

            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers)
        }

    }

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        console.log("Clicked")
        let isValid = validateGroup()

        if(!isValid){ return }

        goToConfirmationScreen()
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })

        const updatedErrors = {...errorFields}
        delete updatedErrors[fieldName]
        setErrorFields(updatedErrors)

    };

    const validateGroup = () => {
        let isValid = true
        let requiredFields = ['name']
    
        let errorObj = {...errorFields} || {}

        for (const requiredField of requiredFields) {
            if(!fields[requiredField]){
                // console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            }else{
                delete errorObj[requiredField]
            }
        }

        setErrorFields(errorObj)
        console.log("Error obj: ", errorObj)

        return isValid
    }

    const goToConfirmationScreen = () =>{
        setTimeout(() => {

            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {true}
                            onCancel = {()=> modal.closeModals('ConfirmationModal')}
                            onAction = {onActionSave}
                            message = "Do you want to save your changes?"
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
        }, 200)
    };

    const onActionSave = () => {
        createGroupCall()
    };

    const errorScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate = {false}
                            isError = {true}
                            onCancel = {()=> modal.closeAllModals()}
                            message = "There was an issue performing this action"
                        />
                        ,
                        onClose: () => {modal.closeModals('ConfirmationModal')} 
                    })
        }, 200)
    }

    const createGroupCall = () => {
        createInventoryGroup(fields)
            .then(data => {
                // addInventory(data)
                modal.closeAllModals();
                setTimeout(() => {
                    onCreated(data)
                }, 400);
            })
            .catch(error => {
                // todo handle error
                console.log("failed to create inventory group", error);
                errorScreen()
                // Alert.alert("Failed", "failed to create inventory group")
            })
            .finally()
    };

    const detailsTab = (

        <OverlayDialogContent>

            <Row>
                <FieldContainer>
                    <AutoFillField
                        label = "Reference"
                        value = "No Data"
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Item Name"}
                        onChangeText={onFieldChange('name')}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError = {errorFields['name']}
                        errorMessage = "Name must be filled."
                    />
                </FieldContainer>
            </Row>

            {/* <Row>
                <FieldContainer>
                    <MultipleSelectionsField
                        label={"Category"}
                        onOptionsSelected={onFieldChange('category')}
                        options = {categorySearchResults}
                        searchText = {categorySearchValue}
                        onSearchChangeText = {(value)=> setCategorySearchValue(value)}
                        onClear={()=>{setCategorySearchValue('')}}
                        handlePopovers = {(value)=>handlePopovers(value)('category')}
                        isPopoverOpen = {categorySearchQuery}
                    />
                </FieldContainer>
            </Row> */}

            <Divider theme = {theme}/>

            <Row zIndex={-1}>

                <FieldContainer>
                    <InputField2
                        label={"Unit"}
                        onChangeText={onFieldChange('unit')}
                        value={fields['unit']}
                        onClear={() => onFieldChange('unit')('')}
                    />
                </FieldContainer>

                <FieldContainer>
                    <OptionsField
                        label={"Unit of Measure"}
                        text={fields['unitOfMeasurement']}
                        oneOptionsSelected={onFieldChange('unitOfMeasurement')}
                        menuOption={<MenuOptions>
                            <MenuOption value={'Glove Boxes'} text='Glove Boxes'/>
                            <MenuOption value={'Pack'} text='Pack'/>
                        </MenuOptions>}
                    />
                </FieldContainer>
            </Row>

            <Row zIndex={-1}>
                <FieldContainer>
                    <InputUnitField
                        label={"Markup"}
                        onChangeText={(value)=>{
                            if (/^\d+\.?\d{0,2}$/g.test(value) || !value) {
                                onFieldChange('markup')(value)
                            }
                        }}
                        value={fields['markup']}
                        units={['%']}
                        keyboardType="number-pad"
                    />
                </FieldContainer>
            </Row>

        </OverlayDialogContent>
    );

    return (
        <OverlayDialog
            title={"Create Group"}
            onPositiveButtonPress={onPositiveClick}
            onClose={handleCloseDialog}
            positiveText={"DONE"}
            // handlePopovers = {handlePopovers}
            // buttonIcon={<ArrowRightIcon/>}
        >

            <>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                />
                {/* <TouchableOpacity
                    onPress = {()=>handlePopovers(false)()}
                    activeOpacity = {1}
                > */}
                    {detailsTab}
                {/* </TouchableOpacity> */}

            </>


        </OverlayDialog>
    );
}

CreateInventoryGroupDialogContainer.propTypes = {};
CreateInventoryGroupDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height:200,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        // padding: 24,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 20
    },

    inputWrapper: {
        // flex: 1,
        width: 260, 
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },

});

const mapDispatcherToProps = {
    addInventory
};

export default connect(null, mapDispatcherToProps)(CreateInventoryGroupDialogContainer);
