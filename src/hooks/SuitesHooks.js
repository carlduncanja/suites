import { React, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Divider } from "../components/common/Divider";
import { useModal } from "react-native-modalfy";
import ConfirmationComponent from "../components/ConfirmationComponent";

export const useSlidePanel = () => {
  const slideAnimateValue = new Animated.Value(0);
  const height = Dimensions.get("window").height;

  animateSlide = () => {
    Animated.timing(slideAnimateValue, {
      toValue: height - 100,
      duration: 800,
      easing: Easing.cubic,
    }).start() && slideAnimateValue.setValue(height - 100);
  };

  return (
    <View style={styles.container}>
      <SlidingUpPanel
        ref={(c) => (this._panel = c)}
        draggableRange={{
          top: props.displayFullCalendar === false ? 0 : 300,
          bottom: props.displayFullCalendar === false ? -300 : 0,
        }}
        showBackdrop={false}
        allowDragging={props.draggable}
        friction={1000}
      >
        <View
          style={styles.panel}
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
        >
          <View style={styles.panelHeader}>
            <View style={{ alignItems: "center", height: 30 }}>
              <Divider
                longPressAction={props.restartDrag}
                backgroundColor="white"
              />
            </View>

            <View style={styles.bottom}>{props.content}</View>
          </View>
        </View>
      </SlidingUpPanel>
    </View>
  );
};

export const useGetCheckboxUtils = (mainList, childrenKey) => {
  const [checkboxState, setCheckboxState] = useState({});

  const numParentsTotal = mainList.length;
  const numParentsChecked = getNumParentsInState(checkboxState, "checked");
  const numParentsIndeterminate = getNumParentsInState(
    checkboxState,
    "indeterminate"
  );
  const numChildrenGlobal = getNumChildrenGlobal(mainList);
  const numChildrenCheckedGlobal = getNumChildrenCheckedGlobal(checkboxState);

  const areAllCheckboxesChecked =
    numParentsTotal + numChildrenGlobal ===
    numParentsChecked + numChildrenCheckedGlobal;
  const areSomeParentsChecked =
    numParentsChecked > 0 && numParentsChecked < numParentsTotal;
  const areSomeParentsIndeterminate =
    numParentsChecked === 0 && numParentsIndeterminate > 0;

  const isCheckboxStateEmpty = Object.keys(checkboxState).length === 0;
  const grandparentState = getGrandparentState();

  function getGrandparentState() {
    if (isCheckboxStateEmpty) return "unchecked";
    if (areAllCheckboxesChecked) return "checked";
    if (areSomeParentsChecked || areSomeParentsIndeterminate)
      return "indeterminate";
    return "unchecked";
  }

  const getNumChildrenTotalLocal = (mainList, parentId) => {
    let children = [];
    mainList.forEach((type) => {
      if (type._id === parentId) children = type[childrenKey];
    });
    return children.length;
  };

  function getNumParentsInState(checkboxState, state) {
    if (isCheckboxStateEmpty) return 0;
    let count = 0;
    for (parent in checkboxState) {
      if (checkboxState[parent].state === state) count++;
    }
    return count;
  }

  function getNumChildrenGlobal(mainList) {
    let count = 0;
    mainList.forEach((group) => {
      count += group[childrenKey].length;
    });
    return count;
  }

  function getNumChildrenCheckedGlobal(checkboxState) {
    if (isCheckboxStateEmpty) return 0;
    let count = 0;
    for (parent in checkboxState) {
      count += checkboxState?.[parent].children?.length;
    }
    return count;
  }

  function getSelectedChildren() {
    if (isCheckboxStateEmpty) return [];
    let selected = [];
    for (parent in checkboxState) {
      selected.push(checkboxState[parent]?.children);
    }
    return selected;
  }

  function getSelectedParents() {
    let selected = [];
    for (parent in checkboxState) {
      if (checkboxState[parent]?.state === "checked") selected.push(parent);
    }
    return selected;
  }

  const updateParentAfterPressChild = (parentId, newState) => {
    const numChildrenTotal = getNumChildrenTotalLocal(mainList, parentId);
    const newChildren = newState[parentId]?.children;

    if (newChildren?.length === 0) {
      newState[parentId].state = "unchecked";
    } else if (newChildren?.length < numChildrenTotal) {
      newState[parentId].state = "indeterminate";
    } else {
      newState[parentId] = {
        ...newState[parentId],
        state: "checked",
      };
    }
  };

  const checkChildAndUpdateParent = (parentId, variant) => {
    const newState = { ...checkboxState };
    if (newState[parentId]?.children) {
      newState[parentId]?.children.push(variant);
    } else {
      newState[parentId] = {
        ...newState[parentId],
        children: [variant],
      };
    }
    updateParentAfterPressChild(parentId, newState);
    setCheckboxState(newState);
  };

  const uncheckChildAndUpdateParent = (parentId, variant) => {
    const newState = { ...checkboxState };
    const newChildren = newState[parentId].children.filter(
      (child) => child._id !== variant._id
    );
    newState[parentId].children = newChildren;
    updateParentAfterPressChild(parentId, newState);

    setCheckboxState(newState);
  };

  const isChildChecked = (parentId, variant) => {
    return checkboxState[parentId]?.children?.some(
      (child) => child._id === variant._id
    );
  };

  const isParentInState = (parentId, state) =>
    checkboxState[parentId]?.state === state;

  const getChildrenVariantsLocal = (mainList, parentId) => {
    let variants = [];
    mainList.forEach((parent) => {
      if (parent._id === parentId) variants = parent[childrenKey];
    });
    return variants;
  };

  const uncheckAllCheckboxesLocal = (parentId) => {
    const newState = { ...checkboxState };
    newState[parentId] = {
      state: "unchecked",
      children: [],
    };
    setCheckboxState(newState);
  };

  const checkAllCheckboxesLocal = (parentId) => {
    const newState = { ...checkboxState };
    newState[parentId] = {
      children: getChildrenVariantsLocal(mainList, parentId),
      state: "checked",
    };
    setCheckboxState(newState);
  };

  const uncheckAllCheckboxesGlobal = (checkboxState) => {
    const newState = { ...checkboxState };
    for (parentId in newState) {
      newState[parentId] = {
        state: "unchecked",
        children: [],
      };
    }
    setCheckboxState(newState);
  };

  const checkAllCheckboxesGlobal = (checkboxState) => {
    let newState = {};
    mainList.forEach((type) => {
      newState[type?._id] = {
        state: "checked",
        children: type?.[childrenKey],
      };
    });
    setCheckboxState(newState);
  };

  const onPressGrandparent = () => {
    if (grandparentState === "checked")
      return uncheckAllCheckboxesGlobal(checkboxState);
    checkAllCheckboxesGlobal(checkboxState);
  };

  const onPressParent = (parentId) => {
    if (isParentInState(parentId, "checked")) {
      uncheckAllCheckboxesLocal(parentId);
    } else {
      checkAllCheckboxesLocal(parentId);
    }
  };

  const onPressChild = (parentId, variant) => {
    if (isChildChecked(parentId, variant)) {
      uncheckChildAndUpdateParent(parentId, variant);
    } else {
      checkChildAndUpdateParent(parentId, variant);
    }
  };

  return {
    getSelectedChildren,
    getSelectedParents,
    grandparentState,
    isChildChecked,
    isParentInState,
    onPressChild,
    onPressGrandparent,
    onPressParent,
    numParentsChecked
  };
};

