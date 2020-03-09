import React from 'react';
import { StyleSheet, SafeAreaView, View,  } from 'react-native';
import Sidebar from './components/SideNavigation/Sidebar';
import { SuitesContextProvider } from './contexts/SuitesContext';
import { CaseFileContextProvider } from './contexts/CaseFileContext';
import { ModalProvider, createModalStack } from 'react-native-modalfy';
import OverlaySlidePanelModal from './modals/OverlaySlidePanelModal';
import OverlayModal from './modals/OverlayModal';
import ActionContainerModal from './modals/ActionContainerModal';
import ReportPreviewModal from './modals/ReportPreviewModal';
import Content from './components/layout/Content';



export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      tabSelected:{"tabSelected":"case files", "status":true},
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
    const modalConfig = {
      OverlaySlidePanelModal : OverlaySlidePanelModal,
      OverlayModal : OverlayModal,
      ActionContainerModal : ActionContainerModal,
      ReportPreviewModal : ReportPreviewModal
    }

    const defaultOptions = {
      backdropOpacity:0,
      position:'bottom',
      containerStyle:{
        flex: 1,
        alignItems: 'flex-end',
      }
    }
    const stack = createModalStack(modalConfig, defaultOptions)

    return (
      <SuitesContextProvider>
        <CaseFileContextProvider>
          <ModalProvider stack = {stack}>
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
                      <Content {...this.state} name="THEATRES"/>
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
          </ModalProvider>
        </CaseFileContextProvider>
      </SuitesContextProvider>
      
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
