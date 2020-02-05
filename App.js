import React, { useReducer, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Animated, PanResponder, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Content from './components/layout/Content';
import moment from 'moment';

import Schedule from './page/Schedule';

import { appActionTypes } from './actions/appActions';


import { appReducer } from './reducers/appReducer';
import { initialState, SuitesContext } from './SuitesContext';
import NavigationStack from './components/SideNavigation/NavigationStack';

export default App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);


  getDimensions = (event) => {
    dispatch({
      type: appActionTypes.UPDATEDIMENSIONS, 
      payload: { width: event.nativeEvent.layout.width, length: event.nativeEvent.layout.height}
    });
  };

  onPressTab = (event,selected) => {
    dispatch({
      type: appActionTypes.UPDATETABSELECTED,
      payload:{ tabSelected: selected, status: true}
    });
  }


    return (
      <SuitesContext.Provider value={{state, dispatch}}>
        <SafeAreaView style={styles.container} onLayout={this.getDimensions}>
            <NavigationStack
              screenDimensions = {state.screenDimensions}
              tabSelected = {state.tabSelected.tabSelected}
              onPressTab = {onPressTab}
             />
      </SafeAreaView>
      </SuitesContext.Provider>
    );

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
    width:'7%'
  },
  content:{
    flex:12,
  }

});


  // state={
  //     tabSelected:{"tabSelected":"case files", "status":true},
  //     tabSelectedBool: true,
  //     transparent:false,
  //     screenDimensions: {},
  //     showNotification: false,
  //   }



  // closeNavigation(){
  //   this.setState({showNotification: false})
  // }

  // setTransparent(status){
  //   this.setState({transparent:status})
  // }
