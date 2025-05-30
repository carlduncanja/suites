import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SvgIcon from '../../../assets/SvgIcon';

const Dropdown = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.selectedText}>{props.selectedValue}</Text>
            <View>
                <SvgIcon iconName="dropdown"/>
            </View>
        </View>
    );
}

export default Dropdown;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        //borderWidth:1,
        //borderColor:'#CCD6E0',
        //borderRadius:4,
        justifyContent:'space-between',
        padding:4,
        flexDirection:'row',
        alignItems:'center'
    },
    selectedText:{
        color: "#1D2129",
        fontSize:16
    },
    dropdown:{

    }
})
