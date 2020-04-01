import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FrameTitle from '../FrameTitle'
import FrameProcedureContent from '../FrameContents/FrameProcedureContent';

const FrameProcedureCard = (props) => {
    return ( 
        <View style={styles.container}>
            <View style={styles.title}>
                <FrameTitle
                    color="#319795" 
                    borderColor = "#81E6D9"
                    backgroundColor="#E6FFFA"
                    iconName="overlayProcedures"
                    frameTitle={props.information.title}
                />
            </View>

            <View style={styles.content}>
                <FrameProcedureContent details = {props.information}/>
            </View> 
        </View>
    );
}
 
export default FrameProcedureCard;

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