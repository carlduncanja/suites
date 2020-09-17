import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AddIcon from '../../../assets/svg/addNewIcon';
import Table from '../common/Table/Table';
import Paginator from "../common/Paginators/Paginator";
import Button from '../common/Buttons/Button'; 
import Item from '../common/Table/Item';
import SearchableOptionsField from "../common/Input Fields/SearchableOptionsField";
import MultipleSelectionsField from "../common/Input Fields/MultipleSelectionsField";
import ClearList from '../../../assets/svg/clearList';

import IconButton from '../common/Buttons/IconButton'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import { getTheatres } from "../../api/network";
import _ from "lodash";
import { useNextPaginator,usePreviousPaginator } from '../../helpers/caseFilesHelpers';
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import DataItem from "../common/List/DataItem";
// import SearchableMultipleOptionField from "../common/InputFields/SearchableMultipleOptionField";

const ContentWrapper = styled.View`
    flex:1;
    flex-direction : column;
    position : relative;
`;

const SearchableFieldContainer = styled.View`
    margin-bottom : ${ ({theme}) => theme.space['--space-32']};
`;

const TableContainer = styled.View`
    margin-top : ${ ({theme}) => theme.space['--space-32']};
    height : 260px;
    z-index : -1;
`;

const ItemWrapper = styled.View`
    flex-direction : row;
    height : 20px;
    margin-bottom : ${ ({theme}) => theme.space['--space-24']};
    margin-right : ${ ({theme}) => theme.space['--space-24']};
`;

