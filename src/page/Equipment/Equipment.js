import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import moment from "moment";
import { withModal } from "react-native-modalfy";
import { connect } from "react-redux";
import AddIcon from "../../../assets/svg/addIcon";
import AssignIcon from "../../../assets/svg/assignIcon";
import CollapsedIcon from "../../../assets/svg/closeArrow";
import ActionIcon from "../../../assets/svg/dropdownIcon";
import WasteIcon from "../../../assets/svg/wasteIcon";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import ContentDataItem from "../../components/common/List/ContentDataItem";
import DataItem from "../../components/common/List/DataItem";
import LongPressWithFeedback from "../../components/common/LongPressWithFeedback";
import MultipleShadowsContainer from "../../components/common/MultipleShadowContainer";
import Item from "../../components/common/Table/Item";
import {
    checkboxItemPress,
    handleUnauthorizedError,
    selectAll,
} from "../../helpers/caseFilesHelpers";

import {
    getEquipment,
    getEquipmentTypes,
    removeEquipment,
    removeEquipmentTypes,
} from "../../api/network";
import { setEquipment } from "../../redux/actions/equipmentActions";

import ConfirmationCheckBoxComponent from "../../components/ConfirmationCheckBoxComponent";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import CreateEquipmentTypeDialogContainer from "../../components/Equipment/CreateEquipmentTypeDialogContainer";
import IconButton from "../../components/common/Buttons/IconButton";
import CollapsibleListItem from "../../components/common/List/CollapsibleListItem";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { LONG_PRESS_TIMER, RECORDS_PER_PAGE_MAIN } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
const QuantityWrapper = styled.View`
    flex: 1.5;
    align-items: center;
`;
const QuantityContainer = styled.View`
    height: 24px;
    width: 28px;
    background-color: ${({ theme, isCollapsed }) =>
        isCollapsed === false
            ? theme.colors["--color-gray-100"]
            : theme.colors["--default-shade-white"]};
    border-radius: 4px;
    align-items: center;
    justify-content: center;
`;

