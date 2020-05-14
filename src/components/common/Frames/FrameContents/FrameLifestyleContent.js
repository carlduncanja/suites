import React from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameSelectItem from '../FrameItems/FrameSelectItem';
import FrameMeasureItem from '../FrameItems/FrameMeasureItem';
import moment from 'moment';
import { formatDate } from '../../../../utils/formatter';

const FrameLifestyleContent = ({cardInformation}) => {
    const {
        frequency = "",
        amount = 0,
        unit = "",
        usage = "",
        measureValue = 10,
        unitOfMeasure = "oz",
        startDate
    } = cardInformation
    return ( 
        <View style={styles.container}> 
            <View style = {styles.rowContainer}>
                <View style={styles.itemContainer}>
                    <FrameSelectItem title="Frequency" value={frequency}/>
                </View>
                <View style={styles.itemContainer}>
                    <FrameTableItem title="Amount" value={amount}/>
                </View>
            </View>

            <View style = {styles.rowContainer}>
                <View style = {styles.itemContainer}>
                    <FrameSelectItem title="Unit" value={unit}/>
                </View>
                <View style = {styles.itemContainer}>
                    <FrameMeasureItem title="Unit of Measure" value={measureValue} unit = {unitOfMeasure}/>
                </View>
            </View>

            <View style = {styles.rowContainer}>
                <View style = {styles.itemContainer}>
                    <FrameTableItem title="Usage" value={usage}/>
                </View>
                <View style={styles.itemContainer}> 
                    <FrameTableItem title="Since" value={formatDate(startDate,"DD/MM/YYYY")}/>
                </View>
            </View>
        </View>
    );
}
 
export default FrameLifestyleContent;

const styles = StyleSheet.create({
    container:{
        margin:10,
    },
    rowContainer:{
        flex:1, 
        flexDirection:"row",
        justifyContent:'space-between',
        // alignItems:'flex-start'
    },
    itemContainer:{
        width:'50%',
        // backgroundColor:'yellow',
        alignSelf:'flex-start'
        // alignSelf:'flex-start'
    }
    
})