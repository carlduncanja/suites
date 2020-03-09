import React, { Component, useState, useContext, useEffect } from 'react';
import {View, Text,StyleSheet, Dimensions, Animated, Easing, TouchableOpacity, ScrollView} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from '../Divider'
import SlideOverlay from './SlideOverlay';
import { SuitesContext } from '../../../contexts/SuitesContext';

const {width, height} = Dimensions.get('window')

class OverlaySlidePanel extends Component {
    static contextType = SuitesContext
    constructor(props){
        super(props);
        this.state = {
        }
    }
    
    componentDidMount(){
        let top = height-this.context.state.slideTopValue-30;
        let velocity = top*1000
        this._panel.show({toValue:top, velocity:velocity})
    }
    render() { 
        return ( 
            <View style={{flex:1, width:'100%'}}>
                <SlidingUpPanel 
                    showBackdrop={false}
                    ref={c => (this._panel = c)}
                    //friction = {1000}
                    draggableRange={{top:height-this.context.state.slideTopValue-30, bottom:130}}
                    >
                    {dragHandler => (
                        <View style={styles.container} >
                            <View style={styles.dragHandler} {...dragHandler}>
                                <Divider backgroundColor="#FFFFFF"/>
                            </View>
                            <View style={styles.content} >
                                <SlideOverlay/>
                            </View>
                        </View>
                    )}
                    </SlidingUpPanel>
            </View>
        );
    }
}
 

export default OverlaySlidePanel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dragHandler: {
        //alignSelf: 'stretch',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        flex:1,
        width:'100%',
        alignSelf: 'stretch',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:"#FFFFFF",
        //paddingBottom:40
    }
})
