import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SvgIcon from '../../assets/SvgIcon';
import { SuitesContext } from '../../contexts/SuitesContext';

const Dropdown = (props) => {
    const suitesState = useContext(SuitesContext).state;
    const suitesMethods = useContext(SuitesContext).methods
    return ( 
        <View style={styles.dropContainer}>
            <View style={styles.container}>
                <Text style={styles.selectedText}>{props.selectedValue}</Text>
                <View>
                    <SvgIcon iconName="dropdown"/>
                </View>                
            </View>
        </View>
    );
}
 
export default Dropdown;

const styles = StyleSheet.create({
    dropContainer:{

    },
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