import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from './Divider';

const {height} = Dimensions.get('window')

export default class SideUpPanel extends Component {
    constructor(props){
        super(props);

        this.slideUpValue = new Animated.Value(0);
    }
    componentDidMount(){
        Animated.timing(
            this.slideUpValue,
            {
                toValue:500,
                duration:500,
                easing: Easing.linear
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={styles.container}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{top: height-150, bottom: 0}}
                    animatedValue={this.slideUpValue}
                    showBackdrop={false}
                    allowDragging = {this.props.draggable}
                    //minimumVelocityThreshold = {-50000}
                    friction = {1000}
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
            </Animated.View>
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
