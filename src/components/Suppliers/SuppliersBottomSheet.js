import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';
import SupplierProductsTab from '../OverlayTabs/SupplierProductsTab';
import SupplierPurshaseOrders from '../OverlayTabs/SupplierPurchaseOrders';
import BottomSheetContainer from '../common/BottomSheetContainer';

  
import { getSupplierById, createPurchaseOrder, getSupplierProducts } from "../../api/network"; 
import {colors} from "../../styles";


function SuppliersBottomSheet({supplier = {}, isOpenEditable, floatingActions}) {
    
    const currentTabs = ["Details", "Products", "Purchase Orders"];
    const {
        supplierNumber = "",
        name = "",
       _id = "",
    } = supplier;

    // ##### States

    const [currentTab, setCurrentTab] = useState(currentTabs[0]);
    const [isEditMode, setEditMode] = useState(isOpenEditable);
    const [editableTab, setEditableTab] = useState(currentTab)
    const [isFetching, setFetching] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState({})
    // const [cartOrderItems, setCartOrderItems] = useState([])
    const [products, setProducts] = useState([])

    const [fields, setFields] = useState({})
    const [popoverList, setPopoverList] = useState([])

    // ##### Lifecycle Methods
    useEffect(() => {
        setTimeout(()=>{},200)
        // fetchSupplier(_id)
    }, []);

    useEffect(() => {
        if (!products.length) fetchProducts()
        // setTotalPages(Math.ceil(products.length / recordsPerPage))
    }, []);

    // ##### Event Handlers

    const fetchProducts = () => {
        setFetching(true);
        getSupplierProducts(_id, "")
            .then(productsData => {
                const { data = [], pages = 0} = productsData
                setProducts(data)
                // setTotalPages(Math.ceil(data.length / recordsPerPage))
            })
            .catch(error => {
                console.log("Failed to get products", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    const onTabPress = (selectedTab) => {
        if (!isEditMode) setCurrentTab(selectedTab);
    };

    const onEditPress = (tab) => {
        setEditableTab(tab)
        setEditMode(!isEditMode)
        if(!isEditMode === false){
            console.log("Fields:", fields)
            
            // updatePhysicianFn(_id, fieldsObject)
        }
    }

    const onFieldChange = (fieldName) => (value) => {
        setFields({
            ...fields,
            [fieldName]: value
        })
    };

    const handlePopovers = (popoverValue) => (popoverItem) =>{
        
        if(!popoverItem){
            let updatedPopovers = popoverList.map( item => {return {
                ...item,
                status : false
            }})
            
            setPopoverList(updatedPopovers)
        }else{
            const objIndex = popoverList.findIndex(obj => obj.name === popoverItem);
            const updatedObj = { ...popoverList[objIndex], status: popoverValue};
            const updatedPopovers = [
                ...popoverList.slice(0, objIndex),
                updatedObj,
                ...popoverList.slice(objIndex + 1),
            ]; 
            setPopoverList(updatedPopovers)
        }
    
    }

    const onAddProducts = (item) =>{
        console.log("DATA: ", )
        const newItem = {
            ...item,
            unitCost: item.unitPrice
        }
        setProducts([...products,newItem])
        
    }

    // ##### Helper functions

    const fetchSupplier = (id) => {
        setFetching(true);
        getSupplierById(id)
            .then(data => {
                setSelectedSupplier(data)
            })
            .catch(error => {
                console.log("Failed to get supplier", error)
                //TODO handle error cases.
            })
            .finally(_ => {
                setFetching(false)
            })
    };

    // const updateCartItems = (data) => {
    //     setCartOrderItems(data)
    //     //console.log("Cart: ", data)
    // }

    // const onOrderComplete = (data) =>{
    //     const { name = "", storageLocation = {} } = data
    //     const updatedOrders = cartOrderItems.map(item => {return { amount: item.amount, productId : item._id}})
    //     let newPO = {
    //         name : name,
    //         storageLocation : storageLocation._id,
    //         supplier : _id,
    //         orders : updatedOrders,
    //         orderDate : new Date()
    //     }
    //     createPurchaseOrder(newPO)
    //         .then(data => {
    //             console.log("DB data: ", data)
    //         })
    //         .catch(error => {
    //             console.log("Failed to create PO", error)
    //             //TODO handle error cases.
    //         })
    //     // console.log("Purchase Order: ", newPO)
    //     // console.log("Cart Items: ", cartOrderItems)
    // }

    const supplierDetails = {supplier, status : ''}

    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierDetailsTab order = {supplierDetails}/>
            case "Products":
                return <SupplierProductsTab
                    floatingActions = {floatingActions}
                    products = {products}
                    onAddProducts = {onAddProducts}
                    // updateCartItems = {updateCartItems}
                    // cartOrderItems = {cartOrderItems}
                    // onOrderComplete = {onOrderComplete}
                    supplierId = {_id}
                />
            case "Purchase Orders":
                return <SupplierPurshaseOrders
                    floatingActions = {floatingActions}
                />;
            default :
                return <View/>
        }
    };

    return (

        <BottomSheetContainer
            isFetching = {isFetching}
            overlayId={supplierNumber}
            overlayTitle={name}
            onTabPressChange={onTabPress}
            currentTabs={currentTabs}
            selectedTab={currentTab}
            isEditMode={isEditMode}
            onEditPress = {onEditPress}
            overlayContent={getTabContent(currentTab)}
        />

        // <View style={{flex: 1}}>
        //     {
        //         isFetching
        //             ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
        //                 <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
        //             </View>
        //             :
                   
        //             // console.log("Selected: ", selectedProcedure)
        //             <SlideOverlay
        //                 overlayId={supplierNumber}
        //                 overlayTitle={name}
        //                 onTabPressChange={onTabPress}
        //                 currentTabs={currentTabs}
        //                 selectedTab={currentTab}
        //                 isEditMode={isEditMode}
        //                 onEditPress = {onEditPress}
        //                 overlayContent={
        //                     <View 
        //                         style={{flex: 1, padding:30, paddingBottom:20}}
        //                         // onPress = {()=>{console.log("Touched"); handlePopovers(false)()}}
        //                     >
        //                         {getTabContent(currentTab)}
        //                     </View>
        //                 }
        //             />
        //     }
        // </View>
    );
}

SuppliersBottomSheet.propTypes = {};
SuppliersBottomSheet.defaultProps = {};

export default  SuppliersBottomSheet;

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})
