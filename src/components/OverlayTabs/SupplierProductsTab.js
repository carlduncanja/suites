import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Table from '../common/Table/Table';
import Search from '../common/Search';
import Item from '../common/Table/Item'; 
import RoundedPaginator from '../common/Paginators/RoundedPaginator';
import FloatingActionButton from '../common/FloatingAction/FloatingActionButton';
import FloatingActionAnnotated from '../common/FloatingAction/FloatingActionAnnotated';
import SuppliersPurchaseOrder from '../Suppliers/SuppliersPurchaseOrder';
import Cart from '../../../assets/svg/cart';
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import CartAction from "../../../assets/svg/actionCart";

import { currencyFormatter } from "../../utils/formatter";
import { withModal } from 'react-native-modalfy';
import {useNextPaginator, usePreviousPaginator, checkboxItemPress, selectAll} from '../../helpers/caseFilesHelpers';
import { getSupplierProducts } from "../../api/network"; 
import _ from "lodash";



const testData = [
    {
        _id : 'PO-0008918',
        name:'Fomalin',
        category:'Solutions',
        sku:'SL-0932',
        cost: 4567.89
    },
    {
        _id : 'PO-0008923',
        name:'Morphine',
        category:'Anesthetic',
        sku:'AN-0932',
        cost: 5056.79
    }
]

const SupplierProductsTab = ({modal, floatingActions, supplierId }) => {

    const [checkBoxList, setCheckBoxList] = useState([])
    const [isFetching, setFetching] = useState(false);
    const [products, setProducts] = useState([])

    const recordsPerPage = 10;
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)
    const [currentPagePosition, setCurrentPagePosition] = useState(1)

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState({});

    const [isFloatingActionDisabled, setFloatingAction] = useState(false)

    const headers = [
        {
            name :"Product",
            alignment : "flex-start"
        },
        {
            name :"Category",
            alignment : "flex-start"
        },
        {
            name :"SKU",
            alignment : "center"
        },
        {
            name :"Price",
            alignment : "flex-end"
        }     
    ]

    useEffect(() => {
        if (!products.length) fetchProducts()
        setTotalPages(Math.ceil(products.length / recordsPerPage))
    }, []);

    useEffect(() => {
       
        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResult([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchProducts, 300);

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]);

    // ############# Event Handlers

    const onSearchChange = (input) =>{
        setSearchValue(input)
    }

    const fetchProducts = () => {
        setFetching(true);
        getSupplierProducts(supplierId, searchValue, recordsPerPage)
            .then(productsData => {
                const { data = [], pages = 0} = productsData
                setProducts(data)
                setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("Failed to get products", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

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
                actions: floatingActions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                },
            })
    }

    const toggleCartActionButton = () =>{
        modal.openModal("ActionContainerModal",
            {
                actions: cartActions(),
                title: "SUPPLIER ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                },
                position : 'left'
            })
    }

    const toggleCheckbox = (item) => () => {
        let updatedCases = [...checkBoxList];

        if (updatedCases.includes(item)) {
            updatedCases = updatedCases.filter(caseItem => caseItem !== item)
        } else {
            updatedCases.push(item);
        }
        setCheckBoxList(updatedCases);
    }
    
    const toggleHeaderCheckbox = () =>{
        const indeterminate = checkBoxList.length >= 0 && checkBoxList.length !== tabDetails.length;
        
        if (indeterminate) {
            const selectedAllIds = [...tabDetails.map( item => item )]
            setCheckBoxList(selectedAllIds)
        } else {
            setCheckBoxList([])
        }
        // checkBoxList.length > 0 ?
        //     setCheckBoxList([])
        //     :
        //     setCheckBoxList(tabDetails)
    }

    const openPurchaseOrder = () =>{
        console.log("Id: ", id)
        modal.openModal('OverlayInfoModal',{ 
            overlayContent : <SuppliersPurchaseOrder 
                details = {[]}  
                tabs = {[supplierId]} 
            />,
        })
    }

    const cartActions = () => {
        const emptyCart = 
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {}}>
                <ActionItem title={"Hold to Empty Cart"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
            </LongPressWithFeedback>;
        const completePO = <ActionItem title={"Complete P.O"} icon={<CartAction/>} onPress={openPurchaseOrder}/>;


        return <ActionContainer
            floatingActions={[
                emptyCart,
                completePO
            ]}
            title={"SUPPLIER ACTIONS"}
        />
    }

    const listItemFormat = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'center'}]}>
            <Text style={styles.itemText}>{item.sku}</Text>
        </View>
        <View style={[styles.item, {alignItems: 'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitCost)}</Text>
        </View>
    </>;

    const renderListFn = (item) =>{ 
        return <Item
            hasCheckBox={true}
            isChecked={checkBoxList.includes(item)}
            onCheckBoxPress={toggleCheckbox(item)}
            onItemPress={()=>{}}
            itemView={listItemFormat(item)}
        />
    }

    return(
        <View style={{flex:1}}>
            <View style={{marginBottom:25}}>
                <Search
                placeholderText = "Search by Product"
                changeText = {onSearchChange}
                inputText = {searchValue}
                />
            </View>
            
            <Table
                data = {products} 
                listItemFormat = {renderListFn}
                headers = {headers}
                isCheckbox = {true}
                toggleHeaderCheckbox = {toggleHeaderCheckbox}
                itemSelected = {checkBoxList}
            />
            <View style={styles.footer}>
                <View>
                    <FloatingActionAnnotated
                        toggleActionButton={toggleCartActionButton} 
                        icon = {Cart}
                        value = {123}
                    />
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingRight:20}}>
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
        </View>
    )
}

SupplierProductsTab.propTypes = {};
SupplierProductsTab.defaultProps = {};

export default withModal(SupplierProductsTab);

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
    footer: {
        flex: 1,
        width:'100%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        // marginBottom: -10,
        right: 0,
        // marginRight: 30,
        // backgroundColor:'red',
        justifyContent:'space-between'
    },
})