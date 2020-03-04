import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SvgIcon from '../../assets/SvgIcon';

export default Notification = () => {
        return(
            <View style={styles.container}>
                <View style={styles.description}>
                    <View style={{justifyContent:'space-between',flexDirection:'row', alignItems:'center', marginBottom:8}}>
                        <View style={styles.title}>
                            <SvgIcon iconName = "notificationFolder"/>
                            <Text style={{color:"#90CDF4", marginLeft:9, fontSize:14}}>Julie Melissa Brown</Text>
                        </View>
                        <TouchableOpacity activeOpacity={1} onPress={props.closeNavigation(false)} style={{paddingLeft:5, paddingRight:5}}>
                            <SvgIcon iconName="notificationClose"/>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.content}>
                        <Text style={{color:"#FFF"}}>Coronary Bypass Graft</Text>
                        <View style={styles.status}>
                            <Text style={{color:'white', fontSize:12}}>Complete</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.quotation} activeOpacity={1}>
                    <Text style={{color:'#3182CE', marginTop:'5%', marginBottom:'5%', fontSize:16, fontWeight:'bold'}}>Adjust Quotaion</Text>
                </TouchableOpacity>
            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#104587',
        borderRadius: 8,
        borderColor:"#EDF2F7",
        borderWidth:1,
    },
    description:{
        flex:1,
        margin:'4%',
        backgroundColor:"#104587",
        flexDirection:'column',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
    },
    content:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    status:{
        alignItems:'center',
        justifyContent:'center',
        padding:2,
        backgroundColor:'#4299E1',
        borderWidth:1,
        borderColor:'#63B3ED',
        borderRadius:4
    },
    quotation:{
        flex:1,
        backgroundColor:'rgba(247, 250, 252, 1)',
        alignItems:'center',
        justifyContent:'center'
    }
})