
// theatresPage.js
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {useModal} from 'react-native-modalfy';
import _ from 'lodash';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import moment from 'moment';
import Page from '../../components/common/Page/Page';
import IconButton from '../../components/common/Buttons/IconButton';
import ActionIcon from '../../../assets/svg/ActionIcon';
import ListItem from '../../components/common/List/ListItem';
import {getTheatres, removeTheatres} from '../../api/network';
import {setTheatres} from '../../redux/actions/theatresActions';
import CaseFileBottomSheet from '../../components/CaseFiles/CaseFileBottomSheet';
import RoundedPaginator from '../../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../../components/common/FloatingAction/FloatingActionButton';
import {
    useNextPaginator,
    usePreviousPaginator,
    selectAll,
    checkboxItemPress, handleUnauthorizedError,
} from '../../helpers/caseFilesHelpers';
import LongPressWithFeedback from '../../components/common/LongPressWithFeedback';
import ActionItem from '../../components/common/ActionItem';
import WasteIcon from '../../../assets/svg/wasteIcon';
import AddIcon from '../../../assets/svg/addIcon';
import ActionContainer from '../../components/common/FloatingAction/ActionContainer';
import CreateTheatreDialogContainer from '../../components/Theatres/CreateTheatreDialogContainer';
import AssignIcon from '../../../assets/svg/assignIcon';

import Footer from '../../components/common/Page/Footer';
import NavPage from '../../components/common/Page/NavPage';
import ConfirmationComponent from '../../components/ConfirmationComponent';
import {LONG_PRESS_TIMER} from '../../const';
import useAuthHandler from '../../hooks/useAuthHandler';
import { PageSettingsContext } from '../../contexts/PageSettingsContext';

const listHeaders = [
    {
        // id: "1",
        name: 'Theatre',
        alignment: 'flex-start',
        flex: 2,
    },
    {
        // id: "2",
        name: 'Status',
        alignment: 'center',
        flex: 1,
    },
    {
        // id: "3",
        name: 'Recovery',
        alignment: 'center',
        flex: 1,
    },
    {
        // id: "3",
        name: 'Actions',
        alignment: 'center',
        flex: 1,
    },
];

