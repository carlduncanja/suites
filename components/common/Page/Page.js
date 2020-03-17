import React,{ useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing,} from 'react-native';
import { ModalProvider, createModalStack } from "react-native-modalfy";
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../reducers/suitesAppReducer';
import { getList } from '../../../hooks/useListHook'

const Page = () => {
    const [state,dispatch] = useContext(SuitesContext)

    useEffect(()=>{
        dispatch({
            type:appActions.SETTOTALPAGES, 
            newState: { totalPages : Math.ceil(state.list.listData.length/state.paginatorValues.recordsPerPage) }
        })
    },[state.list.listData])

    useEffect(()=>{
        let data 
        let headers = []
        let selected = []
        if (state.currentNavPage === 'caseFiles') {
            data = require('../../../assets/db.json').caseFiles.caseFilesInformation.data
            headers = require('../../../assets/db.json').caseFiles.caseFilesInformation.headers
            selected = require('../../../assets/db.json').caseFiles.caseDetails
        }else if (state.currentNavPage === 'schedule'){
            data = require('../../../assets/db.json').appointments
        }

        dispatch({
            type: appActions.SETLISTDATA,
            newState : {
                listData: getList(data, headers),
                listHeaders : headers,
                selectedSourceData : selected
            }
        })
        
    },[state.list.listData])

    useEffect(()=>{
        const array = require('../../../assets/db.json').floatingActions.filter(actionsObj => actionsObj.page === state.currentNavPage)
        dispatch({
            type:appActions.SETFLOATINGACTIONS,
            newState: {
                actionTitle:array[0].page,
                actions:array[0].actions
            }
        })
    }, state.currentNavPage)
    
    useEffect(()=>{
        const menu = require('../../../assets/db.json').overlayMenuTabs.filter(menu => menu.page === state.currentNavPage)
        menu.length > 0 && dispatch({
            type: appActions.SETOVERLAYMENU,
            newState:{
                menu : menu[0].menuTabs,
                selectedMenuItemTabs : menu[0].menuTabs[0].overlayTab,
            }
        })            
    },[state.overlayMenu.menu, state.slideOverlay.slideOverlayStatus])

    const getPageMeasure = (event) => {
        dispatch({
            type:appActions.SETPAGEMEASURES,
            newState : event.nativeEvent.layout
        })
    }

    const getSlideTop = (event) =>{
        dispatch({
            type:appActions.SETSLIDEVALUE,
            newState : event.nativeEvent.layout.height
        })
    }

    const [actionAnimValue] = useState(new Animated.Value(0))

    actionAnimValue.addListener((value)=>{
        // console.log("Value:", value.value)
    })

    useEffect(()=>{
        Animated.timing(
            actionAnimValue,
            {
              toValue: 1,
              duration: 150,
              //easing:Easing.cubic
            }
          ).start();
    })

    const actionAnimStyles = {
        width: actionAnimValue.interpolate({
          inputRange: [0, 0.5, 1,1.5,2,2.5,3],
          outputRange: [0, 100, 200,300,400,500,600]
        }),
        height :actionAnimValue.interpolate({
        inputRange: [0, 0.5, 1,1.5,2,2.5,3],
          outputRange: [0, 50, 100,300,400,500,600]
        }),
    };
 
    return ( 
        <View style={{flex:1}} onLayout={(event)=> getPageMeasure(event)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{marginBottom:25}} onLayout = {(event)=> getSlideTop(event)}>
                        <PageTitle />
                    </View>
                    <View style={{marginBottom:30}}>
                        <Search/>
                    </View>
                </View>

                <View style={styles.list}>
                    <List/>
                </View>
            
                <View style={styles.footer}>
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator />
                    </View>
                
                    {state.floatingActions.actionButtonState === false ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1" modalToOpen="ActionContainerModal"/>
                        :
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0"/>
                    }
                </View>
            </View>
        </View>
    );
}
 
export default Page;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        marginLeft:5,
        padding:15,
        backgroundColor:'#FAFAFA'
    },
    header:{
    },
    list:{
        flex:1,
    },
    footer:{
        flex:1,
        alignSelf:'flex-end', 
        flexDirection:'row', 
        position:'absolute', 
        bottom:0, 
        marginBottom:20, 
        right:0, 
        marginRight:30,
    },
})