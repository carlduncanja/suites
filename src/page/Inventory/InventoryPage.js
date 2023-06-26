import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useModal } from 'react-native-modalfy';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../../components/common/Tabs/TabsContainerComponent';
import { getInventoryGroupById, updateInventoryGroupById } from '../../api/network';
import InventoryGroupGeneral from '../../components/OverlayTabs/InventoryGroupGeneral';
import ConfirmationComponent from '../../components/ConfirmationComponent';

function InventoryPage({ route, navigation }) {
    const { data = {} } = route.params;
    const inventoryUpdate = route.params.inventoryPermissions
    const {
        name = '',
        _id = '',
        description = '',
        categories = []
    } = data;

    console.log('Data: ', data);
    const tabs = ['Details'];
    const modal = useModal();

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [pageState, setPageState] = useState({});
    const [selectedInventory, setSelectedInventory] = useState({});
    const [fields, setFields] = useState({
        description: description,
        name:name,
        categories: categories
    });
    const [errorFields, setErrorFields] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);
    const [groupCategories, setCategories] = useState([]);

    const { isEditMode } = pageState;

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    const fetchInventory = id => {
        setPageLoading(true);
        getInventoryGroupById(id)
            .then(groupData => {

                console.log('group received is', groupData)
                setSelectedInventory(groupData);
                setFields({...fields, categories: groupData?.categories || []})
                // console.log("Fetch data: ", data)
            })
            .catch(error => {
                console.log('Failed to get procedure', error);
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false);
            });
    };

    const onFinishEdit = () => {
        const isValid = validateUpdate();

        if (!isValid) { return; }

        goToConfirmationScreen();
    };

    useEffect(() => {
        fetchInventory(_id);
    }, []);

    useEffect(() => {
        if (isUpdated && isEditMode === false) {
            onFinishEdit();
        }
    }, [isEditMode]);

    const onFieldChange = fieldName => value => {
        const updatedFields = { ...fields };
        setFields({
            ...updatedFields,
            [fieldName]: value
        });
        setIsUpdated(true);
        const updatedErrors = { ...errorFields };
        delete updatedErrors[fieldName];
        setErrorFields(updatedErrors);

    };

    // ###### HELPER FUNCTIONS

    const validateUpdate = () => {
        let isValid = true;
        const requiredFields = ['name'];

        const errorObj = { ...errorFields } || {};

        for (const requiredField of requiredFields) {
            if (!fields[requiredField]) {
                isValid = false;
                errorObj[requiredField] = "Value is required.";
            } else {
                delete errorObj[requiredField];
            }
        }

        setErrorFields(errorObj);
        return isValid;
    };

    const goToConfirmationScreen = () => {
        modal.openModal('ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={true}
                    onCancel={() => {
                        modal.closeModals('ConfirmationModal');
                        setPageState({
                            ...pageState,
                            isEditMode: true
                        });
                    }}
                    onAction={() => updateInventoryGroup()}
                    message="Do you want to save your changes?"
                />,
                onClose: () => { modal.closeModals('ConfirmationModal'); }
            });
    };

    const updateInventoryGroup = () => {
        const updatedGroup = {
            ...selectedInventory,
            description: fields.description,
            name: fields.name,
            categories: fields.categories
        };
        updateInventoryGroupById(selectedInventory?._id, updatedGroup)
            .then(_ => {
                // addInventory(data)
                modal.closeAllModals();
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={false}
                        onCancel={() => modal.closeModals('ConfirmationModal')}
                        onAction={() => modal.closeModals('ConfirmationModal')}
                    />,
                    onClose: () => { modal.closeModals('ConfirmationModal'); }
                });
            })
            .catch(error => {
                // todo handle error
                console.log('failed to update inventory group', error);
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isEditUpdate={false}
                        isError={true}
                        onCancel={() => modal.closeModals('ConfirmationModal')}
                        onAction={() => modal.closeModals('ConfirmationModal')}
                    />,
                    onClose: () => { modal.closeModals('ConfirmationModal'); }
                });
            })
            .finally(_ => {
                fetchInventory(_id);
            });
    };

    const getContentData = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return <InventoryGroupGeneral
                    inventoryGroup={selectedInventory}
                    fields={fields}
                    errorFields={errorFields}
                    onFieldChange={onFieldChange}

                />;
            default:
                break;
        }
    };

    return (

        <PageContext.Provider value={{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[selectedInventory?.name]}
                inventoryUpdate = {inventoryUpdate}
                onBackPress={() => navigation.navigate('Inventory')}
                pageTabs={(
                    <TabsContainerComponent
                        tabs={tabs}
                        selectedTab={currentTab}
                        onPressChange={() => { }}
                    />
                )}
            >
                {getContentData(currentTab)}
            </DetailsPage>

        </PageContext.Provider>
    );
}

InventoryPage.propTypes = {};
InventoryPage.defaultProps = {};

export default InventoryPage;
