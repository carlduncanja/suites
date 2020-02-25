import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';

const FrameTabularContent = (props) => {
    return ( 
        <View style={styles.container}>
            {
                props.cardInformation.map((item, index)=>{
                    return(
                        <View key={index} style={styles.itemContainer}>
                            {
                                Object.keys(item).map((key, index)=>{
                                    return(
                                        <View key={index} style={{width:'50%'}}>
                                            <FrameTableItem title={key} value={item[key]}/>
                                        </View>
                                        
                                    )
                                })
                            }
                        </View>
                    ) 
                })
            }
        </View>
    );
}
 
export default FrameTabularContent;

const styles = StyleSheet.create({
    container:{
        padding:15,
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    itemContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10
    }
    
})