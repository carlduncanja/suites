import React, { useState } from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';

import CollapsibleListItem from '../common/List/CollapsibleListItem';
import Search from '../common/Search';
import SearchIcon from '../../../assets/svg/search';
import CalendarIcon from '../../../assets/svg/calendar';
import ClearIcon from '../../../assets/svg/clearIcon';
import { formatDate } from '../../utils/formatter';
import { View } from 'react-native';
import Footer from '../common/Page/Footer';
import Paginator from '../common/Paginators/Paginator';

const AlertWrapper = styled.View`
    display: flex;
`;

const AlertContainer = styled.View`
    display : flex;
    flex-direction: column;
    background-color: ${ ({theme, backgroundColor}) => backgroundColor ? theme.colors[backgroundColor] : theme.colors['--default-shade-white']};
    
    border-radius: 8px;
    border: ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
`;

const HeaderContainer = styled.TouchableOpacity`
    width: 100%;
    height: 52px;
    flex-direction: row;
    background-color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding-left: ${ ({theme}) => theme.space['--space-18']};
    padding-right: ${ ({theme}) => theme.space['--space-18']};
    border-bottom-color: ${ ({theme}) => theme.colors['--color-gray-300']};
    border-radius: ${ ({isCollapsed}) => isCollapsed ? 0 : `8px`};
    border-bottom-width: ${ ({isCollapsed}) => isCollapsed ? `1px` : 0};
`;

const AlertContent = styled.View`
    display: flex;
    padding-left: ${ ({theme}) => theme.space['--space-18']};
    padding-right: ${ ({theme}) => theme.space['--space-18']};
    
`;

const HeaderSearchContainer = styled.View`
    height: 32px;
    width: 100%;
    margin-top : ${ ({theme}) => theme.space['--space-16']};
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${ ({isCollapsed}) => !isCollapsed ? `20px` : `30px`};
`;

const DateContainer = styled.TouchableOpacity`
    width: 250px;
    flex-direction: row;
    border: ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    padding: ${ ({theme}) => theme.space['--space-8']};
    padding-top: 0;
    padding-bottom: 0;
`;

const SearchContainer = styled.View`
    width : 212px;
`;

const ContentContainer = styled.View`
    display: flex;
    margin-bottom: 80px;
`;

const FooterContainer = styled.View`
    height: 32px;
    width: 122px;
    position: absolute;
    bottom: 18;
    right: 18;
    border: ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    border-radius: 4px;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white'] };
`;

const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-sm-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

function AlertTypeComponent({
    header = () => {},
    isCollapsed = true,
    startDate = new Date(),
    endDate = new Date(),
    dateSelected = true,
    content = () => {},
    onItemPress,
    backgroundColor,
    currentPage,
    totalPages,
}) {
    const theme = useTheme();

    return (
        <AlertWrapper theme={theme}>
            <AlertContainer
                theme={theme}
                backgroundColor={backgroundColor}
            >

                <HeaderContainer
                    theme={theme}
                    onPress={onItemPress}
                    activeOpacity={1}
                    isCollapsed={isCollapsed}
                >
                    {header()}
                </HeaderContainer>

                {
                    isCollapsed &&

                    <AlertContent
                        theme={theme}
                    >

                        <HeaderSearchContainer isCollapsed={isCollapsed}>

                            <DateContainer
                                theme={theme}
                                onPress={() => {}}
                            >
                                <CalendarIcon/>
                                {
                                    dateSelected &&
                                    <>
                                        <TextItem>{formatDate(startDate, 'DD/MM/YYYY')} - {formatDate(endDate, 'DD/MM/YYYY')}</TextItem>
                                        <ClearIcon/>
                                    </>
                                }
                                
                            </DateContainer>

                            <SearchContainer>
                                
                                <Search
                                    hasIcon={true}
                                    placeholderText="Search"
                                    Icon={<SearchIcon strokeColor={theme.colors['--color-gray-500']}/>}
                                />
                            </SearchContainer>

                        </HeaderSearchContainer>
                    
                        <ContentContainer>
                            {content}
                        </ContentContainer>

                        <FooterContainer theme={theme}>
                            <Paginator
                                currentPage={currentPage}
                                totalPages={totalPages}
                                hasNumberBorder={false}
                                goToNextPage={() => {}}
                                goToPreviousPage={() => {}}
                            />
                        </FooterContainer>

                    </AlertContent>
                }

            </AlertContainer>
        </AlertWrapper>
    );
}

export default AlertTypeComponent;
