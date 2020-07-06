import React from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameSelectItem from '../FrameItems/FrameSelectItem';
import FrameMeasureItem from '../FrameItems/FrameMeasureItem';

const FrameTabularContent = (props) => {
    const item = props.cardInformation
    //console.log("Keys: ", Object.keys(item))
    return ( 
        <View style={styles.container}>
            <View style={styles.itemContainer}>
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
             </View>
        </View>
    );
}
 
export default FrameTabularContent;

const styles = StyleSheet.create({
    container:{
        margin:10,
       
    },
    itemContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        flexWrap:'wrap'
    }
    
})