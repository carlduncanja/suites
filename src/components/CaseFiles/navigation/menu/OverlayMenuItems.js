import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SvgIcon from '../../../../../assets/SvgIcon'
import { SuitesContext } from '../../../../contexts/SuitesContext';
import FloatingActionButton from '../../../common/FloatingAction/FloatingActionButton'
import { appActions } from '../../../../redux/reducers/suitesAppReducer'; 
import { transformToCamel } from '../../../../hooks/useTextEditHook'

const OverlayMenuItems = ({ navigation, handleOverlayMenuPress}) => {
    const { routes, index } = navigation.state;
    const [state, dispatch] = useContext(SuitesContext)
    const [currentTabName, setCurrentTabName] = useState("Patient")  

    return (
        <View style={styles.container}>
            <View style={styles.menuBar}>
                <View style={styles.iconContainer}>
                    {routes.map((route, tabIndex) => {
                        const { routeName, params } = route;
                        const { selectedIcon, disabledIcon, tabName, tabId } = params || {};
                        const icon = tabIndex === index ? selectedIcon : disabledIcon;

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(routeName);
                                    setCurrentTabName(tabName);
                                    handleOverlayMenuPress(tabName)
                                }}
                                style={styles.icon}
                                key={route.routeName}
                            >
                                {icon}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.selectedIconContainer}>
                    <Text style={styles.selectedText}>{currentTabName}</Text>
                </View>
            </View>
            <FloatingActionButton
                fillColor="#CCD6E0"
                backgroundColor="#FFFFFF"
                // fillColor={props.fillColor}
                // backgroundColor={props.backgroundColor}
            />
        </View>

    );
  };

export default OverlayMenuItems;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    },
    menuBar:{
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
        paddingRight:20,
        marginRight:10,
    },
    selectedIconContainer:{
        paddingLeft:15,
        justifyContent:"center",
        marginRight:'10%'
    },
    selectedText:{
        fontSize:16,
        color:'#323843'
    },
    iconContainer:{
        flexDirection:"row",
        borderRightWidth:1,
        borderRightColor:"#CCD6E0"
    },
    icon:{
        paddingRight:20,
    }
})
