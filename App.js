import React, { useReducer, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Animated, PanResponder, Platform, ScrollView, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Content from './components/layout/Content';
import moment from 'moment';

import Schedule from './page/Schedule';

import { appActionTypes, appReducer } from './reducers/appReducer';
import { initialState, SuitesContext } from './SuitesContext';
import NavigationStack from './components/Navigator/NavigationStack';

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);


  const getDimensions = (event) => {
    dispatch({
        type: appActionTypes.DIMENSIONS,
        newState: { width: event.nativeEvent.layout.width, length: event.nativeEvent.layout.height}
      });
    };

    const onTabPress = (event, selected) => {
      console.log("tab press", selected);
      dispatch({
        type: appActionTypes.TABSELECTED,
        newState:{ tabSelected: selected, status: true}
      });
    };


    return (
      <SuitesContext.Provider value={{ state: contextValue.state, dispatch: contextValue.dispatch}}>
          <SafeAreaView style={styles.container} onLayout={this.getDimensions}>
              <NavigationStack
                screenDimensions = {state.screenDimensions}
                tabSelected = {state.tabSelected.tabSelected}
                onTabPress = {onTabPress}
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

export default App
