import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../../components/common/Tabs/TabsContainerComponent';
import { getInventoryVariantByGroup } from '../../api/network';
import InventoryGroupGeneral from '../../components/OverlayTabs/InventoryGroupGeneral';
import InventoryVariantGeneral from '../../components/OverlayTabs/InventoryVariantGeneral';
import TransfersOverlayTab from '../../components/OverlayTabs/TransfersOverlayTab';
import InventoryStorageLocationsTab from '../../components/OverlayTabs/InventoryStorageLocationsTab';
import InventorySuppliersTab from '../../components/OverlayTabs/InventorySuppliersTab';

function InventoryVariantPage({ route, navigation }) {
    const { data = {} } = route.params;
    const modal = useModal();
    // console.log("Data: ", data)
    const { name = '', _id = '', groupName = '', groupId = '' } = data;
    const tabs = ['Details', 'Storage Locations', 'Transfers', 'Suppliers'];

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [pageState, setPageState] = useState({});
    const [selectedVariant, setSelectedVariant] = useState({});
    const [variantSuppliers, setVariantSuppliers] = useState([]);

    // const [fields, setFields] = useState({
    //     name,
    // });
    // const [errorFields, setErrorFields] = useState({});
    // const [isUpdated, setUpdated] = useState(false);

    const { isEditMode } = pageState;

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const fetchVariant = (parentId, variantId) => {
        // console.log("Group: ", parentId, variantId)
        setPageLoading(true);
        getInventoryVariantByGroup(variantId, parentId)
            .then(variantData => {
                setSelectedVariant(variantData);
                console.log('Fetch variant data: ', variantData);
            })
            .catch(error => {
                console.log('Failed to get variant', error);
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            });
        // getVariantSupplierProducts(variantId)
        //     .then(results => {
        //         const { data = [] } = results;
        //         setVariantSuppliers([...data]);
        //         console.log("Suppliers: ", data);
        //     })
        //     .catch(error => {
        //         console.log("Failed to get variant Suppliers", error)
        //         //TODO handle error cases.
        //     })
    };

    useEffect(() => {
        fetchVariant(groupId, _id);
    }, []);

    // useEffect(() => {
    //     if (isUpdated && !isEditMode) {
    //         onFinishEdit();
    //     }
    // }, [isEditMode])

    // const onFinishEdit = () =>{
    //     let isValid = validateUpdate();

    //     if(!isValid){ return }

    //     modal.openModal('ConfirmationModal', {
    //         content: (
    //             <ConfirmationComponent
    //                 error={false}//boolean to show whether an error icon or success icon
    //                 isEditUpdate={true}
    //                 onCancel={() => {
    //                     modal.closeAllModals();
    //                     // resetState()
    //                 }}
    //                 onAction={() => {
    //                     modal.closeAllModals();
    //                     updateVariant();
    //                 }}
    //                 message="Do you want to save changes?"//general message you can send to be displayed
    //                 action="Yes"
    //             />
    //         ),
    //         onClose: () => {
    //             console.log('Modal closed');
    //         },
    //     });
    // }

    // const onFieldChange = (fieldName) => (value) => {
    //     setFields({
    //         ...fields,
    //         [fieldName]: value
    //     })
    //     setUpdated(true);
    //     const updatedErrors = {...errorFields}
    //     delete updatedErrors[fieldName]
    //     setErrorFields(updatedErrors)
    // };

    // ###### HELPER FUNCTIONS

    const onTabPress = selectedTab => {
        if (!pageState.isEditMode) setCurrentTab(selectedTab);
    };

    const getContentData = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return <InventoryVariantGeneral
                    inventoryVariant={selectedVariant}
                    selectedData={data}
                    onUpdateItem={() => fetchVariant(groupId, _id)}
                // isEditMode={isEditMode}
                // fields = {fields}
                // errorFields = {errorFields}
                // onFieldChange = {onFieldChange}
                />;
            case 'Storage Locations':
                return <InventoryStorageLocationsTab
                    selectedVariant={selectedVariant}
                    groupId={groupId}
                    onUpdateItem={() => fetchVariant(groupId, _id)}
                />;
            case 'Transfers':
                // console.log("Selected Variant: ", selectedVariant);
                return <TransfersOverlayTab
                    transferItems={selectedVariant?.transfers}
                    groupId={selectedVariant?.inventoryGroup?._id}
                    variantId={selectedVariant?._id}
                    onUpdateItem={() => fetchVariant(groupId, _id)}
                    actionsTitle="INVENTORY ACTIONS"
                />;
            case 'Suppliers':
                return <InventorySuppliersTab
                    suppliers={variantSuppliers}
                    variantId={selectedVariant?._id}
                    parentId={groupId}
                />;
            default:
                break;
        }
    };

    const getIsEditable = () => {
        switch (currentTab) {
            case 'Details':
                return false;
            case 'Storage Locations':
                return true;
            case 'Transfers':
                return true;
            case 'Suppliers':
                return true;
            default:
                return false;
        }
    };

    // const validateUpdate = () => {
    //     let isValid = true
    //     let requiredFields = ['name','unitCost']

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

    // const updateVariant = () => {
    //     updateInventoryVariantCall(_id, fields)
    //         .then( _ => {
    //             modal.openModal('ConfirmationModal', {
    //                 content: (
    //                     <ConfirmationComponent
    //                         error={false}//boolean to show whether an error icon or success icon
    //                         isEditUpdate={false}
    //                         onCancel={() => {
    //                             modal.closeAllModals();
    //                         }}
    //                         onAction={() => {
    //                             modal.closeAllModals();
    //                         }}
    //                         message="Changes were successful."//general message you can send to be displayed
    //                         action="Yes"
    //                     />
    //                 ),
    //                 onClose: () => {
    //                     console.log('Modal closed');
    //                 },
    //             });
    //         })
    //         .catch(error => {
    //             console.log("Failed to update theatre", error)
    //             modal.openModal('ConfirmationModal', {
    //                 content: (
    //                     <ConfirmationComponent
    //                         error={true}//boolean to show whether an error icon or success icon
    //                         isEditUpdate={false}
    //                         onCancel={() => {
    //                             modal.closeAllModals();
    //                         }}
    //                         onAction={() => {
    //                             modal.closeAllModals();
    //                             // resetState()
    //                         }}
    //                         message="Something went wrong when applying changes."//general message you can send to be displayed
    //                         action="Yes"
    //                     />
    //                 ),
    //                 onClose: () => {
    //                     console.log('Modal closed');
    //                 },
    //             });
    //         })
    //         .finally(_=>fetchVariant(groupId,_id))
    // }

    return (

        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[groupName, selectedVariant?.name]}
                onBackPress={() => navigation.navigate('Inventory')}
                isArchive={getIsEditable()}
                pageTabs={(
                    <TabsContainerComponent
                        tabs={tabs}
                        selectedTab={currentTab}
                        onPressChange={onTabPress}
                    />
                )}
            >
                {getContentData(currentTab)}
            </DetailsPage>

        </PageContext.Provider>
    );
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     setInventoryEdit
// }, dispatch)

InventoryVariantPage.propTypes = {};
InventoryVariantPage.defaultProps = {};

export default InventoryVariantPage;
