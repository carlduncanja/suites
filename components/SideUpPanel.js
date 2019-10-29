import React, { Component } from 'react';
import {View, Button, Text, StyleSheet, Dimensions} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Divider from './Divider';
import TransparentScreen from './TransparentScreen';

const {height} = Dimensions.get('window')

export default class SideUpPanel extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{top: height-10, bottom: (height)/2}}
                    animatedValue={this._draggedValue}
                    showBackdrop={false}>

                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <View style={{alignItems:'center'}}>
                                <Divider/>
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
        flex: 1,
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
    },
      panelHeader: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
      },
      bottom:{
      }
})
