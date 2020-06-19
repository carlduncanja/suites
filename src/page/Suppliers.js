import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";

import Page from '../components/common/Page/Page';
import ListItem from '../components/common/List/ListItem';
import RoundedPaginator from '../components/common/Paginators/RoundedPaginator';
import FloatingActionButton from '../components/common/FloatingAction/FloatingActionButton';
import LongPressWithFeedback from "../components/common/LongPressWithFeedback";
import ActionContainer from "../components/common/FloatingAction/ActionContainer";
import ActionItem from "../components/common/ActionItem";

import ArchiveIcon from "../../assets/svg/archiveIcon";
import AddIcon from "../../assets/svg/addIcon";

import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../helpers/caseFilesHelpers';

import {connect} from 'react-redux';
import {setSuppliers} from "../redux/actions/suppliersActions";
import {getSuppliers} from "../api/network";
import _ from "lodash";

import {withModal, useModal} from 'react-native-modalfy';
import suppliersTest from '../../data/Suppliers'
import SuppliersBottomSheet from '../components/Suppliers/SuppliersBottomSheet';

const Suppliers = (props) => {

    // ############# Const data
    const recordsPerPage = 15;
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
    const {suppliers = [], setSuppliers} = props;
    const modal = useModal();

    //  ############ State
    const [isFetchingData, setFetchingData] = useState(false);
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [selectedSuppliers, setSelectedSuppliers] = useState([])

    // ############# Lifecycle methods

    useEffect(() => {
        if (!suppliers.length) fetchSuppliersData()
        setTotalPages(Math.ceil(suppliers.length / recordsPerPage))
    }, []);

    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
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
    }, [searchValue]);

    // ############# Event Handlers

    const onSearchInputChange = (input) =>{
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
        const {_id} = item;
        let updatedSuppliersList = checkboxItemPress(item, _id, selectedSuppliers)
        
        setSelectedSuppliers(updatedSuppliersList)
    }

    const handleOnItemPress = (item, isOpenEditable) =>{
        modal.openModal('BottomSheetModal',{
            content: <SuppliersBottomSheet 
                supplier = {item} 
                isOpenEditable = {isOpenEditable}
                floatingActions = {getFabActions}
            />
        })
    }

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
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

    const fetchSuppliersData = () => {
        setFetchingData(true)
        getSuppliers(searchValue,recordsPerPage)
            .then(suppliersInfo => {
                const {data = [], pages = 0} = suppliersInfo
                // setSuppliers([])
                setSuppliers(data);
                setTotalPages(Math.ceil(data.length / recordsPerPage))

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
                <View style={[styles.item,{...styles.rowBorderRight, flex: 2}]}>
                    <Text style={[styles.itemText, {color:"#323843"}]}>{item.name}</Text>
                </View>
                <View style={[styles.item, {flex: 1, alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.phone}</Text>
                </View>
                <View style={[styles.item, {flex: 2, alignItems: 'center'}]}>
                    <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.email}</Text>
                </View>
            </>
        )

    }

    const getFabActions = () => {

        const archiveCase = <ActionItem title={"Archive Supplier"} icon={<ArchiveIcon/>} onPress={()=>{}}/>;
        const createNewSupplier = <ActionItem title={"Add Supplier"} icon={<AddIcon/>}onPress={onOpenCreateSupplier}/>;


        return <ActionContainer
            floatingActions={[
                archiveCase,
                createNewSupplier
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    };

    const onOpenCreateSupplier = () =>{
        console.log("Add Supplier")
    }

    // ############# Prepare list data

    let suppliersToDisplay = [...suppliers];
    suppliersToDisplay = suppliersToDisplay.slice(currentPageListMin, currentPageListMax);


    return (
        <View style={{flex: 1}}>
            <Page
                isFetchingData={isFetchingData}
                onRefresh={handleDataRefresh}
                placeholderText={"Search by Supplier"}
                changeText={onSearchInputChange}
                inputText={searchValue}
                routeName={"Suppliers"}
                listData={suppliersToDisplay}

                listHeaders={listHeaders}
                itemsSelected={selectedSuppliers}
                onSelectAll={handleOnSelectAll}

                listItemFormat={renderSupplierFn}
            />

            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>

                <FloatingActionButton
                    isDisabled={isFloatingActionDisabled}
                    toggleActionButton={toggleActionButton}
                />
            </View>

        </View>
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
        marginRight: 20,
    }
})
