import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FrameTableItem from '../FrameItems/FrameTableItem';
import FrameCheckboxItem from '../FrameItems/FrameCheckboxItem';
import moment from "moment";

const FrameProcedureContent = (props) => {
    return ( 
        <View style={styles.container}>
            {Object.keys(props.details).map((key, index) =>{
                return(
                    <View key={index}>
                        {
                            key === 'recovery' &&
                            <View style={styles.recovery}>
                                <FrameCheckboxItem title = "Recovery" status = {props.details.recovery.status}/>
                            </View>
                        }
                        <View>
                            <FrameTableItem title = "Location" value={props.details[key].location}/>
                            <View style={styles.dateContainer}>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "Date" value = {moment(props.details[key].date).format("MMM/D/YYYY")}/>
                                </View>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "" value = {moment(props.details[key].date).format("h:mm A")}/>
                                </View>
                                <View style={{flex:1}}>
                                    <FrameTableItem title = "Duration" value = {props.details[key].duration}/>
                                </View>
                            </View>
                        </View>
                    </View>
                )
            })}

            
             
        </View>
    );
}
 
export default FrameProcedureContent;

const styles = StyleSheet.create({
    container:{
        padding:16,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8
    },
    dateContainer:{
        flexDirection:'row'
    },
    
})