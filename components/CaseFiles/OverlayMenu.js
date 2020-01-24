import React,{Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TouchableMenuItem from '../common/TouchableMenuItem';
import Paginator from '../common/Paginator';
import SvgIcon from '../../assets/SvgIcon'

export default class OverlayMenu extends Component{
    render(){
        const menuItems = ["patientButtonOpen", "physiciansButtonClosed", "medicalHistoryButtonClosed", "procedureButtonClosed", "chargeSheetButtonClosed"]
        return(
            <View style={styles.container}>
                <View style={styles.iconsContainer}>
                    {menuItems.map((item,index)=>{
                        return(
                            <View key = {index} style={styles.icon}>
                                <TouchableMenuItem
                                    menuIcon = {<SvgIcon iconName={item}/>}
                                />
                            </View>
                        )
                    })}
                </View>
                <View style={styles.selectedIconContainer}>
                    <Text style={styles.selectedText}>{this.props.selectedIcon}</Text>
                </View>
                <View>
                    <Paginator currentPage={1} totalPages={1}/>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor:'#FFFFFF',
        borderRadius:32,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,    
        elevation: 5,
        alignSelf:"flex-end",
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:20,
        paddingRight:20
    },
    iconsContainer:{
        flexDirection:"row",
        borderRightWidth:2,
        borderRightColor:"#CCD6E0"
    },
    icon:{
        paddingRight:20,
    },
    selectedIconContainer:{
        paddingLeft:15,
        justifyContent:"center",
        marginRight:'20%'
    },
    selectedText:{
        fontSize:16,
        color:'#323843'
    }
})