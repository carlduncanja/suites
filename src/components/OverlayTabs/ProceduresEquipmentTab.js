import React,{ useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Equipment from '../CaseFiles/OverlayPages/ChargeSheet/Equipment';

import { currencyFormatter } from '../../utils/formatter'
import Button from "../common/Buttons/Button";

const ProceduresEquipmentTab = ({equipmentsData, isEditMode}) => {

    const [equipments, setEquipments] = useState([])
    
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

    return (
        <>
            <Equipment
                tabDetails = {data}
                headers = {headers}
                listItemFormat = {listItem}
            />
            {
                console.log("Edit Mode: ", isEditMode) &&
                isEditMode && 
                <View style={{backgroundColor:'#99C2E3', padding:15, paddingBottom:10, paddingTop:10, borderRadius:8}}>
                    <Button
                        buttonPress = {()=>{}}
                        title = "Add Equipment"
                        backgroundColor = "#99C2E3"
                        color = "#FFFFFF"
                    />
                </View>
            }
        </>
    )
}

export default ProceduresEquipmentTab

const styles = StyleSheet.create({
    item:{
        flex:1,
    },
    itemText:{
        fontSize:16,
        color:"#4A5568",
    },
})