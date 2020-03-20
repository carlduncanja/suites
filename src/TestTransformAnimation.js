import React, {Component} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';

export default class TestTransformAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      width:0,
    };

    this.animSquare = null
  }

  componentDidMount() {
    Animated.timing(
      this.state.animation,
      {
        toValue: 1,
        duration: 3000
      }
    ).start();
  }
  
  render() {
    const animationStyles = {
      width: this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [100, 150, 250]
      }),
      height :this.state.animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [100, 150, 250]
      }),
    };

    this.state.animation.addListener((value)=>{
      value.value === 0 ?
        this.setState({width:0})
        :
        value.value === 1 ?
          this.setState({width:1})
          :null
    })

    return (
      <Animated.View style={[objectStyles.object, animationStyles]}>
        <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
          {this.state.width === 0? <Text>SMall</Text> : this.state.width === 1 ? <Text>Large</Text> : null}
           
        </View>
      </Animated.View>
    );
  }
}

const objectStyles = {
  object: {
    backgroundColor: 'orange',
    width: 100,
    height: 100
  }
}
