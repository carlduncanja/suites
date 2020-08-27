import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";
import Footer from "../components/common/Page/Footer";
import NavPage from '../components/common/Page/NavPage';
import ConfirmationComponent from "../components/ConfirmationComponent";
import ArchiveIcon from "../../assets/svg/archiveIcon";
import AddIcon from "../../assets/svg/addIcon";
import RightBorderDataItem from '../components/common/List/RightBorderDataItem';
import DataItem from '../components/common/List/DataItem';

import { useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll } from '../helpers/caseFilesHelpers';

import { connect } from 'react-redux';
import { setSuppliers } from "../redux/actions/suppliersActions";
import { getSuppliers, archiveSupplier } from "../api/network";
import _, { isEmpty } from "lodash";
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';

import { withModal, useModal } from 'react-native-modalfy';
import suppliersTest from '../../data/Suppliers'
import SuppliersBottomSheet from '../components/Suppliers/SupplierPage';
import CreateSupplierDialogContainer from '../components/Suppliers/CreateSupplierDialogContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/common/OverlayButtons/OverlayButton';
import TouchableDataItem from '../components/common/List/TouchableDataItem';


const ArchiveButton = styled.TouchableOpacity`
    align-items:center;
    border-width:1px;
    margin-right:5px;
    justify-content:center;
    border-color: ${ ({ theme }) => theme.colors['--color-gray-500']};
    width:100px;
    height:30px;
    border-radius:6px;
`;

const ButtonContainer = styled.View`
    width:85%;
    height:100%;
    align-items:flex-end;
`;
const ArchiveButtonText = styled.Text`
align-items: center; 
color: #A0AEC0
`

