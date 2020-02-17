import React, { Component, useState, useContext, useEffect } from 'react';
import {View, Text,StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from '../Divider'
import SlideOverlay from './SlideOverlay';
import { SuitesContext } from '../../../contexts/SuitesContext';

const SlideUpPanel = (props) => {
    const {height} = Dimensions.get('window')
    const slideHeight = new Animated.Value(0);

    slideHeight.addListener(({value})=>{
        console.log("Value:", value)
    })

    useEffect(()=>{
        //_panel.show({velocity:6})
        Animated.timing(
            slideHeight,
            {
                toValue:800,
                duration:900,
                easing: Easing.cubic
            }).start()
    },[])

    return ( 
        <Animated.View style={[styles.container,{bottom:0}]} >
            <SlidingUpPanel
                ref={c => (_panel = c)}
                //draggableRange={{top:-20, bottom:-height+200}}
                showBackdrop={false}
                //animatedValue={slideHeight}
                allowDragging = {true}
                //friction = {1000}
                >
                <View style={styles.panel}>
                    <View style={styles.panelHeader}>
                        <View style={{alignItems:'center',height:30}}>
                            <Divider longPressAction = {props.restartDrag} backgroundColor="white"/>
                        </View>
                        
                        <View style={styles.bottom}>
                            <SlideOverlay/>
                        </View>
                    </View>
                    
                </View>
            </SlidingUpPanel>
        </Animated.View>
    );
}
 
export default SlideUpPanel;

const styles = StyleSheet.create({
    container: {
    },
    panel: {
        flex: 1,
    },
    panelHeader: {
        flex:1,
        paddingTop:10,
    },
    bottom:{
        flex:1,
        backgroundColor: '#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
  
    }
})
