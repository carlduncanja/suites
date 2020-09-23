import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';
import SvgIcon from '../../../assets/SvgIcon';
import ClearList from '../../../assets/svg/clearList';
import CalendarIcon from '../../../assets/svg/calendar';
import Button from './Buttons/Button';
import Table from './Table/Table';
import Paginator from './Paginators/Paginator';
import SearchableOptionsField from './Input Fields/SearchableOptionsField';
import CreationDialogTabs from './Dialog/CreationDialogTabs';
import DateInputField from './Input Fields/DateInputField';
import {useNextPaginator, usePreviousPaginator} from '../../helpers/caseFilesHelpers';
import OverlayDialog from './Dialog/OverlayDialog';
import DialogTabs from './Dialog/DialogTabs';

const Overlayrapper = styled.View`
    height : 558px;
    /* width : px; */
`;
const OverlayContainer = styled.View`
    height : 100%;
    width : 100%;
`;
const ContentWrapper = styled.View`
    height : 435px;
    padding : ${ ({theme}) => theme.space['--space-32']} ${ ({theme}) => theme.space['--space-24']};
`;
const ContentContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const SearchableFieldContainer = styled.View`
    z-index : 1;
    margin-bottom : 24px;
`;

const ListContainerWrapper = styled.View`
    height : 299px;
    border : 1px solid ${ ({theme}) => theme.colors['--color-gray-400']};
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
    padding : ${ ({theme}) => theme.space['--space-16']};
    /* margin-top : ${ ({theme}) => theme.space['--space-24']}; */
    border-radius : 8px;
`;
const ListContentContainer = styled.View`
    height : 100%;
`;

const List = styled.View`
    height : 219px;
    border-bottom-color : ${ ({theme}) => theme.colors['--color-gray-300']};
    border-bottom-width : 1px;
`;

const FooterContainer = styled.View`
    width : 100%;
    height : 32px;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    position : absolute;
    bottom : 0;
`;

const PaginatorContainer = styled.View`
    height : 100%;
    width : 122px;
    border : 1px solid ${ ({theme}) => theme.colors['--color-gray-400']};
    border-radius : 4px;
`;

const ClearListContainer = styled.TouchableOpacity`
    height : 100%;
    flex-direction : row;
    width : 80px;
    align-items : center;
    justify-content : space-between;
`;

const ClearListText = styled.Text(({theme}) => ({
    ...theme.font['--text-xs-regular'],
    color: theme.colors['--color-gray-600'],
}));

const DateWrapper = styled.View`
    height : 34px;
    width : 100%;
    justify-content : space-between;
`;
const DateContainer = styled.View`
    height : 100%;
    width : 100%;
    flex-direction  :row;
    border : 1px solid ${ ({theme}) => theme.colors['--color-gray-400']};
    border-radius  :4px;
    justify-content :space-between;
    align-items : center;
    padding-right : ${ ({theme}) => theme.space['--space-8']};
`;

