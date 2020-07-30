import React,{ useState,useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CaseFileOverlayMenu = ({ selectedMenuItem, overlayMenu, handleTabPress }) => {

    const [currentTabName, setCurrentTabName] = useState(selectedMenuItem)  

    return (
        <View style={styles.menuBar}> 
            <View style={styles.iconContainer}>
                {
                    overlayMenu.map((item, index)=>{
                        const { selectedIcon, disabledIcon, name } = item || {};
                        const icon = selectedMenuItem === name ? selectedIcon : disabledIcon;

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setCurrentTabName(name);
                                    handleTabPress(name)
                                }}
                                style={styles.icon}
                                key={index}
                            >
                                {icon}
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
            <View style={styles.selectedIconContainer}>
                <Text style={styles.selectedText}>{currentTabName}</Text>
            </View>
        </View>
    )
}

CaseFileOverlayMenu.propTypes = {};
CaseFileOverlayMenu.defaultProps = {};

export default CaseFileOverlayMenu

const styles = StyleSheet.create({
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
    iconContainer:{
        flexDirection:"row",
        borderRightWidth:1,
        borderRightColor:"#CCD6E0"
    },
    icon:{
        paddingRight:20,
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
})
