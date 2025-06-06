import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "emotion-theming";
import React, { useContext, useEffect, useState } from "react"; 
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import { LONG_PRESS_TIMER } from "../../const";
import SuppliersPurchaseOrder from "../Suppliers/SuppliersPurchaseOrder";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import FloatingActionAnnotated from "../common/FloatingAction/FloatingActionAnnotated";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import DataItem from "../common/List/DataItem";
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import RoundedPaginator from "../common/Paginators/RoundedPaginator";
import Search from "../common/Search";
import Item from "../common/Table/Item";
import Table from "../common/Table/Table";

import ConfirmationComponent from "../ConfirmationComponent";

import AddIcon from "../../../assets/svg/addIcon";
import Cart from "../../../assets/svg/cart";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ActionItem from "../common/ActionItem";

import { createPurchaseOrder, removeSupplierProducts } from "../../api/network";
import { PageContext } from "../../contexts/PageContext";
import {
  useNextPaginator,
  usePreviousPaginator,
} from "../../helpers/caseFilesHelpers";
import { addCartItem } from "../../redux/actions/cartActions";
import { currencyFormatter } from "../../utils/formatter";
import ConfirmationCheckBoxComponent from "../ConfirmationCheckBoxComponent";
import LoadingIndicator from "../common/LoadingIndicator";

const SearchContainer = styled.View`
  margin-bottom: ${({ theme }) => theme.space["--space-20"]};
`;

const FooterWrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
`;
const FooterContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  justify-content: space-between;
`;

const PaginatorActionsContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const headers = [
  {
    name: "Product",
    alignment: "flex-start",
    flex: 2,
  },
  {
    name: "Reference",
    alignment: "flex-start",
  },
  {
    name: "SKU",
    alignment: "flex-start",
  },
  {
    name: "Price",
    alignment: "flex-start",
  },
];

