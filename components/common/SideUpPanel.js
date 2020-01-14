import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from './Divider';

const {height} = Dimensions.get('window')

export default class SideUpPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            bottom:0
        }
    }

    setHeight(height){
        this.setState({bottom:height-720})
    }

    
    render() {

        return (
            <View style={styles.container}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{top: this.props.displayFullCalendar === false ? 0 : 300, bottom: this.props.displayFullCalendar === false ? -300 : 0}}
                    showBackdrop={false}
                    allowDragging = {this.props.draggable}
                    friction = {1000}
                    // onDragEnd={(height) => this.props.stopScheduleDrag(height, this.state.bottom)}
                    >
                       
                    <View 
                        style={styles.panel} 
                        onLayout={(event)=>{this.setHeight(event.nativeEvent.layout.height)}}
                    >
                        <View style={styles.panelHeader}>
                            <View style={{alignItems:'center',height:30}}>
                                <Divider longPressAction = {this.props.restartDrag} backgroundColor="white"/>
                            </View>
                            
                            <View style={styles.bottom}>
                                {this.props.content} 
                            </View>
                        </View>
                        
                    </View>
                </SlidingUpPanel>
            </View>
        )
    }
}

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
