import React from 'react';
import { StyleSheet, SafeAreaView, Animated, PanResponder, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Sidebar from './components/SideNavigation/Sidebar';
import Content from './components/layout/Content';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabSelected:{},
      tabSelectedBool: false,
      transparent:false,
      displayMore: false,
      screenDimensions: {},
    }

    this.onPressTab = this.onPressTab.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.openMore = this.openMore.bind(this);

  }

  getDimensions(event){
    this.setState({
      screenDimensions:{
        "width":event.nativeEvent.layout.width,
        "height":event.nativeEvent.layout.height
      }
    })
  }

  onPressTab(event,selected){
    selectedObject = {"tabSelected":selected,"status":true};
    tabSelectedBool = true;
    this.setState({tabSelected:selectedObject, tabSelectedBool});
  }

  openMore(){
    this.setState({displayMore:!this.state.displayMore})
  }

  render(){

    return (
      <SafeAreaView style={styles.container} onLayout={this.getDimensions}>
        <View style={styles.scroll} >
          <View style = {styles.sidebar}>
            <Sidebar
              screenDimensions = {this.state.screenDimensions}
              searchOpen = {this.state.searchOpen}
              transparent = {this.state.transparent}
              showSlider = {this.state.showSlider}
              tabSelected = {this.state.tabSelected}
              tabSelectedBool = {this.state.tabSelectedBool}
              onPressTab = {this.onPressTab}
              openMore = {this.openMore}
              displayMore = {this.state.displayMore}
            />
          </View>
          <View style = {styles.content}>
            {this.state.tabSelected.tabSelected === 'schedule' ?
              <Content
                {...this.state}
                name="SCHEDULE"
                // decreaseMonthChange = {this.decreaseMonthChange}
                // increaseMonthChange = {this.increaseMonthChange}
                // currentDays = {this.getCurrentDays(this.state.currentDate.format("MM"),this.state.currentDate.format("YYYY"))}
                // prevMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) - 1).toString(), this.state.currentDate.format("YYYY"))}
                // nextMonthDays = {this.getCurrentDays((parseInt(this.state.currentDate.format("MM")) + 1).toString(), this.state.currentDate.format("YYYY"))}
                />
              :
              this.state.tabSelected.tabSelected === 'case files' ?
                <Content
                  {...this.state}
                  name="CASE FILES"
                />
                :
                this.state.tabSelected.tabSelected === 'patients' ?
                  <Content
                    {...this.state}
                    name="PATIENTS"
                    />
                  :
                  this.state.tabSelected.tabSelected === 'inventory' ?
                    <Content {...this.state} name="INVENTORY"/>
                    :
                    this.state.tabSelected.tabSelected === 'delivery' ?
                      <Content {...this.state} name="DELIVERY"/>
                      :
                      this.state.tabSelected.tabSelected === 'equipments' ?
                        <Content {...this.state} name="EQUIPMENTS"/>
                        :
                        this.state.tabSelected.tabSelected === 'alerts' ?
                          <Content {...this.state} name="ALERTS"/>
                          :
                          <Content {...this.state} name="HOME"/>
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }

}




const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  scroll:{
    flex:1,
    flexDirection:'row',
  },
  sidebar:{
    //flex:1,
  },
  content:{
    flex:12,
  }

});
