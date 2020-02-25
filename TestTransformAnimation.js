import React, {Component} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';

export default class TestTransformAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      endValue: 2,
      duration: 5000,
    };
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
        outputRange: [100, 150, 300]
      })
    };

    // const animationText = {
    //   text:this.state.animation.interpolate({
    //     inputRange: [0, 0.5, 1],
    //     outputRange: ["100", "150", "300"]
    //   })
    // }

    return (
      <Animated.View style={[objectStyles.object, animationStyles]}>
        <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
          {/* <Text>{animationText.text}</Text> */}
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
