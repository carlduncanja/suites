import React,{Component, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

class TestSlideanimation extends Component {
    constructor(props){
        super(props);
        this.state={}
        this.handleSlider = this.handleSlider.bind(this);
    }
    handleSlider=()=>{
        this._panel.show({toValue:height-200})
    }
    
    render() { 
        return ( 
            <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleSlider()}>
          <View>
            <Text>Show</Text>
          </View>
        </TouchableOpacity>
        <SlidingUpPanel ref={c => (this._panel = c)}>
          {dragHandler => (
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>
                <Text>Drag handler</Text>
              </View>
              <ScrollView>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
                <Text>Here is the content inside panel</Text>
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      </View>
        );
    }
}
 
export default TestSlideanimation;

const {height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
      dragHandler: {
        alignSelf: 'stretch',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
      }
  });
  