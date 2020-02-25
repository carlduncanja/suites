import React, {Component} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';

export default class TestTransformAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: new Animated.Value(1),
      endValue: 2,
      duration: 5000,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.startValue, {
      toValue: this.state.endValue,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{
                backgroundColor:'red', 
                height:300,
                width:300,
                alignItems:'flex-end',
            }}
            >
              <Animated.View
                    style={[
                        styles.square,
                        {
                        transform: [
                            {
                            scaleX: this.state.startValue,
                            },
                        ],
                        },
                    ]}
                    >
                </Animated.View>

          </View>
        
          
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  square: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    // marginRight:0,
    // position:'absolute',
    alignSelf:"flex-start"
  },
});