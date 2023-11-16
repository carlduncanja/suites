import React, { useState } from "react";
import { View } from "react-native";

import { connect } from "react-redux";
import _, { isEmpty } from "lodash";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { withModal, useModal } from "react-native-modalfy";
import ListItem from "../components/common/List/ListItem";
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import ConfirmationComponent from "../components/ConfirmationComponent";
import ArchiveIcon from "../../assets/svg/archiveIcon";
import AddIcon from "../../assets/svg/addIcon";
import RightBorderDataItem from "../components/common/List/RightBorderDataItem";
import DataItem from "../components/common/List/DataItem";

import {
    checkboxItemPress,
    selectAll,
    handleUnauthorizedError,
} from "../helpers/caseFilesHelpers";

import { setSuppliers } from "../redux/actions/suppliersActions";
import {
    getSuppliers,
    archiveSuppliers,
    deleteSuppliersId,
} from "../api/network";

import CreateSupplierDialogContainer from "../components/Suppliers/CreateSupplierDialogContainer";
import TouchableDataItem from "../components/common/List/TouchableDataItem";

import { PageSettingsContext } from "../contexts/PageSettingsContext";
import WasteIcon from "../../assets/svg/wasteIcon";
import { LONG_PRESS_TIMER } from "../const";
import PaginatedSection from "../components/common/Page/PaginatedSection";

const ArchiveButton = styled.TouchableOpacity`
    align-items: center;
    border-width: 1px;
    margin-right: 5px;
    justify-content: center;
    border-color: ${({ theme }) => theme.colors["--color-gray-500"]};
    width: 100px;
    height: 30px;
    border-radius: 6px;
`;

const ButtonContainer = styled.View`
    width: 85%;
    height: 100%;
    align-items: flex-end;
`;
const ArchiveButtonText = styled.Text`
    align-items: center;
    color: #a0aec0;
`;

