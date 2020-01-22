import React from 'react';
import { StyleSheet, SafeAreaView, Animated, PanResponder, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Sidebar from './components/SideNavigation/Sidebar';
import Content from './components/layout/Content';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabSelected:{"tabSelected":"schedule", "status":true},
      tabSelectedBool: true,
      transparent:false,
      screenDimensions: {},
      showNotification: false,
    }

    this.onPressTab = this.onPressTab.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.closeNavigation = this.closeNavigation.bind(this);
    this.setTransparent = this.setTransparent.bind(this);
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

  closeNavigation(){
    this.setState({showNotification: false})
  }

  setTransparent(status){
    this.setState({transparent:status})
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
            />
          </View>
          <View style = {styles.content}>
            {
              this.state.tabSelected.tabSelected === 'schedule' ?
                <Content {...this.state} 
                  name="SCHEDULE" 
                  closeNavigation = {this.closeNavigation} 
                  setTransparent={this.setTransparent}/>
              :
              this.state.tabSelected.tabSelected === 'case files' ?
                <Content {...this.state} name="CASE FILES"/>
              :
              this.state.tabSelected.tabSelected === 'theatres' ?
                <Content {...this.state} name="CASE FILES"/>
              :
              this.state.tabSelected.tabSelected === 'inventory' ?
                <Content {...this.state} name="INVENTORY"/>
              :
              this.state.tabSelected.tabSelected === 'equipment' ?
                <Content {...this.state} name="EQUIPMENT"/>
              :
              this.state.tabSelected.tabSelected === 'orders' ?
                <Content {...this.state} name="ORDERS"/>
              :
              this.state.tabSelected.tabSelected === 'suppliers' ?
                <Content {...this.state} name="SUPPLIERS"/>
              :
              this.state.tabSelected.tabSelected === 'invoices' ?
                <Content {...this.state} name="INVOICES"/>
              :
              this.state.tabSelected.tabSelected === 'storage' ?
                <Content {...this.state} name="STORAGE"/>
              :
              this.state.tabSelected.tabSelected === 'physicians' ?
                <Content {...this.state} name="PHYSICIANS"/>
              :
              this.state.tabSelected.tabSelected === 'procedures' ?
                <Content {...this.state} name="PROCEDURES"/>
              :
              this.state.tabSelected.tabSelected === 'alerts' ?
                <Content {...this.state} name="ALERTS"/>
              :
              null
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
    width:'11%'
  },
  content:{
    flex:12,
  }

});
