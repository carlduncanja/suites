import React,{ useContext, useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing,} from 'react-native';
import { ModalProvider, createModalStack } from "react-native-modalfy";
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer';
import { CaseFileContext } from '../../../contexts/CaseFileContext';
import { transformToCamel } from '../../../hooks/useTextEditHook';


const Page = ({pageTitle, placeholderText, changeText, inputText, routeName}) => {

    const [state,dispatch] = useContext(SuitesContext)

    const toggleActionButton = () => {
        dispatch({
            type:appActions.TOGGLEACTIONBUTTON,
            newState : !state.floatingActions.actionButtonState
        })
    }

    useEffect(()=>{
        const array = require('../../../../assets/db.json').floatingActions.filter(actionsObj => actionsObj.page === transformToCamel(routeName))
        dispatch({
            type:appActions.SETFLOATINGACTIONS,
            newState: {
                actionTitle:array[0].page,
                actions:array[0].actions
            }
        })
    }, routeName)

    useEffect(()=>{
        const menu = require('../../../../assets/db.json').overlayMenuTabs.filter(menu => menu.page === transformToCamel(routeName))
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

    return (
        <View
            style={{flex:1}}
            onLayout={(event)=> getPageMeasure(event)}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{marginBottom:25}} onLayout = {(event)=> getSlideTop(event)}>
                        <PageTitle
                            pageTitle = {pageTitle}
                        />
                    </View>
                    <View style={{marginBottom:30}}>
                        <Search
                            placeholderText = {placeholderText}
                            changeText = {changeText}
                            inputText = {inputText}
                        />
                    </View>
                </View>

                <View style={styles.list}>
                    <List
                    />
                </View>

                <View style={styles.footer}>
                    <View style={{alignSelf:"center", marginRight:10}}>
                        <RoundedPaginator />
                    </View>

                    {state.floatingActions.actionButtonState === false ?
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1" modalToOpen="ActionContainerModal" toggleActionButton = {toggleActionButton}/>
                        :
                        <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0" toggleActionButton = {toggleActionButton}/>
                    }
                </View>
            </View>
        </View>
    );
};

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
});
