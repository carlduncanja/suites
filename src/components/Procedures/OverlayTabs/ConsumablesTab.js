import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Consumables from '../../CaseFiles/OverlayPages/ChargeSheet/Consumables';

import FloatingActionButton from "../../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../../common/FloatingAction/ActionContainer";
import { currencyFormatter } from '../../../utils/formatter'

import { withModal } from "react-native-modalfy";

const testData = [
    {
        itemName : 'Agents',
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
const ConsumablesTab = ({modal, consumablesData}) => {

    const headers = [
        {
            name :"Item Name",
            alignment: "flex-start"
        },
        {
            name :"Type",
            alignment: "center"
        },
        {
            name :"Quantity",
            alignment: "center"
        },
        {
            name :"Unit Price",
            alignment: "flex-end"
        }
    ];

    // const { inventories = [] } = consumablesData

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const listItem = (item) => <>
        <View style={styles.item}>
            <Text style={[styles.itemText,{color:"#3182CE"}]}>{item.item}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-start'}]}>
            <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={[styles.item,{alignItems:'center'}]}>
            <Text style={styles.itemText}>{item.quantity}</Text>
        </View>
        <View style={[styles.item,{alignItems:'flex-end'}]}>
            <Text style={styles.itemText}>$ {currencyFormatter(item.unitPrice)}</Text>
        </View>

    </>

    const data = consumablesData.map(item => {

        return {
            item :  item.inventory.name,
            type : "Anaesthesia",
            quantity : item.amount,
            unitPrice : item.inventory.unitPrice
        }
    });

    const toggleActionButton = () =>{
        setIsFloatingActionDisabled(true);
        modal.openModal("ActionContainerModal",
            {
                actions: getFloatingActions(),
                title: "PROCEDURE ACTIONS",
                onClose: () => {
                    setIsFloatingActionDisabled(false)
                }
            })
    }

    getFloatingActions = () =>{
        return <ActionContainer
            floatingActions={[

            ]}
            title={"PROCEDURE ACTIONS"}
        />
    }


    return (
        <>
            <Consumables
                tabDetails = {data}
                headers = {headers}
                listItemFormat = {listItem}
            />
            <View style={styles.footer}>
                <FloatingActionButton
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>
        </>

    )
}

export default withModal(ConsumablesTab)

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
    footer:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})
