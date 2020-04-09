import React from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameSelectItem from '../FrameItems/FrameSelectItem';
import FrameMeasureItem from '../FrameItems/FrameMeasureItem';
import moment from 'moment';

const FrameLifestyleContent = ({cardInformation}) => {

    return ( 
        <View style={styles.container}>
            <View style = {styles.rowContainer}>
                <View style={styles.itemContainer}>
                    <FrameSelectItem title="Frequency" value={cardInformation.frequency}/>
                </View>
                <View style={styles.itemContainer}>
                    <FrameTableItem title="Amount" value={cardInformation.amount}/>
                </View>
            </View>

            <View style = {styles.rowContainer}>
                <View style = {styles.itemContainer}>
                    <FrameSelectItem title="Unit" value={cardInformation.unit}/>
                </View>
                <View style = {styles.itemContainer}>
                    <FrameMeasureItem title="Unit of Measure" value={cardInformation.measurement} unit = {cardInformation.unitOfMeasure}/>
                </View>
            </View>

            <View style = {styles.rowContainer}>
                <View style = {styles.itemContainer}>
                    <FrameTableItem title="Usage" value={cardInformation.usage}/>
                </View>
                <View style={styles.itemContainer}> 
                    <FrameTableItem title="Since" value={moment(cardInformation.startTime).format("DD/MM/YYYY")}/>
                </View>
            </View>

            {/* <View style={styles.itemContainer}>
                {
                    Object.keys(item).map((key, index)=>{
                        return (item[key].type === "select" ?
                            <View key={index} style={{width:'50%'}}>
                                <FrameSelectItem title={key} value={item[key].value}/>
                            </View>
                                :
                                item[key].type === "measure" ?
                                    <View key={index} style={{width:'50%'}}>
                                        <FrameMeasureItem title={"Unit of Measure"} value={item[key].value}/>
                                    </View>
                                    :

                                <View key={index} style={{width:'50%'}}>
                                    <FrameTableItem title={key} value={item[key].value}/>
                                </View>
                            
                            )
                    })
                }
             </View> */}
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