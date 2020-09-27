import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native"
import {useTheme} from "emotion-theming"
import PropTypes from 'prop-types';
import NavPage from "../../components/common/Page/NavPage";
import {useModal} from "react-native-modalfy";
import {useNextPaginator, usePreviousPaginator} from "../../helpers/caseFilesHelpers";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ListItem from "../../components/common/List/ListItem";
import {deleteUserCall, getUsersCall} from "../../api/network";
import styled from '@emotion/native';
import DataItem from "../../components/common/List/DataItem";
import EditIcon from "../../../assets/svg/editIcon";
import IconButton from "../../components/common/Buttons/IconButton";
import ActionIcon from "../../../assets/svg/dropdownIcon";
import CollapsedIcon from "../../../assets/svg/closeArrow";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import {LONG_PRESS_TIMER} from "../../const";
import ActionItem from "../../components/common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import AddIcon from "../../../assets/svg/addIcon";
import CreateTheatreDialogContainer from "../../components/Theatres/CreateTheatreDialogContainer";
import CreateUserOverlayDialog from "../../components/Users/CreateUserOverlayDialog";
import _ from "lodash";


const listHeaders = [
    {
        name: "User",
        alignment: "flex-start",
        flex: 1.3,
    },
    {
        name: "Email",
        alignment: "flex-start",
        flex: 2,
    },
    {
        name: "User Group",
        alignment: "center",
        flex: 1,
    },
    {
        name: "Actions",
        alignment: "center",
        flex: 1,
    },
];

function UsersPage() {

    const theme = useTheme();
    const pageTitle = "Users";
    const modal = useModal();
    const recordsPerPage = 10;

    // ##### States
    const [isLoading, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [users, setUsers] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    // pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    // region Lifecycle Methods
    useEffect(() => {
        if (!users.length) fetchUsers(currentPagePosition);
        setTotalPages(Math.ceil(users.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchUsers(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchUsers, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    // endregion


    // region Event Handlers
    const onItemPress = (item, isOpenEditable) => () => {

    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchUsers(currentPagePosition);
    };

    const onSelectAll = () => {
    };

    const goToNextPage = () => {

        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchUsers(currentPage)
        }
    };

    const goToPreviousPage = () => {

        if (currentPagePosition === 1) {
            return
        }
        ;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchUsers(currentPage)

    };

    const onCheckBoxPress = (selectedItem) => () => {
        if (selectedIds.includes(selectedItem._id)) {
            setSelectedIds(selectedIds.filter(id => selectedItem._id !== id))
        } else {
            setSelectedIds([...selectedIds, selectedItem._id])
        }
    };

    const removeUserFromState = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    }

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "USER ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const onActionPress = () => {

    }

    const onDeleteUsers = () => {
        modal.openModal(
            'ConfirmationModal',
            {
                content: <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={modal.closeAllModals}
                    onAction={() => deleteUser(selectedIds[0])}
                    message="Are you sure you want to remove selected user?"
                />,
                onClose: () => {
                    modal.closeModals('ConfirmationModal');
                }
            }
        );
    }

    const onNewUserPress = () => {
        modal.closeModals('ActionContainerModal');

        // For some reason there has to be a delay between closing a modal and opening another.
        setTimeout(() => {
            modal.openModal('OverlayModal', {
                content: (
                    <CreateUserOverlayDialog
                        onCreated={(user) => {
                            fetchUsers(currentPagePosition)
                            setFloatingAction(false)
                        }}
                        onCancel={() => setFloatingAction(false)}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    }

    // endregion


    // region Helper Methods

    const userItem = (name, email, groupName, onActions) => (
        <>
            <DataItem flex={1.3} text={name} theme={theme}/>
            <DataItem flex={2} text={email} theme={theme}/>
            <DataItem flex={1} align={'center'} text={groupName} color={'--color-blue-600'}/>
            <ContentDataItem
                align="center"
                flex={1}
                content={
                    <IconButton
                        Icon={<EditIcon/>}
                        onPress={onActionPress}
                    />
                }
            />
        </>
    );

    const deleteUser = (userId) => {
        setFetchingData(true)
        deleteUserCall(userId)
            .then(data => {
                removeUserFromState(userId);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals()
                            }}
                            onAction={() => {
                                deleteUser(selectedIds[0])
                                modal.closeAllModals()
                            }}
                            message="User successfully removed."
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .catch(error => {
                console.log("Failed to remove user", error);
                modal.openModal(
                    'ConfirmationModal',
                    {
                        content: <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={() => {
                                deleteUser(selectedIds[0])
                                modal.closeAllModals()
                            }}
                            message="Failed to remove user."
                        />,
                        onClose: () => {
                            modal.closeModals('ConfirmationModal');
                        }
                    }
                );
            })
            .finally(_ => {
                setFetchingData(false)
            })
    }

    const getFabActions = () => {

        const isUsersSelected = selectedIds?.length === 1;
        const deleteColor = !isUsersSelected ? theme.colors['--color-gray-600'] : theme.colors['--color-red-700']

        const DeleteUserAction = <View style={{
            borderRadius: 6,
            flex: 1,
            overflow: 'hidden'
        }}>
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.LONG}
                isDisabled={!isUsersSelected}
                onLongPress={onDeleteUsers}
            >
                <ActionItem
                    title="Hold to Delete"
                    icon={<WasteIcon strokeColor={deleteColor}/>}
                    disabled={!isUsersSelected}
                    touchable={false}
                />
            </LongPressWithFeedback>
        </View>

        const CreateUserAction = <ActionItem
            title="New User"
            icon={<AddIcon/>}
            onPress={onNewUserPress}
            touchable={true}
        />

        return (
            <ActionContainer
                floatingActions={[DeleteUserAction, CreateUserAction]}
                title={"USERS ACTIONS"}
            />
        );
    };


    const renderItem = (item = {}) => {

        // console.log("Formatted Item: ", formattedItem)

        const onActionClick = () => {
        };

        const userName = `${item['first_name']} ${item['last_name']}`
        const group = item.role?.name

        const itemView = userItem(userName, item.email, group, onActionClick);


        return (
            <ListItem
                isChecked={selectedIds.includes(item._id)}
                onCheckBoxPress={onCheckBoxPress(item)}
                onItemPress={onItemPress(item, false)}
                itemView={itemView}
            />
        );
    };

    const fetchUsers = (pagePosition) => {

        setFetchingData(true);
        getUsersCall(searchValue, pagePosition, 20)
            .then(data => {
                let currentPosition = pagePosition ? pagePosition : 1;
                setCurrentPagePosition(currentPosition)

                setUsers(data?.data || [])
                setTotalPages(data?.totalPages)
            })
            .catch(error => {
                console.log("Failed to get users")
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };


    // endregion


    return (
        <NavPage
            placeholderText={"Search by user name or status."}
            routeName={pageTitle}
            listData={users}
            listItemFormat={renderItem}
            inputText={searchValue}
            itemsSelected={selectedIds}
            listHeaders={listHeaders}
            changeText={onSearchInputChange}
            onRefresh={onRefresh}
            isFetchingData={isLoading}
            onSelectAll={onSelectAll}

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
    );
}

UsersPage.propTypes = {};
UsersPage.defaultProps = {};

export default UsersPage;
