import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import PageTitle from './PageTitle';
import Search from '../Search';
import List from '../List/List';
import DisabledSectionComponent from '../../DisabledSectionComponent';
import EmptyState from '../../../../assets/svg/emptyState'
import Wrapper from '../Wrapper';
import LoadingIndicator from '../LoadingIndicator';
import { SuitesContext } from '../../../contexts/SuitesContext';
import { PageSettingsContext } from '../../../contexts/PageSettingsContext';
import { appActions } from '../../../redux/reducers/suitesAppReducer';
import { colors } from '../../../styles';
import PropTypes from 'prop-types';
import styled, { css } from '@emotion/native';
import { useTheme } from 'emotion-theming';
import { useNavigation, useRoute, } from '@react-navigation/native';

const PageWrapper = styled.View`
        display : flex;
        height: 100%;
        flex-direction : column;
        margin-left : 0px;
        padding-left: ${({ theme }) => theme.space['--space-32']};
        padding-top: 28px;
        padding-right: 32px;
        padding-bottom: 28px;
        background-color : ${({ theme }) => theme.colors['--color-gray-100']};
    `;

const PageContainer = styled.View`
        display: flex;
        height: 100%;
       
       
    `;

const PageSearchWrapper = styled.View` 
        width: 100%; 
        margin-bottom : ${({ theme }) => theme.space['--space-24']};
`;

const PageHeader = styled.View`
    flex-direction:row;
    width:100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`
const PageContent = styled.View`
 align-items: center; 
 justify-content: center;
 padding-bottom: ${({ theme }) => theme.space['--space-72']};
`
const IconWrapper = styled.View`
   margin-bottom: ${({ theme }) => theme.space['--space-40']};
   
`
const MessageWrapper = styled.Text(({ theme }) => ({
    ...theme.font['--text-base-bold'],
    color: theme.colors['--color-gray-600'],
    marginBottom: 20
}))


/** 
 * @returns {*}
 * @constructor
 */
function Page(props) {

    // const [state, dispatch] = useContext(SuitesContext);
    const theme = useTheme();
    const { pageSettingState } = useContext(PageSettingsContext);
    const { isDisabled } = pageSettingState;
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
        onClear,
        TopButton,
        hasList = true,
        hasSearch = true,
        pageContent,
        // navigation
    } = props;

    const navigation = useNavigation();
    const route = useRoute();

    const isAdmin = route?.params?.isAdmin || false;
    
    const content = listData?.length>1 ? (
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
    ) :
        //pageContent;
        <PageContent theme={theme}>
            {/*    ICON     */}
            <IconWrapper theme={theme}>
                <EmptyState />
            </IconWrapper>

            {/*    MESSAGE HEADER  */}
            <MessageWrapper theme={theme}>{"No Theatres Found"}</MessageWrapper>

        </PageContent>

    return (
        <PageWrapper theme={theme}>
            <PageContainer theme={theme}>
                <PageHeader>
                    <PageTitle pageTitle={routeName} />

                    {TopButton && <TopButton /> }

                </PageHeader>

                {
                    hasSearch &&
                    <PageSearchWrapper theme={theme}>
                        <Search
                            placeholderText={placeholderText}
                            changeText={changeText}
                            inputText={inputText}
                            onClear={() => {
                                changeText('');
                            }}
                        />
                    </PageSearchWrapper>
                }
                
                {
                    isFetchingData ?
                        <LoadingIndicator /> :
                        isDisabled ? (
                            <DisabledSectionComponent
                                navigation={navigation}
                                isAdmin={isAdmin}
                            />
                          ) :
                            content
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