function SupplierProductsTab({
  supplierId,
  addCartItem,
  cart,
  products = [],
  onRefresh,
  permissions,
}) {
  
  const theme = useTheme();
  const modal = useModal();
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);
  const [checkboxList, setCheckboxList] = useState([]);

  const recordsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0);
  const [productsState, setProducts] = useState(products);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
  const [currentPagePosition, setCurrentPagePosition] = useState(1);

  const [searchValue, setSearchValue] = useState("");

  const [isFloatingActionDisabled, setFloatingAction] = useState(false);
  const [cartTotal, setCartTotal] = useState(
    cart.reduce((acc, curr) => acc + (curr.amount || 1), 0)
  );
  const [cartItems, setCartItems] = useState([]);
  const { pageState } = useContext(PageContext);

  
  useEffect(() => {
    setTimeout(() => {
      setCartItems(cart);
      setTotalPages(Math.ceil(productsState.length / recordsPerPage));
    }, 200);
  }, []);


  const onProductsPress = (productItem) => () => {
    modal.closeModals("ActionContainerModal");
    setFloatingAction(true);
    navigation.navigate("SupplierProductPage", {
      product: productItem,
      onUpdated: onProductUpdate,
    });
  };

  const onProductUpdate = (value) => {
    const updated = productsState.map((item) =>
      item._id === value._id ? { ...value } : { ...item }
    );
    setProducts(updated);
  };

  const onSearchChange = (input) => {
    setSearchValue(input);
  };

  const goToNextPage = () => {
    if (currentPagePosition < totalPages) {
      const { currentPage, currentListMin, currentListMax } = useNextPaginator(
        currentPagePosition,
        recordsPerPage,
        currentPageListMin,
        currentPageListMax
      );
      setCurrentPagePosition(currentPage);
      setCurrentPageListMin(currentListMin);
      setCurrentPageListMax(currentListMax);
    }
  };

  const goToPreviousPage = () => {
    if (currentPagePosition === 1) return;

    const { currentPage, currentListMin, currentListMax } =
      usePreviousPaginator(
        currentPagePosition,
        recordsPerPage,
        currentPageListMin,
        currentPageListMax
      );
    setCurrentPagePosition(currentPage);
    setCurrentPageListMin(currentListMin);
    setCurrentPageListMax(currentListMax);
  };

  const toggleCheckbox = (item) => () => {
    const itemChecked = checkboxList.some(
      (checkedItem) =>
        checkedItem?.inventoryVariant._id === item?.inventoryVariant._id
    );
    if (itemChecked) {
      const filteredCheckboxList = checkboxList.filter(
        (checkedItem) =>
          checkedItem.inventoryVariant._id !== item.inventoryVariant._id
      );
      setCheckboxList([...filteredCheckboxList]);
    } else setCheckboxList([...checkboxList, item]);
  };

  const toggleHeaderCheckbox = () => {
    const productsToDisplay = productsState.slice(
      currentPageListMin,
      currentPageListMax
    );

    if (
      !checkboxList.length ||
      (checkboxList.length && checkboxList.length < productsToDisplay.length)
    ) {
      setCheckboxList([...productsToDisplay]);
    } else setCheckboxList([]);
  };

  const toggleActionButton = () => {
    setFloatingAction(true);
    modal.openModal("ActionContainerModal", {
      actions: actions(),
      title: "SUPPLIER PRODUCTS ACTIONS",
      onClose: () => setFloatingAction(false),
    });
  };

  const onClearPress = () => {
    addCartItem([]);
    setCartTotal(0);
    setCartItems([]);
    setCheckboxList([]);
  };

  const onUpdateItems = (data) => {
    const total = data.reduce((acc, curr) => acc + (curr.amount || 1), 0);

    setCartTotal(total);
    setCartItems(data);
    addCartItem(data);
  };

  const onListFooterPress = (data) => {
    setLoading(true);
    const { purchaseOrders = [] } = data;
    addCartItem(purchaseOrders);
    setCartItems(purchaseOrders);
    onCompleteOrder(data);
  };

  const onCompleteOrder = (data) => {
    const {
      purchaseOrders = [],
      deliveryDate = "",
      repeating,
      repeatingType,
    } = data;
    const orderToCreate = {
      deliveryDate,
      orders: purchaseOrders,
      supplier: supplierId,
      repeating,
      repeatingType,
    };

    createPurchaseOrder(orderToCreate)
      .then((_) => {
        onShowSuccessScreen()
        onClearPress();
      })
      .catch((error) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={true}
              isEditUpdate={false}
              onCancel={() => {
                modal.closeModals("ConfirmationModal");
              }}
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .finally((_) => setLoading(false));
  };

  const onConfirmChanges = (data) => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={false}
          isEditUpdate={true}
          onAction={() => {
            modal.closeModals("ConfirmationModal");
            setTimeout(() => {
              modal.closeModals("OverlayInfoModal");
              onListFooterPress(data);
            }, 200);
          }}
          onCancel={() => {
            modal.closeModals("ConfirmationModal");
          }}
          message="Do you want to save your changes ?"
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  const onShowSuccessScreen = () => {
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          isError={false}
          isEditUpdate={false}
          onAction={() => {
            modal.closeModals("ConfirmationModal"); 
            onRefresh()
          }}
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
  };

  
  const actions = () => {
    const isDisabled = checkboxList.length === 0;
    const isDisabledColor = isDisabled
      ? theme.colors["--color-gray-600"]
      : theme.colors["--color-red-700"];

    const deleteProduct = (
      <LongPressWithFeedback
        pressTimer={LONG_PRESS_TIMER.MEDIUM}
        onLongPress={onRemoveProducts}
        isDisabled={isDisabled}
      >
        <ActionItem
          title="Hold to Delete"
          icon={<WasteIcon strokeColor={isDisabledColor} />}
          onPress={() => {}}
          touchable={false}
          disabled={isDisabled}
        />
      </LongPressWithFeedback>
    );
    const addCart = (
      <ActionItem
        title="Add Item to Cart"
        icon={
          <AddIcon
            strokeColor={
              isDisabled
                ? theme.colors["--color-gray-600"]
                : theme.colors["--color-green-600"]
            }
          />
        }
        disabled={isDisabled}
        touchable={!isDisabled}
        onPress={addToCartAction}
      />
    );
    const addProduct = (
      <ActionItem
        title="Create Product"
        icon={<AddIcon />}
        onPress={addProductAction}
      />
    );
    return (
      <ActionContainer
        floatingActions={[
          deleteProduct,
          permissions.create && addCart,
          addProduct,
        ]}
        title="SUPPLIER PRODUCTS ACTIONS"
      />
    );
  };

  const toggleCartActionButton = () => {
    setTimeout(() => {
      modal.openModal("OverlayInfoModal", {
        overlayContent: (
          <SuppliersPurchaseOrder
            details={cart}
            onUpdateItems={onUpdateItems}
            onClearPress={onClearPress}
            onListFooterPress={onConfirmChanges}
          />
        ),
      });
    }, 200);
  };

  const addToCartAction = () => {
    let cartQuantity;
    let updatedCheckboxList = [...checkboxList];
    let updatedCartItems = [...cartItems];

    if (updatedCartItems.length === 0) {
      updatedCheckboxList = updatedCheckboxList.map((item) => ({
        ...item,
        amount: 1,
      }));
      updatedCartItems.push(...updatedCheckboxList);
      cartQuantity = updatedCheckboxList.length;
    } else {
      updatedCheckboxList.forEach((item) => {
        const itemIndex = updatedCartItems.findIndex(
          (cartItem) => cartItem._id === item._id
        );
        if (itemIndex < 0) {
          updatedCartItems.push({
            ...item,
            amount: 1,
          });
        } else {
          let tempCartItem = updatedCartItems[itemIndex];
          updateAmount = tempCartItem.amount + 1 || 1;  
          updatedCartItems.splice(itemIndex,1) 
          updatedCartItems.push({
            ...item,
            amount: updateAmount,
          })
        }
      });
      cartQuantity = updatedCartItems.reduce(
        (acc, curr) => acc + (curr.amount || 1),
        0
      );
    }

    modal.closeModals("ActionContainerModal");
    let updatedCart = [...updatedCartItems];

    setFloatingAction(false);
    setCartItems(updatedCart);
    setCartTotal(cartQuantity); 
    addCartItem(updatedCart)
    setCheckboxList([]);
  };

  const onProductsCreation = (data) => {
    setProducts([...productsState, ...data]);
    setTimeout(() => {
      onRefresh();
    }, 200);
  };

  const addProductAction = () => {
    modal.closeModals("ActionContainerModal");
    navigation.navigate("SupplierProductCreation", {
      supplierId,
      onProductsCreation,
    });
  };

  const onRemoveProducts = () => {
    const ids = checkboxList.map((item) => item._id);
    modal.closeAllModals();
    setTimeout(() => {
      modal.openModal("ConfirmationModal", {
        content: (
          <ConfirmationCheckBoxComponent
            isError={false}
            isEditUpdate={true}
            onAction={() => {
              modal.closeModals("ConfirmationModal");
              setTimeout(() => {
                removeProducts(ids);
              }, 200);
            }}
            onCancel={() => {
              modal.closeModals("ConfirmationModal");
            }}
            message="Do you want to save your changes ?"
          />
        ),
        onClose: () => {
          modal.closeModals("ConfirmationModal");
        },
      });
    }, 200);
  };

  const removeProducts = (data) => {
    removeSupplierProducts(supplierId, data)
      .then((_) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={false}
              isEditUpdate={false}
              onAction={() => {
                modal.closeModals("ConfirmationModal");
              }}
              onCancel={() => {
                modal.closeModals("ConfirmationModal");
              }}
              message="Products successfully deleted"
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .catch((error) => {
        modal.openModal("ConfirmationModal", {
          content: (
            <ConfirmationComponent
              isError={true}
              isEditUpdate={false}
              onAction={() => {
                modal.closeModals("ConfirmationModal");
              }}
              onCancel={() => {
                modal.closeModals("ConfirmationModal");
              }}
              message="Failed to remove products"
            />
          ),
          onClose: () => {
            modal.closeModals("ConfirmationModal");
          },
        });
      })
      .finally((_) => onRefresh());
  };

  const listItemFormat = (item) => (
    <>
      <DataItem
        text={item?.name}
        flex={2}
        fontStyle="--text-base-medium"
        color="--color-blue-600"
      />
      <DataItem text={item?.inventoryVariant?.name} />
      <DataItem text={item?.sku || "n/a"} align="center" />
      <DataItem
        text={`$ ${currencyFormatter(item.unitPrice)}`}
        align="flex-end"
      />
    </>
  );

  const renderListFn = (item) => (
    <Item
      hasCheckBox={true}
      isChecked={checkboxList.includes(item)}
      onCheckBoxPress={toggleCheckbox(item)}
      onItemPress={onProductsPress(item)}
      itemView={listItemFormat(item)}
    />
  );

  let productsToDisplay = [...productsState];
  productsToDisplay = productsToDisplay.slice(
    currentPageListMin,
    currentPageListMax
  );

  return (
    <>
      <SearchContainer theme={theme}>
        <Search
          placeholderText="Search by Product"
          changeText={onSearchChange}
          inputText={searchValue}
        />
      </SearchContainer>

      <Table
        data={productsToDisplay}
        headers={headers}
        isCheckbox={true}
        itemSelected={checkboxList}
        listItemFormat={renderListFn}
        toggleHeaderCheckbox={toggleHeaderCheckbox}
      />

      <FooterWrapper>
        <FooterContainer>
          <FloatingActionAnnotated
            toggleActionButton={toggleCartActionButton}
            icon={Cart}
            value={cartTotal}
            showValue={cartTotal !== 0}
          />

          <PaginatorActionsContainer>
            <RoundedPaginator
              totalPages={totalPages}
              currentPage={currentPagePosition}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              isNextDisabled={false}
              isPreviousDisabled={false}
            />

            <FloatingActionButton
              isDisabled={isFloatingActionDisabled}
              toggleActionButton={toggleActionButton}
            />
          </PaginatorActionsContainer>
        </FooterContainer>
      </FooterWrapper>

      {isLoading && <LoadingIndicator backgroundColor="white" />}
    </>
  );
}

SupplierProductsTab.propTypes = {};
SupplierProductsTab.defaultProps = {};

const mapStateToProps = (state) => ({ cart: state.cart });

const mapDispatchToProp = { addCartItem };

export default connect(mapStateToProps, mapDispatchToProp)(SupplierProductsTab);
