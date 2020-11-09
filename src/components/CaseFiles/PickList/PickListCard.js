import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SvgIcon from "../../../../assets/SvgIcon";
import Button from "../../common/Buttons/Button";
import Table from "../../common/Table/Table"
import Paginator from '../../common/Paginators/Paginator';
import {useNextPaginator,usePreviousPaginator} from '../../../helpers/caseFilesHelpers';
import OverlayDialog from "../../common/Dialog/OverlayDialog";
import styled, {css} from '@emotion/native';
import {useTheme} from 'emotion-theming';
import OverlayDialogHeader from "../../common/Dialog/OverlayDialogHeader";
import DialogTabs from "../../common/Dialog/DialogTabs";
 

const CardWrapper = styled.View`
    flex : 1;
    width : 624px;
`;
const CardContainer = styled.View`
    display : flex;
    width : 100%;
    position : relative;
    border-radius: 8px;
    background-color : ${ ({theme}) => theme.colors['--default-shade-white']};
`;

const CardFooterWrapper = styled.View`
  height : 57px;
  width : 100%;
  position : absolute;
  bottom:0;
  right : 16;
  z-index : 3;
`;

const CardFooterContainer = styled.View`
  height: 100%;
  width: 100%;
  flex-direction : row;
  align-items: center;
  justify-content: flex-end;
`;

const TabsContainer = styled.View`
    height : 46px;
    justify-content : flex-end;
    background-color: ${ ({theme}) => theme.colors['--color-gray-200']};
`;

const TableContainer = styled.View`
    height :276px;
    margin: ${ ({theme}) => theme.space['--space-16']};
    border : ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    border-radius : 8px;
    padding:16px;
`

const CardContentWrapper = styled.View`
    width : 100%;
    height : 400px;
`;

const PaginatorContainer = styled.View`
    height : 32px;
    width : 122px;
    border : ${ ({theme}) => `1px solid ${theme.colors['--color-gray-400']}`};
    border-radius : 4px;
`;


const PickListCard = (props) =>{ 

    const {
        title,
        isEditMode = false,
        onEditDone = ()=>{},
        closeModal,
        data,
        selectedTab,
        listItemFormat,
        tabs,
        headers,
        isCheckBox ,
        onPressTab,
        hasFooter = false,
        onFooterPress = () => {},
        footerTitle = ""
    } = props


    const theme = useTheme();
    const recordsPerPage = 5
    const dataLength = data.length
    const totalPages = Math.ceil(dataLength/recordsPerPage);

    const [currentPagePosition, setCurrentPagePosition] = useState(1);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(5);

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage,currentListMin,currentListMax} = useNextPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition > 1) {
            let {currentPage,currentListMin,currentListMax} = usePreviousPaginator(currentPagePosition,recordsPerPage,currentPageListMin,currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const onTabPress = tab => {
        onPressTab(tab);
        setCurrentPagePosition(1);
        setCurrentPageListMin(0);
        setCurrentPageListMax(5);
    };

    let dataToDisplay = [...data];
    dataToDisplay = dataToDisplay.slice(currentPageListMin,currentPageListMax);

    return(

        <CardWrapper>
            <CardContainer theme = {theme}>

                <OverlayDialogHeader
                    title = "Picklist"
                    onClose = {closeModal}
                />

                <CardFooterWrapper>
                    <CardFooterContainer>

                        <PaginatorContainer>
                            <Paginator
                                currentPage = {currentPagePosition}
                                totalPages = {totalPages}
                                goToNextPage = {goToNextPage}
                                goToPreviousPage = {goToPreviousPage}
                                hasNumberBorder = {false}
                            />
                        </PaginatorContainer>
                        
                    </CardFooterContainer>
                </CardFooterWrapper> 

                <CardContentWrapper>
                    <TabsContainer theme = {theme}>
                        <DialogTabs
                            tabs = {tabs}
                            tab = {selectedTab}
                            onTabPress = {onTabPress}
                        />
                    </TabsContainer>
                    

                    <TableContainer theme = {theme}>
                        <Table
                            data = {dataToDisplay}
                            currentListMin = {currentPageListMin}
                            currentListMax = {currentPageListMax}
                            listItemFormat = {listItemFormat}
                            headers = {headers}
                            isCheckbox = {isCheckBox}
                        />
                    </TableContainer>

                </CardContentWrapper>

            </CardContainer>
        </CardWrapper>


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
        //                         <View style={[styles.tab,{marginRight:10, backgroundColor: tab === selectedTab ? "#FFFFFF" : null, height: 30, width: 150}]} key={index}>
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



        //     <View style={styles.list}>
        //         <Table
        //             data = {dataToDisplay}
        //             currentListMin = {currentPageListMin}
        //             currentListMax = {currentPageListMax}
        //             listItemFormat = {listItemFormat}
        //             headers = {headers}
        //             isCheckbox = {isCheckBox}
        //         />
        //     </View>

        //     {
        //         isEditMode ?
        //             <View style={{marginLeft:20, marginRight:20, justifyContent:'space-between', flexDirection:'row'}}>
        //                 <View style={[styles.paginationContainer,{alignSelf:'flex-start'}]}>
        //                     <Paginator
        //                         currentPage = {currentPagePosition}
        //                         totalPages = {totalPages}
        //                         goToNextPage = {goToNextPage}
        //                         goToPreviousPage = {goToPreviousPage}
        //                     />
        //                 </View>
        //                 <View style={styles.buttonStyle}>
        //                     <Button
        //                         backgroundColor = "#F8FAFB"
        //                         title = 'DONE'
        //                         buttonPress = {onEditDone}
        //                         color = "#4299E1"
        //                     />
        //                 </View>

        //             </View>
        //             :
        //             <View style={{alignItems:'flex-start', justifyContent:'flex-start'}}>
        //                 <View style={styles.paginationContainer}>
        //                     <Paginator
        //                         currentPage = {currentPagePosition}
        //                         totalPages = {totalPages}
        //                         goToNextPage = {goToNextPage}
        //                         goToPreviousPage = {goToPreviousPage}
        //                     />
        //                 </View>
        //             </View>
        //     }

        //     {
        //         hasFooter &&
        //         <View style={styles.footer}>
        //             <Button
        //                 backgroundColor = "#FFFFFF"
        //                 title = {footerTitle}
        //                 buttonPress = {onFooterPress}
        //                 color = "#4299E1"
        //             />
        //         </View>
        //     }

        // </View>
    
    
    )
}

export default PickListCard

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#FFFFFF',
        borderRadius:8,
        width:400,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        borderBottomColor:'#CCD6E0',
        borderBottomWidth:1,
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
        paddingBottom:15
    },
    tab:{
        borderRadius: 4,
        padding:10,
        paddingBottom:6,
        paddingTop:6
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
        height: 50,
        width: 150,
        borderRadius: 4,
        // padding:8,
        // alignSelf:'flex-end',
        // alignItems:'center',
        // justifyContent:'center',
        marginLeft:15,
        marginBottom:20
    },
    footer:{
        // backgroundColor:'#FFFFFF',
        borderTopWidth:1,
        borderTopColor:'#CCD6E0',
        padding:5,
        paddingBottom:20,
        paddingTop:20
    }
})
