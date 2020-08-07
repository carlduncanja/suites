import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";
import Page from "../components/common/Page/Page";
import IconButton from "../components/common/Buttons/IconButton";
import ActionIcon from "../../assets/svg/ActionIcon";
import ListItem from "../components/common/List/ListItem";
import { getTheatres } from "../api/network";
import { setTheatres } from "../redux/actions/theatresActions";
import { connect } from "react-redux";
import { useModal } from "react-native-modalfy";
import CaseFileBottomSheet from "../components/CaseFiles/CaseFileBottomSheet";
import TheatresBottomSheetContainer from "../components/Theatres/TheatresBottomSheetContainer";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import {
  useNextPaginator,
  usePreviousPaginator,
  selectAll,
  checkboxItemPress,
} from "../helpers/caseFilesHelpers";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionItem from "../components/common/ActionItem";
import WasteIcon from "../../assets/svg/wasteIcon";
import AddIcon from "../../assets/svg/addIcon";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import CreateStorageDialogContainer from "../components/Storage/CreateStorageDialogContainer";
import CreateTheatreDialogContainer from "../components/Theatres/CreateTheatreDialogContainer";
import AssignIcon from "../../assets/svg/assignIcon";
import _ from "lodash";

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import Footer from "../components/common/Page/Footer";
import NavPage from '../components/common/Page/NavPage';

const listHeaders = [
  {
    // id: "1",
    name: "Theatre",
    alignment: "flex-start",
    flex: 2,
  },
  {
    // id: "2",
    name: "Status",
    alignment: "center",
    flex: 1,
  },
  {
    // id: "3",
    name: "Recovery",
    alignment: "center",
    flex: 1,
  },
  {
    // id: "3",
    name: "Actions",
    alignment: "center",
    flex: 1,
  },
];


