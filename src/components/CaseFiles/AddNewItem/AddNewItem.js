import React, { useState, useEffect } from 'react';
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';
import OverlayDialog from '../../common/Dialog/OverlayDialog';
import CreationDialogTabs from '../../common/Dialog/CreationDialogTabs';
import IconButton from "../../common/Buttons/IconButton";
import AddNew from '../../../../assets/svg/addNewIcon';
import Search from '../../common/Search';

import { getInventoriesGroup, getEquipmentTypes } from "../../../api/network";
import _ from "lodash";

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Paginator from '../../common/Paginators/Paginator';
import SearchResults from './SearchResults';
import { useModal } from 'react-native-modalfy';

const AddItemWrapper = styled.View`
    height : 563px;
    width : 624px;
`;
const AddItemContainer = styled.View`
    height : 100%;
    width : 100%;
`;

const ContentWrapper = styled.View`
    height : 428px;
    width : 100%;
    padding : ${ ({theme}) => `${theme.space['--space-16']} ${theme.space['--space-14']}`};
`;
const ContentContainer = styled.View`
    width : 100%;
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    // position : relative;
`;

const SearchContainer = styled.View`
    width : 100%;
    position : relative;
`;

const ResultsWrapper = styled.View`
    height : 160px;
    width : 100%;
    position : absolute;
    top : 32;
`;
const ResultsContainer = styled.View`
    height : 100%;
    width : 100%;
    padding : ${ ({theme}) => `${theme.space['--space-10']} ${theme.space['--space-12']}`};
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    border : 1px solid ${({theme}) => theme.colors['--color-gray-400']};
    border-top-width : 0px;
    border-radius : 0px 0px 8px 8px;
`;

const TableWrapper = styled.View`
    height : 276px;
    width : 100%;
    margin-top : 24px;
    margin-bottom : 32px;
    z-index : ${ ({zIndex}) => zIndex};
`;
const TableContainer = styled.View`
    height : 100%;
    width : 100%;
    padding : ${ ({theme}) => theme.space['--space-12']};
    background-color: ${ ({theme}) => theme.colors['--default-shade-white']};
    border : 1px solid ${({theme}) => theme.colors['--color-gray-400']};
    border-radius : 8px;
`;

const FooterWrapper = styled.View`
    height : 32px;
    width : 100%;
    // position : absolute;
    // top :0;
    // bottom : 0;
`;
const FooterContainer = styled.View`
    height : 100%;
    width : 100%;
    flex-direction : row;
    justify-content : space-between;
    align-items: center;
`;

const PaginatorContainer = styled.View`
    width : 122px;
    border : 1px solid ${ ({theme}) => theme.colors['--color-gray-400']};
    border-radius : 4px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
`;

const Description  = styled.Text( ({theme}) => ({
    ...theme.font['--text-base-regular'],
    color : theme.colors['--color-gray-700'],
})); 


