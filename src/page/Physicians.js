import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import { withModal } from 'react-native-modalfy';
import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import PhysicianActionIcon from '../../assets/svg/physicianListAction';
import LongPressWithFeedback from '../components/common/LongPressWithFeedback';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import ActionItem from '../components/common/ActionItem';
import CreateWorkItemDialog from '../components/Physicians/CreateWorkItemDialog';
import NavPage from '../components/common/Page/NavPage';

import WasteIcon from '../../assets/svg/wasteIcon';
import AddIcon from '../../assets/svg/addIcon';
import AssignIcon from '../../assets/svg/assignIcon';

import {
    useNextPaginator,
    usePreviousPaginator,
    checkboxItemPress,
    selectAll,
    handleUnauthorizedError
} from '../helpers/caseFilesHelpers';

import { setPhysicians } from '../redux/actions/physiciansActions';
import { getPhysicians, removePhysicians } from '../api/network';

import CreatePhysicianDialogContainer from '../components/Physicians/CreatePhyscianDialogContainer';
import { LONG_PRESS_TIMER } from '../const';
import ConfirmationComponent from '../components/ConfirmationComponent';
import DataItem from '../components/common/List/DataItem';

import { PageSettingsContext } from '../contexts/PageSettingsContext';


const Physicians = props => {
    // ############# Const data
    const userPermissions = props.route.params.permissions;
    const recordsPerPage = 12;
    const listHeaders = [
        {
            name: 'Name',
            alignment: 'flex-start'
        },
        {
            name: 'Specialisation',
            alignment: 'flex-start'
        },
        {
            name: 'Cases',
            alignment: 'flex-start'
        },
        {
            name: 'Status',
            alignment: 'center'
        }
    ];
    const floatingActions = [];

    //  ############ Props

    const { physicians, setPhysicians, navigation, modal } = props;

    //  ############ State

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedPhysiciansId, setSelectedPhysiciansId] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});


    // ############# Lifecycle methods

    useEffect(() => {
        if (!physicians.length) {
            fetchPhysiciansData(currentPagePosition);
        }
        setTotalPages(Math.ceil(physicians.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchPhysiciansData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchPhysiciansData, 300);

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

    const onRefresh = () => {
        fetchPhysiciansData();
    };

    const onSearchInputChange = input => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchPhysiciansData();
    };

    const handleOnSelectAll = () => {
        const updatedPhysiciansList = selectAll(physicians, selectedPhysiciansId);
        setSelectedPhysiciansId(updatedPhysiciansList);
    };

    const handleOnCheckBoxPress = item => () => {
        const { _id } = item;
        const updatedPhysiciansList = checkboxItemPress(_id, selectedPhysiciansId);
        setSelectedPhysiciansId(updatedPhysiciansList);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        // modal.openModal('BottomSheetModal',{
        //     content : <PhysicianBottomSheet physician = {item} isOpenEditable = {isOpenEditable}/>
        // })
        props.navigation.navigate('PhysicianPage', {
            initial: false,
            physician: item,
            updatePhysicians: userPermissions.update,
            isEdit: isOpenEditable,
            reloadPhysicians: () => fetchPhysiciansData(currentPagePosition)
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {
                currentPage,
                currentListMin,
                currentListMax
            } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchPhysiciansData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const {
            currentPage,
            currentListMin,
            currentListMax
        } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchPhysiciansData(currentPage);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'PHYSICIAN ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    // ############# Helper functions

    const fetchPhysiciansData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getPhysicians(searchValue, recordsPerPage, currentPosition)
            .then(physicianResult => {
                const { data = [], pages = 0 } = physicianResult;

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

                setPhysicians(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get physicians', error);

                handleUnauthorizedError(error?.response?.status, setPhysicians);
                setPageSettingState({ ...pageSettingState, isDisabled: true });

                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const renderPhysiciansFn = item => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedPhysiciansId.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={physiciansItem(item)}
        />
    );

    const statusColor = status => (status === 'Active' ? '#4E5664' : '#E53E3E');

    const physiciansItem = item => {
        const { _id = '', surname = '', field: type = '', status = 'Active', casesCount = 0 } = item;
        return (
            <>
                <View style={[styles.item, {}]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, {
                            fontSize: 16,
                            color: '#3182CE'
                        }]}
                    >Dr. {surname}</Text>
                </View>
                <View style={[styles.item, { alignItems: 'flex-start' }]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, {
                            fontSize: 16,
                            color: '#4E5664'
                        }]}
                    >{type}</Text>
                </View>
                <DataItem flex={1} text={casesCount} color="--color-blue-600" fontStyle="--text-sm-medium"
                    align="center" />
                <View style={[styles.item, { alignItems: 'center' }]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, {
                            fontSize: 14,
                            color: statusColor(status)
                        }]}
                    >{status}</Text>
                </View>
            </>
        );
    };

    const getFabActions = () => {
        const deleteAction = (
            userPermissions.delete &&  <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={removePhysiciansLongPress}
            >
                 <ActionItem
                    title="Hold to Delete"
                    icon={<WasteIcon />}
                    onPress={() => {
                    }}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );
        // const assignActionCase = (
        //     <ActionItem
        //         title="Assign Case"
        //         icon={<AssignIcon/>}
        //         onPress={() => {
        //         }}
        //     />
        // );
        // const createActionWorkItem = (
        //     <ActionItem
        //         title="Add Work Item"
        //         icon={<AddIcon/>}
        //         onPress={openCreateNewWorkItem}
        //     />
        // );
        const createActionPhysician = (
            
            userPermissions.create &&  <ActionItem
                title="Add Physician"
                icon={<AddIcon />}
                onPress={openCreatePhysicians}
            />
        );

        return <ActionContainer
            floatingActions={[
                deleteAction,
                // assignActionCase,
                createActionPhysician,
                // createActionWorkItem
            ]}
            title="PHYSICIAN ACTIONS"
        />;
    };

    const removePhysiciansLongPress = () => {
        // Done with one or more ids selected
        if (selectedPhysiciansId.length > 0) openDeletionConfirm({ ids: [...selectedPhysiciansId] });
        else openErrorConfirmation();
    };

    const openDeletionConfirm = data => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals('ConfirmationModal')}
                    onAction={() => {
                        modal.closeModals('ConfirmationModal');
                        removePhysiciansCall(data);
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

    const removePhysiciansCall = data => {
        removePhysicians(data)
            .then(_ => {
                modal.openModal(
                    'ConfirmationModal',
                    {
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
                    }
                );

                setSelectedPhysiciansId([]);
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove group: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    };

    const openCreateNewWorkItem = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreateWorkItemDialog onCancel={() => setFloatingAction(false)} />,
                        onClose: () => setFloatingAction(false)
                    }
                );
        }, 200);
    };

    const openCreatePhysicians = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal
                .openModal(
                    'OverlayModal',
                    {
                        content: <CreatePhysicianDialogContainer
                            onCancel={() => setFloatingAction(false)}
                            onCreated={item => {
                                handleOnItemPress(item, true);
                            }}
                        />,
                        onClose: () => setFloatingAction(false)
                    }
                );
        }, 200);
    };

    // ############# Prepare list data

    const physiciansToDisplay = [...physicians];
    // physiciansToDisplay = physiciansToDisplay.slice(currentPageListMin, currentPageListMax);

    console.log('jsljkd', (userPermissions.create||userPermissions.delete) )
    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Physician or phone number"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Physicians"
                listData={physiciansToDisplay}
                listHeaders={listHeaders}
                itemsSelected={selectedPhysiciansId}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderPhysiciansFn}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={( (userPermissions.create||userPermissions.delete) === false) ? false : true}
                hasActions={true}
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
            />
        </PageSettingsContext.Provider>

    );
};

const mapStateToProps = state => {
    const physicians = state.physicians.map(item => ({
        ...item,
        // type : 'Neurosurgeon',
        // status : 'Active'
    }));

    return { physicians };
    // physicians: state.physicians
};

const mapDispatcherToProp = { setPhysicians };

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Physicians));

const styles = StyleSheet.create({
    item: { flex: 1 },
    itemText: {},
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
});