function Theatres(props) {
  const { theatres = [], setTheatres } = props;
  const theme = useTheme();
  const pageTitle = "Theatres";
  const modal = useModal();
  const recordsPerPage = 10;

  // ##### States
  const [isFetchingData, setFetchingData] = useState(false);
  const [isFloatingActionDisabled, setFloatingAction] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  // pagination
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
  const [currentPagePosition, setCurrentPagePosition] = useState(1);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPreviousDisabled, setPreviousDisabled] = useState(true);

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
      fetchTheatres(1)
      if (searchQuery.cancel) searchQuery.cancel();
      return;
    }

    // wait 300ms before search. cancel any prev request before executing current.

    const search = _.debounce(fetchTheatres, 300);

    setSearchQuery((prevSearch) => {
      if (prevSearch && prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    search();
    setCurrentPagePosition(1)
  }, [searchValue]);

  // ##### Handler functions

  const onItemPress = (item) => () => {
    modal.openModal("BottomSheetModal", {
      content: <TheatresBottomSheetContainer theatre={item} />,
    });
  };

  const onSearchInputChange = (input) => {
    setSearchValue(input);
  };

  const onRefresh = () => {
    fetchTheatres();
  };

  const onSelectAll = () => {
    let updatedTheatres = selectAll(theatres, selectedIds);
    setSelectedIds(updatedTheatres);
  };

  const goToNextPage = () => {

    if (currentPagePosition < totalPages) {
      let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax);
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
      fetchTheatres(currentPage)
    }
  };

  const goToPreviousPage = () => {

    if (currentPagePosition === 1) { return};

    let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
    setCurrentPagePosition(currentPage);
    setCurrentPageListMin(currentListMin);
    setCurrentPageListMax(currentListMax);
    fetchTheatres(currentPage)

  };

  const onCheckBoxPress = (item) => () => {
    const { _id } = item;
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

  // ##### Helper functions
  const theatreItem = ({ name = "", recoveryStatus = "n/a", recoveryStatusColor, status="", statusColor },
    onActionPress
  ) => (
    <>
      <View style={[styles.item, { flex: 2, ...styles.rowBorderRight }]}>
        <Text style={{ color: "#3182CE", fontSize: 16 }}>{name}</Text>
      </View>
      <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
        <Text style={[styles.itemText, { color: statusColor }]}>{status}</Text>
      </View>
      <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
        <Text style={[styles.itemText, { color: recoveryStatusColor }]}>
          {recoveryStatus}
        </Text>
      </View>
      <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
        <IconButton Icon={<AssignIcon />} onPress={onActionPress} />
      </View>
    </>
  );

  const getFabActions = () => {
    const deleteAction = (
      <View style={{ borderRadius: 6, flex: 1, overflow: "hidden" }}>
        <LongPressWithFeedback pressTimer={1200} onLongPress={() => {}}>
          <ActionItem
            title={"Hold to Delete"}
            icon={<WasteIcon />}
            onPress={() => {}}
            touchable={false}
          />
        </LongPressWithFeedback>
      </View>
    );

    const createAction = (
      <ActionItem
        title={"Create Theatre"}
        icon={<AddIcon />}
        onPress={openCreateTheatreModel}
      />
    );

    return (
      <ActionContainer
        floatingActions={[deleteAction, createAction]}
        title={"STORAGE ACTIONS"}
      />
    );
  };

  const openCreateTheatreModel = () => {
    modal.closeModals("ActionContainerModal");

    // For some reason there has to be a delay between closing a modal and opening another.
    setTimeout(() => {
      modal.openModal("OverlayModal", {
        content: (
          <CreateTheatreDialogContainer
            onCreated={onItemPress}
            onCancel={() => setFloatingAction(false)}
          />
        ),
        onClose: () => setFloatingAction(false),
      });
    }, 200);
  };

  const renderItem = (item) => {
    const availableColor = "#38A169";
    const inUseColor = "#DD6B20";

    const formattedItem = {
      name: item.name || "",
      recoveryStatus:
        item.isRecovery && !item.available
          ? "Yes"
          : !item.available
          ? "No"
          : "--",
      recoveryStatusColor:
        item.isRecovery && !item.available ? availableColor : "#4E5664",
      status: item.available ? "Available" : "In-Use",
      statusColor: item.available ? availableColor : inUseColor,
    };

    // console.log("Formatted Item: ", formattedItem)

    const onActionClick = () => {};

    const itemView = theatreItem(formattedItem, onActionClick);

    return (
      <ListItem
        isChecked={selectedIds.includes(item._id)}
        onCheckBoxPress={onCheckBoxPress(item)}
        onItemPress={onItemPress(item)}
        itemView={itemView}
      />
    );
  };

  const fetchTheatres = (pagePosition) => {

    let currentPosition = pagePosition ? pagePosition  : 1;
    setCurrentPagePosition(currentPosition)

    setFetchingData(true);
    getTheatres(searchValue, recordsPerPage, currentPosition)
      .then((result) => {

        const {data = [], pages = 0} = result;

        if(pages === 1){
          setPreviousDisabled(true);
          setNextDisabled(true);
        }else if(currentPosition === 1 ){
            setPreviousDisabled(true);
            setNextDisabled(false);
        }else if(currentPosition === pages){
            setNextDisabled(true);
            setPreviousDisabled(false);
        }else if(currentPosition < pages){
            setNextDisabled(false);
            setPreviousDisabled(false)
        }else{
            setNextDisabled(true);
            setPreviousDisabled(true);
        }

        setTheatres(data);
        data.length === 0 ? setTotalPages(0) : setTotalPages(pages)
  
      })
      .catch((error) => {
        // TODO handle error
        console.log("failed to fetch theatres", error);
      })
      .finally((_) => {
        setFetchingData(false);
      });
  };

  let theatreToDisplay = [...theatres];

  // ###### STYLED COMPONENTS
  const TheatresWrapper = styled.View`
    height: 100%;
    width: 100%;
    background-color: green;
`;
  const TheatresContainer = styled.View`
    display: flex;
    height: 100%;
  `;


  return (
    <NavPage
      placeholderText={"Search by theatre name or status."}
      routeName={pageTitle}
      listData={theatreToDisplay}
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
      hasPaginator = {true}
      hasActionButton = {true}
      hasActions = {true}
      isNextDisabled = {isNextDisabled}
      isPreviousDisabled = {isPreviousDisabled}
    />
  );
}

Theatres.propTypes = {};
Theatres.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  item: {
    flex: 1,
    flexDirection: "row",
  },
  itemText: {
    fontSize: 14,
    color: "#4E5664",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 30,
  },
  rowBorderRight: {
    borderRightColor: "#E3E8EF",
    borderRightWidth: 1,
    // marginRight: 20,
  },
});

const mapStateToProps = (state) => {
  const theatres = state.theatres.map((item) => {
    return {
      ...item,
      // id: item._id
    };
  });

  return {
    theatres,
  };
};

const mapDispatchToProps = {
  setTheatres,
};

export default connect(mapStateToProps, mapDispatchToProps)(Theatres);
