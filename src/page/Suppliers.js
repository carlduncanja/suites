import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import _, { isEmpty } from 'lodash';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { withModal, useModal } from 'react-native-modalfy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from '../components/common/LongPressWithFeedback';
import ActionContainer from '../components/common/FloatingAction/ActionContainer';
import ActionItem from '../components/common/ActionItem';
import Footer from '../components/common/Page/Footer';
import NavPage from '../components/common/Page/NavPage';
import ConfirmationComponent from '../components/ConfirmationComponent';
import ArchiveIcon from '../../assets/svg/archiveIcon';
import AddIcon from '../../assets/svg/addIcon';
import RightBorderDataItem from '../components/common/List/RightBorderDataItem';
import DataItem from '../components/common/List/DataItem';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll, handleUnauthorizedError } from '../helpers/caseFilesHelpers';

import { setSuppliers } from '../redux/actions/suppliersActions';
import { getSuppliers, archiveSupplier, archiveSuppliers, deleteSuppliersId } from '../api/network';

import suppliersTest from '../../data/Suppliers';
import SuppliersBottomSheet from './Suppliers/SupplierPage';
import CreateSupplierDialogContainer from '../components/Suppliers/CreateSupplierDialogContainer';
import Button from '../components/common/OverlayButtons/OverlayButton';
import TouchableDataItem from '../components/common/List/TouchableDataItem';

import { PageSettingsContext } from '../contexts/PageSettingsContext';
import WasteIcon from '../../assets/svg/wasteIcon';
import { LONG_PRESS_TIMER } from '../const';


const ArchiveButton = styled.TouchableOpacity`
    align-items:center;
    border-width:1px;
    margin-right:5px;
    justify-content:center;
    border-color: ${({ theme }) => theme.colors['--color-gray-500']};
    width:100px;
    height:30px;
    border-radius:6px;
`;

const ButtonContainer = styled.View`
    width:85%;
    height:100%;
    align-items:flex-end;
`;
const ArchiveButtonText = styled.Text`
align-items: center; 
color: #A0AEC0;
`;

