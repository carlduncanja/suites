import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ActivityIndicator} from 'react-native';
import {ModalProvider, createModalStack} from "react-native-modalfy";
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import RoundedPaginator from '../Paginators/RoundedPaginator';
import FloatingActionButton from '../FloatingAction/FloatingActionButton';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {appActions} from '../../../redux/reducers/suitesAppReducer';
import {CaseFileContext} from '../../../contexts/CaseFileContext';
import {transformToCamel} from '../../../hooks/useTextEditHook';
import {colors} from '../../../styles'

/**
 * @param placeholderText string
 * @param changeText function
 * @param inputText string
 * @param routeName string
 * @param listData array of objects
 * @param listHeaders array of strings
 * @param isFetchingData bool
 * @param totalPages number
 * @param currentPagePosition number
 * @param currentPageListMin number
 * @param currentPageListMax number
 * @param goToNextPage function
 * @param goToPreviousPage
 * @param listItemFormat object
 * @returns {*}
 * @constructor
 */
const Page = (props) => {
    const [state, dispatch] = useContext(SuitesContext);
 
    const {
        placeholderText,
        changeText,
        inputText,
        routeName,
        listData,
        listHeaders,
        isFetchingData,
        totalPages,
        currentPagePosition,
        currentPageListMin,
        currentPageListMax,
        goToNextPage,
        goToPreviousPage,
        listItemFormat,
        onRefresh,
        onSelectAll,
        itemsSelected
    } = props;

    const toggleActionButton = () => {
        dispatch({
            type: appActions.TOGGLEACTIONBUTTON,
            newState: !state.floatingActions.actionButtonState
        })
    }

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
            type: appActions.SETPAGEMEASURES,
            newState: event.nativeEvent.layout
        })
    };

    const getSlideTop = (event) => {
        dispatch({
            type: appActions.SETSLIDEVALUE,
            newState: event.nativeEvent.layout.height
        })
    };

    return (
        <View
            style={{flex: 1}}
            onLayout={(event) => getPageMeasure(event)}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{marginBottom: 25}} onLayout={(event) => getSlideTop(event)}>
                        <PageTitle
                            pageTitle={routeName}
                        />
                    </View>
                    <View style={{marginBottom: 30}}>
                        <Search
                            placeholderText={placeholderText}
                            changeText={changeText}
                            inputText={inputText}
                        />
                    </View>
                </View>

                <View style={styles.list}>
                    {
                        isFetchingData ?
                            <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                                <ActivityIndicator style={{alignSelf: 'center'}} size="large" color={colors.primary}/>
                            </View>
                            : <List
                                listData={listData}
                                listHeaders={listHeaders}
                                itemsSelected={itemsSelected}
                                onRefresh={onRefresh}
                                // routeName={routeName}
                                onSelectAll={onSelectAll}
                                // currentPageListMin={currentPageListMin}
                                // currentPageListMax={currentPageListMax}
                                listItemFormat={listItemFormat}
                                refreshing={isFetchingData}
                            />
                    }
                </View>

                <View style={styles.footer}>
                    <View style={{alignSelf: "center", marginRight: 10}}>
                        <RoundedPaginator
                            totalPages={totalPages}
                            currentPage={currentPagePosition}
                            goToNextPage={goToNextPage}
                            goToPreviousPage={goToPreviousPage}
                        />
                    </View>

                    {
                        state.floatingActions.actionButtonState === false ?
                            <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#4299E1"
                                                  modalToOpen="ActionContainerModal"
                                                  toggleActionButton={toggleActionButton}/>
                            :
                            <FloatingActionButton fillColor="#FFFFFF" backgroundColor="#A0AEC0"
                                                  toggleActionButton={toggleActionButton}/>
                    }
                </View>

            </View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 5,
        padding: 15,
        backgroundColor: '#FAFAFA'
    },
    header: {},
    list: {
        flex: 1,
    },
    footer: {
        flex: 1,
        alignSelf: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        right: 0,
        marginRight: 30,
    },
});
