import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, Switch, Picker, Alert, TouchableOpacity } from "react-native";
import OverlayDialog from "../common/Dialog/OverlayDialog";
import { useModal } from "react-native-modalfy";
import DialogTabs from "../common/Dialog/DialogTabs";
import InputField2 from "../common/Input Fields/InputField2";
import InputUnitField from "../common/Input Fields/InputUnitFields";
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import OptionsField from "../common/Input Fields/OptionsField";
import AutoFillField from "../common/Input Fields/AutoFillField";
import CreatePageHeader from '../common/DetailsPage/CreatePageHeader';
import CreatePreviousDoneFooter from '../common/DetailsPage/CreatePreviousDoneFooter';
import { addCategory } from '../../api/network'
import { connect } from "react-redux";
import ArrowRightIcon from "../../../assets/svg/arrowRightIcon";
import { createInventoryGroup, getInventories, getCategories, getSuppliers, } from "../../api/network";
import { addInventory } from "../../redux/actions/InventorActions";
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import TextArea from '../common/Input Fields/TextArea';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import ConfirmationComponent from '../ConfirmationComponent';
import _ from "lodash";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import OverlayDialogContent from '../common/Dialog/OverlayContent';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @returns {*}
 * @constructor
 */

const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${({ theme }) => theme.colors['--default-shade-white']}; 
`;
const TabsContainer = styled.View`
    height : 58px;
    justify-content : flex-end;
    background-color: ${({ theme }) => theme.colors['--color-gray-200']};
`;

const ContentWrapper = styled.View`
    height : 800px;
    padding : ${({ theme }) => theme.space['--space-28']};
`;
const ContentContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const FooterWrapper = styled.View`
    position : absolute;
    bottom: 0; 
    left : 0;
    right : 0;
`;

const Divider = styled.View`
    border-width : 1px;
    border-color : ${({ theme }) => theme.colors['--color-gray-300']};
    margin-top : ${({ theme }) => theme.space['--space-20']};
    margin-bottom : ${({ theme }) => theme.space['--space-32']};
