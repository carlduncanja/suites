import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Consumables, Equipment, Invoices, Quotation, Billing, ChargesheetEquipment} from '../../OverlayPages/ChargeSheet';
import BillingCaseCard from '../../Billing/BillingCaseCard'
import {currencyFormatter, formatDate} from '../../../../utils/formatter';
import CaseFiles from '../../../../../data/CaseFiles';
import IconButton from '../../../common/Buttons/IconButton';
import RightArrow from '../../../../../assets/svg/rightArrow';
import LeftArrow from '../../../../../assets/svg/leftArrow';


const invoiceTestData = CaseFiles[0].caseFileDetails.chargeSheet.invoices
const quotationTestData = CaseFiles[0].caseFileDetails.chargeSheet.quotation
const billingTestData = CaseFiles[0].caseFileDetails.chargeSheet.billing


const ChargeSheet = ({chargeSheet = {}, selectedTab, procedures, quotations, invoices,isEditMode, handleEditDone, handleQuotes}) => {

    const LINE_ITEM_TYPES = {
        DISCOUNT: "discount",
        SERVICE: "service",
        PROCEDURES: "procedures",
        PHYSICIANS: "physician",
    }

    let {
        inventoryList = [],
        equipmentList = [],
        proceduresBillableItems = [],
        total,
        caseId
    } = chargeSheet

    inventoryList = inventoryList.map(item => {
        const {inventory} = item
        const {name = "", unitPrice = 0} = inventory
        return {
            ...item,
            name,
            unitPrice,
            type: 'Anaesthesia'
        }
    })
    equipmentList = equipmentList.map(item => {
        const {equipment} = item
        const {type = {}} = equipment
        const {name = "", unitPrice = 0} = equipment
        return {
            ...item,
            type: type.name || "",
            name,
            unitPrice: type.unitPrice || 0
        }
    })

    const headers = [
        {
            name: "Item Name",
            alignment: "flex-start"
        },
        {
            name: "Type",
            alignment: "center"
        },
        {
            name: "Quantity",
            alignment: "center"
        },
        {
            name: "Unit Price",
            alignment: "flex-end"
        }
    ]

    // preparing billing information
    const billing = {
        total,
        lastModified : new Date(2019,11,11),
        hasDiscount: true,
        discount: 0.15,
        procedures: []
    }
    for (const proceduresBillableItem of proceduresBillableItems) {
        const {lineItems = [], inventories, equipments, caseProcedureId} = proceduresBillableItem;

        const caseProcedure = procedures.find( item => item._id === proceduresBillableItem.caseProcedureId) || {}
        const caseAppointment = caseProcedure.appointment

        const name = `${caseAppointment.title} (${formatDate(caseAppointment.startTime, "MMM D - h:mm a")})`


        const billingItem = {
            caseProcedureId,
            discounts: [],
            physicians: [],
            services: [],
            procedures: [],
            procedure: {
                name: name || proceduresBillableItem.caseProcedureId,
                cost: proceduresBillableItem.total
            },
        }

        for (const lineItem of lineItems) {
            switch (lineItem.type) {
                case LINE_ITEM_TYPES.PHYSICIANS:
                    billingItem.physicians.push(lineItem)
                    break
                case LINE_ITEM_TYPES.SERVICE:
                    billingItem.services.push(lineItem)
                    break
                case LINE_ITEM_TYPES.PROCEDURES:
                    billingItem.procedures.push(lineItem)
                    break
                case LINE_ITEM_TYPES.DISCOUNT:
                    billingItem.discounts.push(lineItem)
                    break
            }
        }

        billingItem.inventories = inventories.map(item => {
            return {
                _id : item._id,
                inventory : item.inventory._id,
                amount: item.amount,
                name: item.inventory.name,
                cost: item.inventory.unitPrice,
            }
        })

        billingItem.equipments = equipments.map(item => {
            return {
                _id : item._id,
                equipment : item.equipment._id,
                amount: item.amount,
                name: item.equipment.type.name,
                cost: item.equipment.type.unitPrice,
            }
        })

        billing.procedures.push(billingItem)
    }


    // const onQuantityChange = (item) => {
    //     console.log("Item: ", item)
    // }

    // const listItem = (item) => <>
    //     <View style={styles.item}>
    //         <Text style={[styles.itemText, {color: "#3182CE"}]}>{item.name}</Text>
    //     </View>
    //     <View style={[styles.item, {alignItems: 'center'}]}>
    //         <Text style={styles.itemText}>{item.type}</Text>
    //     </View>
    //     {
    //         isEditMode ?

    //         <View style={[styles.editItem, {alignItems: 'center'}]}>
    //             <IconButton
    //                 Icon = {<LeftArrow strokeColor="#718096"/>}
    //                 onPress = {()=>onQuantityChange(item)}
    //                 disabled = {false}
    //             />

    //             <TextInput style={styles.editTextBox}>
    //                 <Text style={styles.itemText}>{item.amount}</Text>
    //             </TextInput>

    //             <IconButton
    //                 Icon = {<RightArrow strokeColor="#718096"/>}
    //                 onPress = {()=>{onQuantityChange(item)}}
    //                 disabled = {false}
    //             />
    //         </View>
    //         :
    //         <View style={[styles.item, {alignItems: 'center'}]}>
    //             <Text style={styles.itemText}>{item.amount}</Text>
    //         </View>

    //     }
    //     <View style={[styles.item, {alignItems: 'flex-end'}]}>
    //         <Text style={styles.itemText}>{`$ ${currencyFormatter(item.cost)}`}</Text>
    //     </View>
 
    // </>

    return (
        selectedTab === 'Consumables' ?
            <Consumables
                // tabDetails={inventoryList}
                headers={headers}
                // listItemFormat={listItem}
                allItems = {inventoryList}
                details = {billing.procedures}
                isEditMode = {isEditMode}
                handleEditDone = {handleEditDone}
            />
            :
            selectedTab === 'Equipment' ?
                <ChargesheetEquipment
                    // tabDetails={equipmentList}
                    headers={headers}
                    // listItemFormat={listItem}
                    details = {billing.procedures}
                    isEditMode = {isEditMode}
                    handleEditDone = {handleEditDone(caseId)}
                />
                :
                selectedTab === 'Invoices' ?
                    <Invoices
                        tabDetails={invoices}
                        reportDetails = {billing}
                    />
                    :
                    selectedTab === 'Quotation' ?
                        <Quotation
                            tabDetails={quotations}
                            reportDetails = {billing}
                            handleQuotes = {handleQuotes}
                        />
                        :
                        <BillingCaseCard
                            tabDetails={billing}
                            isEditMode = {isEditMode}
                            caseId = {caseId}
                            handleEditDone = {handleEditDone(caseId)}
                        />
        // <View/>
    );
}

export default ChargeSheet;

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
    editItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    editTextBox:{
        backgroundColor:'#F8FAFB',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:6,
        paddingTop:2,
        paddingBottom:2,
        marginLeft:10,
        marginRight:10
    },
    itemText: {
        fontSize: 16,
        color: "#4A5568",
    },
})

