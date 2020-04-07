import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import SvgIcon from '../../../../assets/SvgIcon' 
import HeaderItem from "./HeaderItem";


const ReportHeader = () => {
    const header = require('../../../../assets/db.json').companyInformation
    return (
        <View style={styles.headersContainer}>
            <View style={styles.logoContainer}>
                <SvgIcon iconName = "logo"/>
            </View>
            <View style={styles.informationContainer}>
                {Object.keys(header).map((key,index)=>{
                    return(
                        <View key={index} style={{}}>
                            <HeaderItem data = {header[key]}/>
                        </View>

                    )
                })}
            </View>
        </View>
    );
}

export default ReportHeader;

const styles = StyleSheet.create({
    container:{
    },
    headersContainer:{
        width:'100%',
        //flex:1,
        backgroundColor:"#104587",
        padding:25,
        paddingTop:28,
        paddingBottom:28,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    logoContainer:{},
    informationContainer:{
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft:30
    },
    text:{
        color:"white",
        fontSize:18,
        marginBottom:8
    }
})
