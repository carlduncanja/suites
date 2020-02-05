import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import Svg, { Path, Rect } from 'react-native-svg';
import SvgIcon from '../../assets/SvgIcon';

export default NavigationTab = (props) => {

    const generateIcon = (iconName, colour) => {
        return <SvgIcon iconName={iconName} strokeColor={colour} />
    }

    console.log('hoooo')

    const generateTouchabaleOpacity = (colour) => {
        return (
            <TouchableOpacity style={styles.navTag} onPress={e => console.log('tabbbb')}>
                {generateIcon(props.tabSelected,colour)}
                <Text style={[styles.navText, { color: '#718096' }]}>{props.tabSelected.toUpperCase()}</Text>
            </TouchableOpacity>
        )
    }
   
    return (
        <View
            ref={ref => this.navTagRef = ref}
            style={styles.container}
        >
            {props.transparent === true ?
                generateTouchabaleOpacity("#718096")
            :
                generateTouchabaleOpacity("#CBD5E0")
            }
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
