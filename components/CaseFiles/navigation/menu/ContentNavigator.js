import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNavigator, TabRouter, SafeAreaView, ScrollView } from 'react-navigation';
import OverlayMenuItems from './OverlayMenuItems';

const ContentNavigator = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];

  const ActiveScreen = descriptor.getComponent();

  return (
    <SafeAreaView style={{ flex: 1,flexDirection: 'column'}}>
        <ScrollView style={{margin:20, marginBottom:0,}} > 
          <ActiveScreen navigation={descriptor.navigation}/>
        </ScrollView>
        
        <View style={styles.footer}>
          <OverlayMenuItems
            descriptors={descriptors}
            navigation={navigation}
          />
        </View>
    </SafeAreaView>
  );
};

const createSidebarNavigator = (routeConfigMap, sidebarNavigatorConfig) => {
  const customTabRouter = TabRouter(routeConfigMap, sidebarNavigatorConfig);

  return createNavigator(ContentNavigator, customTabRouter, {});
};

export default createSidebarNavigator;

const styles = StyleSheet.create({
  footer:{
    flex:1,
    position:'absolute',
    //justifyContent:'flex-end',
    marginBottom:35,
    alignSelf:'center',
    //alignItems:'center',
    //top:0,
    bottom:50,
    
}
})