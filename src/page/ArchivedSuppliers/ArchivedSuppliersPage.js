import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useModal, withModal } from "react-native-modalfy";
import { connect } from "react-redux";
import RestoreIcon from "../../../assets/svg/RestoreIcon";
import {
    getArchivedSuppliers,
    restoreArchivedSuppliers,
} from "../../api/network";
import ConfirmationComponent from "../../components/ConfirmationComponent";
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import DataItem from "../../components/common/List/DataItem";
import ListItem from "../../components/common/List/ListItem";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import PaginatedSection from "../../components/common/Page/PaginatedSection";
import { checkboxItemPress, selectAll } from "../../helpers/caseFilesHelpers";
import { SetArchivedSuppliers } from "../../redux/actions/archivedSupplierActions";

const ArchiveButton = styled.TouchableOpacity`
    align-items: center;
    border-width: 1px;
    justify-content: center;
    border-color: ${({ theme }) => theme.colors["--accent-line"]};
    background-color: ${({ theme }) => theme.colors["--accent-line"]};
    width: 100px;
    height: 26px;
    border-radius: 6px;
    margin-right: 5px;
`;
const ButtonContainer = styled.View`
    width: 70%;
    height: 100%;
    align-items: flex-end;
`;

const ArchiveButtonText = styled.Text`
    align-items: center;
    color: ${({ theme }) => theme.colors["--default-shade-white"]};
    font: ${({ theme }) => theme.font["--text-sm-regular"]};
`;