const QuantityText = styled.Text(({ theme, isCollapsed }) => ({
    ...theme.font["--text-base-regular"],
    color:
        isCollapsed === false
            ? theme.colors["--color-gray-500"]
            : theme.colors["--color-gray-700"],
}));
const shadows = [
    {
        shadowColor: "black",
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
    },
    {
        shadowColor: "black",
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
];
const Equipment = (props) => {
    const equipmentPermissions = props.route.params.equipmentPermissions;
    const theme = useTheme();
    const listHeaders = [
        {
            name: "Item ID",
            alignment: "flex-start",
            flex: 2,
        },
        {
            name: "Status",
            alignment: "flex-start",
            flex: 2.4,
        },
        {
            name: "In Stock",

            flex: 1.3,
        },

        {
            name: "Assigned",
            alignment: "flex-start",
            flex: 2,
        },
    ];
    const { setEquipment, navigation, modal } = props;

    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [groupSelected, setGroupSelected] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedEquipments, setSelectedEquipments] = useState([]);
    const [selectedTypesIds, setSelectedTypesIds] = useState([]);

    const [equipmentTypes, setEquipmentTypes] = useState([]);

    const [expandedItems, setExpandedItems] = useState([]);

    const [pageSettingState, setPageSettingState] = useState({});

    useEffect(() => {
        if (!searchValue) {
            setSearchResult([]);
            fetchEquipmentData(1);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        const search = _.debounce(fetchEquipmentData, 300);

        setSearchQuery((prevSearch) => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search();
        setCurrentPage(1);
    }, [searchValue]);

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchEquipmentData();
    };

    const handleOnSelectAll = () => {
        const updatedEquipmentList = selectAll(
            equipmentTypes,
            selectedTypesIds
        );
        setSelectedTypesIds(updatedEquipmentList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedEquipmentList = checkboxItemPress(_id, selectedTypesIds);

        setGroupSelected(item);
        setSelectedTypesIds(updatedEquipmentList);

        const removeChildren = selectedEquipments.filter(
            (obj) => obj.groupId !== _id
        );
        setSelectedEquipments(removeChildren);
    };

    const handleOnItemCheckboxPress = (equipmentItem) => {
        const { _id, type } = equipmentItem;
        const equipmentIds = selectedEquipments.map(
            (equipmentObj) => equipmentObj._id
        );
        const updatedChildIds = checkboxItemPress(_id, equipmentIds);

        const updatedSelectedEquipments = updatedChildIds.map((_id) => ({
            ...equipmentItem,
            _id,
            groupId: type,
        }));
        setSelectedEquipments(updatedSelectedEquipments);

        const updatedIds = selectedTypesIds.filter((id) => id !== type);
        setSelectedTypesIds(updatedIds);
    };

    const onCollapseView = (key) => {
        if (expandedItems.includes(key)) {
            setExpandedItems(expandedItems.filter((item) => item !== key));
        } else {
            setExpandedItems([...expandedItems, key]);
        }
    };

    const handleOnItemPress = (item, isOpenEditable, type) => {
        props.navigation.navigate("EquipmentItemPage", {
            initial: false,
            equipment: item,
            isOpenEditable,
            group: type,
            onCreated: handleDataRefresh,
            updatesEquipment: equipmentPermissions.update,
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "EQUIPMENT ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const onRemoveGroups = () => {
        openConfirmationScreen(() =>
            removeEquipmentGroup({ ids: [...selectedTypesIds] })
        );
    };

    const onRemoveItems = () => {
        const selectedEquipmentIds = selectedEquipments.map(
            (equipment) => equipment._id
        );
        openConfirmationScreen(() =>
            removeEquipmentItems({ ids: [...selectedEquipmentIds] })
        );
    };

    const onRefresh = () => {
        fetchEquipmentData(currentPage);
    };

    const fetchEquipmentData = async (pagePosition) => {
        setFetchingData(true);

        getEquipment()
            .then((data) => {
                setEquipment(data);
            })
            .catch((error) => {
                console.log("failed to get equipment", error);
            });

        return getEquipmentTypes(
            searchValue,
            RECORDS_PER_PAGE_MAIN,
            pagePosition
        )
            .then((equipmentTypesInfo) => {
                const { data = [] } = equipmentTypesInfo;

                setEquipmentTypes(data);
                return equipmentTypesInfo;
            })
            .catch((error) => {
                handleUnauthorizedError(
                    error?.response?.status,
                    setEquipmentTypes
                );
                setPageSettingState({ ...pageSettingState, isDisabled: true });
            })
            .finally((_) => {
                setFetchingData(false);
            });
    };

    const renderEquipmentFn = (item) => {
        const equipments = item.equipments || [];

        const viewItem = {
            equipments,
            _id: item._id,
            name: item.name,
            suppliers: item.suppliers,
            description: item.description,
            quantity: item.equipments.length,
            nextAvailable: new Date(2020, 12, 12),
        };
        const isIndeterminate = selectedEquipments.some(
            (variant) => variant.groupId === item._id
        );

        return (
            <CollapsibleListItem
                hasCheckBox={true}
                isChecked={selectedTypesIds.includes(item._id)}
                isIndeterminate={isIndeterminate}
                onCheckBoxPress={handleOnCheckBoxPress(item)}
                onItemPress={() => gotoGroupDetails(item)}
                collapsed={!expandedItems.includes(item.name)}
                onCollapsedEnd={() => onCollapseView(item.name)}
                render={(collapse, isCollapsed) =>
                    equipmentGroupView(viewItem, collapse, isCollapsed)
                }
            >
                <FlatList
                    data={getEquipmentData(equipments)}
                    keyExtractor={(item, index) => `${index}`}
                    ItemSeparatorComponent={() => (
                        <View
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                borderColor: "#E3E8EF",
                                borderWidth: 0.5,
                            }}
                        />
                    )}
                    renderItem={({ item }) => {
                        const evalRecentAssignment = (assignments) => {
                            let assignmentName = null;
                            let status = null;
                            let mostRecent = null;

                            for (const assignment of assignments) {
                                if (assignment.type !== "location") {
                                    if (
                                        !mostRecent ||
                                        moment(assignment.startTime).isAfter(
                                            mostRecent
                                        )
                                    ) {
                                        mostRecent = moment(
                                            assignment.startTime
                                        );

                                        assignmentName =
                                            assignment.referenceName;

                                        const futureTime = mostRecent
                                            .clone()
                                            .add(
                                                assignment.duration || 0,
                                                "hours"
                                            );
                                        status = moment().isBetween(
                                            mostRecent,
                                            futureTime
                                        )
                                            ? "Unavailable"
                                            : "Available";
                                    }
                                }
                            }

                            return { assignmentName, status };
                        };

                        const { assignmentName: assignment, status } =
                            evalRecentAssignment(item.assignments);
                        const { _id, name: equipmentName, description } = item;

                        const equipmentItem = {
                            ...item,
                            _id,
                            equipmentName,
                            description,
                            quantity: 1,
                            group: viewItem,
                            assignment: assignment || "Unassigned",
                            status: status || "Available",
                        };

                        const onActionPress = () =>
                            console.info("Clicked group");

                        return renderItemView(equipmentItem, onActionPress);
                    }}
                />
            </CollapsibleListItem>
        );
    };

    const getEquipmentData = (equipments = []) => equipments;

    const renderItemView = (item, onActionPress) => {
        const { _id, group } = item;
        const ids = selectedEquipments.map((item) => item._id);

        return (
            <Item
                itemView={equipmentItemView(item, onActionPress)}
                hasCheckBox={true}
                isChecked={ids.includes(_id)}
                onCheckBoxPress={() => handleOnItemCheckboxPress(item)}
                onItemPress={() => handleOnItemPress(item, false, group)}
            />
        );
    };

    const equipmentItemView = ({
        equipmentName,
        quantity,
        status,
        assignment,
    }) => (
        <>
            <DataItem
                text={equipmentName}
                flex={2}
                color="--color-blue-600"
                fontStyle="--text-sm-medium"
            />
            <DataItem
                text={status}
                flex={2.4}
                color="--color-gray-800"
                fontStyle="--text-sm-regular"
            />
            <DataItem
                text={quantity}
                flex={1.2}
                color="--color-gray-800"
                fontStyle="--text-sm-regular"
                align="flex-end"
            />
            <DataItem
                text={assignment}
                flex={2}
                color="--color-gray-800"
                fontStyle="--text-sm-regular"
            />
        </>
    );

    const gotoGroupDetails = (item) => {
        props.navigation.navigate("EquipmentGroupDetailsPage", {
            data: item,
            onCreated: handleDataRefresh,
            updatesEquipment: equipmentPermissions.update,
        });
    };

    const equipmentGroupView = (item, onActionPress, isCollapsed) => (
        <>
            <DataItem
                text={item.name}
                flex={2}
                color="--color-gray-800"
                fontStyle="--text-base-regular"
            />
            <DataItem flex={1.2} />
            <QuantityWrapper>
                <MultipleShadowsContainer shadows={shadows}>
                    <QuantityContainer theme={theme} isCollapsed={isCollapsed}>
                        <QuantityText theme={theme} isCollapsed={isCollapsed}>
                            {item.quantity}
                        </QuantityText>
                    </QuantityContainer>
                </MultipleShadowsContainer>
            </QuantityWrapper>
            <DataItem flex={1.5} />
            <ContentDataItem
                align="center"
                flex={0.5}
                content={
                    <IconButton
                        Icon={isCollapsed ? <ActionIcon /> : <CollapsedIcon />}
                        onPress={onActionPress}
                    />
                }
            />
        </>
    );

    const gotoAddEquipment = () => {
        modal.closeAllModals();
        navigation.navigate("AddEquipmentPage", {
            equipment: groupSelected,
            onCreated: () => {
                handleDataRefresh();
                setFloatingAction(false);
            },
        });
    };

    const gotoAssignEquipment = () => {
        modal.closeAllModals();
        const equipment = selectedEquipments[0];
        navigation.navigate("AssignEquipmentPage", {
            equipment,
            onCreated: handleDataRefresh,
        });
    };

    const getFabActions = () => {
        const actionsArray = [];
        const isGroupDeleteDisabled = !selectedTypesIds.length;

        const deleteAction = (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={isGroupDeleteDisabled}
                    onLongPress={onRemoveGroups}
                >
                    <ActionItem
                        title="Hold to Delete Group"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isGroupDeleteDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        onPress={onRemoveGroups}
                        touchable={false}
                        disabled={isGroupDeleteDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isEquipmentItemDeleteDisabled = !selectedEquipments.length;
        const deleteEquipmentItemAction = (
            <View
                style={{
                    borderRadius: 6,
                    flex: 1,
                    overflow: "hidden",
                }}
            >
                <LongPressWithFeedback
                    pressTimer={LONG_PRESS_TIMER.MEDIUM}
                    isDisabled={isEquipmentItemDeleteDisabled}
                    onLongPress={onRemoveItems}
                >
                    <ActionItem
                        title="Hold to Delete Equipment"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    isEquipmentItemDeleteDisabled
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        onPress={onRemoveItems}
                        touchable={false}
                        disabled={isEquipmentItemDeleteDisabled}
                    />
                </LongPressWithFeedback>
            </View>
        );

        const isAssignDisabled = selectedEquipments.length !== 1;
        const assignEquipment = (
            <ActionItem
                disabled={isAssignDisabled}
                touchable={true}
                title="Assign Equipment"
                icon={
                    <AssignIcon
                        strokeColor={
                            isAssignDisabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--color-blue-700"]
                        }
                    />
                }
                onPress={gotoAssignEquipment}
            />
        );

        const createEquipmentType = equipmentPermissions.create && (
            <ActionItem
                title="Create Equipment Group"
                icon={<AddIcon />}
                onPress={openEquipmentTypeDialog}
            />
        );

        const createEquipment = equipmentPermissions.create && (
            <ActionItem
                title="Add Equipment"
                icon={<AddIcon />}
                touchable={selectedTypesIds.length === 1}
                disabled={selectedTypesIds.length !== 1}
                onPress={
                    selectedTypesIds.length === 1
                        ? gotoAddEquipment
                        : () => {
                              console.log(selectedTypesIds.length);
                          }
                }
            />
        );

        if (equipmentPermissions.delete)
            actionsArray.push(deleteAction, deleteEquipmentItemAction);
        if (equipmentPermissions.create)
            actionsArray.push(createEquipmentType, createEquipment);
        if (equipmentPermissions.update) actionsArray.push(assignEquipment);
        return (
            <ActionContainer
                floatingActions={actionsArray}
                title="EQUIPMENT ACTIONS"
            />
        );
    };

    const openConfirmationScreen = (callbackFn) => {
        modal.openModal("ConfirmationModal", {
            content: (
                <ConfirmationCheckBoxComponent
                    isError={false}
                    isEditUpdate={true}
                    onCancel={() => modal.closeModals("ConfirmationModal")}
                    onAction={() => {
                        modal.closeModals("ConfirmationModal");
                        callbackFn();
                    }}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const openEquipmentTypeDialog = () => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateEquipmentTypeDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={() => {
                            handleDataRefresh();
                        }}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
    };
    const removeEquipmentGroup = (ids) => {
        removeEquipmentTypes(ids)
            .then((data) => {
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
                setSelectedEquipments([]);
                console.log("Data: ", data);
            })
            .catch((_) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
            });
    };

    const removeEquipmentItems = (ids) => {
        removeEquipment(ids)
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
                setSelectedEquipments([]);
            })
            .catch((_) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
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
                fetchSectionDataCb={fetchEquipmentData}
                hasActionButton={
                    equipmentPermissions.create || equipmentPermissions.delete
                }
                hasActions={true}
                hasPaginator={true}
                inputText={searchValue}
                isDisabled={isFloatingActionDisabled}
                isFetchingData={isFetchingData}
                itemsSelected={selectedTypesIds}
                listData={equipmentTypes}
                listHeaders={listHeaders}
                listItemFormat={renderEquipmentFn}
                onRefresh={handleDataRefresh}
                onSelectAll={handleOnSelectAll}
                placeholderText="Search by Assignment, Status, Parent Name"
                routeName="Equipment"
                setCurrentPage={setCurrentPage}
                toggleActionButton={toggleActionButton}
            />
        </PageSettingsContext.Provider>
    );
};

const mapStateToProps = (state) => ({ equipmentTypes: state.equipmentTypes });

const mapDispatcherToProp = { setEquipment };

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Equipment));
