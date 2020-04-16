import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {appActions} from '../../../redux/reducers/suitesAppReducer';
import {colors} from '../../../styles'
import PropTypes from 'prop-types';




/**
 * @param placeholderText string
 * @param changeText function
 * @param inputText string
 * @param routeName string
 * @param listData array of objects
 * @param listHeaders array of strings
 * @param isFetchingData bool
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
        listItemFormat,
        onRefresh,
        onSelectAll,
        itemsSelected
    } = props;

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

            </View>
        </View>
    );
};

export default Page;

Page.propTypes = {
    placeholderText: PropTypes.string,
    changeText: PropTypes.any,
    inputText: PropTypes.any,
    routeName: PropTypes.any,
    listData: PropTypes.any,
    listHeaders: PropTypes.any,
    isFetchingData: PropTypes.any,
    listItemFormat: PropTypes.any,
    onRefresh: PropTypes.any,
    onSelectAll: PropTypes.any,
    itemsSelected: PropTypes.any
};
Page.defaultProps = {};


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