`;

function CreateInventoryGroupDialogContainer({ navigation, route }) {

    // ######### CONST
    const { onCancel, onCreated } = route.params;
    const modal = useModal();
    const dialogTabs = ['Details'];
    const theme = useTheme();

    // ######### STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);

    const [fields, setFields] = useState({
        category: '',
        name: '',
        unit: '',
        levels: {low:''},
        unitOfMeasurement: '',
        markup: ''
    });
    const [errorFields, setErrorFields] = useState({})
    const [popoverList, setPopoverList] = useState([
        {
            name: "category",
            status: false
        }
    ])

    // Category Search
    const [categories, setCategories] = useState([])
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});


    // ######### LIFECYCLE FUNCTIONS

    // Handle category search
    useEffect(() => {

        if (!categorySearchValue) {
            // empty search values and cancel any out going request.
            fetchCategory()
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
        getCategories(categorySearchValue, 5)
            .then((data = []) => {
                setCategorySearchResult(data || [])
            })
            .catch(error => {
                console.log("failed to get categories: ", error)
                setCategorySearchResult([])
            })

    }
    const fetchCategories = () => {
        getCategories("inventory", 1000, categorySearchValue)
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

    // ######### EVENT HANDLERS

    const handlePopovers = (popoverValue) => (popoverItem) => {

        if (!popoverItem) {
            let updatedPopovers = popoverList.map(item => {
                return {
                    ...item,
                    status: false
                }
            })

            setPopoverList(updatedPopovers)
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue };
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

        if (!isValid) { return }

        goToConfirmationScreen();
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = { ...fields }
        
        if(fieldName == "levels") {
            setFields({
                ...updatedFields,
                [fieldName]: {low:value}
            })
        }
        else{
            setFields({
                ...updatedFields,
                [fieldName]: value
            })
        }


        const updatedErrors = { ...errorFields }
        delete updatedErrors[fieldName]
        setErrorFields(updatedErrors)

    };

    const validateGroup = () => {
        let isValid = true
        let requiredFields = ['name']

        let errorObj = { ...errorFields } || {}

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                // console.log(`${requiredField} is required`)
                isValid = false
                errorObj[requiredField] = "Value is required.";
            } else {
                delete errorObj[requiredField]
            }
        }

        setErrorFields(errorObj)
        console.log("Error obj: ", errorObj)

        return isValid
    }

    const goToConfirmationScreen = () => {
        setTimeout(() => {

            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={true}
                            onCancel={() => modal.closeModals('ConfirmationModal')}
                            onAction={onActionSave}
                            message="Do you want to save your changes?"
                        />
                        ,
                        onClose: () => { modal.closeModals('ConfirmationModal') }
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
                            isEditUpdate={false}
                            isError={true}
                            onCancel={() => modal.closeAllModals()}
                            message="There was an issue performing this action"
                        />
                        ,
                        onClose: () => { modal.closeModals('ConfirmationModal') }
                    })
        }, 200)
    }

    const createGroupCall = () => {
        // console.log("Fields: ", fields);
        const updatedFields = {
            ...fields,
            unitOfMeasurement: null
        }
        createInventoryGroup(updatedFields)
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

    const createCateory = () => {
        const categoryToadd = []

        categoryToadd.push(categorySearchValue)

        addCategory(categoryToadd)
            .then(cat => {
                setTimeout(() => {
                    modal
                        .openModal(
                            'ConfirmationModal',
                            {
                                content: <ConfirmationComponent
                                    isEditUpdate={false}
                                    isError={false}
                                    onAction={() => modal.closeAllModals()}
                                    onCancel={() => modal.closeAllModals()}
                                    message={`Successfully Added "${categoryToadd[0]}" category `}
                                />
                                ,
                                onClose: () => { modal.closeModals('ConfirmationModal') }
                            })
                    fetchCategory()
                }, 200)
            })
            .catch(err => errorScreen())
    }

    const detailsTab = (

        <>

            <Row>
                <FieldContainer>
                    <AutoFillField
                        label="Reference"
                        value="No Data"
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label={"Item Name"}
                        onChangeText={(value) => {onFieldChange('name')(value)}}
                        value={fields['name']}
                        onClear={() => onFieldChange('name')('')}
                        hasError={errorFields['name']}
                        errorMessage="Name must be filled."
                    />
                </FieldContainer>
               
            </Row>
            <Row>
                <FieldContainer>
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
                    />
                </FieldContainer>
                <FieldContainer>
                    <InputField2
                        label={"Low Stock"}
                        onChangeText={(value) => {onFieldChange('levels')(value)}}
                        value={fields.levels.low}
                        onClear={() => onFieldChange('levels')('')}
    
                    />
                </FieldContainer>
            </Row>

            <Row>
                <FieldContainer>
                    {/*<MultipleSelectionsField*/}
                    {/*    label={"Category"}*/}
                    {/*    onOptionsSelected={(value) => onFieldChange('category')(value)}*/}
                    {/*    options={categorySearchResults}*/}
                    {/*    createNew={createCateory}*/}
                    {/*    searchText={categorySearchValue}*/}
                    {/*    onSearchChangeText={(value) => setCategorySearchValue(value)}*/}
                    {/*    onClear={() => { setCategorySearchValue('') }}*/}
                    {/*    handlePopovers={(value) => handlePopovers(value)('category')}*/}
                    {/*    isPopoverOpen={categorySearchQuery}*/}
                    {/*/>*/}
                </FieldContainer>
            </Row>

            {/*<Divider theme={theme} />*/}

            <Row zIndex={-1}>

                <FieldContainer>
                    {/*<InputField2*/}
                    {/*    label={"Unit"}*/}
                    {/*    onChangeText={onFieldChange('unit')}*/}
                    {/*    value={fields['unit']}*/}
                    {/*    onClear={() => onFieldChange('unit')('')}*/}
                    {/*/>*/}
                </FieldContainer>

                <FieldContainer>
                    {/*<OptionsField*/}
                    {/*    label={"Unit of Measure"}*/}
                    {/*    text={fields['unitOfMeasurement']}*/}
                    {/*    oneOptionsSelected={onFieldChange('unitOfMeasurement')}*/}
                    {/*    menuOption={<MenuOptions>*/}
                    {/*        <MenuOption value={'Glove Boxes'} text='Glove Boxes' />*/}
                    {/*        <MenuOption value={'Pack'} text='Pack' />*/}
                    {/*    </MenuOptions>}*/}
                    {/*/>*/}
                </FieldContainer>
            </Row>

            <Row zIndex={-1}>
                <FieldContainer>
                    {/*<InputUnitField*/}
                    {/*    label={"Markup"}*/}
                    {/*    onChangeText={(value) => {*/}
                    {/*        if (/^\d+\.?\d{0,2}$/g.test(value) || !value) {*/}
                    {/*            onFieldChange('markup')(value)*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    value={fields['markup']}*/}
                    {/*    units={['%']}*/}
                    {/*    keyboardType="number-pad"*/}
                    {/*/>*/}
                </FieldContainer>
            </Row>

        </>
    );

    return (

        <PageWrapper theme={theme}>

            <CreatePageHeader
                title="Create Item Group"
                onClose={onCancel}
            />

            <TabsContainer theme={theme}>
                <DialogTabs
                    tabs={['Details']}
                    tab={0}
                />
            </TabsContainer>

            <ContentWrapper theme={theme}>
                <ContentContainer>
                    {detailsTab}
                </ContentContainer>
            </ContentWrapper>

            <FooterWrapper>
                <CreatePreviousDoneFooter
                    onFooterPress={onPositiveClick}
                />
            </FooterWrapper>
        </PageWrapper>
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
        height: 200,
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
