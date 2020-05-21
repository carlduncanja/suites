import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';
import Button from "../common/Buttons/Button";
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import LongPressWithFeedback from "../common/LongPressWithFeedback";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import ActionItem from "../common/ActionItem";
import WasteIcon from "../../../assets/svg/wasteIcon";
import AddIcon from "../../../assets/svg/addIcon";

import { currencyFormatter } from '../../utils/formatter'
import { withModal } from "react-native-modalfy";

const ProceduresEquipmentTab = ({modal, equipmentsData}) => {

    const [equipments, setEquipments] = useState([])
    const [isFloatingActionDisabled, setFloatingAction] = useState(false)
    
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

    const toggleActionButton = () => {
        setFloatingAction(true)
        modal.openModal("ActionContainerModal",
            {
                actions: getFabActions(),
                title: "PROCEDURE ACTIONS",
                onClose: () => {
                    setFloatingAction(false)
                }
            })
    }

    const getFabActions = () => {

        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {}}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
            </LongPressWithFeedback>;
        const addItem = <ActionItem title={"Add Item"} icon={<AddIcon/>} onPress={ openAddItem }/>;


        return <ActionContainer
            floatingActions={[
                deleteAction,
                addItem
            ]}
            title={"PROCEDURE ACTIONS"}
        />
    };

    const openAddItem = () => {
    }

    return (
        <>
            <Equipment
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

export default withModal(ProceduresEquipmentTab) 

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
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
})