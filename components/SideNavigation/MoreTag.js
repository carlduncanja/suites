import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ActionContainer from '../common/FloatingAction/ActionContainer';
import Svg,{Path, Rect} from 'react-native-svg';
import Modal from 'react-native-modal';
import ActionContainerModal from '../common/FloatingAction/ActionContainerModal';

export default class More extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        const icon = (strokeColor) => {
            return(
                <Svg width="22" height="4" viewBox="0 0 22 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M11 4C12.1046 4 13 3.10457 13 2C13 0.89543 12.1046 0 11 0C9.89543 0 9 0.89543 9 2C9 3.10457 9.89543 4 11 4Z" fill={strokeColor}/>
                    <Path d="M2 4C3.10457 4 4 3.10457 4 2C4 0.89543 3.10457 0 2 0C0.89543 0 0 0.89543 0 2C0 3.10457 0.89543 4 2 4Z" fill={strokeColor}/>
                    <Path d="M20 4C21.1046 4 22 3.10457 22 2C22 0.89543 21.1046 0 20 0C18.8954 0 18 0.89543 18 2C18 3.10457 18.8954 4 20 4Z" fill={strokeColor}/>
                </Svg>
            )
        }
        return(
            <View style={styles.container}>
                {this.props.displayMore === false ?
                    <TouchableOpacity style={styles.navTag} onPress={this.props.openMore} >
                        {icon ("#CBD5E0")}
                        <Text style={styles.navText}>MORE</Text>
                    </TouchableOpacity>
                    :
                    <View>
                        <TouchableOpacity style={[styles.navTag, styles.selectedNavTag, {backgroundColor:'#04346F'}]} onPress={this.props.openMore}>
                            {icon ("#718096")}
                            <Text style={[styles.navText, styles.selectedNavText, {color:'#718096'}]}>MORE</Text>
                        </TouchableOpacity>

                        <View style={{position:'absolute', left:45, top:-40}}>
                            <Modal isVisible={true} style={{minHeight:70}} hasBackdrop={false} coverScreen={false}>
                                <ActionContainerModal actionTitle="More Details" content={<Text>Create New List</Text>}/> 
                            </Modal>
                            
                        </View>
                        
                    </View>

                }

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        width:'100%',
    },
    navTag:{
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        paddingBottom:20,
        paddingTop:14,
        paddingRight:8,
    },
    selectedNavTag:{
        paddingRight:0,
        backgroundColor:'white',
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
    },
    navText:{
        fontSize:10,
        marginTop:3,
        color:'#fff',
    },
    selectedNavText:{
       color:'#3182CE',
    },
    overlayContainer:{
        height:70,
        alignSelf:'flex-start'
    },
    overlay:{
        paddingRight:0,
        flex:1,
        borderBottomLeftRadius:10,
        borderTopLeftRadius:10,
        width:'100%',
        height:'100%',
        position:"absolute",
        backgroundColor:'rgba(0,0,0,0.33)'
    }
})
