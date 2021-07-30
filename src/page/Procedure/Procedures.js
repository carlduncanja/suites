import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import _ from 'lodash';
import {useModal} from 'react-native-modalfy';
import {useTheme} from 'emotion-theming';
import Page from '../../components/common/Page/Page';
import ListItem from '../../components/common/List/ListItem';
import RoundedPaginator from '../../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import ActionItem from '../../components/common/ActionItem';
import NavPage from '../../components/common/Page/NavPage';

import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';

import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll, handleUnauthorizedError} from '../../helpers/caseFilesHelpers';

import {setProcedures} from '../../redux/actions/proceduresActions';
import {bulkUploadProcedureRequest, getProcedures, removeProcedures} from '../../api/network';

import {DISABLED_COLOR, LONG_PRESS_TIMER} from '../../const';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import DataItem from '../../components/common/List/DataItem';
import RightBorderDataItem from '../../components/common/List/RightBorderDataItem';
import TouchableDataItem from '../../components/common/List/TouchableDataItem';

import { PageSettingsContext } from '../../contexts/PageSettingsContext';
import ExportIcon from "../../../assets/svg/exportIcon";
import UploadInventorySheet from "../Inventory/UploadInventorySheet";
import FileUploadComponent from "../../components/FileUploadComponent";