function Theatres(props) {
    const {theatres = [], setTheatres} = props;
    const theme = useTheme();
    const pageTitle = 'Theatre Rental';
    const emptyTitle = 'No Theatres Found';
    const modal = useModal();
    const recordsPerPage = 12;
    const theatrePermissions =   props.route.params.theatrePermissions;
    //const hasEmpty = true

    // ##### States 
    const [hasEmpty,setHasEmpty]=useState(false)
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [pageSettingState, setPageSettingState] = useState({});

    // ##### Lifecycle Methods functions

    // on mount
    useEffect(() => {
        if (!theatres.length) fetchTheatres(currentPagePosition);
        setTotalPages(Math.ceil(theatres.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchTheatres(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    // ##### Handler functions

    const onItemPress = (item, isOpenEditable) => () => {
        props.navigation.navigate('TheatresPage', {
            initial: false,
            theatre: item,
            isEdit: isOpenEditable,
            updateTheatre : theatrePermissions.update,
            reloadTheatres: () => fetchTheatres(currentPagePosition)
        });
    };

    const onSearchInputChange = input => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchTheatres();
    };

    const onSelectAll = () => {
        const updatedTheatres = selectAll(theatres, selectedIds);
        setSelectedIds(updatedTheatres);
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchTheatres(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) {
            return;
        }

        const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchTheatres(currentPage);
    };

    const onCheckBoxPress = item => () => {
        const {_id} = item;
        const updatedTheatres = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedTheatres);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal', {
            actions: getFabActions(),
            title: 'THEATRE ACTIONS',
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    // ##### Helper functions
    const theatreItem = ({name = '', recoveryStatus = 'n/a', recoveryStatusColor, status = '', statusColor}, onActionPress) => (
        <>
            <View style={[styles.item, {flex: 2, ...styles.rowBorderRight}]}>
                <Text style={{color: '#3182CE', fontSize: 16}}>{name}</Text>
            </View>
            <View style={[styles.item, {flex: 1, justifyContent: 'center'}]}>
                <Text style={[styles.itemText, {color: statusColor}]}>{status}</Text>
            </View>
            <View style={[styles.item, {flex: 1, justifyContent: 'center'}]}>
                <Text style={[styles.itemText, {color: recoveryStatusColor}]}>
                    {recoveryStatus}
                </Text>
            </View>
            <View style={[styles.item, {flex: 1, justifyContent: 'center'}]}>
                <IconButton Icon={<AssignIcon/>} disabled={!theatrePermissions.update} onPress={onActionPress}/>
            </View>
        </>
    );

    const getFabActions = () => {
        const deleteAction = (
            theatrePermissions.delete && <View style={{borderRadius: 6, flex: 1, overflow: 'hidden'}}>
               <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeTheatresLongPress}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon/>}
                        onPress={() => {
                        }}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction = (
            theatrePermissions.create && <ActionItem
                title="Create Theatre"
                icon={<AddIcon/>}
                onPress={openCreateTheatreModel}
            />
        );

        return (
            <ActionContainer
                floatingActions={[deleteAction, createAction]}
                title="THEATRE ACTIONS"
            />
        );
    };

    const removeTheatresLongPress = () => {
        // Done with one or more ids selected
        if (selectedIds.length > 0) openDeletionConfirm({ids: [...selectedIds]});
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
                        removeTheatresCall(data);
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

    const removeTheatresCall = data => {
        setFetchingData(true);
        removeTheatres(data)
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

                setSelectedIds([]);
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
                setFetchingData(false);
            });
    };

    const openCreateTheatreModel = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal('OverlayModal', {
                content: (
                    <CreateTheatreDialogContainer
                        // onCreated={()=>onItemPress()}
                        onCreated={() => {
                            onRefresh();
                            setFloatingAction(false);
                        }}
                        onCancel={() => setFloatingAction(false)}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const isInUse = (appointments = []) => {
        const now = moment();

        if (!Array.isArray(appointments)) return {isActive: false, isRecovery: false};

        for (const appointment of appointments) {
            const startTime = moment(appointment.startTime);
            const endTime = moment(appointment.endTime);

            const isActive = now.isBetween(startTime, endTime);

            if (isActive) {
                return {isActive: true, isRecovery: false};
            }
        }

        return {isActive: false, isRecovery: false};
    };

    const renderItem = item => {
        const availableColor = '#38A169';
        const inUseColor = '#DD6B20';

        const {isActive, isRecovery} = isInUse(item.appointments || []);

        const formattedItem = {
            name: item.name || '',
            recoveryStatus: item.isRecovery ? 'Yes' : item.active ? 'No' : '--',
            recoveryStatusColor: item.isRecovery ? availableColor : '#4E5664',
            status: !item.active ? 'Available' : 'In-Use',
            statusColor: !item.active ? availableColor : inUseColor,
        };

        // console.log("Formatted Item: ", formattedItem)

        const onActionClick = (isOpenEditable) => {
            console.log('click')
            props.navigation.navigate('TheatresPage', {
                initial: false,
                theatre: item,
                isEdit: isOpenEditable,
                reloadTheatres: () => fetchTheatres(currentPagePosition),
                tab: 4,
                updateTheatre : theatrePermissions.update,

            });
        };
        const itemView = theatreItem(formattedItem, () => onActionClick(false));

        return (
            <ListItem
                isChecked={selectedIds.includes(item._id)}
                onCheckBoxPress={onCheckBoxPress(item)}
                onItemPress={onItemPress(item, false)}
                itemView={itemView}
            />
        );
    };

    const fetchTheatres = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getTheatres(searchValue, recordsPerPage, currentPosition)
            .then(result => {
                const {data = [], pages = 0} = result;
                  
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
                data.length === 0 ? setHasEmpty(true) :setHasEmpty(false)
        
                console.log('Theatre data:', data);
                setTheatres(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                // handle error
                console.log('failed to fetch theatres', error);

                handleUnauthorizedError(error?.response?.status, setTheatres);
                // if (error?.response && error?.response?.status === 401) setTheatres([]);
                // showAuthReadBlocked(error, () => setTheatres([]));
                setPageSettingState({...pageSettingState, isDisabled: true});
                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    // const showAuthReadBlocked = (
    //     error,
    //     callback = () => {
    //     }
    // ) => {
    //     if (error?.response && error?.response?.status === 401) {
    //         callback();
    //         modal.openModal('ConfirmationModal', {
    //             content: (
    //                 <ConfirmationComponent
    //                     isError
    //                     isEditUpdate={false}
    //                     onCancel={() => modal.closeAllModals()}
    //                     onAction={() => modal.closeAllModals()}
    //                     titleText="Unauthorized"
    //                     message="Unauthorized User. Cannot Process Request"
    //                 />
    //             ),
    //             onClose: () => console.info('modal.closed'),
    //         });
    //     }
    // };

    const theatresToDisplay = [...theatres];

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            {/*nav bar at the top of theatre page*/}
            <NavPage
                placeholderText="Search by theatre name"
                routeName={pageTitle}
                listData={theatresToDisplay}
                listItemFormat={renderItem}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listHeaders={listHeaders}
                changeText={onSearchInputChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}

                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={theatrePermissions.delete || theatrePermissions.create}
                hasActions={true}
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
                hasEmpty={hasEmpty} 
                hasList={!hasEmpty}
                emptyTitle={emptyTitle}
            />

        </PageSettingsContext.Provider>
    );
}

Theatres.propTypes = {};
Theatres.defaultProps = {};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    itemText: {
        fontSize: 14,
        color: '#4E5664',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: '#E3E8EF',
        borderRightWidth: 1,
        // marginRight: 20,
    },
});

const mapStateToProps = state => {
    const theatres = state.theatres.map(item => ({
        ...item,
        // id: item._id
    }));

    return {theatres};
};

const mapDispatchToProps = {setTheatres};

export default connect(mapStateToProps, mapDispatchToProps)(Theatres);
