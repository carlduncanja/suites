import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import moment from 'moment';
import {withModal} from 'react-native-modalfy';
import SlideOverlay from '../common/SlideOverlay/SlideOverlay';
import EquipmentDetails from '../OverlayTabs/EquipmentDetails';
import EditableEquipmentDetails from '../OverlayTabs/EditableEquipmentDetails';
import {colors} from '../../styles';
import {updateEquipment} from '../../api/network';
import ConfirmationComponent from '../ConfirmationComponent';
import {formatDate} from '../../utils/formatter';
import BottomSheetContainer from '../common/BottomSheetContainer';
import {PageContext} from '../../contexts/PageContext';
import DetailsPage from '../common/DetailsPage/DetailsPage';
import TabsContainer from '../common/Tabs/TabsContainerComponent';
import SvgIcon from '../../../assets/SvgIcon';

function EquipmentItemPage({route, navigation, modal}) {
    const {equipment, isOpenEditable, group, onCreated, updatesEquipment} = route.params;
    console.log('jksjdks', updatesEquipment)
    const currentTabs = ['Details'];

    // ##### States
    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [selectedEquipment, setSelectedEquipment] = useState(equipment);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState('');
    const [isFetching, setFetching] = useState(false);
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);
    const [pageState, setPageState] = useState({});

    const {
        // supplier id
        _id = '',
        name,
        // supplier name
        supplier,
        assigned,
        sku
    } = equipment;

    const evalRecentAssignment = assignments => {
        let assignmentName = null;
        let status = null;
        let mostRecent = null;

        for (const assignment of assignments) {
            if (assignment.type !== 'location') {
                if (!mostRecent || moment(assignment.startTime).isAfter(mostRecent)) {
                    mostRecent = moment(assignment.startTime);

                    assignmentName = assignment.referenceName;

                    const futureTime = mostRecent.clone().add(assignment.duration || 0, 'hours');
                    status = moment().isBetween(mostRecent, futureTime) ? 'Unavailable' : 'Available';
                }
            }
        }

        return {assignmentName, status};
    };

    const {assignmentName: assignment, status} = evalRecentAssignment(equipment?.assignments);

    const [fields, setFields] = useState({
        // supplier name
        sku,
        status,
        assigned: assignment,
        description: equipment.description,
    });

    // ##### Lifecycle Methods

    useEffect(() => {
        if (!pageState.isEditMode && isInfoUpdated) confirmAction();
    }, [pageState.isEditMode]);

    const confirmAction = () => {
        // setTimeout(() => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isEditUpdate={true}
                    message="Do you wish to save your changes?"
                    onCancel={onConfirmCancel}
                    onAction={onConfirmSave}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
        // }, 200)
    };

    const onConfirmSave = () => {
        const bodyToPass = {sku: fields.sku};

        console.log('Gonna send to endpoint:', bodyToPass);
        modal.closeModals('ConfirmationModal');
        setTimeout(() => {
            // updatePhysicianRecord(selectedPhysician);
            updateEquipmentCall(fields);
            setIsInfoUpdated(false);
        }, 200);
    };

    const onConfirmCancel = () => {
        modal.closeModals('ConfirmationModal');
        setPageState({
            ...pageState,
            isEditMode: true
        });
    };

    const onSuccess = () => {
        modal.closeModals('ConfirmationModal');
        navigation.navigate('Equipment');
        onCreated();
    };
    const updateEquipmentCall = info => {
        updateEquipment(_id, info)
            .then(data => {
                console.log('successfully updated', data);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            message="Completed Succefully"
                            isEditUpdate={false}
                            onCancel={onConfirmCancel}
                            onAction={onSuccess}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .catch(error => {
                console.log('error occurred is:', error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            message="There was an error performing this action"
                            isEditUpdate={false}
                            onCancel={onConfirmCancel}
                            onAction={onConfirmSave}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .finally(_ => {
            });
    };

    // ##### Event Handlers

    const onFieldChange = fieldName => value => {
        setFields({
            ...fields,
            [fieldName]: value
        });
        console.log('what\'s updated?', fields);
        setIsInfoUpdated(true);
    };

    const onTabPress = selectedTab => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = tab => {
        setEditableTab(tab);
        setEditMode(!isEditMode);
    };

    const backTapped = () => {
        navigation.navigate('Equipment');
    };

    const setPageLoading = value => {
        setPageState({
            ...pageState,
            isLoading: value,
            isEdit: false
        });
    };

    // ##### Helper functions

    const getTabContent = selectedTab => {
        switch (selectedTab) {
            case 'Details':
                return pageState.isEditMode ?
                    <EditableEquipmentDetails
                        fields={fields}
                        onFieldChange={onFieldChange}
                    /> :
                    <EquipmentDetails
                        equipment={selectedEquipment}
                        navigation={navigation}
                        groupInfo={group}
                        name={name}
                    />;
            default:
                return <View/>;
        }
    };

    const overlayContent = (
        <View style={{flex: 1, padding: 30}}>
            {getTabContent(currentTab)}
        </View>
    );

    return (
        <>
            <PageContext.Provider value={{pageState, setPageState}}>
                <DetailsPage
                    hasIcon={<SvgIcon iconName="paginationNext" strokeColor="#718096"/>}
                    headerChildren={[group.name, name]}
                    onBackPress={backTapped}
                    isEditable={updatesEquipment}

                    pageTabs={(
                        <TabsContainer
                            tabs={currentTabs}
                            selectedTab={currentTab}
                            onPressChange={onTabPress}
                        />
                    )}
                >
                    {getTabContent(currentTab)}
                </DetailsPage>
            </PageContext.Provider>
        </>
    );
}

EquipmentItemPage.propTypes = {};
EquipmentItemPage.defaultProps = {};

export default withModal(EquipmentItemPage);
