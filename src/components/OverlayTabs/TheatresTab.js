import React,{ useState, useEffect  } from "react";
import { View, Text, StyleSheet} from "react-native";

import Table from '../common/Table/Table';
import FloatingActionButton from "../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../common/FloatingAction/ActionContainer";
import RoundedPaginator from "../common/Paginators/RoundedPaginator";

import {useNextPaginator, usePreviousPaginator} from "../../helpers/caseFilesHelpers";
import { withModal } from "react-native-modalfy";


const headers = [
    {
        name : 'Theatre',
        alignment : 'flex-start'
    },
    {
        name : 'Status',
        alignment : 'center'
    },
    {
        name : 'Recovery',
        alignment : 'center'
    },
    {
        name : 'Availability',
        alignment : 'flex-end'
    }
]

const testData = [
    {
        room : 'Operating Room 1',
        status : 'In Use',
        recovery : 'Yes',
        availability : 2
    },
    {
        room : 'Operating Room 2',
        status : 'In Use',
        recovery : 'Yes',
        availability : 2
    }
]

const TheatresTab = ({modal, theatresData}) => {

    const recordsPerPage = 10;
    
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    useEffect(()=>{
        setTotalPages(Math.ceil(theatresData.length / recordsPerPage))
    },[])

    const goToNextPage = () => {
        if (currentPagePosition < totalPages) {
            let {currentPage, currentListMin, currentListMax} = useNextPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
            setCurrentPagePosition(currentPage);
            setCurrentPageListMin(currentListMin);
            setCurrentPageListMax(currentListMax);
        }
    };

    const goToPreviousPage = () => {
        if (currentPagePosition === 1) return;

        let {currentPage, currentListMin, currentListMax} = usePreviousPaginator(currentPagePosition, recordsPerPage, currentPageListMin, currentPageListMax)
        setCurrentPagePosition(currentPage);
        setCurrentPageListMin(currentListMin);
        setCurrentPageListMax(currentListMax);
    };

    const listItemFormat = (item) => {
        const { name = "", isRecovery = false, availability = 0, status = "Test_Status" } = item
        return (
            <>
                <View style={{flexDirection: 'row', borderBottomColor:'#E3E8EF', borderBottomWidth:1, marginBottom:15, paddingBottom:15}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:16, color:'#3182CE'}}>{name}</Text>
                    </View>
                    <View style={{flex:1, alignItems:"center"}}>
                        <Text style={{fontSize:14, color:'#DD6B20'}}>{status}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:14, color:'#38A169'}}>{isRecovery ? 'Yes' : 'No'}</Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end'}}>
                        <Text style={{fontSize:14, color:'#323843'}}>{availability}</Text>
                    </View>
                </View>
            </>
        )
    }

    let dataToDisplay = [...theatresData];
    dataToDisplay = dataToDisplay.slice(currentPageListMin, currentPageListMax);

    return (
        <>
            <Table
                data = {dataToDisplay}
                listItemFormat = {listItemFormat}
                headers = {headers}
                isCheckbox = {false}
            />
            <View style={styles.footer}>
                <View style={{alignSelf: "center", marginRight: 10}}>
                    <RoundedPaginator
                        totalPages={totalPages}
                        currentPage={currentPagePosition}
                        goToNextPage={goToNextPage} 
                        goToPreviousPage={goToPreviousPage}
                    />
                </View>
            </View>
        </>
        
    )
}

export default withModal(TheatresTab)

const styles = StyleSheet.create({
    footer : {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})