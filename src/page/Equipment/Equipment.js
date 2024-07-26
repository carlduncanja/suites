import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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
import NavPage from "../../components/common/Page/NavPage";
import Item from "../../components/common/Table/Item";

import {
  handleUnauthorizedError,
  useNextPaginator,
  usePreviousPaginator,
} from "../../helpers/caseFilesHelpers";

import {
  getEquipment,
  getEquipmentTypes,
  removeEquipment,
  removeEquipmentTypes,
} from "../../api/network";

import ConfirmationCheckBoxComponent from "../../components/ConfirmationCheckBoxComponent";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import CreateEquipmentTypeDialogContainer from "../../components/Equipment/CreateEquipmentTypeDialogContainer";
import IconButton from "../../components/common/Buttons/IconButton";
import CollapsibleListItem from "../../components/common/List/CollapsibleListItem";
import { LONG_PRESS_TIMER } from "../../const";
import { PageSettingsContext } from "../../contexts/PageSettingsContext";
import { setEquipment } from "../../redux/actions/equipmentActions";
import { useGetCheckboxUtils } from "../../hooks/SuitesHooks";

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

const Equipment = (props) => {
  const { setEquipment, navigation, modal } = props;

  const equipmentPermissions = props.route.params.equipmentPermissions;
  const theme = useTheme();

  const recordsPerPage = 12;
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

  const [isFetchingData, setFetchingData] = useState(false);
  const [isFloatingActionDisabled, setFloatingAction] = useState(false);
  const [groupSelected, setGroupSelected] = useState({});

  const [totalPages, setTotalPages] = useState(1);
  const [currentPageListMin, setCurrentPageListMin] = useState(0);
  const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
  const [currentPagePosition, setCurrentPagePosition] = useState(1);
  const [isNextDisabled, setNextDisabled] = useState(false);
  const [isPreviousDisabled, setPreviousDisabled] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const [pageSettingState, setPageSettingState] = useState({});

  const {
    getSelectedChildren,
    getSelectedParents,
    grandparentState,
    isChildChecked,
    isParentInState,
    onPressChild,
    onPressGrandparent,
    onPressParent,
    numParentsChecked,
  } = useGetCheckboxUtils(equipmentTypes, "equipments");

  useEffect(() => {
    if (!equipmentTypes.length) {
      fetchEquipmentData(currentPagePosition);
    }
    setTotalPages(Math.ceil(equipmentTypes.length / recordsPerPage));
  }, []);

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
    setCurrentPagePosition(1);
  }, [searchValue]);

  const selectedEquipments = getSelectedChildren();
  const selectedGroupIds = getSelectedParents().map((parent) => parent._id);

  const onSearchInputChange = (input) => {
    setSearchValue(input);
  };

  const handleDataRefresh = () => {
    fetchEquipmentData();
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
      fetchEquipmentData(currentPage);
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
    fetchEquipmentData(currentPage);
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
      removeEquipmentGroup({ ids: selectedGroupIds })
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
    fetchEquipmentData(currentPagePosition);
  };

  const fetchEquipmentData = (pagePosition) => {
    const currentPosition = pagePosition || 1;
    setCurrentPagePosition(currentPosition);
    setFetchingData(true);
    getEquipmentTypes(searchValue, recordsPerPage, currentPosition)
      .then((equipmentTypesInfo) => {
        const { data = [], pages = 0 } = equipmentTypesInfo;

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
          setPreviousDisabled(false);
        } else {
          setNextDisabled(true);
          setPreviousDisabled(true);
        }
        setEquipmentTypes(data);
        data.length === 0 ? setTotalPages(1) : setTotalPages(pages);
      })
      .catch((error) => {
        handleUnauthorizedError(error.response.status, setEquipmentTypes);
        setPageSettingState({ ...pageSettingState, isDisabled: true });

        setTotalPages(1);
        setPreviousDisabled(true);
        setNextDisabled(true);
      });

    getEquipment()
      .then((data) => {
        setEquipment(data);
      })
      .catch(() => {})
      .finally((_) => {
        setFetchingData(false);
      });
  };

  const renderEquipmentFn = (equipmentType) => {
    const { equipments } = equipmentType || [];

    const viewItem = {
      equipments,
      _id: equipmentType._id,
      name: equipmentType.name,
      suppliers: equipmentType.suppliers,
      description: equipmentType.description,
      quantity: equipmentType.equipments.length,
      nextAvailable: new Date(2020, 12, 12),
    };

    const isParentChecked = isParentInState(equipmentType._id, "checked");
    const isParentIndeterminate = isParentInState(
      equipmentType._id,
      "indeterminate"
    );

    return (
      <CollapsibleListItem
        hasCheckBox={true}
        isChecked={isParentChecked}
        isIndeterminate={isParentIndeterminate}
        onCheckBoxPress={() => onPressParent(equipmentType._id)}
        onItemPress={() => gotoGroupDetails(equipmentType)}
        collapsed={!expandedItems.includes(equipmentType.name)}
        onCollapsedEnd={() => onCollapseView(equipmentType.name)}
        render={(collapse, isCollapsed) =>
          equipmentGroupView(viewItem, collapse, isCollapsed)
        }
      >
        <FlatList
          data={equipments}
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
          renderItem={({ item: equipment }) => {
            const evalRecentAssignment = (assignments) => {
              let assignmentName = null;
              let status = null;
              let mostRecent = null;

              for (const assignment of assignments) {
                if (assignment.type !== "location") {
                  if (
                    !mostRecent ||
                    moment(assignment.startTime).isAfter(mostRecent)
                  ) {
                    mostRecent = moment(assignment.startTime);

                    assignmentName = assignment.referenceName;

                    const futureTime = mostRecent
                      .clone()
                      .add(assignment.duration || 0, "hours");
                    status = moment().isBetween(mostRecent, futureTime)
                      ? "Unavailable"
                      : "Available";
                  }
                }
              }

              return { assignmentName, status };
            };

            const { assignmentName: assignment, status } = evalRecentAssignment(
              equipment.assignments
            );
            const { _id, name: equipmentName, description } = equipment;

            const equipmentItem = {
              ...equipment,
              _id,
              equipmentName,
              description,
              quantity: 1,
              group: viewItem,
              assignment: assignment || "Unassigned",
              status: status || "Available",
            };

            const onActionPress = () => console.info("Clicked group");

            return renderItemView(equipmentItem, onActionPress);
          }}
        />
      </CollapsibleListItem>
    );
  };

  const renderItemView = (equipment, onActionPress) => {
    const { group } = equipment;
    const { _id: parentId } = group;

    return (
      <Item
        itemView={equipmentItemView(equipment, onActionPress)}
        hasCheckBox={true}
        isChecked={isChildChecked(parentId, equipment)}
        onCheckBoxPress={() => onPressChild(parentId, equipment)}
        onItemPress={() => handleOnItemPress(equipment, false, group)}
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
        <MultipleShadowsContainer hasShadow={false}>
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
    actionsArray = [];
    const isGroupDeleteDisabled = !numParentsChecked;

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
        touchable={numParentsChecked === 1}
        disabled={numParentsChecked !== 1}
        onPress={numParentsChecked === 1 ? gotoAddEquipment : () => {}}
      />
    );

    equipmentPermissions.delete &&
      actionsArray.push(deleteAction, deleteEquipmentItemAction);
    equipmentPermissions.create &&
      actionsArray.push(createEquipmentType, createEquipment);
    equipmentPermissions.update && actionsArray.push(assignEquipment);
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

  const equipmentToDisplay = [...equipmentTypes];

  const removeEquipmentGroup = (ids) => {
    removeEquipmentTypes(ids)
      .then((_) => {
        openPositiveConfirmation();
        setSelectedEquipments([]);
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
        openPositiveConfirmation();
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

  const openPositiveConfirmation = () => {
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
  };

  return (
    <PageSettingsContext.Provider
      value={{
        pageSettingState,
        setPageSettingState,
      }}
    >
      <NavPage
        changeText={onSearchInputChange}
        currentPage={currentPagePosition}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        grandparentState={grandparentState}
        hasActionButton={
          equipmentPermissions.create || equipmentPermissions.delete
        }
        hasActions={true}
        hasPaginator={true}
        inputText={searchValue}
        isDisabled={isFloatingActionDisabled}
        isFetchingData={isFetchingData}
        isNextDisabled={isNextDisabled}
        isPreviousDisabled={isPreviousDisabled}
        listData={equipmentToDisplay}
        listHeaders={listHeaders}
        listItemFormat={renderEquipmentFn}
        onRefresh={handleDataRefresh}
        onSelectAll={onPressGrandparent}
        placeholderText="Search by Assignment, Status, Parent Name"
        routeName="Equipment"
        toggleActionButton={toggleActionButton}
        totalPages={totalPages}
      />
    </PageSettingsContext.Provider>
  );
};

const mapStateToProps = (state) => ({ equipmentTypes: state.equipmentTypes });

const mapDispatcherToProp = {
  setEquipment,
};

export default connect(
  mapStateToProps,
  mapDispatcherToProp
)(withModal(Equipment));
