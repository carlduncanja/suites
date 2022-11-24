import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Switch, Picker, Alert, TouchableOpacity} from 'react-native';
import {useModal} from 'react-native-modalfy';
import {connect} from 'react-redux';
import { MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from 'lodash';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import OverlayDialog from '../common/Dialog/OverlayDialog';
import DialogTabs from '../common/Dialog/DialogTabs';
import InputField2 from '../common/Input Fields/InputField2';
import InputUnitField from '../common/Input Fields/InputUnitFields';
import Row from '../common/Row';
import FieldContainer from '../common/FieldContainerComponent';
import SearchableOptionsField from '../common/Input Fields/SearchableOptionsField';
import MultipleSearchableOptionsField from '../common/Input Fields/MultipleSearchableOptionsField';
import MultipleSelectionsField from '../common/Input Fields/MultipleSelectionsField';
import ConfirmationComponent from '../ConfirmationComponent';
import OptionsField from '../common/Input Fields/OptionsField';
import ArrowRightIcon from '../../../assets/svg/arrowRightIcon';
import {createInventoryVariant, getInventoriesGroup, getCategories, getSuppliers, } from '../../api/network';
import { addInventory } from '../../redux/actions/InventorActions';
import CreatePageHeader from '../common/DetailsPage/CreatePageHeader';
import CreatePreviousDoneFooter from '../common/DetailsPage/CreatePreviousDoneFooter';
import { currencyFormatter } from '../../utils/formatter';
import LineDivider from '../common/LineDivider';

/**
 * Component to handle the create storage process.
 *
 * @param onCancel
 * @param onCreated
 * @param addTheatre
 * @returns {*}
 * @constructor
 */

const PageWrapper = styled.View`
    height : 100%;
    width : 100%;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']}; 
`;
const TabsContainer = styled.View`
    height : 58px;
    justify-content : flex-end;
    background-color: ${ ({theme}) => theme.colors['--color-gray-200']};
`;

const ContentWrapper = styled.View`
    height : 800px;
    padding : ${ ({theme}) => theme.space['--space-28']};
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
    border-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    margin-top : ${ ({theme}) => theme.space['--space-20']};
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

function CreateInventoryDialogContainer({navigation, route, addInventory}) {
    // ########## CONST
    const modal = useModal();
    const theme = useTheme();
    const { onCancel, onCreated, } = route.params;
    const dialogTabs = ['Details', 'Configuration'];

    // ########## STATE
    const [selectedIndex, setSelectedTabIndex] = useState(0);
    const [unitPriceText, setUnitPriceText] = useState(0);
    const [customPriceText, setCustomPriceText] = useState(0);

    const [fields, setFields] = useState({
        name: '',
        levels: {low:''},
    });

    const [categories, setCategories] = useState([]);
    const [errorFields, setErrorFields] = useState({});
    const [popoverList, setPopoverList] = useState([
        {
            name: 'product',
            status: false
        },
        {
            name: 'supplier',
            status: false
        }
    ]);

    // Inventory Search
    const [inventorySearchValue, setInventorySearchValue] = useState();
    const [inventorySearchResults, setInventorySearchResult] = useState([]);
    const [inventorySearchQuery, setInventorySearchQuery] = useState({});

    // Suppliers Search
    const [supplierSearchValue, setSupplierSearchValue] = useState();
    const [supplierSearchResults, setSupplierSearchResult] = useState([]);
    const [supplierSearchQuery, setSupplierSearchQuery] = useState({});

    // Categories Search
    const [categorySearchValue, setCategorySearchValue] = useState();
    const [categorySearchResults, setCategorySearchResult] = useState([]);
    const [categorySearchQuery, setCategorySearchQuery] = useState({});

    // ########## LIFECYCLE METHODS

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

        search();
    }, [inventorySearchValue]);

    // Handle Suppliers search
    useEffect(() => {
        // console.log("Search: ", supplierSearchValue)
        if (!supplierSearchValue) {
            // empty search values and cancel any out going request.
            setSupplierSearchResult([]);
            if (supplierSearchQuery.cancel) supplierSearchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchSuppliers, 300);

        setSupplierSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
    }, [supplierSearchValue]);

    // Handle categories search
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

        search();
    }, [categorySearchValue]);

    const fetchInventories = () => {
        getInventoriesGroup(inventorySearchValue, 5)
            .then((inventoryResults = {}) => {
                const { data = [], pages = 0 } = inventoryResults;
                console.log('Data: ', data);
                const results = data.map(item => ({...item}));

                setInventorySearchResult(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get inventories', error);
                setInventorySearchResult([]);
            });
    };

    const fetchSuppliers = () => {
        getSuppliers(supplierSearchValue, 5)
            .then(supplierData => {
                const { data = [], pages = 0} = supplierData;
                console.log('Data: ', data);
                const results = data.map(item => ({...item}));

                setSupplierSearchResult(results || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get Suppliers', error);
                setSupplierSearchResult([]);
            });
    };

    const fetchCategories = () => {
        getCategories(categorySearchValue, 5)
            .then((categoryData = []) => {
                // console.log("Data: ", data)

                setCategorySearchResult(categoryData || []);
            })
            .catch(error => {
                // TODO handle error
                console.log('failed to get Suppliers', error);
                setCategorySearchResult([]);
            });
    };

    // ########## EVENT LISTENERS

    const handlePopovers = popoverValue => popoverItem => {
        if (!popoverItem) {
            const updatedPopovers = popoverList.map(item => ({
                ...item,
                status: false
            }));

            setPopoverList(updatedPopovers);
        } else {
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ];
            setPopoverList(updatedPopovers);
        }
    };

    const handleCloseDialog = () => {
        onCancel();
        modal.closeAllModals();
    };

    const onPositiveClick = () => {
        const isValid = validateInventory();

        if (!isValid) { return; }

        if (selectedIndex < dialogTabs.length - 1) {
            setSelectedTabIndex(selectedIndex + 1);
        } else {
            const referenceId = fields.product;
            console.log('Success:', fields, referenceId);

            // onCreated(fields)
            goToConfirmationScreen();
            // createInventoryCall(referenceId,fields)
        }
    };

    const onTabChange = tab => {
        const isValid = validateInventory();
        if (!isValid) { return; }
        setSelectedTabIndex(dialogTabs.indexOf(tab));
    };

    const onFooterPreviousPress = () => {
        const isValid = validateInventory();
        if (!isValid) { return; }
        setSelectedTabIndex(selectedIndex - 1);
    };

    const onFieldChange = fieldName => value => {
        const updatedFields = {...fields};
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
        const updatedErrors = {...errorFields};
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);
    };

    const validateInventory = () => {
        let isValid = true;
        let requiredFields = ['name', 'product', 'supplier'];
        selectedIndex === 0 ? requiredFields = requiredFields : requiredFields = [...requiredFields, 'unitCost'];

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
        console.log('Error obj: ', errorObj);

        return isValid;
    };

    const handleUnitPrice = value => {
        const price = value.replace(/[^0-9.]/g, '');
        if (/^\d+(\.\d{1,2})?$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('unitCost')(parseFloat(price));
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(price) || !price) {
            setUnitPriceText(price);
        }
    };

    const onCategorySelect = item => {
        let updatedCategories = [];
        categories.includes(item) ?
            updatedCategories = updatedCategories.filter(category => category !== item) :
            updatedCategories = [...categories, item];

        onFieldChange('category')(updatedCategories);
        console.log('Updated: ', updatedCategories);
        setCategories(updatedCategories);
        setCategorySearchValue(item);
    };

    const onSelectShownIten = () => {
        const updatedCategories = [...categories];
        updatedCategories.pop();
        setCategories(updatedCategories);
        console.log('Categories: ', updatedCategories);
    };

    const handleCustomPrice = value => {
        const price = value.replace(/[^0-9.]/g, '');
        if (/^\d+(\.\d{1,2})?$/g.test(price) || /^\d+$/g.test(price) || !price) {
            onFieldChange('customPrice')(parseFloat(price));
        }
        if (/^\d+(\.){0,1}(\d{1,2})?$/g.test(price) || !price) {
            setCustomPriceText(price);
        }
    };

    const goToConfirmationScreen = () => {
        setTimeout(() => {
            modal
                .openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={true}
                            onCancel={() => modal.closeModals('ConfirmationModal')}
                            onAction={createInventoryCall}
                            message="Do you want to save your changes?"
                        />,
                        onClose: () => { modal.closeModals('ConfirmationModal'); }
                    }
                );
        }, 200);
    };

    const createInventoryCall = () => {
        const id = fields.product;
        const updatedFields = {
            ...fields,
            category: categories
        };
        createInventoryVariant(id, updatedFields)
            .then(data => {
                // addInventory(data)
                modal.closeAllModals();
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={false}
                            onCancel={() => {
                                modal.closeAllModals();
                                navigation.goBack();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                                navigation.goBack();
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                            navigation.goBack();
                        }
                    }
                );
                // navigation.goBack();
                // Alert.alert("Success","The inventory item has been successfully created.")
                setTimeout(() => {
                    onCreated(data);
                }, 400);
            })
            .catch(error => {
                // todo handle error
                console.log('failed to create inventory', error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isEditUpdate={false}
                            isError={true}
                            onCancel={() => {
                                modal.closeAllModals();
                                navigation.goBack();
                            }}
                            message="There was an issue performing this action"
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                            navigation.goBack();
                        }
                    }
                );
                // Alert.alert("Failed", "Failed to create an inventory item")
            })
            .finally();
    };

    const getTabContent = () => {
        switch (dialogTabs[selectedIndex]) {
            case 'Configuration':
                return configTab;
            case 'Details':
                return detailsTab;
            default:
                return <View/>;
        }
    };

    const refPop = popoverList.filter(item => item.name === 'product');
    const supplierPop = popoverList.filter(item => item.name === 'supplier');

    const markupPrice = currencyFormatter(fields.unitCost * ((100 + parseFloat(fields.markup)) / 100) || 0);

    const detailsTab = (
        <>

            <Row>

                <FieldContainer>
                    <SearchableOptionsField
                        label="Group"
                        text={inventorySearchValue}
                        oneOptionsSelected={item => {
                            onFieldChange('product')(item._id);
                            setInventorySearchValue(item.name);
                        }}
                        onChangeText={value => { setInventorySearchValue(value); console.log('Value:', value); }}
                        onClear={() => {
                            onFieldChange('product')('');
                            setInventorySearchValue('');
                        }}
                        options={inventorySearchResults}
                        handlePopovers={value => handlePopovers(value)('product')}
                        isPopoverOpen={inventorySearchQuery}
                        errorMessage="Inventory Group must be provided."
                        hasError={errorFields.product}
                    />
                </FieldContainer>

                <FieldContainer>
                    <InputField2
                        label="Item Name"
                        onChangeText={onFieldChange('name')}
                        value={fields.name}
                        onClear={() => onFieldChange('name')('')}
                        hasError={errorFields.name}
                        errorMessage="Name must be filled."
                    />
                </FieldContainer>
            </Row>

            <Row zIndex={-1}>

                <FieldContainer>
                    {/*<MultipleSearchableOptionsField*/}
                    {/*    label={"Category"}*/}
                    {/*    text={categorySearchValue}*/}
                    {/*    oneOptionsSelected={(item) => {onCategorySelect(item);}}*/}
                    {/*    onChangeText={value => {setCategorySearchValue(value)}}*/}
                    {/*    onClear={() => {*/}
                    {/*        setCategorySearchValue('');*/}
                    {/*    }}*/}
                    {/*    onSelectShownIten = {onSelectShownIten}*/}
                    {/*    selectedItems = {categories}*/}
                    {/*    options={categorySearchResults}*/}
                    {/*    handlePopovers = {()=>{}}*/}
                    {/*    isPopoverOpen = {categorySearchQuery}*/}
                    {/*/>*/}
                </FieldContainer>

                <FieldContainer>
                    <SearchableOptionsField
                        label="Supplier"
                        text={supplierSearchValue}
                        oneOptionsSelected={item => {
                            onFieldChange('supplier')(item._id);
                            setSupplierSearchValue(item.name);
                        }}
                        onChangeText={value => { setSupplierSearchValue(value); console.log('Value:', value); }}
                        onClear={() => {
                            onFieldChange('supplier')('');
                            setSupplierSearchValue('');
                        }}
                        options={supplierSearchResults}
                        handlePopovers={value => handlePopovers(value)('supplier')}
                        isPopoverOpen={supplierSearchQuery}
                        hasError={errorFields.supplier}
                        errorMessage="Select the supplier for item."
                    />

                </FieldContainer>

            </Row>

            <Row>
                <FieldContainer>
                    <InputField2
                        label={"Low Stock"}
                        onChangeText={(value) => {onFieldChange('levels')(value)}}
                        value={fields.levels.low}
                        onClear={() => onFieldChange('levels')('')}
    
                    />
                </FieldContainer>
            </Row>

        </>
    );

    const configTab = (
        <>

            <Row>
                <FieldContainer>
                    <InputField2
                        label="Unit Price"
                        onChangeText={value => { handleUnitPrice(value); }}
                        value={`$ ${unitPriceText.toString()}`}
                        keyboardType="number-pad"
                        onClear={() => handleUnitPrice('')}
                        hasError={errorFields.unitCost}
                        errorMessage="Price must be provided."
                    />
                </FieldContainer>
            </Row>

            {/*<Divider/>*/}

            {/*<Row>*/}

            {/*    <FieldContainer>*/}
            {/*        <InputUnitField*/}
            {/*            label="Markup"*/}
            {/*            onChangeText={value => {*/}
            {/*                if (/^\d+\.?\d{0,2}$/g.test(value) || !value) {*/}
            {/*                    onFieldChange('markup')(value);*/}
            {/*                }*/}
            {/*            }}*/}
            {/*            value={fields.markup}*/}
            {/*            units={['%']}*/}
            {/*            keyboardType="number-pad"*/}
            {/*            hasError={errorFields.markup}*/}
            {/*            errorMessage="Add markup value"*/}
            {/*        />*/}
            {/*    </FieldContainer>*/}

            {/*    <FieldContainer>*/}
            {/*        <Text style={{color: '#A0AEC0', fontSize: 14, alignSelf: 'center'}}>@{fields.markup}:{markupPrice}</Text>*/}
            {/*    </FieldContainer>*/}

            {/*</Row>*/}

            {/*<Row>*/}

            {/*    <FieldContainer>*/}
            {/*        <InputField2*/}
            {/*            label="Custom Cost"*/}
            {/*            onChangeText={value => { handleCustomPrice(value); }}*/}
            {/*            value={`$ ${customPriceText.toString()}`}*/}
            {/*            keyboardType="number-pad"*/}
            {/*            onClear={() => handleCustomPrice('')}*/}
            {/*        />*/}
            {/*    </FieldContainer>*/}

            {/*</Row>*/}

        </>
    );

    return (
        <PageWrapper theme={theme}>

            <CreatePageHeader
                title="Create Inventory Item"
                onClose={onCancel}
            />

            <TabsContainer theme={theme}>
                <DialogTabs
                    tabs={dialogTabs}
                    tab={selectedIndex}
                    onTabPress={onTabChange}
                />
            </TabsContainer>

            <ContentWrapper theme={theme}>
                <ContentContainer>
                    {getTabContent()}
                </ContentContainer>
            </ContentWrapper>

            <FooterWrapper>
                <CreatePreviousDoneFooter
                    onFooterPress={onPositiveClick}
                    isFinished={selectedIndex === dialogTabs.length - 1}
                    onFooterPreviousPress={onFooterPreviousPress}
                    isPreviousDisabled={selectedIndex === 0}
                />
            </FooterWrapper>

        </PageWrapper>
    );
}

CreateInventoryDialogContainer.propTypes = {};
CreateInventoryDialogContainer.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 636,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    sectionContainer: {
        height: 240,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
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

const mapDispatcherToProps = {addInventory};

export default connect(null, mapDispatcherToProps)(CreateInventoryDialogContainer);
