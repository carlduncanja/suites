import React,{Component, useContext, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { CheckedBox, PartialCheckbox} from '../Checkbox/Checkboxes';
import Checkbox from '../Checkbox/Checkbox';
import CheckBoxComponent from "../Checkbox";

const Header = ({headers, isCheckbox, toggleHeaderCheckbox, isIndeterminate}) => { 
    return ( 
        <View style={styles.headersContainer}> 
            {/* {
                checkBoxList && 
                <TouchableOpacity style={{marginRight:20}} onPress={()=>toggleHeaderCheckbox()}>
                    {
                        checkBoxList.length > 0 || checkBoxList.length === dataLength ? 
                            <PartialCheckbox/> 
                            : 
                            <Checkbox/>
                        }
                </TouchableOpacity>
            }
             */}
            {
                isCheckbox &&
                    <View style={{marginRight:20}}>
                        <CheckBoxComponent
                        isIndeterminate={isIndeterminate}
                        onPress={toggleHeaderCheckbox}
                    />
                </View>
            }
            
            {headers.map((header,index)=>{
                return(
                    <View style={[styles.item,{alignItems:header.alignment}]} key={index}>
                        <Text style={styles.headerText}>{header.name}</Text>
                    </View>
                )
            })}
        </View>
    );
}
 
export default Header;

const styles = StyleSheet.create({
    headersContainer:{
        //flex:1,
        marginLeft:10,
        flexDirection:'row',
        //width:'100%'
    },
    item:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center',
    },
    headerText:{
        fontSize:12,
        color:'#718096'
    }
})