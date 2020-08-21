import React, { Component, useState } from 'react';
import { useTheme } from 'emotion-theming';
import RestoreIcon from "../../assets/svg/RestoreIcon";
import styled, { css } from '@emotion/native';
import NavPage from '../components/common/Page/NavPage';
import { Text } from 'react-native';
import { withModal, useModal } from 'react-native-modalfy';
import ActionItem from "../components/common/ActionItem";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from "../helpers/caseFilesHelpers";


const ArchiveButton = styled.TouchableOpacity`
align-items:center;
border-width:1px;
justify-content:center;
border-color:${({ theme }) => theme.colors["--accent-line"]};
background-color:${({ theme }) => theme.colors["--accent-line"]};
width:100px;
height:26px;
border-radius:6px;
margin-left:380px;


`

function ArchivedSuppliersPage(props) {
    const { suppliers = [], setSuppliers } = props;
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

    const recordsPerPage = 5;

    const [isFetchingData, setFetchingData] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedSuppliers, setSelectedSuppliers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false);



    const handleDataRefresh = () => {
        console.log("Data being refreshed");
    };
    const onSearchInputChange = (input) => {
        setSearchValue(input)
    }


    const handleOnSelectAll = () => {
        let updatedSuppliersList = selectAll(suppliers, selectedSuppliers)
        setSelectedSuppliers(updatedSuppliersList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedSuppliersList = checkboxItemPress(item, _id, selectedSuppliers)

        setSelectedSuppliers(updatedSuppliersList)
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let { currentPage, currentListMin, currentListMax } = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
            fetchSuppliersData(currentPage)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let { currentPage, currentListMin, currentListMax } = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
        fetchSuppliersData(currentPage)

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
                <View style={[styles.item, { ...styles.rowBorderRight, flex: 2 }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#323843" }]}>{item.name}</Text>
                </View>
                <View style={[styles.item, { flex: 1, alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#3182CE" }]}>{item.phone}</Text>
                </View>
                <View style={[styles.item, { flex: 2, alignItems: 'center' }]}>
                    <Text numberOfLines={1} style={[styles.itemText, { color: "#3182CE" }]}>{item.email}</Text>
                </View>
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

    return (
        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Supplier name"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Archived Suppliers"}
            listData={[]}
            TopButton={() => {
                return (<ArchiveButton theme={theme} onPress={backToSuppliers}>
                    <Text style={{ alignItems: "center", color: "white", fontSize: 14 }}>Close Archive</Text>
                </ArchiveButton>)
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

export default withModal(ArchivedSuppliersPage);