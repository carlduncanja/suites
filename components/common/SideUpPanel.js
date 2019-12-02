import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, Dimensions} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from './Divider';

const {height} = Dimensions.get('window')

export default class SideUpPanel extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{top: height-150, bottom: (height)/2-60}}
                    animatedValue={this._draggedValue}
                    showBackdrop={false}
                    allowDragging = {this.props.draggable}
                    onDragEnd={(height) => this.props.stopScheduleDrag(height)}
                    >
                       
                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <View style={{alignItems:'center',height:20}}>
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
        paddingTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
    },
    bottom:{
        flex:1,
        backgroundColor: '#fff',
        paddingTop:50,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
        
    }
})