function CartCard(props) {
    const {
        title = '',
        onClearPress = () => {},
        closeModal = () => {},
        data = [],
        selectedTab = 0,
        listItemFormat = () => {},
        tabs,
        headers = [],
        isCheckBox = false,
        onPressTab = () => {},
        hasFooter = false,
        onFooterPress = () => {},
        footerTitle = 'DONE',
        searchText = '',
        searchResults = [],
        searchQuery,
        onSearchChange = () => {},
        onSelectItem = () => {},
        handleCloseDialog = () => {},
        hasSearch = true,
        onDateChange = () => {},
        errors = {errors},
        fields
    } = props;

    const theme = useTheme();

    const recordsPerPage = 4;
    const dataLength = data.length;
    const totalPages = Math.ceil(dataLength / recordsPerPage);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);

    const [selectedItem, setSelectedItem] = useState(false);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            const {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1) {
            const {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax);
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const onItemSelected = item => {
        setSelectedItem(item);
        onSelectItem(item);
    };

    const onClearItem = () => {
        onSearchChange('');
        setSelectedItem(false);
    };

    let dataToDisplay = [...data];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (

        <Overlayrapper>
            <OverlayContainer>

                <OverlayDialog
                    title={title}
                    onPositiveButtonPress={onFooterPress}
                    onClose={closeModal}
                    positiveText={footerTitle}
                >
                    {tabs &&
                        <CreationDialogTabs
                            tabs={tabs}
                            tab={selectedTab}
                        />
                    }

                    <ContentWrapper theme={theme}>
                        <ContentContainer>

                            <DateWrapper>
                                <DateContainer theme={theme}>
                                    <DateInputField
                                        placeholder="Delivery Date"
                                        borderColor="--color-gray-400"
                                        hasBorder={false}
                                        minDate={new Date()}
                                        onDateChange={onDateChange('deliveryDate')}
                                        value={fields.deliveryDate}
                                        onClear={() => onDateChange('deliveryDate')('')}
                                        mode="date"
                                        format="YYYY-MM-DD"
                                        errorMessage="Set an estimated date"
                                        hasError={errors.deliveryDate}
                                    />
                                    <CalendarIcon/>
                                </DateContainer>
                            </DateWrapper>

                            <ListContainerWrapper theme={theme}>
                                <ListContentContainer>

                                    <List theme={theme}>
                                        <Table
                                            data={dataToDisplay}
                                            currentListMin={currentPageListMin}
                                            currentListMax={currentPageListMax}
                                            listItemFormat={listItemFormat}
                                            headers={headers}
                                            isCheckbox={isCheckBox}
                                        />
                                    </List>

                                    <FooterContainer>

                                        <PaginatorContainer theme={theme}>
                                            <Paginator
                                                currentPage={currentPagePosition}
                                                totalPages={totalPages}
                                                goToNextPage={goToNextPage}
                                                goToPreviousPage={goToPreviousPage}
                                                hasNumberBorder={false}
                                            />
                                        </PaginatorContainer>

                                        <ClearListContainer onPress={onClearPress}>
                                            <ClearListText theme={theme}>Clear List</ClearListText>
                                            <ClearList/>
                                        </ClearListContainer>

                                    </FooterContainer>

                                </ListContentContainer>
                            </ListContainerWrapper>

                        </ContentContainer>
                    </ContentWrapper>

                </OverlayDialog>

            </OverlayContainer>
        </Overlayrapper>

    // <View style={styles.container}>
    //     <View style={styles.headerContainer}>
    //         <Text>{title}</Text>
    //         <TouchableOpacity onPress={()=>closeModal()} style={{alignItems:'flex-end'}}>
    //             <SvgIcon iconName = "searchExit" strokeColor="#718096"/>
    //         </TouchableOpacity>
    //     </View>

    //     {
    //         tabs && <View style={styles.tabContainer}>
    //             {
    //                 tabs.map((tab,index)=>{
    //                     return (
    //                         <View style={[styles.tab,{marginRight:10, backgroundColor: tab === selectedTab ? "#FFFFFF" : null}]} key={index}>
    //                             <Button
    //                                 backgroundColor = {tab === selectedTab ? "#FFFFFF" : null}
    //                                 color = {tab === selectedTab ? "#3182CE" : "#A0AEC0" }
    //                                 buttonPress = {()=>{onPressTab(tab)}}
    //                                 title = {tab}
    //                             />
    //                         </View>
    //                     )
    //                 })
    //             }
    //         </View>

    //     }

    //     <View style={{margin: 20}}>

    //         <View style={[styles.search, {zIndex:1}]}>
    //             <SearchableOptionsField
    //                 value={selectedItem}
    //                 text={searchText}
    //                 oneOptionsSelected={(item)=> onItemSelected(item)}
    //                 onChangeText={(value) => {onSearchChange(value)}}
    //                 onClear={()=>{onClearItem()}}
    //                 options={searchResults}
    //                 handlePopovers={() => {
    //                     // console.log("handle popovers");
    //                 }}
    //                 isPopoverOpen={searchQuery}
    //             />
    //         </View>

    //         <View style={styles.list}>
    //             <Table
    //                 data = {dataToDisplay}
    //                 currentListMin = {currentPageListMin}
    //                 currentListMax = {currentPageListMax}
    //                 listItemFormat = {listItemFormat}
    //                 headers = {headers}
    //                 isCheckbox = {isCheckBox}
    //             />
    //         </View>

    //         <View style={{justifyContent:'space-between', flexDirection:'row'}}>

    //             <View style={[styles.paginationContainer,{alignSelf:'flex-start'}]}>
    //                 <Paginator
    //                     currentPage = {currentPagePosition}
    //                     totalPages = {totalPages}
    //                     goToNextPage = {goToNextPage}
    //                     goToPreviousPage = {goToPreviousPage}
    //                 />
    //             </View>
    //             <TouchableOpacity
    //                 style={styles.clearListStyle}
    //                 onPress = {onClearPress}
    //             >
    //                 <Text style={{color:'#718096', fontSize:12}}>Clear List</Text>
    //                 <ClearList/>
    //             </TouchableOpacity>

    //         </View>

    //     </View>

    //     {
    //         hasFooter &&
    //         <View style={[styles.footer,{zIndex:-1}]}>
    //             <Button
    //                 backgroundColor = "#FFFFFF"
    //                 title = {footerTitle}
    //                 buttonPress = {onFooterPress}
    //                 color = "#4299E1"
    //             />
    //         </View>
    //     }

    // </View>

    );
}

export default CartCard;

const styles = StyleSheet.create({
    container: {
        // flex:1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        width: 550,
        // backgroundColor:'red'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#CCD6E0',
        borderBottomWidth: 1
    },
    headerTitle: {
        fontSize: 16,
        color: '#323843'
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEF2F6',
        paddingTop: 15,
        paddingBottom: 15
    },
    tab: {
        borderRadius: 4,
        padding: 10,
        paddingBottom: 6,
        paddingTop: 6
    },
    list: {
        // margin:15,
        borderColor: '#CCD6E0',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginTop: 15,
        marginBottom: 15
    },
    listDataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataText: {fontSize: 16},
    headerText: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500'
    },
    clearListStyle: {
        flexDirection: 'row',
        width: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    paginationContainer: {
        borderColor: '#CCD6E0',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 8,
        alignSelf: 'flex-end',
    },
    footer: {
        // backgroundColor:'#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#CCD6E0',
        padding: 5,
        paddingBottom: 20,
        paddingTop: 20
    },
    search: {
        height: 40,
        backgroundColor: '#FFFFFF',
        // borderColor:'#CCD6E0',
        // borderWidth:1,
        // borderRadius:8
    }
});
