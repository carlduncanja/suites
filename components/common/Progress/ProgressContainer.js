import React,{Component} from 'react';
import {View, Text, StyleSheet,ProgressViewIOS} from 'react-native';
import ProgressIcon from './ProgressIcon';
import ProgressBar from './ProgressBar';

export default class ProgressContainer extends Component{
    render(){
        return(
            <View style={styles.container}>    
                <View style={{}}>
                    <View style={styles.iconsContainer}>
                        {this.props.icons.map((icon,index)=>{
                            return(
                                <View style={styles.icon} key={index}>
                                    <View style={{flexDirection:'column', alignItems:'center'}}>
                                        <Text style={{paddingBottom:10, color:'#3182CE'}}>{icon.iconName}</Text>
                                        <ProgressIcon icon={icon.icon}/>
                                    </View>
                                    
                                    {/* <View style={{width:60, paddingRight:8, paddingLeft:8}}>
                                        <ProgressBar progressNumber={0.5}/>
                                    </View> */}
                                </View>
                                
                            )
                        })}
                    </View>              
                    <View style={styles.progressBar}>
                        <ProgressBar progressNumber={0.2}/>
                    </View>   
                
                </View>            
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:15,
        paddingBottom:15,
    },
    progressBar:{
        position:'absolute',
        top:'30%',
        width:'100%',
        zIndex:-1
    },
    text:{

    },
    iconsContainer:{
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'space-evenly',
        paddingLeft:50,
        paddingRight:50
    },
    icon:{
        flexDirection:'row',
        //alignItems:'center',
        //alignSelf:'flex-start',
        //marginLeft:50,
    }
})