/**
 * @typedef {Object} useConfirmationCb
 * @property {string} action
 * @property {boolean} isError
 * @property {boolean} isEditUpdate
 * @property {function} onCancel
 * @property {function} onAction
 * @property {string} message
 * @returns {void}
 */

/**
 * Custom hook that returns a callback which is used to render
 * the 'Confirmation' modal
 */
export const useConfirmationModal = () => {
  const modal = useModal();

  /**
   * @type {useConfirmationCb}
   */
  return (
    action,
    isEditUpdate = true,
    isError = false,
    message,
    onAction,
    onCancel
  ) =>
    modal.openModal("ConfirmationModal", {
      content: (
        <ConfirmationComponent
          action={action}
          isEditUpdate={isEditUpdate}
          isError={isError}
          message={message}
          onAction={onAction}
          onCancel={onCancel}
        />
      ),
      onClose: () => {
        modal.closeModals("ConfirmationModal");
      },
    });
};

export const useReportViewModal = () => {
  const modal = useModal();

  return (type, details, reportDetails) => {
    modal.openModal("ReportPreviewModal", {
      content: (
        <ReportPreview
          type={type}
          details={details}
          reportDetails={reportDetails}
        />
      ),
      onClose: () => {
        modal.closeModals("ActionContainerModal"); // To-do: Is this intentional?
      },
    });
  };
};

export const useApplyDiscountModal = () => {
  const modal = useModal();

  return (onCreateDiscount, onCancel, onClose) =>
    modal.openModal("OverlayModal", {
      content: (
        <ApplyDiscountItem
          onCreateDiscount={onCreateDiscount}
          onCancel={onCancel}
        />
      ),
      onClose: onClose,
    });
};

export default useSlidePanel;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  panel: {
    flex: 1,
  },
  panelHeader: {
    flex: 1,
    paddingTop: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottom: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
