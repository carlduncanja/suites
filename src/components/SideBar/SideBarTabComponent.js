import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import Svg, {Path, Rect} from 'react-native-svg';
import SvgIcon from '../../../assets/SvgIcon';


/**
 * Component for the side navigation tabs 
 */
export default ({tabName, icon, isTabSelected, onTabPress, hasDivider}) => {
    // console.log("Name: ", tabName)
    const generateIcon = (iconName, colour) => {
        return <SvgIcon iconName={iconName} strokeColor={colour}/>
    };

    const svgLeftCorner = (fillColor) => {
        return (
            <Svg width="12" height="12" viewBox="0 0 12 12" style={{alignSelf: "flex-end"}}>
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 0H0C6.62742 0 12 5.37258 12 12V0Z"
                    fill={fillColor}
                />
            </Svg>
        )
    };

    const svgRightCorner = (fillColor) => {
        return (
            <Svg width={12} height={12} viewBox="0 0 12 12" style={{alignSelf: "flex-end"}}>
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 12V0C12 6.62742 6.62742 12 0 12H12Z"
                    fill={fillColor}
                />
            </Svg>
        )
    };

    const iconColor = isTabSelected ? "#3182CE" : "#CBD5E0";
    const TabIcon = icon;

    return (
        <>
        <View style={{...styles.container, 
            // borderBottomWidth : hasDivider ? 1 : 0, borderBottomColor : hasDivider ? 'yellow' : 'none', 
        }}>
            <TouchableOpacity style={styles.navTag} onPress={onTabPress}>

                {
                    isTabSelected && svgRightCorner("white")
                }

                {
                    <View style={
                        [
                            styles.iconContainer,
                            {backgroundColor: isTabSelected ? 'white' : 'none'},
                            isTabSelected ? styles.shadow : {},
                        ]
                    }>

                        <TabIcon strokeColor={iconColor}/>

                        {
                            <Text style={{
                                ...styles.navText,
                                display: isTabSelected ? 'none' : 'flex'
                            }}>
                                {tabName.toUpperCase()}
                            </Text>
                        }

                    </View>
                }

                {
                    isTabSelected && svgLeftCorner("white")
                }

            </TouchableOpacity>
            
            
        </View>
        {
            hasDivider &&
            <View
                style={{height: 1, backgroundColor : "#4879B7", borderRadius :2, justifyContent:'center', marginLeft:12,marginRight:12}}
            />
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        height: 80,
        marginBottom: 2,
        marginTop: 2,
        // backgroundColor: 'red',
    },
    navText: {
        fontSize: 9,
        paddingTop: 10,
        color: '#fff',
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: '100%',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },

});
