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
                {/* <Text>I am Here!!!</Text>
                <TransparentScreen/> */}
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{top: height - 24, bottom: (height-24)/2}}
                    animatedValue={this._draggedValue}
                    showBackdrop={false}>

                    <View style={styles.panel}>
                        <View style={styles.panelHeader}>
                            <Divider/>
                            <View style={styles.bottom}>
                                {/* {this.props.content} */}
                                <Text>Bottom Sheet Content</Text>
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
        // height: 120,
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius:10,
      },
      bottom:{
        flex: 1,
        // backgroundColor: '#f8f9fa',
        alignItems: 'center',
        // justifyContent: 'center'
      }
})
