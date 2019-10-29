import React from 'react';
import { StyleSheet, SafeAreaView, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabSelected:{},
      tabSelectedBool: false,
    }
    this.onPressTab = this.onPressTab.bind(this); 
  }

  onPressTab(event,selected){
    selectedObject = {"tabSelected":selected,"status":true};
    tabSelectedBool = true;
    this.setState({tabSelected:selectedObject, tabSelectedBool});
  }

  
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll} >
          <View style = {styles.sidebar}>
            <Sidebar 
              tabSelected={this.state.tabSelected}
              tabSelectedBool={this.state.tabSelectedBool}
              onPressTab = {this.onPressTab}
            />
          </View>
          <View style = {styles.content}>
            {this.state.tabSelected.tabSelected === 'schedule' ? 
              <Content {...this.state} name="SCHEDULE"/>
              :
              this.state.tabSelected.tabSelected === 'case files' ?
                <Content {...this.state} name="CASE FILES"/>
                :
                this.state.tabSelected.tabSelected === 'patients' ?
                  <Content {...this.state} name="PATIENTS"/>
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
    flex:1,
  },
  content:{
    flex:12,
  }
       
});
