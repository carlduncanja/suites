import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useModal } from "react-native-modalfy";
import { connect } from "react-redux";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import { getTheatres, removeTheatres } from "../../api/network";
import CreateTheatreDialogContainer from "../../components/Theatres/CreateTheatreDialogContainer";
import ActionItem from "../../components/common/ActionItem";
import IconButton from "../../components/common/Buttons/IconButton";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ListItem from "../../components/common/List/ListItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../../helpers/caseFilesHelpers";
import { setTheatres } from "../../redux/actions/theatresActions";

import ConfirmationComponent from "../../components/ConfirmationComponent";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";

const listHeaders = [
    {
        name: "Theatre",
        alignment: "flex-start",
        flex: 2,
    },
    {
        name: "Status",
        alignment: "center",
        flex: 1,
    },
    {
        name: "Recovery",
        alignment: "center",
        flex: 1,
    },
    {
        name: "Actions",
        alignment: "center",
        flex: 1,
    },
];

function Theatres(props) {
    const { theatres = [], setTheatres } = props;
    const pageTitle = "Theatre Rental";
    const emptyTitle = "No Theatres Found";
    const modal = useModal();
    const theatrePermissions = props.route.params.theatrePermissions;

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchTheatres(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchTheatres, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

    const onItemPress = (item, isOpenEditable) => () => {
        props.navigation.navigate("TheatresPage", {
            initial: false,
            theatre: item,
            isEdit: isOpenEditable,
            updateTheatre: theatrePermissions.update,
            reloadTheatres: () => fetchTheatres(currentPage),
        });
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const onRefresh = () => {
        fetchTheatres();
    };

    const onSelectAll = () => {
        const updatedTheatres = selectAll(theatres, selectedIds);
        setSelectedIds(updatedTheatres);
    };

    const onCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedTheatres = checkboxItemPress(_id, selectedIds);
        setSelectedIds(updatedTheatres);
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "THEATRE ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const theatreItem = (
        {
            name = "",
            recoveryStatus = "n/a",
            recoveryStatusColor,
            status = "",
            statusColor,
        },
        onActionPress
    ) => (
        <>
            <View style={[styles.item, { flex: 2, ...styles.rowBorderRight }]}>
                <Text style={{ color: "#3182CE", fontSize: 16 }}>{name}</Text>
            </View>
            <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
                <Text style={[styles.itemText, { color: statusColor }]}>
                    {status}
                </Text>
            </View>
            <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
                <Text style={[styles.itemText, { color: recoveryStatusColor }]}>
                    {recoveryStatus}
                </Text>
            </View>
            <View style={[styles.item, { flex: 1, justifyContent: "center" }]}>
                <IconButton
                    Icon={<AssignIcon />}
                    disabled={!theatrePermissions.update}
                    onPress={onActionPress}
                />
            </View>
        </>
    );

    const getFabActions = () => {
        const deleteAction = theatrePermissions.delete && (
            <View style={{ borderRadius: 6, flex: 1, overflow: "hidden" }}>
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.LONG}
                    onLongPress={removeTheatresLongPress}
                >
                    <ActionItem
                        title="Hold to Delete"
                        icon={<WasteIcon />}
                        onPress={() => {}}
                        touchable={false}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const createAction = theatrePermissions.create && (
            <ActionItem
                title="Create Theatre"
                icon={<AddIcon />}
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
        if (selectedIds.length > 0)
            openDeletionConfirm({ ids: [...selectedIds] });
        else openErrorConfirmation();
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
                        removeTheatresCall(data);
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

    const removeTheatresCall = (data) => {
        setFetchingData(true);
        removeTheatres(data)
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
                console.error("Failed to remove group: ", error);
            })
            .finally((_) => {
                setFloatingAction(false);
                setFetchingData(false);
            });
    };

    const openCreateTheatreModel = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateTheatreDialogContainer
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

        if (!Array.isArray(appointments))
            return { isActive: false, isRecovery: false };

        for (const appointment of appointments) {
            const startTime = moment(appointment.startTime);
            const endTime = moment(appointment.endTime);

            const isActive = now.isBetween(startTime, endTime);

            if (isActive) {
                return { isActive: true, isRecovery: false };
            }
        }

        return { isActive: false, isRecovery: false };
    };

    const renderItem = (item) => {
        const availableColor = "#38A169";
        const inUseColor = "#DD6B20";

        const { isActive, isRecovery } = isInUse(item.appointments || []);

        const formattedItem = {
            name: item.name || "",
            recoveryStatus: isRecovery ? "Yes" : isActive ? "No" : "--",
            recoveryStatusColor: isRecovery ? availableColor : "#4E5664",
            status: !isActive ? "Available" : "In-Use",
            statusColor: !isActive ? availableColor : inUseColor,
        };

        const onActionClick = (isOpenEditable) => {
            props.navigation.navigate("TheatresPage", {
                initial: false,
                theatre: item,
                isEdit: isOpenEditable,
                reloadTheatres: () => fetchTheatres(currentPage),
                tab: 4,
                updateTheatre: theatrePermissions.update,
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

    const fetchTheatres = async (pagePosition) => {
        setFetchingData(true);
        return getTheatres(searchValue, RECORDS_PER_PAGE_MAIN, pagePosition)
            .then((result) => {
                const { data = [] } = result;
                setTheatres(data);
                return result;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setTheatres);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
                throw error;
            })
            .finally((_) => {
                setFetchingData(false);
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
                changeText={onSearchInputChange}
                currentPage={currentPage}
                emptyTitle={emptyTitle}
                fetchSectionDataCb={fetchTheatres}
                hasActionButton={
                    theatrePermissions.delete || theatrePermissions.create
                }
                hasActions={true}
                hasPaginator={true}
                inputText={searchValue}
                isDisabled={isFloatingActionDisabled}
                isFetchingData={isFetchingData}
                itemsSelected={selectedIds}
                listData={theatres}
                listItemFormat={renderItem}
                listHeaders={listHeaders}
                onRefresh={onRefresh}
                onSelectAll={onSelectAll}
                placeholderText="Search by theatre name"
                routeName={pageTitle}
                setCurrentPage={setCurrentPage}
                toggleActionButton={toggleActionButton}
            />
        </PageSettingsContext.Provider>
    );
}

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
    },
});

const mapStateToProps = (state) => {
    const theatres = state.theatres.map((item) => ({
        ...item,
    }));

    return { theatres };
};

const mapDispatchToProps = { setTheatres };

export default connect(mapStateToProps, mapDispatchToProps)(Theatres);
