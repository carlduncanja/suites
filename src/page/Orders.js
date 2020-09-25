import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import Page from "../components/common/Page/Page";
import ListItem from "../components/common/List/ListItem";
import RoundedPaginator from "../components/common/Paginators/RoundedPaginator";
import FloatingActionButton from "../components/common/FloatingAction/FloatingActionButton";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import AddIcon from "../../assets/svg/addIcon";
import Notifier from "../components/NotificationComponent";
import NavPage from '../components/common/Page/NavPage';
import DataItem from '../components/common/List/DataItem';
import ConfirmationComponent from '../components/ConfirmationComponent';

import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import {
  useNextPaginator,
  usePreviousPaginator,
  checkboxItemPress,
  selectAll,
} from "../helpers/caseFilesHelpers";

import { connect } from "react-redux";
import {
  setPurchaseOrders,
  updatePurchaseOrder,
} from "../redux/actions/purchaseOrdersActions";
import {
  getPurchaseOrders,
  createInvoiceViaOrders,
  updatePurchaseOrderStatus,
} from "../api/network";
import _ from "lodash";

import { withModal, useModal } from "react-native-modalfy";
import { formatDate, transformToSentence } from "../utils/formatter";
import OrderItemPage from "../components/PurchaseOrders/OrderItemPage";
import { PURCHASE_ORDER_STATUSES } from "../const";
import EditIcon from "../../assets/svg/editIcon";
import { addNotification } from "../redux/actions/NotificationActions";
import RightBorderDataItem from "../components/common/List/RightBorderDataItem";

const listHeaders = [
  {
    name: "Purchase Orders",
    alignment: "flex-start",
    flex: 1.5,
  },
  {
    name: "Status",
    alignment: "flex-start",
    flex: 1,
  },
  {
    name: "Delivery Date",
    alignment: "flex-start",
    flex: 1.5,
  },
  {
    name: "Supplier",
    alignment: "flex-start",
    flex: 1.5,
  },
];

