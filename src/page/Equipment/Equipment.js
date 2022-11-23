import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import _, {isEmpty, concat} from 'lodash';
import {connect} from 'react-redux';
import {withModal} from 'react-native-modalfy';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import moment from 'moment';
import Page from '../../components/common/Page/Page';
import RoundedPaginator from '../../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import CreateEquipmentDialog from '../../components/Equipment/CreateEquipmentDialogContainer';
import Item from '../../components/common/Table/Item';
import NavPage from '../../components/common/Page/NavPage';
import DataItem from '../../components/common/List/DataItem';
import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import AssignIcon from '../../../assets/svg/assignIcon';
import EditIcon from '../../../assets/svg/editIcon';
import MultipleShadowsContainer from '../../components/common/MultipleShadowContainer';
import ContentDataItem from '../../components/common/List/ContentDataItem';
import RightBorderDataItem from '../../components/common/List/RightBorderDataItem';
import CollapsedIcon from '../../../assets/svg/closeArrow';
import ActionIcon from '../../../assets/svg/dropdownIcon';
import {
    useNextPaginator,
    usePreviousPaginator,
    checkboxItemPress,
    selectAll, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';

import {setEquipment} from '../../redux/actions/equipmentActions';
import {getEquipment, getEquipmentTypes, removeEquipment, removeEquipmentTypes} from '../../api/network';

import {formatDate, numberFormatter} from '../../utils/formatter';

import CollapsibleListItem from '../../components/common/List/CollapsibleListItem';
import IconButton from '../../components/common/Buttons/IconButton';
import ActionCollapseIcon from '../../../assets/svg/actionCollapseIcon';
import SvgIcon from '../../../assets/SvgIcon';
import CreateEquipmentTypeDialogContainer from '../../components/Equipment/CreateEquipmentTypeDialogContainer';
import ListItem from '../../components/common/List/ListItem';
import {LONG_PRESS_TIMER} from '../../const';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import { PageSettingsContext } from '../../contexts/PageSettingsContext';

const QuantityWrapper = styled.View`
    flex:1.5;
    align-items: center; 
   
`;
const QuantityContainer = styled.View`
    height : 24px;
    width : 28px;
    background-color : ${({theme, isCollapsed}) => (isCollapsed === false ? theme.colors['--color-gray-100'] : theme.colors['--default-shade-white'])};
    border-radius : 4px;
    align-items: center;
    justify-content: center;
`;

const GroupEquipmentView = styled.TouchableOpacity`
  flex:1;
  flex-direction:row;
  align-items : center;

`;

const QuantityText = styled.Text(({theme, isCollapsed}) => ({
    ...theme.font['--text-base-regular'],
    color: isCollapsed === false ? theme.colors['--color-gray-500'] : theme.colors['--color-gray-700'],
}));
const shadows = [
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.06,
        shadowRadius: 2
    },
    {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },
];
const Equipment = props => {
    const theme = useTheme();
    // ############# Const data
    const recordsPerPage = 10;
    const listHeaders = [

        {
            name: 'Item ID',
            alignment: 'flex-start',
            flex: 2,
        },
        {
            name: 'Status',
            alignment: 'flex-start',
            flex: 1.2,
        },
        {
            name: 'In Stock',
            alignment: 'center',
            flex: 1.5,
        },

        {
            name: 'Assigned',
            alignment: 'flex-start',
            flex: 2,
        },
    ];
    const floatingActions = [];

    //  ############ Props
    const {equipment, setEquipment, navigation, modal} = props;

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [groupSelected, setGroupSelected] = useState({});

    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [groupNameSelected, setGroupNameSelected] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [assignments, setAssignments] = useState([]);

    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedTypesIds, setSelectedTypesIds] = useState([]);

    const [equipmentTypes, setEquipmentTypes] = useState([]);

    const [expandedItems, setExpandedItems] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});


    // ############# Lifecycle methods

    useEffect(() => {
        if (!equipmentTypes.length) {
            fetchEquipmentData(currentPagePosition);
        }
        setTotalPages(Math.ceil(equipmentTypes.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchEquipmentData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchEquipmentData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);
    // ############# Event Handlers

    const onSearchInputChange = input => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchEquipmentData();
    };

    const handleOnSelectAll = () => {
        console.log('Equipment Types: ', equipmentTypes);
        const updatedEquipmentList = selectAll(equipmentTypes, selectedTypesIds);
        setSelectedTypesIds(updatedEquipmentList);

        // const indeterminate = selectedTypesIds.length >= 0 && selectedTypesIds.length !== equipmentTypes.length;
        // if (indeterminate) {
        //     const selectedAllIds = [...equipmentTypes.map(caseItem => caseItem.id)];
        //     setSelectedTypesIds(selectedAllIds)
        // } else {
        //     setSelectedTypesIds([])
        // }
    };

    const handleOnCheckBoxPress = item => () => {
        const {_id} = item;
        const updatedEquipmentList = checkboxItemPress(_id, selectedTypesIds);

        setGroupSelected(item);
        setSelectedTypesIds(updatedEquipmentList);

        // remove selected child items
        const removeChildren = selectedEquipments.filter(obj => obj.groupId !== _id);
        setSelectedEquipments(removeChildren);
    };

    const handleOnItemCheckboxPress = equipmentItem => {
        const {_id, type} = equipmentItem;
        //  let updatedEquipments = [...selectedEquipmentIds];

        //  get equipment ids
        const equipmentIds = selectedEquipments.map(equipmentObj => equipmentObj._id);
        const updatedChildIds = checkboxItemPress(_id, equipmentIds);

        //  set selected equipments
        const updatedSelectedEquipments = updatedChildIds.map(_id => ({
            ...equipmentItem,
            _id,
            groupId: type
        }));
        setSelectedEquipments(updatedSelectedEquipments);

        // unselect group when child is selected
        const updatedIds = selectedTypesIds.filter(id => id !== type);
        setSelectedTypesIds(updatedIds);

        // setSelectedTypesIds(selectedTypesIds.filter(id => id !== type));
    };

    const onCollapseView = key => {
        if (expandedItems.includes(key)) {
            setExpandedItems(expandedItems.filter(item => item !== key));
        } else {
            setExpandedItems([...expandedItems, key]);
        }
    };

    const handleOnItemPress = (item, isOpenEditable, type) => {
        props.navigation.navigate('EquipmentItemPage', {
            initial: false,
            equipment: item,
            isOpenEditable,
            group: type,
            onCreated: handleDataRefresh
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(
                currentPagePosition,
                recordsPerPage,
                currentPageListMin,
                currentPageListMax
            );
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchEquipmentData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(
            currentPagePosition,
            recordsPerPage,
            currentPageListMin,
            currentPageListMax
        );
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchEquipmentData(currentPage);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal', {
            actions: getFabActions(),
            title: 'EQUIPMENT ACTIONS',
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const onRemoveGroups = () => {
        openConfirmationScreen(() => removeEquipmentGroup({ids: [...selectedTypesIds]}));
    };

    const onRemoveItems = () => {
        const selectedEquipmentIds = selectedEquipments.map(equipment => equipment._id);
        openConfirmationScreen(() => removeEquipmentItems({ids: [...selectedEquipmentIds]}));
    };

    const onRefresh = () => {
        fetchEquipmentData(currentPagePosition);
    };

    // ############# Helper functions
    const fetchEquipmentData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getEquipmentTypes(searchValue, recordsPerPage, currentPosition)
            .then(equipmentTypesInfo => {
                const {data = [], pages = 0} = equipmentTypesInfo;

                if (pages === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(true);
                } else if (currentPosition === 1) {
                    setPreviousDisabled(true);
                    setNextDisabled(false);
                } else if (currentPosition === pages) {
                    setNextDisabled(true);
                    setPreviousDisabled(false);
                } else if (currentPosition < pages) {
                    setNextDisabled(false);
                    setPreviousDisabled(false);
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

                setEquipmentTypes(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('Failed to get equipment types', error);

                handleUnauthorizedError(error?.response?.status, setEquipmentTypes);
                setPageSettingState({...pageSettingState, isDisabled: true});

                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            });

        getEquipment()
            .then(data => {
                setEquipment(data);
            })
            .catch(error => {
                console.log('failed to get equipment', error);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const renderEquipmentFn = item => {
        const equipments = item.equipments || [];

        const viewItem = {
            equipments,
            _id: item._id,
            name: item.name,
            suppliers: item.suppliers,
            description: item.description,
            quantity: item.equipments.length,
            nextAvailable: new Date(2020, 12, 12),
        };
        const isIndeterminate = selectedEquipments.some(variant => variant.groupId === item._id);

        return (
            <CollapsibleListItem
                hasCheckBox={true}
                isChecked={selectedTypesIds.includes(item._id)}
                isIndeterminate={isIndeterminate}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => gotoGroupDetails(item)}
                collapsed={!expandedItems.includes(item.name)}
                onCollapsedEnd={() => onCollapseView(item.name)}
                render={(collapse, isCollapsed) => equipmentGroupView(viewItem, collapse, isCollapsed)
                }
            >
                <FlatList
                    data={getEquipmentData(equipments)}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                borderColor: '#E3E8EF',
                                borderWidth: 0.5,
                            }}
                        />
                    )}
                    renderItem={({item}) => {
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

                        const {assignmentName: assignment, status} = evalRecentAssignment(item.assignments);
                        const {_id, name: equipmentName, description} = item;

                        const equipmentItem = {
                            ...item,
                            _id,
                            equipmentName,
                            description,
                            quantity: 1,
                            group: viewItem,
                            assignment: assignment || 'Unassigned',
                            status: status || 'Available',
                        };

                        const onActionPress = () => console.info('Clicked group');

                        return renderItemView(equipmentItem, onActionPress);
                    }}
                />
            </CollapsibleListItem>
        );
    };

    const getEquipmentData = (equipments = []) => equipments;

    const renderItemView = (item, onActionPress) => {
        const {_id, group} = item;
        const ids = selectedEquipments.map(item => item._id);

        return (
            <Item
                itemView={equipmentItemView(item, onActionPress)}
                hasCheckBox={true}
                isChecked={ids.includes(_id)}
                onCheckBoxPress={() => handleOnItemCheckboxPress(item)}
                onItemPress={() => handleOnItemPress(item, false, group)}
            />
        );
    };

    const equipmentItemView = ({equipmentName, quantity, status, assignment}, onActionPress) => (
        <>
            <DataItem text={equipmentName} flex={2} color="--color-blue-600" fontStyle="--text-sm-medium"/>
            <DataItem text={status} flex={1.2} color="--color-gray-800" fontStyle="--text-sm-regular"/>
            <DataItem text={quantity} flex={1.5} color="--color-gray-800" fontStyle="--text-sm-regular" align="center"/>
            <DataItem text={assignment} flex={2} color="--color-gray-800" fontStyle="--text-sm-regular"/>
        </>
    );

    const gotoGroupDetails = item => {
        props.navigation.navigate('EquipmentGroupDetailsPage', {data: item, onCreated: handleDataRefresh});
    };

    const equipmentGroupView = (item, onActionPress, isCollapsed) => (
        <>
            <DataItem text={item.name} flex={2} color="--color-gray-800" fontStyle="--text-base-regular"/>
            <DataItem flex={1.2}/>
            <QuantityWrapper>
                <MultipleShadowsContainer shadows={shadows}>
                    <QuantityContainer theme={theme} isCollapsed={isCollapsed}>
                        <QuantityText theme={theme} isCollapsed={isCollapsed}>{item.quantity}</QuantityText>
                    </QuantityContainer>
                </MultipleShadowsContainer>
            </QuantityWrapper>
            <DataItem flex={1.5}/>
            {/*<View style={{flex: .9}}/>*/}
            {/* <View style={{flex: 1.7}}/> */}
            <ContentDataItem
                align="center"
                flex={0.5}
                content={(
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon/> : <CollapsedIcon/>}
                        onPress={onActionPress}
                    />
                )}
            />
        </>
    );

    const gotoAddEquipment = () => {
        modal.closeAllModals();
        navigation.navigate('AddEquipmentPage', {
            equipment: groupSelected,
            onCreated: () => {
                handleDataRefresh();
                setFloatingAction(false);
            }
        });
    };

    const gotoAssignEquipment = () => {
        modal.closeAllModals();
        const equipment = selectedEquipments[0];
        navigation.navigate('AssignEquipmentPage', {equipment, onCreated: handleDataRefresh});
    };

    const openCreateGroupDialog = () => {
        modal.closeAllModals();
        navigation.navigate('AddEquipmentCategory');
    }

    const getFabActions = () => {
        const isGroupDeleteDisabled = !selectedTypesIds.length;

        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={isGroupDeleteDisabled}
                    onLongPress={onRemoveGroups}
                >
                    <ActionItem
                        title="Hold to Delete Group"
                        icon={(
                            <WasteIcon
                                strokeColor={isGroupDeleteDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        onPress={onRemoveGroups}
                        touchable={false}
                        disabled={isGroupDeleteDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isEquipmentItemDeleteDisabled = !selectedEquipments.length;
        const deleteEquipmentItemAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={isEquipmentItemDeleteDisabled}
                    onLongPress={onRemoveItems}
                >
                    <ActionItem
                        title="Hold to Delete Equipment"
                        icon={(
                            <WasteIcon
                                strokeColor={isEquipmentItemDeleteDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        onPress={onRemoveItems}
                        touchable={false}
                        disabled={isEquipmentItemDeleteDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isAssignDisabled = selectedEquipments.length !== 1;
        const assignEquipment = (
            <ActionItem
                disabled={isAssignDisabled}
                touchable={true}
                title="Assign Equipment"
                icon={(
                    <AssignIcon
                        strokeColor={isAssignDisabled ? theme.colors['--color-gray-600'] : theme.colors['--color-blue-700']}
                    />
                )}
                onPress={gotoAssignEquipment}
            />
        );

        const createEquipmentType = (
            <ActionItem
                title="Create Equipment Type"
                icon={<AddIcon/>}
                onPress={openEquipmentTypeDialog}
            />
        );

        const createEquipment = (
            <ActionItem
                title="Add Equipment"
                icon={<AddIcon/>}
                touchable={selectedTypesIds.length === 1}
                disabled={selectedTypesIds.length !== 1}
                onPress={selectedTypesIds.length === 1 ? gotoAddEquipment : () => {
                    console.log(selectedTypesIds.length);
                }}
            />
        );

        const addCategory = (
            <ActionItem
                title='Create Item Group'
                icon = {<AddIcon/>}
                onPress={openCreateGroupDialog}
            />

        );

        return (
            <ActionContainer
                floatingActions={[
                    deleteAction,
                    deleteEquipmentItemAction,
                    assignEquipment,
                    createEquipmentType,
                    createEquipment,
                    addCategory,
                ]}
                title="EQUIPMENT ACTIONS"
            />
        );
    };

    const openConfirmationScreen = callbackFn => {
        modal
            .openModal(
                'ConfirmationModal',
                {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={() => modal.closeModals('ConfirmationModal')}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            callbackFn();
                        }}
                        // onAction = { () => confirmAction()}
                        message="Do you want to delete these item(s)?"
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                }
            );
    };

    const openEquipmentTypeDialog = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal('OverlayModal', {
                content: (
                    <CreateEquipmentTypeDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={() => {
                            handleDataRefresh();
                        }}
                        // onCreated={(item) => handleOnItemPress(item, true)}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };
    // ############# Prepare list data

    const equipmentToDisplay = [...equipmentTypes];

    const removeEquipmentGroup = ids => {
        removeEquipmentTypes(ids)
            .then(data => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            setTimeout(() => {
                                modal.closeModals('ActionContainerModal');
                                onRefresh();
                            }, 200);
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                });
                setSelectedEquipments([]);
                console.log('Data: ', data);
            })
            .catch(_ => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
            });
    };

    const removeEquipmentItems = ids => {
        removeEquipment(ids)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: <ConfirmationComponent
                        isError={false}
                        isEditUpdate={false}
                        onAction={() => {
                            modal.closeModals('ConfirmationModal');
                            setTimeout(() => {
                                modal.closeModals('ActionContainerModal');
                                onRefresh();
                            }, 200);
                        }}
                    />,
                    onClose: () => {
                        modal.closeModals('ConfirmationModal');
                    }
                });
                setSelectedEquipments([]);
            })
            .catch(_ => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
            });
    };

    const openErrorConfirmation = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    };

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Assignment, Status, Parent Name"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Equipment"
                listData={equipmentToDisplay}
                listHeaders={listHeaders}
                itemsSelected={selectedTypesIds}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderEquipmentFn}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={true}
                hasActions={true}
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
            />

        </PageSettingsContext.Provider>
    );
};

// const mapStateToProps = (state) => {
//     const equipment = state.equipment.map(item => {
//         return {
//             ...item,
//             // id: item._id
//         }
//     })
//     return {equipment}
// };

const mapStateToProps = state => ({equipmentTypes: state.equipmentTypes,});

const mapDispatcherToProp = {
    // setEquipmentTypes,
    setEquipment,
};

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Equipment));

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: '#E3E8EF',
        borderRightWidth: 1,

        // marginRight: 20,
        // flex: 2
    },
});
