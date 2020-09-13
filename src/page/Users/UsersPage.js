import React, {useEffect, useState} from 'react';
import {Text, View} from "react-native"
import {useTheme} from "emotion-theming"
import PropTypes from 'prop-types';
import NavPage from "../../components/common/Page/NavPage";
import {useModal} from "react-native-modalfy";
import {checkboxItemPress, selectAll, useNextPaginator, usePreviousPaginator} from "../../helpers/caseFilesHelpers";
import IconButton from "../../components/common/Buttons/IconButton";
import AssignIcon from "../../../assets/svg/assignIcon";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import ActionItem from "../../components/common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import CreateTheatreDialogContainer from "../../components/Theatres/CreateTheatreDialogContainer";
import moment from "moment";
import ListItem from "../../components/common/List/ListItem";
import {getTheatres, getUsersCall} from "../../api/network";
import styled from '@emotion/native';


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

const ItemTextView = styled.Text( ({theme}) => ({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-black'],
}))

const ItemView = styled.Text( ({flex, justifyContent}) => ({
    flex: flex || 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // justifyContent: justifyContent || "center"
}))


function UsersPage() {

    const theme = useTheme();
    const pageTitle = "Users";
    const modal = useModal();
    const recordsPerPage = 10;

    // ##### States
    const [isFetchingData, setFetchingData] = useState(false);
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


    // endregion


    // region Event Handlers
    const onItemPress = (item, isOpenEditable) => () => {

    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchUsers();
    };

    const onSelectAll = () => {
        let updatedTheatres = selectAll(theatres, selectedIds);
        setSelectedIds(updatedTheatres);
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

    const onCheckBoxPress = (item) => () => {
        const {_id} = item;
        let updatedTheatres = checkboxItemPress(item, _id, selectedIds);
        setSelectedIds(updatedTheatres);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "STORAGE ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    // endregion


    // region Helper Methods

    const userItem = (name, email, groupName, onActions) => (

        <>
            <ItemView flex={1.3} justifyContent={"flex-start"}>
                <ItemTextView theme={theme}>{name}</ItemTextView>
            </ItemView>
            <ItemView flex={2} justifyContent={"flex-start"}>
                <ItemTextView theme={theme}>{email}</ItemTextView>
            </ItemView>
            <ItemView flex={1} justifyContent={"center"}>
                <ItemTextView theme={theme}>{groupName}</ItemTextView>
            </ItemView>
            <ItemView flex={1}  justifyContent={"center"}>
            </ItemView>
        </>
    );

    const getFabActions = () => {
        return (
            <ActionContainer
                floatingActions={[]}
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
            .catch( error => {
                console.log("Failed to get users")
            })
            .finally( _ => {
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
            isFetchingData={isFetchingData}
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
