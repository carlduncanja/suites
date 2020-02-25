import React from 'react';
import { View, StyleSheet } from "react-native";
import FrameTitle from '.././FrameTitle';
import FrameTabularContent from '../FrameContents/FrameTabularContent'

const FrameTableCard = (props) => {
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
                <FrameTabularContent cardInformation={props.cardInformation}/>
            </View>
        </View>

    );
}
 
export default FrameTableCard;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F8FAFB',
    },
    title:{
        width:'100%'
    },
    content:{
        width:'100%'
    }
})