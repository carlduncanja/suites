import React, {useContext, useEffect, useState} from 'react';
import styled, {css} from '@emotion/native';
import PropTypes from 'prop-types';
import {useTheme} from 'emotion-theming';
import {Text, View} from 'react-native';
import {sub} from 'react-native-reanimated';
import SlideHeader from '../SlideOverlay/SlideHeader';
import PageHeader from '../Page/PageHeader';
import TabsContainer from '../Tabs/TabsContainerComponent';
import LoadingIndicator from '../LoadingIndicator';
import {PageContext} from '../../../contexts/PageContext';
import SvgIcon from '../../../../assets/SvgIcon';
import BreadCrumbIcon from '../../../../assets/svg/BreadCrumbIcon';

function DetailsPage({
    isArchive = false,
    hasIcon = null,
    timeStamp,
    status,
    appointmentObj,
    caseId,
    title = '__',
    isEditable,
    subTitle = '__',
    proceduresBillableItemsInfo,
    headerChildren,
    isSpecialHeader = false,
    selectedTab,
    onBackPress = () => {},
    pageTabs = null,
    ...props
}) {
    const theme = useTheme();

    const {pageState} = useContext(PageContext);
    const {isLoading} = pageState;

    useEffect(() => {
    }, []);

    return (
        <DetailsPageWrapper theme={theme}>
            <DetailsPageContainer theme={theme}>

                {
                    isLoading &&
                    < LoadingIndicator backgroundColor={theme.colors['--default-shade-white']}/>
                }

                <>
                    <PageHeader
                        timeStamp = {timeStamp}
                        status = {status}
                        appointmentObj = {appointmentObj}
                        caseId = {caseId}
                        isArchive={isArchive}  
                        selectedTab ={selectedTab}
                        isEditable={isEditable}                  
                        headerChildren={headerChildren || [title, subTitle]}
                        separator={<BreadCrumbIcon/>}
                        onBack={onBackPress}
                    />

                    <TabsViewContainer>{pageTabs}</TabsViewContainer>

                    <DetailsPageContentWrapper>
                        <DetailsPageContentContainer>
                            {
                                props.children
                            }
                        </DetailsPageContentContainer>
                    </DetailsPageContentWrapper>
                </>

            </DetailsPageContainer>
        </DetailsPageWrapper>
    );
}

const DetailsPageWrapper = styled.View`
    margin:0;
    background-color: ${({theme}) => theme.colors['--default-shade-white']};
`;

const DetailsPageContainer = styled.View`
    height:100%;
    width:100%;
`;

const DetailsPageContentWrapper = styled.View`
    flex:1;
    margin : 0;
    padding-top: ${({theme}) => theme.space['--space-32']};
    padding-left: ${({theme}) => theme.space['--space-24']};
    padding-right: ${({theme}) => theme.space['--space-24']};
`;

const DetailsPageContentContainer = styled.View`
    display: flex;
    flex:1;
`;

const TabsViewContainer = styled.View`
    height: 54px;
`;

DetailsPage.propTypes = {};
DetailsPage.defaultProps = {};

export default DetailsPage;
