import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import Svg, { Path, Rect } from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon';


/**
 * Component for the side navigation tabs
 */
export default ({tabName, icon, isTabSelected, onTabPress}) => {

    const generateIcon = (iconName, colour) => {
        return <SvgIcon iconName={iconName} strokeColor={colour} />
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
            <Svg width={12} height={12} viewBox="0 0 12 12" style={{alignSelf:"flex-end"}}>
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 12V0C12 6.62742 6.62742 12 0 12H12Z"
                    fill= {fillColor}
                />
            </Svg>
        )
    }

    const iconColor = isTabSelected ? "#718096" : "#CBD5E0";

    return (
        <View style={  {...styles.container} }  >
            <TouchableOpacity style={styles.navTag} onPress={onTabPress}>

                {
                    isTabSelected && svgRightCorner("white")
                }

                {
                   <View style={{
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       height: 40,
                       width: '100%',
                       backgroundColor: isTabSelected ? 'white' : 'none',
                       shadowColor: "#000",
                       shadowOffset: {
                           width: 2.5,
                           height: 3.5,
                       },
                       shadowOpacity: 0.5,
                       shadowRadius: 3.84,
                       elevation: 5
                   }}>

                       { generateIcon(icon, iconColor) }

                       {
                           !isTabSelected &&
                           <Text style={{...styles.navText,}}>
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
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
    },
    navTag: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 17,
        paddingTop: 18,
    },
    selectedNavTag: {
        paddingRight: 0,
        backgroundColor: 'white',
        paddingBottom: 4,
        paddingTop: 12
    },
    navText: {
        fontSize: 9,
        paddingTop: 10,
        color: '#fff',
    },
    selectedNavText: {
        color: '#FFFFFF',
        paddingTop: 0
    },
})


//  {props.tabSelectedBool === true && props.tabSelected.tabSelected === props.tabSelected ?

// <View>
// {
//     props.transparent === false ?
//         <View>
//             {svgCorner("white", "right")}
//             <TouchableOpacity style={[styles.navTag,styles.selectedNavTag]} onPress={e => props.onPressTab(e,props.tabSelected)}>
//                 {props.icon (props.tabSelected, "#3182CE")}
//                 <Text style={[styles.navText,styles.selectedNavText]}>{props.tabSelected.toUpperCase()}</Text>
//             </TouchableOpacity>
//             {svgCorner("white", "left")}
//         </View>

//         :
//         <View>
//             {svgCorner("#b3b3b3", "right")}
//             <View>
//                 <TouchableOpacity style={[styles.navTag, styles.selectedNavTag,{backgroundColor:"#b3b3b3", paddingBottom:12}]} onPress={e => props.onPressTab(e,props.tabSelected)}>
//                     {props.icon (props.tabSelected,"#3182CE")}
//                 </TouchableOpacity>
//             </View>
//             {svgCorner("#b3b3b3", "right")}
//         </View>

// }

// </View>

// :

// const svgCorner = (fillColor, side) => {

//     side === "right" ? d = "M12 12V0C12 6.62742 6.62742 12 0 12H12Z" : d = "M12 0H0C6.62742 0 12 5.37258 12 12V0Z";

//     return (
//         <Svg width={12} height={12} viewBox="0 0 12 12" style={{ alignSelf: "flex-end" }}>
//             <Path
//                 fill-rule="evenodd"
//                 clip-rule="evenodd"
//                 d={d}
//                 fill={fillColor}
//             />
//         </Svg>
//     )
// }
