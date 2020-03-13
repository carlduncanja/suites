import React,{useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OverlayHeader from './OverlayHeader';
import OverlayFooter from './OverlayFooter'
import OverlayDataFields from './OverlayDataFields';
import ProgressContainer from '../Progress/ProgressContainer'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';
import OverlayComplete from './OverlayComplete';
import { CaseFileContext } from '../../../contexts/CaseFileContext';

const Overlay = () => {
    const caseState = useContext(CaseFileContext).state
    const caseMethods = useContext(CaseFileContext).methods
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    const tabNames = []
    useEffect(()=>{
        caseState.newItemAction.currentStepTabs.map(tab =>{
            [...tabNames,tab.tabName]
        })
    },[caseState.newItemAction.currentStepTabs])
    
    return (  
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <OverlayHeader/>
            </View> 
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#EEF2F6'}}>
                    <ProgressContainer/>
                    <View style={{alignSelf:'center'}}>
                        <TabsContainer 
                            completedTabs={caseState.newItemAction.tabsCompletedList}
                            tabs={tabNames}
                            selectedTab = {caseState.newItemAction.selectedTab}
                            onPressChange = {caseMethods.handleNewItemPress}
                        />
                    </View>
                    
                </View>
                <View style={{flex:1}}>
                    {caseState.newItemAction.overlayComplete ?
                        <OverlayComplete/>
                        :
                        <OverlayDataFields/>
                    }
                </View>
                
            </View>

            <View style={styles.footerContainer}>
                <OverlayFooter/>
            </View> 
            
        </View>
    );
}
 
export default Overlay;

const styles = StyleSheet.create({
    container:{
        //flex:1,
        width:600,
        height:700,
        backgroundColor:'#FFFFFF',
        alignSelf:'flex-end',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#EEF2F6',
        
    },
    headerContainer:{
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1,
        padding:5,
    },
    footerContainer:{
        //position:'absolute',
        alignSelf:"flex-end",
        width:'100%',
        bottom:0,
        padding:10,
        borderTopColor:"#CCD6E0",
        borderTopWidth:1,
        backgroundColor:'#FFFFFF',
    }
})