const FooterWrapper = styled.View`
    position : absolute;
    flex-direction : row;
    width : 100%;
    justify-content : space-between;
    align-items : center;
    bottom: 0;
    height : 32px;
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

const ClearListText = styled.Text( ({theme}) =>({
    ...theme.font['--text-xs-regular'],
    color : theme.colors['--color-blue-600'],
}))


function DialogLocationTab({onFieldChange, fields, handleLocations, locations = [],getSavedTheatres, savedTheatres, handlePopovers, popoverList }){

    const recordsPerPage = 4;
    const headers = [
        {
            name : "Location",
            alignment : "flex-start"
        },
        {
            name : "Recovery",
            alignment : "flex-end"
        },
    ];
    const theme = useTheme();

    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)

    const [searchLocationValue, setSearchLocationValue] = useState("")
    const [searchLocationResults, setSearchLocationResults] = useState([])
    const [searchLocationQuery, setSearchLocationQuery] = useState({});

    const [selectedLocations, setSelectedLocations] = useState([])
    const [isDisable, setIsDisable] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
 

    const handleDisplayData = (data = []) => {
        let newSet = new Set([...savedTheatres,...data])
        let updatedTheatres = [...newSet]
        return updatedTheatres
    }

    const totalPages =  locations.length === 0 ? 1 : Math.ceil(locations.length/recordsPerPage);

    useEffect(() => {

        if (!searchLocationValue) {
            // empty search values and cancel any out going request.
            setSearchLocationResults([]);
            if (searchLocationQuery.cancel) searchLocationQuery.cancel();
            return; 
        }

        // wait 300ms before search. cancel any prev request before executing current.

        const search = _.debounce(fetchTheatres, 300);

        setSearchLocationQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchLocationValue]);
 
    const fetchTheatres = () => {
        getTheatres(searchLocationValue, 5)
            .then((theatresResult = {}) => {
                const { data = [], pages = 0} = theatresResult
                
                const results = data.map(item => ({
                    // name: `Dr. ${item.surname}`,
                    ...item
                }));
                // console.log("Data: ", results);
                setSearchLocationResults(results || []);

            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get theatres");
                setSearchLocationValue([]);
            })
    };

    const goToNextPage = () => {
        if (currentPagePosition < totalPages){
            let {currentPage,currentListMin,currentListMax} = useNextPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1){
            let {currentPage,currentListMin,currentListMax} = usePreviousPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax)
        }
    };


    const onItemSelected = (location) =>{
        let updatedLocations = [...locations]
        setSelectedItem(location);
        updatedLocations.includes(location) ?
            updatedLocations = updatedLocations
            :
            updatedLocations = [...updatedLocations,location]
        handleLocations(updatedLocations);
        console.log("Locations:", updatedLocations);
    }

    const onClearItem = () => {
        setSearchLocationValue('');
        setSelectedItem(false);
    }

    const onClearPress = () =>{
        setSearchLocationValue('');
        handleLocations([]);
    }

    const onPressItem = (item) =>{ 
        let updatedLocations = [...selectedLocations]
        selectedLocations.includes(item) ?
            updatedLocations = updatedLocations.filter( location => location !== item)
            :
            updatedLocations = [...updatedLocations,item]
        setSelectedLocations(updatedLocations)
    }


    const buttonPress = () => {
        if(isDisable === false){
            let updatedTheatres = handleDisplayData()
            onFieldChange('supportedRooms')(updatedTheatres)
            // onFieldChange('supportedRooms')(updatedTheatres.map( item => item._id))
            getSavedTheatres(updatedTheatres)
        }
        setIsDisable(true)
    }

    const handleSelectedOption = (value) => {
        setSelectedLocations(value)
        let updatedLocations = handleDisplayData(value)
        onFieldChange('supportedRooms')(updatedLocations)
        getSavedTheatres(updatedLocations)
        // console.log("Data: ", value)
    }

    const listItem = (item) => {
        // console.log("Item: ", item)
        let recovery = item.hasRecovery ? "Yes" : "No"
        const recoveryColor = item.hasRecovery ?'--color-green-600' :'--color-red-600';

        return (
            <ItemWrapper theme = {theme}>
                <DataItem
                    text = {item?.name}
                    color = {'--color-blue-600'}
                    fontStyle = {'--text-base-medium'}
                />

                <DataItem
                    text = {recovery}
                    align = "flex-end"
                    color = {recoveryColor}
                    fontStyle = {'--text-sm-medium'}
                    // flex = {0.2}
                />
            </ItemWrapper>
        )
    }

    let { status } = popoverList.filter( item => item.name === 'location')[0]

    // let dataToDisplay = handleDisplayData()
    let dataToDisplay = [...locations]
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <ContentWrapper>

            <SearchableFieldContainer theme = {theme}>
                <SearchableOptionsField
                    value={selectedItem}
                    text={searchLocationValue}
                    oneOptionsSelected={(item)=> onItemSelected(item)}
                    onChangeText={(value) => {setSearchLocationValue(value)}}
                    onClear={()=>{onClearItem()}}
                    options={searchLocationResults}
                    placeholder = "Add New Location"
                    handlePopovers={() => {
                        // console.log("handle popovers");
                    }}
                    isPopoverOpen={searchLocationQuery}
                    // borderColor = {theme.colors['--color-gray-400']}
                />
            </SearchableFieldContainer>

            <TableContainer theme = {theme}>
                <Table
                    data = {dataToDisplay}
                    currentListMin = {currentPageListMin}
                    currentListMax = {currentPageListMax}
                    listItemFormat = {listItem}
                    headers = {headers}
                    isCheckbox = {false}
                />
            </TableContainer>

            <FooterWrapper>
                <PaginatorContainer theme={theme}>
                    <Paginator
                        currentPage = {currentPagePosition}
                        totalPages = {totalPages}
                        goToNextPage = {goToNextPage}
                        goToPreviousPage = {goToPreviousPage}
                        hasNumberBorder = {false}
                    />
                </PaginatorContainer>
                                        
                <ClearListContainer onPress = {onClearPress}>
                    <ClearListText theme = {theme}>Clear List</ClearListText>
                    <ClearList strokeColor = {theme.colors['--color-blue-600']}/>
                </ClearListContainer>

            </FooterWrapper>
            

            {/* <View style={[styles.addNewContainer]}>
                    <MultipleSelectionsField
                        label={"Add New Location"}
                        value = {fields['supportedRooms']}
                        onOptionsSelected = {(value)=>{handleSelectedOption(value)}}
                        options = {searchLocationResults}
                        searchText = {searchLocationValue}
                        onSearchChangeText = {(value)=> setSearchLocationValue(value)}
                        onClear={()=>{setSearchLocationValue('')}}
                        // handlePopovers = {(value)=>handlePopovers(value)('location')}
                        handlePopovers = {()=>{}}
                        isPopoverOpen = {searchLocationQuery}
                    />
            </View> */}

            {/* <View style={[styles.container,styles.listContainer,{zIndex:-1}]}>
                <Table
                    isCheckbox = {false}
                    data = {dataToDisplay}
                    listItemFormat = {listItem}
                    headers = {headers}
                />
                <View style={styles.footer}>
                    <View style={styles.paginatorContainer}>
                        <Paginator
                            totalPages = {totalPages}
                            goToNextPage = {goToNextPage}
                            goToPreviousPage = {goToPreviousPage}
                            currentPage = {currentPagePosition}
                        />
                    </View>

                    {/* <View style={[styles.buttonContainer,{
                        backgroundColor: isDisable ? "#F8FAFB" : "#4299E1",
                        color: isDisable ? "#4299E1" : "#F8FAFB"
                    }]}>
                        <Button
                            backgroundColor = {isDisable ? "#F8FAFB" : "#4299E1"}
                            buttonPress = {()=>{buttonPress()}}
                            title = "DONE"
                            color = {isDisable ? "#4299E1" : "#F8FAFB"}
                        />
                    </View> 

                </View>
            </View> */}

        </ContentWrapper>
    )
}

DialogLocationTab.propTypes = {}
DialogLocationTab.defaultProps = {}

export default DialogLocationTab

const optionsStyles = {
    optionsContainer: {
        width: 600,
        backgroundColor:"rgba(255, 255, 255, 0)"
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        height: 350,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        padding: 24,
    },
    container:{
        backgroundColor:'#FFFFFF',
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        padding:10,
        paddingTop:6,
        paddingBottom:6,
    },
    addNewContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    listContainer:{
        marginTop:20,
        paddingTop:10,
        paddingBottom:10
    },
    footer:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    paginatorContainer:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#FFFFFF',
        // padding:4,
        height:40,
        width: 150
    },
    buttonContainer:{
        padding:30,
        paddingBottom:5,
        paddingTop:5,
        borderColor:'#CCD6E0',
        borderWidth:1,
        borderRadius:4,
        backgroundColor:'#F8FAFB',
        alignItems:'center',
        justifyContent:'center'
    },
    itemContainer:{
        flex:1,
        borderBottomColor:'#E3E8EF',
        borderBottomWidth:1,
        marginBottom:8,
        paddingBottom:10
    }
})
