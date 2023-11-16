import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import CreateProcedureDialog from "../components/Procedures/CreateProcedureDialogContainer";
import ProceduresBottomSheet from "../components/Procedures/ProceduresBottomSheet";
import ActionItem from "../components/common/ActionItem";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ListItem from "../components/common/List/ListItem";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";

import AddIcon from "../../assets/svg/addIcon";
import WasteIcon from "../../assets/svg/wasteIcon";

import { checkboxItemPress, selectAll } from "../helpers/caseFilesHelpers";

import _ from "lodash";
import { connect } from "react-redux";
import { getProcedures } from "../api/network";
import { setProcedures } from "../redux/actions/proceduresActions";

import { withModal } from "react-native-modalfy";
import PaginatedSection from "../components/common/Page/PaginatedSection";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../const";

const Procedures = (props) => {
    const listHeaders = [
        {
            name: "Procedure",
            alignment: "flex-start",
            flex: 1.5,
        },
        {
            name: "Physician",
            alignment: "center",
            flex: 1,
        },
        {
            name: "Duration",
            alignment: "center",
            flex: 1,
        },
    ];
    const { procedures = [], setProcedures, modal } = props;

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedProcedures, setSelectedProcedures] = useState([]);

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchProceduresData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchProceduresData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPagePosition(1);
    }, [searchValue]);

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchProceduresData();
    };

    const handleOnSelectAll = () => {
        const updatedProceduresList = selectAll(procedures, selectedProcedures);
        setSelectedProcedures(updatedProceduresList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedProcedures = checkboxItemPress(_id, selectedProcedures);

        setSelectedProcedures(updatedProcedures);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        modal.openModal("BottomSheetModal", {
            content: (
                <ProceduresBottomSheet
                    procedure={item}
                    isOpenEditable={isOpenEditable}
                />
            ),
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "PROCEDURES ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const fetchProceduresData = async (pagePosition) => {
        setFetchingData(true);
        return getProcedures(searchValue, RECORDS_PER_PAGE_MAIN, pagePosition)
            .then((procedureResult) => {
                const { data = [] } = procedureResult;
                setProcedures(data);
                return procedureResult;
            })
            .catch((error) => {
                Alert.alert(
                    "Failed",
                    "Failure occurred when retrieving Procedure data."
                );
                throw error;
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderProcedureFn = (item) => {
        return (
            <ListItem
                hasCheckBox={true}
                isChecked={selectedProcedures.includes(item._id)}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => handleOnItemPress(item, false)}
                itemView={procedureItem(item)}
            />
        );
    };

    const procedureItem = (item) => {
        const { physician = {} } = item;
        const { firstName = "", surname = "" } = physician;
        return (
            <>
                <View
                    style={[
                        styles.item,
                        { ...styles.rowBorderRight, flex: 1.5 },
                    ]}
                >
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, { color: "#323843" }]}
                    >
                        {item.name}
                    </Text>
                </View>
                <View
                    style={[styles.item, { flex: 1, alignItems: "flex-start" }]}
                >
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, { color: "#3182CE" }]}
                    >
                        Dr. {firstName} {surname}
                    </Text>
                </View>
                <View style={[styles.item, { flex: 1, alignItems: "center" }]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.itemText, { color: "#3182CE" }]}
                    >{`${item.duration} hours`}</Text>
                </View>
            </>
        );
    };

    const getFabActions = () => {
        const deleteAction = (
            <LongPressWithFeedback
                pressTimer={LONG_PRESS_TIMER.MEDIUM}
                onLongPress={() => {}}
            >
                <ActionItem
                    title="Hold to Delete"
                    icon={<WasteIcon />}
                    onPress={() => {}}
                    touchable={false}
                />
            </LongPressWithFeedback>
        );
        const createCopy = (
            <ActionItem
                title="Create Copy"
                icon={<AddIcon />}
                onPress={() => {}}
            />
        );
        const createNewProcedure = (
            <ActionItem
                title="New Procedure"
                icon={<AddIcon />}
                onPress={openCreateProcedure}
            />
        );

        return (
            <ActionContainer
                floatingActions={[deleteAction, createCopy, createNewProcedure]}
                title="PROCEDURES ACTIONS"
            />
        );
    };

    const openCreateProcedure = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateProcedureDialog
                        onCancel={() => setFloatingAction(false)}
                        onCreated={(item) => {
                            handleOnItemPress(item, true);
                            handleDataRefresh();
                        }}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };

    return (
        <View style={{ flex: 1 }}>
            <PaginatedSection
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText="Search by Procedure"
                changeText={onSearchInputChange}
                setCurrentPage={setCurrentPagePosition}
                fetchSectionDataCb={fetchProceduresData}
                inputText={searchValue}
                routeName="Procedures"
                listData={procedures}
                listHeaders={listHeaders}
                itemsSelected={selectedProcedures}
                onSelectAll={handleOnSelectAll}
                listItemFormat={renderProcedureFn}
                currentPage={currentPagePosition}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    procedures: state.procedures,
});

const mapDispatcherToProp = {
    setProcedures,
};

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Procedures));

const styles = StyleSheet.create({
    item: {},
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
        marginRight: 20,
    },
});
