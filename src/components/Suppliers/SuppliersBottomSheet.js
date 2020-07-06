import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, TouchableOpacity} from "react-native";
import SlideOverlay from "../common/SlideOverlay/SlideOverlay";
import SupplierDetailsTab from '../OverlayTabs/SupplierDetailsTab';
import SupplierProductsTab from '../OverlayTabs/SupplierProductsTab';
import SupplierPurshaseOrders from '../OverlayTabs/SupplierPurchaseOrders';
  
import { getSupplierById } from "../../api/network"; 
import {colors} from "../../styles";

function SuppliersBottomSheet({supplier = {}, isOpenEditable, floatingActions}) {
    
    const currentTabs = ["Details", "Products", "Purchase Orders"];
    console.log("Procedure:", supplier)
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

    const [fields, setFields] = useState({})

    const [popoverList, setPopoverList] = useState([])

    // ##### Lifecycle Methods
    useEffect(() => {
        // fetchSupplier(_id)
    }, []);

    // ##### Event Handlers

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

    const supplierDetails = {supplier, status : ''}
    const getTabContent = (selectedTab) => {
        switch (selectedTab) {
            case "Details":
                return <SupplierDetailsTab order = {supplierDetails}/>
            case "Products":
                return <SupplierProductsTab
                    floatingActions = {floatingActions}
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
        <View style={{flex: 1}}>
            {
                isFetching
                    ? <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                    </View>
                    :
                   
                    // console.log("Selected: ", selectedProcedure)
                    <SlideOverlay
                        overlayId={supplierNumber}
                        overlayTitle={name}
                        onTabPressChange={onTabPress}
                        currentTabs={currentTabs}
                        selectedTab={currentTab}
                        isEditMode={isEditMode}
                        onEditPress = {onEditPress}
                        overlayContent={
                            <View 
                                style={{flex: 1, padding:30, paddingBottom:20}}
                                // onPress = {()=>{console.log("Touched"); handlePopovers(false)()}}
                            >
                                {getTabContent(currentTab)}
                            </View>
                        }
                    />
            }
        </View>
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