const Procedures = props => {
    // ############# Const data
    const recordsPerPage = 10;

    const modal = useModal();
    const theme = useTheme();

    const listHeaders = [
        {
            name: 'Procedure',
            alignment: 'flex-start',
            flex: 1.5
        },
        {
            name: 'Physician',
            alignment: 'flex-start',
            flex: 1
        },
        {
            name: 'Duration',
            alignment: 'center',
            flex: 1
        }
    ];

    //  ############ Props
    const {procedures = [], setProcedures, navigation} = props;

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

    const [selectedProcedures, setSelectedProcedures] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});


    // const routeName = route.name;
    // ############# Lifecycle methods

    useEffect(() => {
        if (!procedures.length) fetchProceduresData(currentPagePosition);
        setTotalPages(Math.ceil(procedures.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchProceduresData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProceduresData, 300);

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
        fetchProceduresData();
    };

    const handleOnSelectAll = () => {
        const updatedProceduresList = selectAll(procedures, selectedProcedures);
        setSelectedProcedures(updatedProceduresList);
    };

    const handleOnCheckBoxPress = item => () => {
        const {_id} = item;
        const updatedProcedures = checkboxItemPress(_id, selectedProcedures);

        setSelectedProcedures(updatedProcedures);
    };

    const handleOnItemPress = (item, isOpenEditable) => () => {
        console.log('Open');
        navigation.navigate('Procedures List', {
            screen: 'Procedure',
            initial: false,
            params: {
                procedure: item,
                isOpenEditable,
                onUpdate: () => {
                    handleDataRefresh();
                }
            }
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchProceduresData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchProceduresData(currentPage);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'PROCEDURES ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    // ############# Helper functions

    const fetchProceduresData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getProcedures(searchValue, recordsPerPage, currentPosition)
            .then(proceduresResult => {
                const {data = [], pages = 0} = proceduresResult;

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

                setProcedures(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
                // setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log('failed to get procedures', error);

                handleUnauthorizedError(error?.response?.status, setProcedures);
                setPageSettingState({...pageSettingState, isDisabled: true});

                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const renderProcedureFn = item => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedProcedures.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={handleOnItemPress(item, false)}
            itemView={procedureItem(item)}
        />
    );

    const procedureItem = item => {
        const {physician = {}} = item;
        const {firstName = '', surname = ''} = physician;
        const physicianName = firstName && surname ? `Dr. ${firstName} ${surname}` : 'Unassigned';
        return (
            <>
                <RightBorderDataItem flex={1.5} fontStyle="--text-base-regular" color="--color-gray-800" text={item?.name}/>
                <TouchableDataItem flex={1} fontStyle="--text-base-regular" text={`${physicianName}`} isDisabled={true}/>
                <DataItem flex={1} fontStyle="--text-base-regular" align="center" color="--color-blue-600" text={`${item.duration || 1} hours`}/>
            </>
        );
    };

    const openUploadProceduresModal = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayInfoModal',
                {
                    overlayContent: <FileUploadComponent
                        onCreated={() => {
                            // refresh inventory view.

                            setFloatingAction(false);
                            modal.openModal('ConfirmationModal', {
                                content: <ConfirmationComponent
                                    isError={false}
                                    isEditUpdate={false}
                                    message="Procedures Uploaded successfully!"
                                    onAction={() => {
                                        modal.closeModals('ConfirmationModal');
                                        setTimeout(() => {
                                            modal.closeModals('ActionContainerModal');
                                            fetchProceduresData(currentPagePosition)
                                        }, 200);
                                    }}
                                />,
                                onClose: () => {
                                    modal.closeModals('ConfirmationModal');
                                }
                            });
                        }}
                        onCancel={() => setFloatingAction(false)}
                        sendFilePromise={bulkUploadProcedureRequest}
                        title="Upload Procedure List."
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };

    const getFabActions = () => {
        const isDeleteDisabled = selectedProcedures.length < 1; // displayed if no items are selected.
        const deleteAction = (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={removeProceduresLongPress}
                isDisabled={isDeleteDisabled}
            >
                <ActionItem
                    title="Hold to Delete"
                    disabled={isDeleteDisabled}
                    icon={<WasteIcon strokeColor={isDeleteDisabled ? DISABLED_COLOR(theme) : "#C53030"}/>}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );

        const isCreateCopyDisabled = selectedProcedures.length !== 1;
        const copyProcedure = selectedProcedures.length === 1 ? procedures.find(item => item._id === selectedProcedures[0]) : null;

        const createCopy = (
            <ActionItem
                title="Create Copy"
                icon={<AddIcon strokeColor={isCreateCopyDisabled ? theme.colors['--color-gray-600'] : '#2F855A'}/>}
                onPress={() => openCreateCopy(copyProcedure)}
                disabled={isCreateCopyDisabled}
                touchable={!isCreateCopyDisabled}
            />
        );
        const createNewProcedure = (
            <ActionItem
                title="New Procedure"
                icon={<AddIcon/>}
                onPress={openCreateProcedure}
            />
        );

        const uploadProcedures = <ActionItem title="Upload Procedures" icon={<ExportIcon/>}
                                            onPress={openUploadProceduresModal}/>;

        return <ActionContainer
            floatingActions={[
                deleteAction,
                createCopy,
                createNewProcedure,
                uploadProcedures
            ]}
            title="PROCEDURES ACTIONS"
        />;
    };

    const removeProceduresLongPress = () => {
        // Done with one or more ids selected
        if (selectedProcedures.length > 0) openDeletionConfirm({ids: [...selectedProcedures]});
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
                        removeProceduresCall(data);
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

    const removeProceduresCall = data => {
        removeProcedures(data)
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
                                    handleDataRefresh();
                                }, 200);
                            }}
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );

                setSelectedProcedures([]);
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

    const openCreateProcedure = () => {
        modal.closeModals('ActionContainerModal');

        navigation.navigate('CreateProcedure', {
            screen: 'CreateProcedure',
            initial: false,
            onCancel: () => {
                navigation.goBack();
                setFloatingAction(false);
            },
            onCreated: createdItem => {
                navigation.goBack();
                setFloatingAction(false);
                handleDataRefresh();
                setTimeout(() => {
                    handleOnItemPress(createdItem, false)();
                }, 300);
            },
        });
    };

    const openCreateCopy = item => {
        modal.closeModals('ActionContainerModal');

        const procedureCopy = {...item};

        // modify copy object to manage attributes which can be copied
        procedureCopy.procedureReferenceName = procedureCopy.name;
        procedureCopy.procedureReference = procedureCopy._id;
        procedureCopy.name = `${procedureCopy.name} - Copy`;
        procedureCopy.physician = {
            _id: procedureCopy.physician._id,
            name: `Dr. ${procedureCopy.physician.surname}`
        };

        navigation.navigate('CreateProcedure', {
            screen: 'CreateProcedure',
            initial: false,
            referenceProcedure: procedureCopy,
            onCancel: () => {
                navigation.goBack();
                setFloatingAction(false);
            },
            onCreated: createdItem => {
                navigation.goBack();
                setFloatingAction(false);
                handleDataRefresh();
                setTimeout(() => {
                    handleOnItemPress(createdItem, false)();
                }, 300);
            },
        });

        // navigation.navigate('Procedures List', {
        //     screen: 'CreateCopy',
        //     initial: false,
        //     onCancel: () => {
        //         {
        //             navigation.goBack();
        //             setFloatingAction(false);
        //         }
        //     },
        //     onCreated: () => {
        //         {
        //             navigation.goBack();
        //             setFloatingAction(false);
        //         }
        //     },
        // });
    };

    // ############# Prepare list data

    const proceduresToDisplay = [...procedures];
    // proceduresToDisplay = proceduresToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Procedure, or Physician"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Procedures"
                listData={proceduresToDisplay}
                listHeaders={listHeaders}
                itemsSelected={selectedProcedures}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderProcedureFn}
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

const mapStateToProps = state => ({procedures: state.procedures});

const mapDispatcherToProp = {setProcedures};

export default connect(mapStateToProps, mapDispatcherToProp)(Procedures);

