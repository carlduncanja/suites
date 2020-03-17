import { React, useState } from "react"; 
import SlidingUpPanel from 'rn-sliding-up-panel';
import {View, Button, Text, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import { Divider } from "../components/common/Divider";

export const useSlidePanel = () => {

    const slideAnimateValue = new Animated.Value(0)
    const height = Dimensions.get('window').height

    animateSlide=()=>{
        Animated.timing(
            slideAnimateValue,
            {
                toValue:height-100,
                duration:800,
                easing: Easing.cubic
            },
            
        ).start() && slideAnimateValue.setValue(height-100)
    }  

    
    return ( 
        <View style={styles.container}>
            <SlidingUpPanel
                ref={c => (this._panel = c)}
                draggableRange={{top: props.displayFullCalendar === false ? 0 : 300, bottom: props.displayFullCalendar === false ? -300 : 0}}
                showBackdrop={false}
                allowDragging = {props.draggable}
                friction = {1000}
                >
                    
                <View 
                    style={styles.panel} 
                    onLayout={(event)=>{setHeight(event.nativeEvent.layout.height)}}
                >
                    <View style={styles.panelHeader}>
                        <View style={{alignItems:'center',height:30}}>
                            <Divider longPressAction = {props.restartDrag} backgroundColor="white"/>
                        </View>
                        
                        <View style={styles.bottom}>
                            {props.content} 
                        </View>
                    </View>
                    
                </View>
            </SlidingUpPanel>
        </View>
     );
}
 
export default useSlidePanel;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    panel: {
        flex: 1,
    },
    panelHeader: {
        flex:1,
        paddingTop:10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
    },
    bottom:{
        flex:1,
        backgroundColor: '#fff',
        paddingTop:30,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
        
    }
})