import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class SlidingPanel extends Component{
    
    render(){
        const Drawer = require("react-native-drawer-menu").default;
        const content = (
            <View>
                <Text>DRAWER CONTENT</Text>
                <Button onPress={() => this.drawer.closeDrawer()} title="Close Drawer"/>
            </View>
        )

        const styles = {
            drawer: {
              shadowColor: '#000',
              shadowOpacity: 0.4,
              shadowRadius: 10,
              backgroundColor:'purple'
            },
            mask: {}, // style of mask if it is enabled
            main: {} // style of main board
          };
        
        return(
            <Drawer
                style={styles.container}
                drawerWidth={700}
                drawerContent={content}
                type={Drawer.types.Overlay}
                customStyles={{drawer: styles.drawer}}
                drawerPosition={Drawer.positions.Right}
                onDrawerOpen={() => {console.log('Drawer is opened');}}
                onDrawerClose={() => {console.log('Drawer is closed')}}
                ref = {(ref) => this.drawer = ref}
                //showMask = {false}
                >
                <View style={{}}>
                    <Text>{Object.values(Drawer.positions).join(' ')}</Text>
                    <Text>{Object.values(Drawer.types).join(' ')}</Text>
                    <Button onPress={() => this.drawer.openDrawer()} title="Open Drawer"/>
                </View>
            </Drawer>
        )
    }
}