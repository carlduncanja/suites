import { useNavigation } from "@react-navigation/native";
import { useTheme } from "emotion-theming";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useModal } from "react-native-modalfy";
import AddIcon from "../../../assets/svg/addIcon";
import EditIcon from "../../../assets/svg/editIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { deleteUserCall, getUsersCall } from "../../api/network";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import CreateUserOverlayDialog from "../../components/Users/CreateUserOverlayDialog";
import ActionItem from "../../components/common/ActionItem";
import IconButton from "../../components/common/Buttons/IconButton";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import DataItem from "../../components/common/List/DataItem";
import ListItem from "../../components/common/List/ListItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";

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

    const [isLoading, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [users, setUsers] = useState([]);

    const [selectedIds, setSelectedIds] = useState([]);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchUsers(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

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

    const onSelectAll = () => {};

    const handleUserUpdate = (updatedUser) => {
        setUsers(
            users.map((user) =>
                user._id === updatedUser._id
                    ? { ...user, ...updatedUser }
                    : { ...user }
            )
        );
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
                    action="Yes"
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
                align="center"
                text={groupName}
                color="--color-blue-600"
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
                title="USERS ACTIONS"
            />
        );
    };

    const renderItem = (item = {}) => {
        const userName = `${item.first_name} ${item.last_name}`;
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
        return getUsersCall(searchValue, pagePosition, RECORDS_PER_PAGE_MAIN)
            .then((data) => {
                setUsers(data?.data || []);
                return { ...data, pages: data.totalPages };
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const addUserToState = (user) => {
        setUsers([user, ...users]);
    };

    return (
        <PaginatedSection
            changeText={onSearchInputChange}
            currentPage={currentPagePosition}
            fetchSectionDataCb={fetchUsers}
            hasActionButton={usersPermissions.delete || usersPermissions.create}
            hasActions={true}
            hasPaginator={true}
            inputText={searchValue}
            isDisabled={isFloatingActionDisabled}
            isFetchingData={isLoading}
            itemsSelected={selectedIds}
            listData={users}
            listHeaders={listHeaders}
            listItemFormat={renderItem}
            onRefresh={onRefresh}
            onSelectAll={onSelectAll}
            placeholderText="Search by user name or email."
            routeName={pageTitle}
            setCurrentPage={setCurrentPagePosition}
            toggleActionButton={toggleActionButton}
        />
    );
}

export default UsersPage;
