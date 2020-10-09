import React, { Component, useState, useEffect } from 'react';
import { useTheme } from 'emotion-theming';
import RestoreIcon from "../../../assets/svg/RestoreIcon";
import ListItem from '../../components/common/List/ListItem';
import styled, { css } from '@emotion/native';
import NavPage from '../../components/common/Page/NavPage';
import { Text, View, StyleSheet } from 'react-native';
import { withModal, useModal } from 'react-native-modalfy';
import DataItem from '../../components/common/List/DataItem';
import ActionItem from "../../components/common/ActionItem";
import ActionContainer from "../../components/common/FloatingAction/ActionContainer";
import { SetArchivedSuppliers } from "../../redux/actions/archivedSupplierActions"
import { getArchivedSuppliers } from "../../api/network";
import { formatDate, transformToSentence } from "../../utils/formatter";
import RightBorderDataItem from "../../components/common/List/RightBorderDataItem";
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from "../../helpers/caseFilesHelpers";
import Button from '../../components/common/OverlayButtons/OverlayButton';
import { connect } from 'react-redux';
import ConfirmationComponent from "../../components/ConfirmationComponent";



const ArchiveButton = styled.TouchableOpacity`
align-items:center;
border-width:1px;
justify-content:center;
border-color:${({ theme }) => theme.colors["--accent-line"]};
background-color:${({ theme }) => theme.colors["--accent-line"]};
width:100px;
height:26px;
border-radius:6px;
margin-right:5px;

`;
const ButtonContainer = styled.View`
width:70%;
height:100%;
align-items:flex-end;

`;

const ArchiveButtonText = styled.Text`
align-items: center; 
color:${({ theme }) => theme.colors["--default-shade-white"]}; 
 font:${({ theme }) => theme.font["--text-sm-regular"]}
`


function ArchivedSuppliersPage(props) {
    const { archivedSuppliers = [], SetArchivedSuppliers } = props;
    const theme = useTheme();
    const modal = useModal();

    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start",
            flex: 2
        },
        {
            name: "Phone",
            alignment: "center",
            flex: 1
        },
        {
            name: "Email",
            alignment: "center",
            flex: 2
        }
    ];

    useEffect(() => {
        fetchArchivedSuppliersData(currentPagePosition);
        if (!archivedSuppliers.length) fetchArchivedSuppliersData(currentPagePosition)
        setTotalPages(Math.ceil(archivedSuppliers.length / recordsPerPage))
    }, []);

    const recordsPerPage = 5;

    const [isFetchingData, setFetchingData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(true);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);



    const handleDataRefresh = () => {
        console.log("Data being refreshed");
    };
    const onSearchInputChange = (input) => {
        setSearchValue(input)
    }

    const handleOnItemPress = (item) => {
        props.navigation.navigate("ArchivedSupplier", { initial: false, supplier: item, floatingActions: getFabActions });

    }


    const handleOnSelectAll = () => {
        let updatedSuppliersList = selectAll(archivedSuppliers, selectedSuppliers)
        setSelectedSuppliers(updatedSuppliersList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedSuppliersList = checkboxItemPress(_id, selectedSuppliers)

        setSelectedSuppliers(updatedSuppliersList)
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchArchivedSuppliersData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchArchivedSuppliersData(currentPage)

    };
    const cancelClicked = () => {
        modal.closeAllModals("ConfirmationModal");
    }

    const fetchArchivedSuppliersData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition)

        setFetchingData(true)
        getArchivedSuppliers()
            .then(suppliersInfo => {
                const { data = [] } = suppliersInfo
                console.log("Archived Suppliers received is:", data);
                setTotalPages(1);

                // if (pages === 1) {
                //     setPreviousDisabled(true);
                //     setNextDisabled(true);
                // } else if (currentPosition === 1) {
                //     setPreviousDisabled(true);
                //     setNextDisabled(false);
                // } else if (currentPosition === pages) {
                //     setNextDisabled(true);
                //     setPreviousDisabled(false);
                // } else if (currentPosition < pages) {
                //     setNextDisabled(false);
                //     setPreviousDisabled(false)
                // } else {
                //     setNextDisabled(true);
                //     setPreviousDisabled(true);
                // }

                SetArchivedSuppliers(data);
                //data.length === 0 ? setTotalPages(0) : setTotalPages(pages)

            })
            .catch(error => {
                console.log("failed to get archived Suppliers", error);
                modal.openModal("ConfirmationModal", {
                    content: (
                        <ConfirmationComponent
                            isError={true}//boolean to show whether an error icon or success icon
                            isEditUpdate={false}//use this specification to either get the confirm an edit or update
                            onCancel={cancelClicked}
                            onAction={ArchiveSupplier}
                            message="Are you sure you want to Archive the supplier(s)"//general message you can send to be displayed
                            action="Archive"
                        />
                    )
                })
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };


    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    const renderArchivedSupplierFn = (item) => {
        return <ListItem
            isArchive={true}
            hasCheckBox={true}
            isChecked={selectedSuppliers.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={supplierArchivedItem(item)}
        />
    }


    const supplierArchivedItem = (item) => {

        return (
            <>
                <RightBorderDataItem text={item.name} fontStyle="--text-sm-medium" flex={2} />
                <DataItem text={item.phone} fontStyle="--text-sm-medium" flex={1} color={"--color-blue-600"} />
                <DataItem text={item.email} fontStyle="--text-sm-medium" flex={2} color={"--color-blue-600"} />

                {/* <View style={[styles.item, { ...styles.rowBorderRight, flex: 2 }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#323843" }]}>{item.name}</Text>
                </View>
                <View style={[styles.item, { flex: 1, alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#3182CE" }]}>{item.phone}</Text>
                </View>
                <View style={[styles.item, { flex: 2, alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#3182CE" }]}>{item.email}</Text>
                </View> */}
            </>
        )

    }
    const backToSuppliers = () => {
        props.navigation.navigate("Suppliers");
    }

    const getFabActions = () => {

        const restoreCase = <ActionItem title={"Restore Supplier"} icon={<RestoreIcon />} onPress={() => { }} />;
        const restoreAllCase = <ActionItem title={"Restore All Suppliers"} icon={<RestoreIcon />} onPress={() => { }} />;


        return <ActionContainer
            floatingActions={[
                restoreCase,
                restoreAllCase
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    };
    let suppliersToDisplay = [...archivedSuppliers];

    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Supplier name"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Archived Suppliers"}
            listData={suppliersToDisplay}
            TopButton={() => {
                return (<ButtonContainer><ArchiveButton theme={theme} onPress={backToSuppliers}>
                    <ArchiveButtonText>Close Archive</ArchiveButtonText>
                </ArchiveButton></ButtonContainer>)
            }}
            listHeaders={listHeaders}
            itemsSelected={selectedSuppliers}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderArchivedSupplierFn}
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

    )
}

const mapStateToProps = (state) => ({
    archivedSuppliers: state.archivedSuppliers
});

const mapDispatcherToProp = {
    SetArchivedSuppliers
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(ArchivedSuppliersPage));

const styles = StyleSheet.create({
    item: {
        // flex:1

    },
    itemText: {
        fontSize: 16
    },
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
    rowBorderRight: {
        borderRightColor: "#E3E8EF",
        borderRightWidth: 2,
        // marginRight: 20,
    }
})
