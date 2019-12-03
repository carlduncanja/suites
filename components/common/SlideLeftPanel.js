import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, PanResponder,TouchableOpacity } from 'react-native';


export default class SlideLeftPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            isPaneOpen: false,
            panAnimatedValue: new Animated.ValueXY(),
            animatedValues: {x: 0, y: 0},
            contentView: {}
        }
    }

    animatedView(panelWidth){
        return(
            <View style={[styles.content,{width:panelWidth}]}>                        
                <Text>CONTENT</Text>
            </View>
        )
    }
  
    render(){
        // console.log("Porps: ", this.props)
        const animatedStyle = {transform: this.state.panAnimatedValue.getTranslateTransform()}
        this._values = {x:0, y:0}
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (panEvent, gestureState) => true,
            onMoveShouldSetPanResponder : (panEvent, gestureState) => true,
            onPanResponderMove : (panEvent, gestureState)=>{
                gestureState.dx < -200 || gestureState.dx > 0 ?
                    null 
                    :
                    Animated.event(
                    [   null,
                        {dx: this.state.panAnimatedValue.x}
                    ])(panEvent, gestureState)
            },
            onPanResponderGrant : (panEvent, gestureState) => {
                this.state.panAnimatedValue.setOffset({x: this.state.panAnimatedValue.x._value, y: this.state.panAnimatedValue.y._value})
                this.state.panAnimatedValue.setValue({x:0, y:0});
                // Animated.event([
                //     null,
                //     {dx: this.state.panAnimatedValue.x}
                // ])(panEvent, gestureState)
            },
            onPanResponderRelease : (panEvent, gestureState) => {
                this.state.panAnimatedValue.flattenOffset();
                newObj = new Animated.ValueXY({x: (gestureState.dx), y: 0})
                gestureState.dx < -200 || gestureState.dx > 0 ?
                    null:
                    this.setState({animatedValues:newObj, panAnimatedValue: newObj})
            },            
        })

        return(
            <View style={{flex:1}}>
                <Animated.View 
                    style=
                        {[
                            styles.container, 
                            {width: this.props.screenDimensions.width/2}, 
                            animatedStyle
                        ]} 
                    {...this.panResponder.panHandlers}> 
                    <View style={[styles.divider]}/>
                    <View style={[styles.content]}>                        
                        <Text>{this.props.content}</Text>
                        {/* <Text>CONTENT</Text> */}
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        //position:'absolute',
        //width:'100%',
        //height:'100%',
        flexDirection:'row',
        backgroundColor:'red', 
        alignSelf:'flex-end',
        paddingLeft: 16,
        borderBottomLeftRadius: 16,
        borderTopLeftRadius: 16,
    },
    divider:{
        alignSelf:'center',
        width: 6,
        height: 55,
        backgroundColor: '#A0AEC0',
        borderRadius: 8,
    },
    content:{
        justifyContent:"flex-start",
        marginTop: 32,
        marginLeft: 25
    }
})