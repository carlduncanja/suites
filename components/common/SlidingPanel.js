import React, {Component} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';


export default class SlidingPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            drawerPress: false,
        }
        this.showDrawer = this.showDrawer.bind(this);
    }

    showDrawer(){
        this.setState({drawerPress:true})
        console.log("Press")
    }

    render(){
        const Drawer = require("react-native-drawer-menu").default; 
        const mainContent = (
            <View>
                <Text>Open</Text>
                <Button title="Drawer" onPress={() => this.showDrawer()}/>
                <Button title="Open Drawer" onPress={() => this.drawer.openDrawer()}/>
            </View>
        )

        const drawerContent = (
            <View>
                <Text>Close</Text>
                <Button title="Close Drawer" onPress={() => this.drawer.closeDrawer()}/>
            </View>
        )

        return(
    
            <View style={{flex:1}}>
                {this.state.drawerPress === true ?
                    this.drawer.openDrawer():
                    null
                }

                <Drawer
                    style={styles.container}
                    drawerWidth={700}
                    drawerContent={drawerContent}
                    type={Drawer.types.Overlay}
                    customStyles={{drawer: styles.drawer}}
                    drawerPosition={Drawer.positions.Right}
                    ref = {(ref) => this.drawer = ref}
                >
                    <View style={{}}>
                        {mainContent}
                        {/* {this.props.overlayContent} */}
                    </View>
                </Drawer>
            </View>
            
        )
    }
}
const styles=StyleSheet.create({
    drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10,
        paddingLeft: 49,
        paddingTop:32,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius:16,
        borderBottomLeftRadius:16,
    },
    mask: {
        backgroundColor:'#E5E5E5'
    },
})