import React,{ useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Svg, {Path, Rect, Circle} from "react-native-svg";

const svgVector = <View>
    <Svg width="364" height="431" viewBox="0 0 364 431" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M172.833 227.79C239.407 22.5494 363.884 3.05176e-05 363.884 3.05176e-05L2.12318e-06 -6.20462e-06L-3.05175e-05 430.999C-3.05175e-05 430.999 106.26 433.03 172.833 227.79Z" fill="#124A92"/>
    </Svg>
</View>

const elipse4 = <View style = {{position:'absolute', right:0, bottom:0}}>
    <Svg width="349" height="330" viewBox="0 0 349 330" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="348.764" cy="348.764" r="348.764" fill="#124A92"/>
    </Svg>
</View>

const elipse3 = <View style = {{position:'absolute', right:0, bottom:0}}>
    <Svg width="276" height="257" viewBox="0 0 276 257" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="275.764" cy="275.764" r="275.74" fill="#1453A4"/>
    </Svg>
</View>

const elipse2 = <View style = {{position:'absolute', right:0, bottom:0}}>
    <Svg width="205" height="186" viewBox="0 0 205 186" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="204.764" cy="204.764" r="204.208" fill="#165DB6"/>
    </Svg>
</View>

const elipse1 = <View style = {{position:'absolute', right:0, bottom:0}}>
    <Svg width="134" height="115" viewBox="0 0 134 115" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="133.765" cy="133.764" r="133.671" fill="#1866C8"/>
    </Svg>
</View>

const LoginBackground = () => {
    return (
        <View style={{
            position:'absolute', 
            flex:1,
            height: '100%', 
            width: '100%', 
            backgroundColor:'#104587',
            
            }}>
            {svgVector}
            <View style={styles.elipses}>
                {elipse4}
                {elipse3}
                {elipse2}
                {elipse1}
            </View>
        </View>
    )
}

export default LoginBackground

const styles = StyleSheet.create({
    form:{
        backgroundColor:'#FFFFFF',
        padding:20,
        height:356,
        width:325,
        borderRadius:12
    },
    elipses:{
        height:'100%',
        alignSelf:'flex-end',
        position:'absolute',
        // justifyContent:"flex-end" 
    }
})