function ArchivedSuppliersPage(props) {
    const { archivedSuppliers = [], SetArchivedSuppliers, route } = props;
    const { refreshSuppliers } = route.params;
    const theme = useTheme();
    const modal = useModal();

    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start",
            flex: 2,
        },
        {
            name: "Phone",
            alignment: "center",
            flex: 1,
        },
        {
            name: "Email",
            alignment: "center",
            flex: 2,
        },
    ];

    const [isFetchingData, setFetchingData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);

    const handleDataRefresh = () => {
        fetchArchivedSuppliersData(currentPagePosition);
    };

    const onSearchInputChange = (input) => {
        setSearchValue(input);
    };

    const handleOnItemPress = (item) => {
        props.navigation.navigate("ArchivedSupplier", {
            initial: false,
            supplier: item,
            floatingActions: getFabActions,
        });
    };

    const handleOnSelectAll = () => {
        const updatedSuppliersList = selectAll(
            archivedSuppliers,
            selectedSuppliers
        );
        setSelectedSuppliers(updatedSuppliersList);
    };

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        const updatedSuppliersList = checkboxItemPress(_id, selectedSuppliers);

        setSelectedSuppliers(updatedSuppliersList);
    };

    const cancelClicked = () => {
        modal.closeAllModals("ConfirmationModal");
    };

    const fetchArchivedSuppliersData = () => {
        setFetchingData(true);
        getArchivedSuppliers()
            .then((suppliersInfo) => {
                const { data = [] } = suppliersInfo;
                SetArchivedSuppliers(data);
                return suppliersInfo;
            })
            .catch((error) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={cancelClicked}
                            onAction={ArchiveSupplier} //TO-DO: What should go here?
                            message="Are you sure you want to Archive the supplier(s)"
                            action="Archive"
                        />
                    ),
                });
            })
            .finally((_) => {
                setFetchingData(false);
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

    const renderArchivedSupplierFn = (item) => (
        <ListItem
            isArchive={true}
            hasCheckBox={true}
            isChecked={selectedSuppliers.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={supplierArchivedItem(item)}
        />
    );

    const supplierArchivedItem = (item) => (
        <>
            <RightBorderDataItem
                text={item.name}
                fontStyle="--text-sm-medium"
                flex={2}
            />
            <DataItem
                text={item.phone}
                fontStyle="--text-sm-medium"
                flex={1}
                color="--color-blue-600"
            />
            <DataItem
                text={item.email}
                fontStyle="--text-sm-medium"
                flex={2}
                color="--color-blue-600"
            />
        </>
    );
    const backToSuppliers = () => {
        props.navigation.navigate("Suppliers");
    };

    const onRestoreSuppliers = (isMultiple = false) => {
        modal.closeModals("ActionContainerModal");

        setTimeout(() => {
            modal.openModal("ConfirmationModal", {
                content: (
                    <ConfirmationComponent
                        isError={false}
                        isEditUpdate={true}
                        onCancel={() => modal.closeAllModals()}
                        onAction={() => {
                            modal.closeAllModals();
                            isMultiple
                                ? handleRestoreAllSuppliers()
                                : handleRestoreSuppliers();
                        }}
                        message="Do you want to restore this supplier/s ?" //general message you can send to be displayed
                        action="Yes"
                    />
                ),
            });
        }, 200);
    };

    const handleRestoreAllSuppliers = () => {
        handleRestoreSuppliers([...archivedSuppliers]);
    };

    const handleRestoreSuppliers = (suppliers = selectedSuppliers) => {
        restoreArchivedSuppliers({ ids: [...suppliers] })
            .then((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={false}
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => {
                                modal.closeAllModals();
                                handleDataRefresh();
                            }}
                            action="Yes"
                        />
                    ),
                });
            })
            .catch((_) => {
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}
                            isEditUpdate={false}
                            onCancel={() => modal.closeAllModals()}
                            onAction={() => modal.closeAllModals()}
                        />
                    ),
                });
            })
            .finally((_) => {
                refreshSuppliers();
            });
    };

    const getFabActions = () => {
        const disabled = !!isEmpty(selectedSuppliers);
        const allDisabled = !!isEmpty(archivedSuppliers);

        const restoreSupplier = (
            <ActionItem
                title="Restore Supplier"
                icon={
                    <RestoreIcon
                        strokeColor={
                            disabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--accent-line"]
                        }
                    />
                }
                onPress={() => {
                    onRestoreSuppliers();
                }}
                disabled={disabled}
                touchable={!disabled}
            />
        );
        const restoreAllSuppliers = (
            <ActionItem
                title="Restore All Suppliers"
                icon={
                    <RestoreIcon
                        strokeColor={
                            allDisabled
                                ? theme.colors["--color-gray-600"]
                                : theme.colors["--accent-line"]
                        }
                    />
                }
                onPress={() => {
                    onRestoreSuppliers(true);
                }}
            />
        );

        return (
            <ActionContainer
                floatingActions={[restoreSupplier, restoreAllSuppliers]}
                title="SUPPLIER ACTIONS"
            />
        );
    };
    return (
        <PaginatedSection
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText="Search by Supplier name"
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName="Archived Suppliers"
            listData={archivedSuppliers}
            TopButton={() => {
                return (
                    <ButtonContainer>
                        <ArchiveButton theme={theme} onPress={backToSuppliers}>
                            <ArchiveButtonText>Close Archive</ArchiveButtonText>
                        </ArchiveButton>
                    </ButtonContainer>
                );
            }}
            listHeaders={listHeaders}
            itemsSelected={selectedSuppliers}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderArchivedSupplierFn}
            fetchSectionDataCb={fetchArchivedSuppliersData}
            currentPage={currentPagePosition}
            setCurrentPage={setCurrentPagePosition}
            isDisabled={isFloatingActionDisabled}
            toggleActionButton={toggleActionButton}
            hasPaginator={true}
            hasActionButton={true}
            hasActions={true}
        />
    );
}

const mapStateToProps = (state) => ({
    archivedSuppliers: state.archivedSuppliers,
});

const mapDispatcherToProp = {
    SetArchivedSuppliers,
};

export default connect(
    mapStateToProps,
    mapDispatcherToProp
)(withModal(ArchivedSuppliersPage));
