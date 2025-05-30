import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "emotion-theming";
import NavPage from "../../components/common/Page/NavPage";
import { useModal } from "react-native-modalfy";
import {
    selectAll,
    useNextPaginator,
    usePreviousPaginator,
} from "../../helpers/caseFilesHelpers";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ListItem from "../../components/common/List/ListItem";
import { deleteUserCall, getUsersCall } from "../../api/network";
import DataItem from "../../components/common/List/DataItem";
import EditIcon from "../../../assets/svg/editIcon";
import IconButton from "../../components/common/Buttons/IconButton";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import { LONG_PRESS_TIMER } from "../../const";
import ActionItem from "../../components/common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import AddIcon from "../../../assets/svg/addIcon";
import CreateUserOverlayDialog from "../../components/Users/CreateUserOverlayDialog";
import { useNavigation } from "@react-navigation/native";
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
        alignment: "flex-start",
        flex: 1,
    },
    {
        name: "Actions",
        alignment: "center",
        flex: 1,
    },
];

function UsersPage(props) {
    const usersPermissions = props.route.params.usersPermissions;

    const theme = useTheme();
    const pageTitle = "Users";
    const navigation = useNavigation();
    const modal = useModal();
    const recordsPerPage = 12;

    const [isLoading, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [users, setUsers] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchQuery, setSearchQuery] = useState({});

    const [totalPages, setTotalPages] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] =
        useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled] = useState(false);
    const [isPreviousDisabled] = useState(true);

    useEffect(() => {
        if (!users.length) fetchUsers(currentPagePosition);
        setTotalPages(Math.ceil(users.length / recordsPerPage));
    }, []);

    useEffect(() => {
        if (!searchValue) {
            // empty search values and cancel any out going request.
            fetchUsers(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchUsers, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onItemPress = (item) => () => {
        navigation.navigate("UserPage", {
            user: item,
            onUserUpdate: handleUserUpdate,
            updateUser: usersPermissions.update,
        });
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchUsers(currentPagePosition);
    };

    const onSelectAll = () => {
        const updatedUserData = selectAll(users, selectedIds);
        setSelectedIds(updatedUserData);
    };

    const handleUserUpdate = (updatedUser) => {
        setUsers(
            users.map((user) =>
                user._id === updatedUser._id
                    ? { ...user, ...updatedUser }
                    : { ...user }
            )
        );
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } =
                useNextPaginator(
                    currentPagePosition,
                    recordsPerPage,
                    currentPageListMin,
                    currentPageListMax
                );
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchUsers(currentPage);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) {
            return;
        }
        let { currentPage, currentListMin, currentListMax } =
            usePreviousPaginator(
                currentPagePosition,
                recordsPerPage,
                currentPageListMin,
                currentPageListMax
            );
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchUsers(currentPage);
    };

    const onCheckBoxPress = (selectedItem) => () => {
        if (selectedIds.includes(selectedItem._id)) {
            setSelectedIds(selectedIds.filter((id) => selectedItem._id !== id));
        } else {
            setSelectedIds([...selectedIds, selectedItem._id]);
        }
    };

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

    const onActionPress = (item) => {
        navigation.navigate("UserPage", {
            user: item,
            onUserUpdate: handleUserUpdate,
            editMode: true,
            updateUser: usersPermissions.update,
        });
    };

    const onDeleteUsers = () => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={modal.closeAllModals}
                    onAction={() => deleteUser(selectedIds)}
                    action={"Yes"}
                    message="Are you sure you want to remove selected user(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const onNewUserPress = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateUserOverlayDialog
                        onCreated={(user) => {
                            addUserToState(user);
                            onItemPress(user)();
                            setFloatingAction(false);
                        }}
                        onCancel={() => {
                            setFloatingAction(false);
                            modal.closeAllModals();
                        }}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    const userItem = (name, email, groupName, item) => (
        <>
            <DataItem flex={1.3} text={name} theme={theme} />
            <DataItem flex={2} text={email} theme={theme} />
            <DataItem
                flex={1}
                align={"center"}
                text={groupName}
                color={"--color-blue-600"}
            />
            <ContentDataItem
                align="center"
                flex={1}
                content={
                    <IconButton
                        disabled={!usersPermissions.update}
                        Icon={<EditIcon />}
                        onPress={() => {
                            onActionPress(item);
                        }}
                    />
                }
            />
        </>
    );

    const deleteUser = (userIds) => {
        setFetchingData(true);
        deleteUserCall(userIds)
            .then(() => {
                fetchUsers(currentPagePosition);
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => {
                                modal.closeAllModals();
                            }}
                            onAction={() => {
                                modal.closeAllModals();
                            }}
                            message="User(s) successfully removed."
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });
            })
            .catch((error) => {
                console.log("Failed to remove user", error);
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={modal.closeAllModals}
                            onAction={modal.closeAllModals}
                            message="Failed to remove user."
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const getFabActions = () => {
        const isUsersSelected = selectedIds?.length;
        const deleteColor = !isUsersSelected
            ? theme.colors["--color-gray-600"]
            : theme.colors["--color-red-700"];

        const DeleteUserAction = usersPermissions.delete && (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    isDisabled={!isUsersSelected}
                    onLongPress={onDeleteUsers}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon strokeColor={deleteColor} />}
                        disabled={!isUsersSelected}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const CreateUserAction = usersPermissions.create && (
            <ActionItem
                title="New User"
                icon={<AddIcon />}
                onPress={onNewUserPress}
                touchable={true}
            />
        );

        return (
            <ActionContainer
                floatingActions={[DeleteUserAction, CreateUserAction]}
                title={"USERS ACTIONS"}
            />
        );
    };

    const renderItem = (item = {}) => {
        const userName = `${item["first_name"]} ${item["last_name"]}`;
        const group = item.role?.name;

        const itemView = userItem(userName, item.email, group, item);

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
        getUsersCall(searchValue, pagePosition, recordsPerPage)
            .then((data) => {
                let currentPosition = pagePosition ? pagePosition : 1;
                setCurrentPagePosition(currentPosition);

                setUsers(data?.data || []);
                setTotalPages(data?.totalPages);
            })
            .catch(() => {
                console.log("Failed to get users");
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const addUserToState = (user) => {
        setUsers([user, ...users]);
    };

    return (
        <NavPage
            placeholderText={"Search by user name or email."}
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
            hasActionButton={usersPermissions.delete || usersPermissions.create}
            hasActions={true}
            isNextDisabled={isNextDisabled}
            isPreviousDisabled={isPreviousDisabled}
        />
    );
}

export default UsersPage;