const Suppliers = props => {
    const theme = useTheme();
    const suppplierPermissions = props.route.params.suppplierPermissions;
    // ############# Const data
    
    const recordsPerPage = 10;
    const listHeaders = [
        {
            name: 'Name',
            alignment: 'flex-start',
            flex: 2
        },
        {
            name: 'Phone',
            alignment: 'flex-start',
            flex: 1
        },
        {
            name: 'Email',
            alignment: 'flex-start',
            flex: 2
        }
    ];

    //  ############ Props
    const { suppliers = [], setSuppliers } = props;
    const modal = useModal();

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

    const [selectedSuppliers, setSelectedSuppliers] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});


    // ############# Lifecycle methods

    useEffect(() => {
        if (!suppliers.length) fetchSuppliersData(currentPagePosition);
        setTotalPages(Math.ceil(suppliers.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchSuppliersData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchSuppliersData, 300);

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
        fetchSuppliersData();
    };

    const handleOnSelectAll = () => {
        const updatedSuppliersList = selectAll(suppliers, selectedSuppliers);
        setSelectedSuppliers(updatedSuppliersList);
    };

    const handleOnCheckBoxPress = item => () => {
        const { _id } = item;
        const updatedSuppliersList = checkboxItemPress(_id, selectedSuppliers);

        setSelectedSuppliers(updatedSuppliersList);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate('SupplierPage', {
            initial: false,
            supplier: item,
            isEdit: isOpenEditable,
            floatingActions: getFabActions,
            handleDataRefresh: () => handleDataRefresh()
        });
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchSuppliersData(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        const { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchSuppliersData(currentPage);
        
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal('ActionContainerModal',
            {
                actions: getFabActions(),
                title: 'SUPPLIER ACTIONS',
                onClose: () => {
                    setFloatingAction(false);
                }
            });
    };

    // ############# Helper functions

    const fetchSuppliersData = pagePosition => {
        const currentPosition = pagePosition || 1;
        setCurrentPagePosition(currentPosition);

        setFetchingData(true);
        getSuppliers(searchValue, recordsPerPage, currentPosition)
            .then(suppliersInfo => {
                const { data = [], pages = 0 } = suppliersInfo;

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

                setSuppliers(data);
                data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
            })
            .catch(error => {
                console.log('failed to get Suppliers', error);

                handleUnauthorizedError(error?.response?.status, setSuppliers);
                setPageSettingState({ ...pageSettingState, isDisabled: true });

                setTotalPages(1);
                setPreviousDisabled(true);
                setNextDisabled(true);
            })
            .finally(_ => {
                setFetchingData(false);
            });
    };

    const renderSupplierFn = item => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedSuppliers.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={supplierItem(item)}
        />
    );

    const supplierItem = item => (
        <>
            <RightBorderDataItem
                text={item.name}
                flex={2}
                color="--color-gray-800"
            />
            <TouchableDataItem
                text={item.phone}
                onPress={() => {
                }}
                isPhone={true}
            />
            <TouchableDataItem
                text={item.email}
                onPress={() => {
                }}
                flex={2}
                isEmail={true}
            />
        </>
    );

    const cancelClicked = () => {
        modal.closeAllModals('ConfirmationModal');
    };

    const toggleConfirmArchive = () => {
        !isEmpty(selectedSuppliers) ?
            modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={true}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}//use this specification to either get the confirm an edit or update
                        onCancel={cancelClicked}
                        onAction={archiveSupplierClick}
                        message="Are you sure you want to Archive the supplier(s)"//general message you can send to be displayed
                        action="Archive"
                    />
                )
            }) : modal.openModal('ConfirmationModal', {
                content: (
                    <ConfirmationComponent
                        isError={true}//boolean to show whether an error icon or success icon
                        isEditUpdate={false}//use this specification to either get the confirm an edit or update
                        onCancel={cancelClicked}
                        onAction={archiveSupplierClick}
                        message="Please choose a supplier "//general message you can send to be displayed
                        action="Archive"
                    />
                )
            });
    };

    const archiveSupplierClick = () => {
        //fetchSuppliersData(currentPagePosition);
        const selected = {ids: [...selectedSuppliers]};
        modal.closeAllModals('ConfirmationModal');

        console.log('Archive suppliers: ', selected);

        archiveSuppliers(selected)
            .then(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={false}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals() }
                            onAction={() => {
                                modal.closeAllModals();
                                handleDataRefresh();
                                setTimeout(() => {
                                    goToArchives();
                                }, 200)
                                
                            }}
                        />
                    )
                })
            })
            .catch(_ => {
                modal.openModal('ConfirmationModal', {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals() }
                            onAction={() => modal.closeAllModals() }
                        />
                    )
                })
            })
    };

    const handleRemoveSupplier = () => {
        openDeletionConfirm({ids: [...selectedSuppliers]})
    };

    const removeSuppliersCall = data => {
        deleteSuppliersId(data)
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
                
                setSelectedSuppliers([]);
            })
            .catch(error => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals('ActionContainerModal');
                }, 200);
                console.log('Failed to remove suppliers: ', error);
            })
            .finally(_ => {
                setFloatingAction(false);
            });
    }   

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
                        removeSuppliersCall(data)

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

    const getFabActions = () => {
        const actionArray = []
        const archiveCase = (
            <ActionItem
                title="Archive Supplier"
                touchable={!isEmpty(selectedSuppliers)}
                disabled={!!isEmpty(selectedSuppliers)}
                icon={!isEmpty(selectedSuppliers) ? <ArchiveIcon /> : <ArchiveIcon strokeColor="#A0AEC0" />}
                onPress={!isEmpty(selectedSuppliers) ? toggleConfirmArchive : () => {
                }}
            />
        );
        const createNewSupplier = <ActionItem title="Add Supplier" icon={<AddIcon />} onPress={onOpenCreateSupplier} />;
        const deleteAction = (
            <View style={{
                borderRadius: 6,
                flex: 1,
                overflow: 'hidden'
            }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={!!isEmpty(selectedSuppliers)}
                    onLongPress={handleRemoveSupplier}
                >
                    <ActionItem
                        title="Hold to Delete Supplier"
                        icon={(
                            <WasteIcon
                                strokeColor={!!isEmpty(selectedSuppliers) ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']}
                            />
                        )}
                        touchable={false}
                        disabled={!!isEmpty(selectedSuppliers)}
                    />
                </LongPressWithFeedback>
            </View>
        );

        suppplierPermissions.create && actionArray.push(createNewSupplier)
        suppplierPermissions.delete && actionArray.push(archiveCase, deleteAction)

        return <ActionContainer
            floatingActions={actionArray}
            title="SUPPLIER ACTIONS"
        />;
    };

    const goToArchives = () => {
        props.navigation.navigate('ArchivedSuppliers', {
            refreshSuppliers: handleDataRefresh
        });
    };

    const onOpenCreateSupplier = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <CreateSupplierDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={item => handleOnItemPress(item, true)}
                        onUpdate={() => handleDataRefresh()}
                    />,
                    onClose: () => setFloatingAction(false)
                });
        }, 200);
    };

    // ############# Prepare list data

    const suppliersToDisplay = [...suppliers];
    // suppliersToDisplay = suppliersToDisplay.slice(currentPageListMin, currentPageListMax);

    // ##### STYLED COMPONENTS

    const SuppliersWrapper = styled.View`
        height: 100%;
        width: 100%;
        background-color: green;
    `;
    const SuppliersContainer = styled.View`
        display: flex;
        height: 100%;
    `;

    return (
        <PageSettingsContext.Provider value={{
            pageSettingState,
            setPageSettingState
        }}
        >
            <NavPage
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Supplxier"
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName="Suppliers"
                listData={suppliersToDisplay}
                TopButton={() => (
                    <ButtonContainer>
                        <ArchiveButton onPress={goToArchives} theme={theme}>
                            <ArchiveButtonText>View Archive</ArchiveButtonText>
                        </ArchiveButton>
                    </ButtonContainer>
                )}

                listHeaders={listHeaders}
                itemsSelected={selectedSuppliers}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderSupplierFn}
                totalPages={totalPages}
                currentPage={currentPagePosition}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
                hasPaginator={true}
                hasActionButton={suppplierPermissions.create || suppplierPermissions.delete}
                hasActions={true}
                isNextDisabled={isNextDisabled}
                isPreviousDisabled={isPreviousDisabled}
            />

        </PageSettingsContext.Provider>


    );
};

const mapStateToProps = state => ({ suppliers: state.suppliers });

const mapDispatcherToProp = { setSuppliers };

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Suppliers));

const styles = StyleSheet.create({
    item: {
        // flex:1
    },
    itemText: { fontSize: 16 },
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
    }
});
