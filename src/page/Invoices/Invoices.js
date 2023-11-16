import { useTheme } from "emotion-theming";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import { deleteInvoices, getInvoices } from "../../api/network";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../../helpers/caseFilesHelpers";
import { setInvoices } from "../../redux/actions/invoicesActions";
import { formatDate } from "../../utils/formatter";

import _ from "lodash";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import DataItem from "../../components/common/List/DataItem";
import ListItem from "../../components/common/List/ListItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { LONG_PRESS_TIMER } from "../../const";

const listHeaders = [
    {
        name: "Invoices",
        alignment: "flext-start",
        flex: 1,
    },

    {
        name: "Status",
        alignment: "left",
    },

    {
        name: "Delivery Date",
        alignment: "flext-start",
        flex: 1,
    },

    {
        name: "Supplier",
        alignment: "flext-start",
        flex: 1.5,
    },
];

function Invoices(props) {
    const { setInvoices } = props;
    const pageTitle = "Invoices";
    const modal = useModal();
    const theme = useTheme();
    const recordsPerPage = 10; //TO-DO: Is there a specific reason for this?

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [allInvoices, setAllInvoices] = useState([]);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchInvoiceData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchInvoiceData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onRefresh = () => {
        fetchInvoiceData();
    };

    const onSearchChange = (input) => {
        setSearchValue(input);
    };

    const fetchInvoiceData = async (pagePosition) => {
        setFetchingData(true);
        return getInvoices(searchValue, recordsPerPage, pagePosition)
            .then((storageResult) => {
                const { data = [] } = storageResult;
                setAllInvoices(data);
                return storageResult;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setInvoices);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const invoiceItem = ({ name, status, deliveryDate, supplier }) => (
        <>
            <RightBorderDataItem
                fontStyle="--text-base-regular"
                color="--color-gray-800"
                text={name}
                align="flext-start"
                flex={1}
            />
            <DataItem
                fontStyle="--text-base-medium"
                color="--color-gray-800"
                text={status}
                align="flext-start"
                flex={1}
            />
            <DataItem
                fontStyle="--text-base-medium"
                color="--color-blue-600"
                align="flext-start"
                text={formatDate(deliveryDate, "DD/MM/YYYY")}
                flex={1}
            />
            <DataItem
                fontStyle="--text-base-medium"
                color="--color-blue-600"
                align="flext-start"
                text={supplier}
                flex={1}
            />
        </>
    );

    const renderItem = (item) => {
        const formattedItem = {
            name: item.invoiceNumber,
            status: item.status,
            deliveryDate: item.purchaseOrder.deliveryDate,
            supplier: item.supplier.name,
            levels: {
                min: 0,
                max: item.capacity,
            },
        };

        const itemView = invoiceItem(formattedItem);

        return (
            <ListItem
                isChecked={selectedIds.includes(item._id)}
                onCheckBoxPress={() => onCheckBoxPress(item)}
                onItemPress={() => handleOnItemPress(item, false)}
                itemView={itemView}
            />
        );
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate("InvoicesPage", {
            initial: false,
            invoiceItem: item,
            isEditable: isOpenEditable,
            updateInvoices: () => {
                onRefresh();
            },
        });
    };

    const onCheckBoxPress = (item) => {
        const { _id } = item;

        const updateInvioces = checkboxItemPress(_id, selectedIds);

        setSelectedIds(updateInvioces);
    };

    const getFabActions = () => {
        const isDisabled = selectedIds.length === 0;
        const deleteAction = (
            <View style={{ borderRadius: 6, flex: 1, overflow: "hidden" }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeStorageLocationsLongPress}
                    isDisabled={isDisabled}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        onPress={() => {}}
                        touchable={false}
                        disabled={isDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        return (
            <ActionContainer
                floatingActions={[deleteAction]}
                title="INVOICE ACTIONS"
            />
        );
    };

    const removeStorageLocationsLongPress = () => {
        if (selectedIds.length > 0)
            openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
    };

    const removeInvoiceCall = (data) => {
        deleteInvoices(data)
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onAction={() => {
                                modal.closeModals("ConfirmationModal");
                                setTimeout(() => {
                                    modal.closeModals("ActionContainerModal");
                                    onRefresh();
                                }, 200);
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });

                setSelectedIds([]);
            })
            .catch((error) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
                console.log("Failed to remove invoices: ", error);
            })
            .finally((_) => {
                setFloatingAction(false);
            });
    };

    const openDeletionConfirm = (data) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal");
                        removeInvoiceCall(data);
                    }}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const openErrorConfirmation = () => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationComponent
                    isError={true}
                    isEditUpdate={false}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const onSelectAll = () => {
        const updatedInvoices = selectAll(allInvoices, selectedIds);
        setSelectedIds(updatedInvoices);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "INVOICE ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    return (
        <PageSettingsContext.Provider
            value={{
                pageSettingState,
                setPageSettingState,
            }}
        >
            <PaginatedSection
                placeholderText="Search by Invoices"
                routeName={pageTitle}
                listData={allInvoices}
                inputText={searchValue}
                itemsSelected={selectedIds}
                listItemFormat={renderItem}
                listHeaders={listHeaders}
                changeText={onSearchChange}
                onRefresh={onRefresh}
                isFetchingData={isFetchingData}
                onSelectAll={onSelectAll}
                currentPage={currentPagePosition}
                fetchSectionDataCb={fetchInvoiceData}
                setCurrentPage={setCurrentPagePosition}
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
}

const mapStateToProps = (state) => ({ Invoices: state.invoices });

const mapDispatcherToProp = { setInvoices };

export default connect(mapStateToProps, mapDispatcherToProp)(Invoices);