function AddNewItem({itemToAdd}){

    const theme = useTheme();
    const modal = useModal();
    const tabs = [itemToAdd];

    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState({});


    useEffect(() => {

        if (!searchValue) {
            // empty search values and cancel any out going request.
            setSearchResults([]);
            if (searchQuery.cancel) searchQuery.cancel();
            return;
        }

        // wait 300ms before search. cancel any prev request before executing current.
        let searchFunction = itemToAdd === 'Consumable' ? fetchInventories : fetchEquipments 

        const search = _.debounce(searchFunction, 300)

        setSearchQuery(prevSearch => {
            if (prevSearch && prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search()
    }, [searchValue]); 

    const fetchInventories = () => {
        getInventoriesGroup(searchValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0} = results
                // console.log("Results: ", data)
                setSearchResults(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get inventories");
                setSearchResults([]);
            })
    };

    const fetchEquipments = () => {
        getEquipmentTypes(searchValue, 5)
            .then((results = {}) => {
                const { data = [], pages = 0} = results
                // console.log("Results: ", data)
                setSearchResults(data || []);
            })
            .catch(error => {
                // TODO handle error
                console.log("failed to get equipments");
                setSearchResults([]);
            })
    };

    const onClear = () =>{
        setSearchValue("");
        setSearchResults([]);
        // setSearchQuery(undefined);
    };

    const onSelectResult = (item) => {
        console.log("Result selected:", item)
    }

    const content = 
        <ContentWrapper theme = {theme}>
            <ContentContainer theme = {theme}>

                <SearchContainer>

                    <Search
                        placeholderText = "Add Item"
                        changeText = {value => setSearchValue(value)}
                        inputText = {searchValue}
                        onClear = {onClear}
                    />
                    {
                        searchValue !== "" && 
                            <SearchResults
                                results = {searchResults}
                                onPressResult = {onSelectResult}
                            />
                    }
                    
                    
                    
                </SearchContainer>
                
                <TableWrapper zIndex = {-1}>
                    <TableContainer theme={theme}>

                    </TableContainer>
                </TableWrapper>

                <FooterWrapper>
                    <FooterContainer>
                        
                        <PaginatorContainer theme = {theme}>
                            <Paginator
                                currentPage = {1}
                                totalPages = {2}
                                goToNextPage = {()=>{}}
                                goToPreviousPage = {()=>{}}
                                isNextDisabled = {false}
                                isPreviousDisabled = {false}
                                hasNumberBorder = {false}
                            />
                        </PaginatorContainer>

                        <Description theme={theme}>Showing 6 of 12</Description>
                        
                    </FooterContainer>
                </FooterWrapper>

            </ContentContainer>
        </ContentWrapper>
    
    return (
        <AddItemWrapper>
            <AddItemContainer>

                <OverlayDialog
                    title={`Add ${itemToAdd}`}
                    onPositiveButtonPress={()=>{}}
                    onClose={()=>modal.closeModals("OverlayModal")}
                    positiveText={"DONE"}
                >
                    <CreationDialogTabs
                        tabs = { tabs }
                        tab = {0}
                    />
                        {content}
                </OverlayDialog>

            </AddItemContainer>
        </AddItemWrapper>
    )
}

export default AddNewItem

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        width:600,
        height: 450,
        
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1
    },
    headerTitle:{
        fontSize:16,
        color:"#323843"
    },
    tabContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#EEF2F6',
        paddingTop:15,
        paddingBottom:15,
        height: 60,
    },
    tab:{
        borderRadius: 4,
        padding:10,
        paddingBottom:6,
        paddingTop:6
    },
    addNew:{
        flexDirection:'row',
        height:40,
        margin:15,
        padding:10,
        borderColor:'#CCD6E0',
        borderRadius:4,
        borderWidth:1,
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'red'
    },
    new:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderColor:'#CCD6E0',
        borderRadius:4,
        borderWidth:1,
        margin:15,
        height : 30,
    },
    list:{
        margin:15,
        borderColor:"#CCD6E0",
        borderWidth:1,
        borderRadius:8,
        padding:10
    },
    listDataContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    dataText:{
        fontSize:16
    },
    headerText:{
        fontSize:12,
        color:"#718096",
        fontWeight:'500'
    },
    buttonStyle:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:'#F8FAFB',
        borderRadius: 4,
        // padding:4,
        paddingLeft:25,
        paddingRight:25,
        marginBottom:20,
        alignItems:"center",
        justifyContent:'center',
    },
    paginationContainer:{
        borderColor:'#CCD6E0',
        borderWidth:1,
        backgroundColor:'#FFFFFF',
        borderRadius: 4,
        padding:8,
        // alignSelf:'flex-end',
        marginRight:15,
        // marginBottom:20,
    },
    footer:{
        // backgroundColor:'red',
        borderTopWidth:1,
        borderTopColor:'#CCD6E0',
        // borderBottomLeftRadius:4,
        padding:5,
        paddingBottom:20,
        paddingTop:20,
        marginTop:8,
        height:60
        
    }
})
