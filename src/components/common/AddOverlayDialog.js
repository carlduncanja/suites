import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SvgIcon from "../../../assets/SvgIcon";
import ClearList from '../../../assets/svg/clearList';
import Button from "./Buttons/Button";
import Table from "./Table/Table"
import Paginator from './Paginators/Paginator';
import SearchableOptionsField from './Input Fields/SearchableOptionsField';
import CreationDialogTabs from './Dialog/CreationDialogTabs';
import {useNextPaginator,usePreviousPaginator} from '../../helpers/caseFilesHelpers';
import OverlayDialog from "./Dialog/OverlayDialog";
import DialogTabs from "./Dialog/DialogTabs";
import styled, {css} from '@emotion/native';
import { useTheme } from 'emotion-theming';

const Overlayrapper = styled.View`
    height : 571px;
    width : 636px;
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

const TabsContainer = styled.View`
    height : 52px;
`;

const SearchableFieldContainer = styled.View`
    z-index : 1;
    margin-bottom : 24px;
`

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

const ClearListText = styled.Text( ({theme}) =>({
    ...theme.font['--text-xs-regular'],
    color : theme.colors['--color-gray-600'],
}))

function AddOverlayDialog(props){

    const {
        title = "",
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
        footerTitle = "DONE",
        searchText = "",
        searchResults = [],
        searchQuery,
        onSearchChange = () => {},
        onSelectItem = () => {},
        handleCloseDialog = () => {},
        hasSearch = true,
    } = props

    const theme = useTheme();

    const recordsPerPage = 4
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength/recordsPerPage)

    const [currentPagePosition, setCurrentPagePosition] = useState(1)
    const [currentPageListMin, setCurrentPageListMin] = useState(0)
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage)

    const [selectedItem, setSelectedItem] = useState(false)

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

    const onItemSelected = (item) => {
        setSelectedItem(false)
        onSearchChange('')
        onSelectItem(item)
    }

    const onClearItem = () => {
        onSearchChange('')
        setSelectedItem(false)
    }

    let dataToDisplay = [...data]
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax)

    return(

        <Overlayrapper>
            <OverlayContainer>

                <OverlayDialog
                    title={title}
                    onPositiveButtonPress={onFooterPress}
                    onClose={closeModal}
                    positiveText={footerTitle}
                >
                    {tabs &&
                        <TabsContainer>
                            <CreationDialogTabs
                                tabs = {tabs}
                                tab = {selectedTab}
                            />
                        </TabsContainer>

                    }


                    <ContentWrapper theme = {theme}>
                        <ContentContainer>
                            {
                                hasSearch &&
                                <SearchableFieldContainer>
                                    <SearchableOptionsField
                                        value={selectedItem}
                                        text={searchText}
                                        oneOptionsSelected={(item)=> onItemSelected(item)}
                                        onChangeText={(value) => {onSearchChange(value)}}
                                        onClear={()=>{onClearItem()}}
                                        options={searchResults}
                                        handlePopovers={() => {
                                            // console.log("handle popovers");
                                        }}
                                        isPopoverOpen={searchQuery}
                                        borderColor = {theme.colors['--color-gray-400']}
                                    />
                                </SearchableFieldContainer>
                            }


                            <ListContainerWrapper theme = {theme}>
                                <ListContentContainer>

                                    <List theme = {theme}>
                                        <Table
                                            data = {dataToDisplay}
                                            currentListMin = {currentPageListMin}
                                            currentListMax = {currentPageListMax}
                                            listItemFormat = {listItemFormat}
                                            headers = {headers}
                                            isCheckbox = {isCheckBox}
                                        />
                                    </List>



                                    <FooterContainer>

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
    )
}

export default AddOverlayDialog
