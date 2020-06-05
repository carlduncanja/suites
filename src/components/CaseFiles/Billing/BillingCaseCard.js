import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import BillingCaseProcedure from './BillingCaseProcedure';
import moment from 'moment';
import SvgIcon from '../../../../assets/SvgIcon';
import {formatAmount} from '../../../helpers/caseFilesHelpers';
import {formatDate, currencyFormatter} from "../../../utils/formatter";


const BillingCaseCard = ({tabDetails}) => {

    const {
        lastModified = "",
        total = 0,
        hasDiscount = false,
        discount = 0,
        procedures = {}
    } = tabDetails

    let totalAmount = total - (total * discount)

    const getProcedureStatusArray = () => {
        // let statusArray = []
        let statusArray = procedures.map((procedure, index) => {
            return {
                index,
                status: false
            }
            // statusArray.push({
            //     "index":index,
            //     "status":false
            // })
        })
        return statusArray
    }

    const [openDetailsArrayState, setOpenDetailsArrayState] = useState(getProcedureStatusArray())

    // const formatAmount = (amount) => {
    //     let newAmountString = (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    //     return `$ ${newAmountString}`
    // }

    const getStatus = (index) => {
        let currentArray = openDetailsArrayState.filter(item => item.index === index)
        return currentArray[0].status
    }

    const openProcedureDetails = (index) => {
        let selectedIndex = openDetailsArrayState.findIndex(obj => obj.index === index)
        let newObject = {...openDetailsArrayState[selectedIndex], status: !openDetailsArrayState[selectedIndex].status}
        let updatedArray = [
            ...openDetailsArrayState.slice(0, selectedIndex),
            newObject,
            ...openDetailsArrayState.slice(selectedIndex + 1)
        ]
        setOpenDetailsArrayState(updatedArray)
    }

    // const getLastModified = () =>{

    // }

    // const getTotal = () =>{
    //     let allEquiments = caseProcedureDetails.map( procedure => procedure.equipments)
    //     let allConsumables = caseProcedureDetails.map( procedure => procedure.consumables)
    //     let procedureCost = caseProcedureDetails.map( procedure => procedure.cost)
    //     let physicianCost = casePhysicians.map( physician => physician.staff.cost)

    //     const getItemTotal = (itemArray) =>{
    //         let itemTotal = 0
    //         itemArray.map( item => itemTotal += item)
    //         return itemTotal
    //     }
    //     const getItemArrayTotal = (itemArray) =>{
    //         let itemTotal = 0
    //         itemArray
    //             .forEach(arr => arr
    //             .map(obj => itemTotal += (obj.quantity * obj.unitPrice)))
    //         return itemTotal
    //     }


    //     let equipTotal = getItemArrayTotal(allEquiments)
    //     let consumTotal = getItemArrayTotal(allConsumables)
    //     let physTotal = getItemTotal(physicianCost)
    //     let proTotal = getItemTotal(procedureCost)

    //     let total = equipTotal + consumTotal + physTotal + proTotal

    //     return (Math.round(total * 100) / 100)
    // }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.headerContainer}>

                <View style={styles.headerItem}>
                    <Text style={styles.headerTitle}>Last Modified</Text>
                    <Text style={styles.headerValue}>{formatDate(lastModified, 'DD/MM/YYYY')}</Text>
                </View>

                <View style={[styles.headerItem, {alignItems: 'flex-end'}]}>
                    <Text style={styles.headerTitle}>Total</Text>
                    <View style={{flexDirection: 'row'}}>
                        {hasDiscount && <Text style={{color: '#0CB0E7', fontSize: 14}}>(discount applied)</Text>}
                        <Text style={styles.headerValue}>{`$ ${currencyFormatter(totalAmount)}`}</Text>
                    </View>
                </View>

            </View>

            <View style={styles.chargeContainer}>
                <View style={styles.chargeHeader}>
                    <Text style={styles.chargeHeaderTitle}>Charge</Text>
                    <Text style={[styles.chargeHeaderTitle, {alignSelf: 'flex-end'}]}>Cost</Text>
                </View>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.procedureText}>PROCEDURE</Text>
                </View>

                {
                    procedures.map(
                        (item, index) => {

                        const {
                            procedure = {},
                            physicians = [],
                            equipments = [],
                            inventories = []
                        } = item

                        return (
                            <View key={index} style={{marginBottom: 15}}>

                                <View style={{flexDirection: 'row',}}>
                                    <TouchableOpacity
                                        style={{paddingRight: 15, marginTop: 5,}}
                                        onPress={() => openProcedureDetails(index)}
                                    >
                                        {getStatus(index) ?
                                            <SvgIcon iconName="hideProcedure"/>
                                            :
                                            <SvgIcon iconName="showProcedure"/>
                                        }
                                    </TouchableOpacity>

                                    <View style={{flex: 1, flexDirection: 'column'}}>
                                        <View style={styles.itemContainer}>
                                            <Text style={{color: '#4E5664', fontSize: 16}}>{procedure.name}</Text>
                                            <Text style={{
                                                color: '#4E5664',
                                                fontSize: 18,
                                                alignSelf: 'flex-end'
                                            }}>{`$ ${currencyFormatter(procedure.cost)}`}</Text>
                                        </View>
                                        {
                                            getStatus(index) &&
                                            <View style={{}}>
                                                <BillingCaseProcedure
                                                    physicians={physicians}
                                                    equipments={equipments}
                                                    inventories={inventories}
                                                />
                                            </View>
                                        }

                                    </View>
                                </View>

                            </View>
                        )
                    })}

            </View>
        </ScrollView>
    );
}

export default BillingCaseCard;

const styles = StyleSheet.create({
    container: {},
    headerContainer: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    headerItem: {
        // justifyContent:'space-between',
        alignItems: 'flex-start'
    },
    headerTitle: {
        color: '#718096',
        fontSize: 16,
        marginBottom: 10,
    },
    headerValue: {
        color: '#4A5568',
        fontWeight: '600',
    },
    chargeContainer: {},
    chargeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#EEF2F6',
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 25
    },
    chargeHeaderTitle: {
        fontSize: 14,
        color: '#718096'
    },
    procedureText: {
        color: '#4299E1',
        fontSize: 12,
        fontWeight: '500'
    },
    itemContainer: {
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center'
    },
})
