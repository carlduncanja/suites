import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';

import { currencyFormatter } from '../../utils/formatter'

import { withModal } from "react-native-modalfy";

const testData = [
    {
        itemName : 'Bag',
        type : 'Anaesthesia',
        quantity : 1,
        unitPrice : 4120.76
    },
    {
        itemName : 'Atracurium',
        type : 'Anaesthesia',
        quantity : 5,
        unitPrice : 8924.09
    }

]
const ProceduresEquipmentTab = ({modal, equipmentsData}) => {

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "flex-start"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ]

    // const { equipments = [] } = equipmentsData

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);


    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>
            
    </>


    const data = equipmentsData.map(item => {

        return {
            item :  item.equipment.name,
            type : item.equipment.type.name,
            unitPrice : item.equipment.type.unitPrice
        }
    });

    return (
        <>
            <Equipment
                tabDetails = {data}
                headers = {headers}
                listItemFormat = {listItem}
            />
        </>
    )
}

export default withModal(ProceduresEquipmentTab) 

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})