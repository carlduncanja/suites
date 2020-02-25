import React,{useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import OverlayHeader from './OverlayHeader';
import OverlayFooter from './OverlayFooter'
import OverlayDataFields from './OverlayDataFields';
import ProgressContainer from '../Progress/ProgressContainer'
import TabsContainer from '../Tabs/TabsContainer'
import { SuitesContext } from '../../../contexts/SuitesContext';

const Overlay = () => {
    const suitesState = useContext(SuitesContext).state
    const suitesMethod = useContext(SuitesContext).methods
    return (  
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <OverlayHeader/>
            </View> 
            <View style={styles.contentContainer}>
                <View style={styles.progressContainter}>
                    <ProgressContainer/>
                    <View style={{alignItems:'center'}}>
                        <TabsContainer 
                            tabs={suitesState.currentStepTabs}
                            selectedTab = {suitesState.currentSelectedStepTab}
                            onPressChange = {suitesMethod.handleNewItemPress}
                        />
                    </View>
                </View>
                <View style={styles.dataContainer}>
                    <OverlayDataFields/>
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
        backgroundColor:'#FFFFFF',
        //padding:5,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,    
        // elevation: 5,
        width:'90%',
        height:'55%',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#EEF2F6',
    },
    headerContainer:{
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1,
        padding:5,
        //paddingBottom:5,
    },
    contentContainer:{},
    progressContainter:{
        backgroundColor:'#EEF2F6'
    },
    dataContainer:{
    },
    footerContainer:{
        position:'absolute',
        width:'100%',
        bottom:0,
        padding:10,
        borderTopColor:"#CCD6E0",
        borderTopWidth:1,
        backgroundColor:'#FFFFFF',
    }
})