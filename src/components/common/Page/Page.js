import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';

import Wrapper from '../Wrapper';
import LoadingIndicator from '../LoadingIndicator';
import {SuitesContext} from '../../../contexts/SuitesContext';
import {appActions} from '../../../redux/reducers/suitesAppReducer';
import {colors} from '../../../styles'
import PropTypes from 'prop-types';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';


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

 function Page (props){
    
    // const [state, dispatch] = useContext(SuitesContext);
    const theme = useTheme()
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
        itemsSelected,
        onClear
    } = props;

    // const getPageMeasure = (event) => {
    //     dispatch({
    //         type: appActions.SETPAGEMEASURES,
    //         newState: event.nativeEvent.layout
    //     })
    // };

    // const getSlideTop = (event) => {
    //     dispatch({
    //         type: appActions.SETSLIDEVALUE,
    //         newState: event.nativeEvent.layout.height
    //     })
    // };
   
    const PageWrapper = styled.View`
        display : flex;
        height: 100%;
        flex-direction : column;
        margin-left : 0px;
        padding-left: ${theme.space['--space-32']};
        padding-top: 28px;
        padding-right: 32px;
        padding-bottom: 28px;
        background-color : ${theme.colors['--color-gray-100']};
    `;

    const PageContainer = styled.View`
        display: flex;
        height: 100%;
        
        
    `;

    return ( 
            <PageWrapper>
                <PageContainer>  
                    <PageTitle pageTitle={routeName}/>
                    <Search
                        placeholderText={placeholderText}
                        changeText={changeText}
                        inputText={inputText}
                        onClear = {()=>{changeText("")}}
                    />
                    {
                        isFetchingData ?
                            <LoadingIndicator/>
                            : 
                            <List
                                listData={listData}
                                listHeaders={listHeaders}
                                itemsSelected={itemsSelected}
                                onRefresh={onRefresh}
                                isCheckbox={true}
                                onSelectAll={onSelectAll}
                                listItemFormat={listItemFormat}
                                refreshing={isFetchingData}
                            />
                    }
                </PageContainer>
            </PageWrapper>
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
