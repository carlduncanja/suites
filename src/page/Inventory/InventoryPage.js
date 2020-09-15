import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageContext } from '../../contexts/PageContext';
import DetailsPage from '../../components/common/DetailsPage/DetailsPage';
import TabsContainerComponent from '../../components/common/Tabs/TabsContainerComponent';
import { connect } from 'react-redux';
import { getInventoryGroupById, updateInventoryGroupById } from '../../api/network';
import InventoryGroupGeneral from '../../components/OverlayTabs/InventoryGroupGeneral';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { useModal } from 'react-native-modalfy';

function InventoryPage({ route, navigation }){

    const { data = {}, isGroup = true} = route.params
    const { name = "", _id = "", description = "" } = data
    const tabs = ["General"];
    const modal = useModal();

    const [currentTab, setCurrentTab] = useState(tabs[0])
    const [pageState, setPageState] = useState({});
    const [selectedInventory, setSelectedInventory] = useState({});
    const [fields, setFields] = useState({
        description,
        name
    });
    const [errorFields, setErrorFields] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);


    const {isEditMode} = pageState;

    useEffect(() => {
        fetchInventory(_id)
    }, []);

    useEffect(()=>{
        if(isUpdated && isEditMode === false){
            onFinishEdit();
        }
    },[isEditMode])

    const fetchInventory = (id) => {
        setPageLoading(true)
        getInventoryGroupById(id)
            .then(data => {
                setSelectedInventory(data)
                // console.log("Fetch data: ", data)
            })
            .catch(error => {
                console.log("Failed to get procedure", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setPageLoading(false)
            })
    };

    const onFieldChange = (fieldName) => (value) => {
        const updatedFields = {...fields}
        setFields({
            ...updatedFields,
            [fieldName]: value
        })
        setIsUpdated(true);
        // const updatedErrors = {...errorFields}
        // delete updatedErrors[fieldName]
        // setErrorFields(updatedErrors)

    };

    // ###### HELPER FUNCTIONS

    const onFinishEdit = () =>{
        let isValid = validateUpdate();

        if(!isValid){ return }

        goToConfirmationScreen();
    }

    const validateUpdate = () => {
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
        return isValid
    }

    const goToConfirmationScreen = () => {
        modal.openModal('ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate = {true}
                    onCancel = {()=> {
                        modal.closeModals('ConfirmationModal');
                        setPageState({
                            ...pageState,
                            isEditMode : true
                        });
                    }}
                    onAction = {()=>updateInventoryGroup()}
                    message = "Do you want to save your changes?"
                />
                ,
                onClose: () => {modal.closeModals('ConfirmationModal')}
            })
    }

    const updateInventoryGroup = () => {
        let updatedGroup = {
            ...selectedInventory,
            description : fields['description'],
            name : fields['name'],
        }
        updateInventoryGroupById(selectedInventory?._id, updatedGroup)
            .then(data => {
                // addInventory(data)
                modal.closeAllModals();
                modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate = {false}
                        isError = {false}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=> modal.closeModals('ConfirmationModal')}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
            })
            .catch(error => {
                // todo handle error
                console.log("failed to update inventory group", error);
                modal.openModal('ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isEditUpdate = {false}
                        isError = {true}
                        onCancel = {()=> modal.closeModals('ConfirmationModal')}
                        onAction = {()=>modal.closeModals('ConfirmationModal')}
                    />
                    ,
                    onClose: () => {modal.closeModals('ConfirmationModal')}
                })
                // Alert.alert("Failed", "failed to create inventory group")
            })
            .finally(_=>{
                fetchInventory(_id);
            })
            // console.log("Save data: ", updatedGroup);
        // console.log("Group: ", inventoryGroup);
    }

    const setPageLoading = (value) => {
        setPageState({
            ...pageState,
            isLoading : value,
            isEdit : false
        })
    }

    const getContentData = (selectedTab) => {
        switch (selectedTab) {
            case "General":
                return <InventoryGroupGeneral
                    inventoryGroup = {selectedInventory}
                    // onUpdate = {()=>fetchInventory(_id)}
                    // isEditMode={isEditMode}
                    fields = {fields}
                    errorFields = {errorFields}
                    onFieldChange = {onFieldChange}
                />
            default:
                break;
        }
    }

    return (

        <PageContext.Provider value = {{ pageState, setPageState }}>
            <DetailsPage
                headerChildren={[selectedInventory?.name]}
                onBackPress = { () => navigation.navigate("Inventory")}
                pageTabs = {
                    <TabsContainerComponent
                        tabs = {tabs}
                        selectedTab = {currentTab}
                        onPressChange = { () => {}}
                    />
                }
            >
                { getContentData(currentTab)}
            </DetailsPage>

        </PageContext.Provider>
    )
}


// const mapDispatchToProps = dispatch => bindActionCreators({
//     setInventoryEdit
// }, dispatch)

InventoryPage.propTypes = {};
InventoryPage.defaultProps = {};

export default InventoryPage
