import React,{useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OverlayHeader from './OverlayHeader';
import OverlayFooter from './OverlayFooter'
import OverlayDataFields from './OverlayDataFields';
import ProgressContainer from '../Progress/ProgressContainer'
import TabsContainer from '../Tabs/TabsContainer'
import OverlayComplete from './OverlayComplete';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import {caseActions} from '../../../reducers/caseFilesReducer'
import {handleProgressBar} from '../../../helpers/caseFilesHelpers';

const Overlay = () => {
    const [state, dispatch] = useContext(CaseFileContext)
    const [tabNames, setTabNames] = useState([])

    const handleBar = (index) =>{
        const updatedList = handleProgressBar(index,state.progressBar.progressList,state.newItemAction.selectedStep,state.newItemAction.currentStepTabs.length )
        dispatch({
            type : caseActions.UPDATEPROGRESSBARLIST,
            newState : {progressList:updatedList}
        })
    }
    const handleNewItemPress = (tabIndex) =>{
        state.newItemAction.tabsCompletedList.includes(tabIndex) && (
            dispatch({
                type : caseActions.NEWITEMPRESS,
                newState : {
                    selectedTab : tabIndex,
                    tabsCompletedList : state.newItemAction.tabsCompletedList.slice(0,tabIndex)
                }
            }),
            handleBar(tabIndex)
        )
    }
    
    useEffect(()=>{
        let tabNames = []
        state.newItemAction.currentStepTabs.map(tab =>{
            tabNames.push(tab.tabName)
        })
        setTabNames(tabNames)
    },[state.newItemAction.currentStepTabs])
    
    // console.log("Tabs: ", tabNames)
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
                            completedTabs={state.newItemAction.tabsCompletedList}
                            tabs={tabNames}
                            selectedTab = {state.newItemAction.selectedTab}
                            onPressChange = {handleNewItemPress}
                        />
                    </View>
                    
                </View>
                <View style={{flex:1}}>
                    {state.newItemAction.overlayComplete ?
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