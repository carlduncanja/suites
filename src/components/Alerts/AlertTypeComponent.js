import React, { useState } from 'react';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import CollapsibleListItem from '../common/List/CollapsibleListItem';
import Search from '../common/Search';
import SearchIcon from '../../../assets/svg/search';
import CalendarIcon from '../../../assets/svg/calendar';
import ClearIcon from '../../../assets/svg/clearIcon';
import { formatDate } from '../../utils/formatter';
import Footer from '../common/Page/Footer';
import Paginator from '../common/Paginators/Paginator';
import IconButton from '../common/Buttons/IconButton';

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
    //position: absolute;
    margin:16px;
    bottom: 18;
    right: 18;
    flex-direction:row;
    justify-content:space-between;
    border: ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    border-radius: 4px;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white'] };
`;

const TextItemContainer = styled.View`
    flex:1;
    padding-left: ${ ({theme}) => theme.space['--space-6']};
`;
const TextItem = styled.Text(({theme, color = '--color-gray-800', font = '--text-sm-regular'}) => ({
    ...theme.font[font],
    color: theme.colors[color],
    paddingTop: 2
}));

const ClearContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-right: 5px;
    padding-left: 5px;

`;

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
    goToNextPage,
    goToPreviousPage,
    searchValue,
    onChangeText,
    onChangeDate,
    onClearCalendarDates
}) {
    const theme = useTheme();
    const date = `${(!startDate && !endDate) ? 'Select date' : `${formatDate(startDate, 'DD/MM/YYYY')} ${(startDate !== '' || endDate !== '') && '-'} ${formatDate(endDate, 'DD/MM/YYYY')}` } `;
    // `${formatDate(startDate, 'DD/MM/YYYY')} - ${formatDate(endDate, 'DD/MM/YYYY')}`;

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
                                onPress={() => onChangeDate()}
                            >
                                <CalendarIcon/>
                                {
                                    dateSelected &&
                                    <>
                                        <TextItemContainer theme={theme}>
                                            <TextItem
                                                color={startDate ? '--color-gray-800' : '--color-gray-400'}
                                            >
                                                {date}
                                            </TextItem>
                                        </TextItemContainer>
                                        
                                        {/* <TextItem>{formatDate(startDate, 'DD/MM/YYYY')} {(startDate !== '' || endDate !== '') && '-'} {formatDate(endDate, 'DD/MM/YYYY')}</TextItem> */}
                                        {
                                            (startDate !== '' || endDate !== '') &&
                                                <ClearContainer onPress={() => onClearCalendarDates()}>
                                                    <ClearIcon/>
                                                    {/* <IconButton Icon={<ClearIcon/>} onPress={onClearCalendarDates} /> */}
                                                </ClearContainer>
                                            
                                        }
                                        
                                    </>
                                }
                                
                            </DateContainer>

                            <SearchContainer>
                                
                                <Search
                                    hasIcon={true}
                                    placeholderText="Search"
                                    Icon={<SearchIcon strokeColor={theme.colors['--color-gray-500']}/>}
                                    inputText={searchValue}
                                    changeText={value => onChangeText(value)}
                                    onClear={() => onChangeText('')}
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
                                goToNextPage={goToNextPage}
                                goToPreviousPage={goToPreviousPage}
                            /> 

                            <View style={styles.clearContianer}>
                                <TextItem>clear list</TextItem>
                            </View>
                        </FooterContainer>

                    </AlertContent>
                }

            </AlertContainer>
        </AlertWrapper>
    );
} 

const styles = StyleSheet.create({
   clearContianer:{
    justifyContent:"center",
    flexDirection:'row',
    alignItems:'center'
   }
})

AlertTypeComponent.propTypes = {};
AlertTypeComponent.defaultProps = {};

export default AlertTypeComponent;