const Suppliers = (props) => {
    const theme = useTheme();
    const suppplierPermissions = props.route.params.suppplierPermissions;

    const recordsPerPage = 12;
    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start",
            flex: 2,
        },
        {
            name: "Phone",
            alignment: "flex-start",
            flex: 1,
        },
        {
            name: "Email",
            alignment: "flex-start",
            flex: 2,
        },
    ];

    const { suppliers = [], setSuppliers } = props;
    const modal = useModal();

    const [isFloatingActionDisabled, setFloatingAction] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [pageSettingState, setPageSettingState] = useState({});

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleDataRefresh = () => {
        fetchSuppliersData();
    };

    const handleOnSelectAll = () => {
        const updatedSuppliersList = selectAll(suppliers, selectedSuppliers);
        setSelectedSuppliers(updatedSuppliersList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedSuppliersList = checkboxItemPress(_id, selectedSuppliers);

        setSelectedSuppliers(updatedSuppliersList);
    };

    const handleOnItemPress = (item, isOpenEditable) => {
        props.navigation.navigate("SupplierPage", {
            initial: false,
            supplier: item,
            isEdit: isOpenEditable,
            floatingActions: getFabActions,
            handleDataRefresh: () => handleDataRefresh(),
        });
    };

    const toggleActionButton = () => {
        setFloatingAction(true);
        modal.openModal("ActionContainerModal", {
            actions: getFabActions(),
            title: "SUPPLIER ACTIONS",
            onClose: () => {
                setFloatingAction(false);
            },
        });
    };

    const fetchSuppliersData = async (currentPage) => {
        return getSuppliers(searchValue, recordsPerPage, currentPage)
            .then((suppliersInfo) => {
                const { data = [] } = suppliersInfo;
                setSuppliers(data);
                return suppliersInfo;
            })
            .catch((error) => {
                handleUnauthorizedError(error?.response?.status, setSuppliers);
                setPageSettingState({ ...pageSettingState, isDisabled: true });
                throw error;
            });
    };

    const renderSupplierFn = (item) => (
        <ListItem
            hasCheckBox={true}
            isChecked={selectedSuppliers.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={supplierItem(item)}
        />
    );

    const supplierItem = (item) => (
        <>
            <RightBorderDataItem
                text={item.name}
                flex={2}
                color="--color-gray-800"
            />
            <DataItem text={item.phone} onPress={() => {}} isPhone={true} />
            <TouchableDataItem
                text={item.email}
                onPress={() => {}}
                flex={2}
                isEmail={true}
            />
        </>
    );

    const cancelClicked = () => {
        modal.closeAllModals("ConfirmationModal");
    };

    const toggleConfirmArchive = () => {
        !isEmpty(selectedSuppliers)
            ? modal.openModal("ConfirmationModal", {
                  content: (
                      <ConfirmationComponent
                          isError={true} //boolean to show whether an error icon or success icon
                          isEditUpdate={true} //use this specification to either get the confirm an edit or update
                          onCancel={cancelClicked}
                          onAction={archiveSupplierClick}
                          message="Are you sure you want to Archive the supplier(s)" //general message you can send to be displayed
                          action="Archive"
                      />
                  ),
              })
            : modal.openModal("ConfirmationModal", {
                  content: (
                      <ConfirmationComponent
                          isError={true} //boolean to show whether an error icon or success icon
                          isEditUpdate={false} //use this specification to either get the confirm an edit or update
                          onCancel={cancelClicked}
                          onAction={archiveSupplierClick}
                          message="Please choose a supplier " //general message you can send to be displayed
                          action="Archive"
                      />
                  ),
              });
    };

    const archiveSupplierClick = () => {
        const selected = { ids: [...selectedSuppliers] };
        modal.closeAllModals("ConfirmationModal");

        console.log("Archive suppliers: ", selected);

        archiveSuppliers(selected)
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false} //boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                handleDataRefresh();
                                setTimeout(() => {
                                    goToArchives();
                                }, 200);
                            }}
                        />
                    ),
                });
            })
            .catch((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true} //boolean to show whether an error icon or success icon
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => modal.closeAllModals()}
                        />
                    ),
                });
            });
    };

    const handleRemoveSupplier = () => {
        openDeletionConfirm({ ids: [...selectedSuppliers] });
    };

    const removeSuppliersCall = (data) => {
        deleteSuppliersId(data)
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
                                    handleDataRefresh();
                                }, 200);
                            }}
                        />
                    ),
                    onClose: () => {
                        modal.closeModals("ConfirmationModal");
                    },
                });

                setSelectedSuppliers([]);
            })
            .catch((error) => {
                openErrorConfirmation();
                setTimeout(() => {
                    modal.closeModals("ActionContainerModal");
                }, 200);
                console.log("Failed to remove suppliers: ", error);
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
                        removeSuppliersCall(data);
                    }}
                    // onAction = { () => confirmAction()}
                    message="Do you want to delete these item(s)?"
                />
            ),
            onClose: () => {
                modal.closeModals("ConfirmationModal");
            },
        });
    };

    const getFabActions = () => {
        const actionArray = [];
        const archiveCase = (
            <ActionItem
                title="Archive Supplier"
                touchable={!isEmpty(selectedSuppliers)}
                disabled={!!isEmpty(selectedSuppliers)}
                icon={
                    !isEmpty(selectedSuppliers) ? (
                        <ArchiveIcon />
                    ) : (
                        <ArchiveIcon strokeColor="#A0AEC0" />
                    )
                }
                onPress={
                    !isEmpty(selectedSuppliers)
                        ? toggleConfirmArchive
                        : () => {}
                }
            />
        );
        const createNewSupplier = (
            <ActionItem
                title="Add Supplier"
                icon={<AddIcon />}
                onPress={onOpenCreateSupplier}
            />
        );
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
                    isDisabled={!!isEmpty(selectedSuppliers)}
                    onLongPress={handleRemoveSupplier}
                >
                    <ActionItem
                        title="Hold to Delete Supplier"
                        icon={
                            <WasteIcon
                                strokeColor={
                                    !!isEmpty(selectedSuppliers)
                                        ? theme.colors["--color-gray-600"]
                                        : theme.colors["--color-red-700"]
                                }
                            />
                        }
                        touchable={false}
                        disabled={!!isEmpty(selectedSuppliers)}
                    />
                </LongPressWithFeedback>
            </View>
        );

        suppplierPermissions.create && actionArray.push(createNewSupplier);
        suppplierPermissions.delete &&
            actionArray.push(archiveCase, deleteAction);

        return (
            <ActionContainer
                floatingActions={actionArray}
                title="SUPPLIER ACTIONS"
            />
        );
    };

    const goToArchives = () => {
        props.navigation.navigate("ArchivedSuppliers", {
            refreshSuppliers: handleDataRefresh,
        });
    };

    const onOpenCreateSupplier = () => {
        modal.closeModals("ActionContainerModal");
        setTimeout(() => {
            modal.openModal("OverlayModal", {
                content: (
                    <CreateSupplierDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={(item) => handleOnItemPress(item, true)}
                        onUpdate={() => handleDataRefresh()}
                    />
                ),
                onClose: () => setFloatingAction(false),
            });
        }, 200);
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
                inputText={searchValue}
                itemsSelected={selectedSuppliers}
                listData={suppliers}
                listHeaders={listHeaders}
                listItemFormat={renderSupplierFn}
                onRefresh={handleDataRefresh}
                onSelectAll={handleOnSelectAll}
                placeholderText="Search by Supplxier"
                routeName="Suppliers"
                TopButton={() => (
                    <ButtonContainer>
                        <ArchiveButton onPress={goToArchives} theme={theme}>
                            <ArchiveButtonText>View Archive</ArchiveButtonText>
                        </ArchiveButton>
                    </ButtonContainer>
                )}
                fetchSectionDataCb={fetchSuppliersData}
                hasActionButton={
                    suppplierPermissions.create || suppplierPermissions.delete
                }
                hasActions={true}
                hasPaginator={true}
                isDisabled={isFloatingActionDisabled}
                toggleActionButton={toggleActionButton}
            />
        </PageSettingsContext.Provider>
    );
};

const mapStateToProps = (state) => ({ suppliers: state.suppliers });

const mapDispatcherToProp = { setSuppliers };

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(Suppliers));