const Suppliers = (props) => {
    const theme = useTheme();

    // ############# Const data
    const recordsPerPage = 10;
    const listHeaders = [
        {
            name: "Name",
            alignment: "flex-start",
            flex: 2
        },
        {
            name: "Phone",
            alignment: "flex-start",
            flex: 1
        },
        {
            name: "Email",
            alignment: "flex-start",
            flex: 2
        }
    ];

    //  ############ Props
    const { suppliers = [], setSuppliers } = props;
    const modal = useModal();

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [isNextDisabled, setNextDisabled] = useState(false);
    const [isPreviousDisabled, setPreviousDisabled] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedSuppliers, setSelectedSuppliers] = useState([]);

    // ############# Lifecycle methods

    useEffect(() => {
        if (!suppliers.length) fetchSuppliersData(currentPagePosition)
        setTotalPages(Math.ceil(suppliers.length / recordsPerPage))
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            fetchSuppliersData(1)
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchSuppliersData, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
        setCurrentPagePosition(1)
    }, [searchValue]);

    // ############# Event Handlers

    const onSearchInputChange = (input) => {
        setSearchValue(input)
    }

    const handleDataRefresh = () => {
        fetchSuppliersData()
    };

    const handleOnSelectAll = () => {
        let updatedSuppliersList = selectAll(suppliers, selectedSuppliers)
        setSelectedSuppliers(updatedSuppliersList)
    }

    const handleOnCheckBoxPress = (item) => () => {
        const { _id } = item;
        let updatedSuppliersList = checkboxItemPress(item, _id, selectedSuppliers)

        setSelectedSuppliers(updatedSuppliersList)
    }

    const handleOnItemPress = (item, isOpenEditable) => {

        props.navigation.navigate("SupplierPage", { initial: false, supplier: item, isEdit: isOpenEditable, floatingActions: getFabActions });
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

    // ############# Helper functions

    const fetchSuppliersData = (pagePosition) => {

        let currentPosition = pagePosition ? pagePosition : 1;
        setCurrentPagePosition(currentPosition)

        setFetchingData(true)
        getSuppliers(searchValue, recordsPerPage, currentPosition)
            .then(suppliersInfo => {
                const { data = [], pages = 0 } = suppliersInfo

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
                    setPreviousDisabled(false)
                } else {
                    setNextDisabled(true);
                    setPreviousDisabled(true);
                }

                setSuppliers(data);
                data.length === 0 ? setTotalPages(0) : setTotalPages(pages)

            })
            .catch(error => {
                console.log("failed to get suppliers", error);
            })
            .finally(_ => {
                setFetchingData(false)
            })
    };

    const renderSupplierFn = (item) => {
        return <ListItem
            hasCheckBox={true}
            isChecked={selectedSuppliers.includes(item._id)}
            onCheckBoxPress={handleOnCheckBoxPress(item)}
            onItemPress={() => handleOnItemPress(item, false)}
            itemView={supplierItem(item)}
        />
    }

    const supplierItem = (item) => {

        return (
            <>
                <RightBorderDataItem
                    text={item.name}
                    flex={2}
                    color="--color-gray-800"
                />
                <TouchableDataItem
                    text={item.phone}
                    onPress={() => { }}
                />
                <TouchableDataItem
                    text={item.email}
                    onPress={() => { }}
                    flex={2}
                />
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

    const cancelClicked = () => {
        modal.closeAllModals("ConfirmationModal");
    }

    const toggleConfirmArchive = () => {
        !isEmpty(selectedSuppliers) ?
            modal.openModal("ConfirmationModal", {
                content: (
                    <ConfirmationComponent
                        isError={true}//boolean to show whether an error icon or success icon
                        isEditUpdate={true}//use this specification to either get the confirm an edit or update
                        onCancel={cancelClicked}
                        onAction={ArchiveSupplier}
                        message="Are you sure you want to Archive the supplier(s)"//general message you can send to be displayed
                        action="Archive"
                    />
                )
            }) : modal.openModal("ConfirmationModal", {
                content: (
                    <ConfirmationComponent
                        isError={true}//boolean to show whether an error icon or success icon
                        isEditUpdate={false}//use this specification to either get the confirm an edit or update
                        onCancel={cancelClicked}
                        onAction={ArchiveSupplier}
                        message="Please choose a supplier "//general message you can send to be displayed
                        action="Archive"
                    />
                )
            })
    }

    const ArchiveSupplier = () => {
        //fetchSuppliersData(currentPagePosition);
        const selected = [...selectedSuppliers];
        modal.closeAllModals("ConfirmationModal");
        selected.map((item, index) => {
            archiveSupplier(item).then(fetchSuppliersData(currentPagePosition))
                .catch(error => {
                    console.log("failed to archive suppliers", error);
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
                }).finally(_ => {
                    setFetchingData(false);
                })
        })


    }

    const getFabActions = () => {

        const archiveCase = <ActionItem title={"Archive Supplier"} icon={<ArchiveIcon />} onPress={toggleConfirmArchive} />;
        const createNewSupplier = <ActionItem title={"Add Supplier"} icon={<AddIcon />} onPress={onOpenCreateSupplier} />;


        return <ActionContainer
            floatingActions={[
                archiveCase,
                createNewSupplier
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    };

    const goToArchives = () => {
        props.navigation.navigate("ArchivedSuppliers");
    }

    const onOpenCreateSupplier = () => {
        modal.closeModals('ActionContainerModal');
        setTimeout(() => {
            modal.openModal('OverlayModal',
                {
                    content: <CreateSupplierDialogContainer
                        onCancel={() => setFloatingAction(false)}
                        onCreated={(item) => handleOnItemPress(item, true)}
                    />,
                    onClose: () => setFloatingAction(false)
                })
        }, 200)
    }

    // ############# Prepare list data

    let suppliersToDisplay = [...suppliers];
    // suppliersToDisplay = suppliersToDisplay.slice(currentPageListMin, currentPageListMax);

    // ##### STYLED COMPONENTS

    const SuppliersWrapper = styled.View`
        height: 100%;
        width: 100%;
        background-color: green;
    `;
    const SuppliersContainer = styled.View`
        display: flex;
        height: 100%;
    `;

    return (

        <NavPage
            isFetchingData={isFetchingData}
            onRefresh={handleDataRefresh}
            placeholderText={"Search by Supplier"}
            changeText={onSearchInputChange}
            inputText={searchValue}
            routeName={"Suppliers"}
            listData={suppliersToDisplay}
            TopButton={() => {
                return (
                    <ButtonContainer>
                        <ArchiveButton onPress={goToArchives} theme={theme}>
                            <ArchiveButtonText >View Archive</ArchiveButtonText>
                        </ArchiveButton>
                    </ButtonContainer>)
            }}

            listHeaders={listHeaders}
            itemsSelected={selectedSuppliers}
            onSelectAll={handleOnSelectAll}
            listItemFormat={renderSupplierFn}
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
    suppliers: state.suppliers
});

const mapDispatcherToProp = {
    setSuppliers
};

export default connect(mapStateToProps, mapDispatcherToProp)(withModal(Suppliers))

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
        borderRightWidth: 1,
        // marginRight: 20,
    }
})
