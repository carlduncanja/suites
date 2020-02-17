import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import FrameTitle from '.././FrameTitle';
import FrameMixedTableContent from '../FrameContents/FrameMixedTableContent';

const FrameMixedTableCard = (props) => {
    return ( 
        <View style={styles.container}>
                <View style={styles.title}>
                    <FrameTitle
                        color={props.frameColor}
                        borderColor = {props.frameBorderColor}
                        backgroundColor={props.titleBackgroundColor}
                        iconName={props.frameIconName}
                        frameTitle={props.frameTitle}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.titleName}>{props.cardInformation.name}</Text>
                    <FrameMixedTableContent cardInformation={props.cardInformation.details}/>
                </View>
            </View>
    );
}
 
export default FrameMixedTableCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB'
    },
    title:{
        width:'100%'
    },
    content:{
        width:'100%',
        padding:15,
        borderWidth:1,
        borderColor:'#CCD6E0',
        borderTopWidth:0
    },
    titleName:{
        color:"#4E5664",
        fontSize:16,
    }
})