const Orders = (props) => {
  // ############# Const data
  const recordsPerPage = 10;

  //  ############ Props
  const {
    purchaseOrders = [],
    setPurchaseOrders,
    updatePurchaseOrder,
    addNotification,
  } = props;
  const modal = useModal();
  const theme = useTheme();

  //  ############ State
  const [isFetchingData, setFetchingData] = useState(false);
  const [isFloatingActionDisabled, setFloatingAction] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
  const [currentPagePosition, setCurrentPagePosition] = useState(1);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPreviousDisabled, setPreviousDisabled] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);

  // ############# Lifecycle methods

  useEffect(() => {
    if (!purchaseOrders.length) fetchOrdersData(currentPagePosition);
    setTotalPages(Math.ceil(purchaseOrders.length / recordsPerPage));
  }, []);

  useEffect(() => {
    if (!searchValue) {
      // empty search values and cancel any out going request.
      setSearchResult([]);
      fetchOrdersData(1)
      if (searchQuery.cancel) searchQuery.cancel();
      return;
    }

    // wait 300ms before search. cancel any prev request before executing current.

    const search = _.debounce(fetchOrdersData, 300);

    setSearchQuery((prevSearch) => {
      if (prevSearch && prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    search();
    setCurrentPagePosition(1)
  }, [searchValue]);

  // ############# Event Handlers

  const onSearchInputChange = (input) => {
    setSearchValue(input);
  };

  const handleDataRefresh = () => {
    fetchOrdersData();
  };

  const handleOnSelectAll = () => {
    let updatedOrdersList = selectAll(purchaseOrders, selectedOrders);
    setSelectedOrders(updatedOrdersList);
  };

  const handleOnCheckBoxPress = (item) => () => {
    const { _id } = item;
    let updatedOrders = checkboxItemPress(item, _id, selectedOrders);

    setSelectedOrders(updatedOrders);
    console.log("List: ", updatedOrders);
  };

  const handleOnItemPress = (item, isOpenEditable) => {
    console.log("Tapped order item");
    props.navigation.navigate("OrderItemPage", {
      initial: false,
      order: item,
      isEdit: isOpenEditable,
      updateOrders : () => {{handleDataRefresh(); console.log("Refreshed")}}
    });

    // modal.openModal("BottomSheetModal", {
    //   content: (
    //     <OrdersBottomSheet order={item} isOpenEditable={isOpenEditable} />
    //   ),
    // });
  };

  const goToNextPage = () => {
    if (currentPagePosition < totalPages) {
      let { currentPage, currentListMin, currentListMax } = useNextPaginator(
        currentPagePosition,
        recordsPerPage,
        currentPageListMin,
        currentPageListMax
      );
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
      fetchOrdersData(currentPage)
    }
  };

  const goToPreviousPage = () => {
    if (currentPagePosition === 1) return;

    let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(
      currentPagePosition,
      recordsPerPage,
      currentPageListMin,
      currentPageListMax
    );
    setCurrentPagePosition(currentPage);
    setCurrentPageListMin(currentListMin);
    setCurrentPageListMax(currentListMax);
    fetchOrdersData(currentPage)

  };

  const toggleActionButton = () => {
    setFloatingAction(true);
    modal.openModal("ActionContainerModal", {
      actions: getFabActions(),
      title: "ORDERS ACTIONS",
      onClose: () => {
        setFloatingAction(false);
      },
    });
  };

  // ############# Helper functions

  const errorScreen = () => {
    setTimeout(() => {
      modal.openModal(
      'ConfirmationModal',
      {
          content: <ConfirmationComponent
              isEditUpdate = {false}
              isError = {true}
              onCancel = {onCancelErrorScreen}
              message = "There was an issue performing this action."
          />
          ,
          onClose: () => {modal.closeModals('ConfirmationModal')}
      })
    }, 100);
}

const onCancelErrorScreen = () =>{
    modal.closeAllModals();
    setTimeout(()=>{
      handleDataRefresh();
    },200)
}

  const fetchOrdersData = (pagePosition) => {

    let currentPosition = pagePosition ? pagePosition : 1;
    setCurrentPagePosition(currentPosition)

    setFetchingData(true);
    getPurchaseOrders(searchValue, recordsPerPage, currentPosition)
      .then((ordersInfo) => {

        const { data = [], pages = 0 } = ordersInfo;

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
          setPreviousDisabled(false)
        } else {
          setNextDisabled(true);
          setPreviousDisabled(true);
        }

        setPurchaseOrders(data);
        data.length === 0 ? setTotalPages(1) : setTotalPages(pages)

      })
      .catch((error) => {
        console.log("failed to get orders", error);
        setTotalPages(1)
        setPreviousDisabled(true)
        setNextDisabled(true)
        // errorScreen();
      })
      .finally((_) => {
        setFetchingData(false);
      });
  };

  const renderOrderFn = (item) => {
    return (
      <ListItem
        hasCheckBox={true}
        isChecked={selectedOrders.includes(item._id)}
        onCheckBoxPress={handleOnCheckBoxPress(item)}
        onItemPress={() => handleOnItemPress(item, false)}
        itemView={orderItem(item)}
      />
    );
  };

  const orderItem = (item) => {
    let {
      purchaseOrderNumber = "",
      status = "",
      deliveryDate,
      supplier = {},
    } = item;
    const { name = "" } = supplier;
    const statusColor =
      status === "Incomplete"
        ? "--color-purple-600"
        : status === "Request Sent"
          ? "--color-teal-600"
          : status === "Payment Due"
            ? "--color-red-700"
            : "--color-gray-700";

    deliveryDate = deliveryDate ? formatDate(deliveryDate, "DD/MM/YYYY") : "n/a";

    return (
      <>
        <RightBorderDataItem text = {purchaseOrderNumber} fontStyle = "--text-sm-medium" flex = {1.5}/>
        <DataItem text = {transformToSentence(status)} fontStyle = "--text-sm-medium" flex = {1} color={statusColor}/>
        <DataItem text = {deliveryDate} fontStyle = "--text-sm-medium" flex = {1.5}/>
        <DataItem text = {name} fontStyle = "--text-sm-medium" flex = {1.5} color = "--color-blue-600"/>
      </>
    );
  };

  const getFabActions = () => {
    const actions = [];
    if (selectedOrders.length === 1) {
      const orderId = selectedOrders[0];
      const purchaseOrder = purchaseOrders.find((item) => item._id === orderId) || {};

      switch (purchaseOrder.status) {
        case PURCHASE_ORDER_STATUSES.DRAFTED: {
          const updateStatusAction = (
            <ActionItem
              title={"Accept Purchase Order"}
              icon={<AddIcon />}
              onPress={() =>
                updateStatus(orderId, PURCHASE_ORDER_STATUSES.ACCEPTED)
              }
            />
          );

          actions.push(updateStatusAction);
          break;
        }
        case PURCHASE_ORDER_STATUSES.ORDER_RECEIVED:
          const createInvoice = (
            <ActionItem
              title={"Create Invoice"}
              icon={<AddIcon />}
              onPress={() => onCreateInvoice(orderId)}
            />
          );

          actions.push(createInvoice);
          break;
        case PURCHASE_ORDER_STATUSES.BILLED: {
          break;
        }
        case PURCHASE_ORDER_STATUSES.ACCEPTED: {
          const updateStatusAction = (
            <ActionItem
              title={"Purchase Order Received"}
              icon={<EditIcon />}
              onPress={() =>
                updateStatus(orderId, PURCHASE_ORDER_STATUSES.ORDER_RECEIVED)
              }
            />
          );

          actions.push(updateStatusAction);
          break;
        }
        case PURCHASE_ORDER_STATUSES.CANCELLED:
          break;
      }

      // actions.push(createInvoice);
    } else {

    }

    return (
      <ActionContainer floatingActions={actions} title={"ORDERS ACTIONS"} />
    );
  };

  const onCreateInvoice = (purchaseOrderId) => {
    createInvoiceViaOrders(purchaseOrderId)
      .then((data) => {
        console.log("Invoice Record:", data);
        updatePurchaseOrder(purchaseOrderId, { status: "billed" });
        modal.closeAllModals();
        addNotification(
          "Inventory Items have been added to the system.",
          "Inventory"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Unsuccessful creation",
          "Invoice can only be generated for purchase orders in `ORDER RECEIVED` status.",
          [
            {
              text: "Ok",
              onPress: () => console.log("Ok pressed"),
            },
          ],
          {
            cancelable: false,
          }
        );
        console.log("Failed to create invoice", error);
      });
  };

  const updateStatus = (purchaseOrderId, status) => {
    updatePurchaseOrderStatus(purchaseOrderId, status)
      .then((data) => {
        console.log("Purchase Order Record:", data);
        // todo update purchase order in state.

        updatePurchaseOrder(purchaseOrderId, { status });
        modal.closeAllModals();
      })
      .catch((error) => {
        console.log("Failed to update status", error);
        Alert.alert("Sorry", "Failed to open quotation, please try again.");
      });
  };

  // ############# Prepare list data

  let ordersToDisplay = [...purchaseOrders];
  // ordersToDisplay = ordersToDisplay.slice(
  //   currentPageListMin,
  //   currentPageListMax
  // );

  return (
    <NavPage
      isFetchingData={isFetchingData}
      onRefresh={handleDataRefresh}
      placeholderText={"Search by Purchase Order or Supplier"}
      changeText={onSearchInputChange}
      inputText={searchValue}
      routeName={"Purchase Orders"}
      listData={ordersToDisplay}
      listHeaders={listHeaders}
      itemsSelected={selectedOrders}
      onSelectAll={handleOnSelectAll}
      listItemFormat={renderOrderFn}
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
    // <View style={{ flex: 1 }}>
    //   <Page
    //     isFetchingData={isFetchingData}
    //     onRefresh={handleDataRefresh}
    //     placeholderText={"Search by Purchase Order"}
    //     changeText={onSearchInputChange}
    //     inputText={searchValue}
    //     routeName={"Purchase Orders"}
    //     listData={ordersToDisplay}
    //     listHeaders={listHeaders}
    //     itemsSelected={selectedOrders}
    //     onSelectAll={handleOnSelectAll}
    //     listItemFormat={renderOrderFn}
    //   />

    //   <View style={styles.footer}>
    //     <View style={{ alignSelf: "center", marginRight: 10 }}>
    //       <RoundedPaginator
    //         totalPages={totalPages}
    //         currentPage={currentPagePosition}
    //         goToNextPage={goToNextPage}
    //         goToPreviousPage={goToPreviousPage}
    //       />
    //     </View>

    //     <FloatingActionButton
    //       isDisabled={isFloatingActionDisabled}
    //       toggleActionButton={toggleActionButton}
    //     />
    //   </View>
    // </View>
  );
};

const mapStateToProps = (state) => ({
  purchaseOrders: state.orders,
});

const mapDispatcherToProp = {
  setPurchaseOrders,
  updatePurchaseOrder,
  addNotification,
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Orders));

const styles = StyleSheet.create({
  item: {
    // flex:1
    marginRight: 25,
  },
  itemText: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    alignSelf: "flex-end",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    right: 0,
    marginRight: 30,
  },
  rowBorderRight: {
    borderRightColor: "#E3E8EF",
    borderRightWidth: 1,
    // marginRight: 20,
  },
});
