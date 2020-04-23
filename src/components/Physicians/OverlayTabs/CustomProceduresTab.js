import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";

import Table from '../../common/Table/Table';
import LongPressWithFeedback from "../../common/LongPressWithFeedback";
import FloatingActionButton from "../../common/FloatingAction/FloatingActionButton";
import ActionContainer from "../../common/FloatingAction/ActionContainer";
import ActionItem from "../../common/ActionItem";
import RoundedPaginator from "../../common/Paginators/RoundedPaginator";

import WasteIcon from "../../../../assets/svg/wasteIcon";
import AddIcon from "../../../../assets/svg/addIcon";
import AssignIcon from "../../../../assets/svg/assignIcon";

import {useNextPaginator, usePreviousPaginator} from "../../../helpers/caseFilesHelpers";

import { withModal } from "react-native-modalfy";

const headers = [
    {
        name : 'Procedure',
        alignment : 'flex-start'
    },
    {
        name : 'Theatre',
        alignment : 'flex-start'
    },
    {
        name : 'Recovery',
        alignment : 'center'
    },
    {
        name : 'Duration',
        alignment : 'flex-end'
    }
]

const testData = [
    {
        procedure: 'Coronary Bypass Graft',
        theatre : 'Operating Room 1',
        recovery : 'Yes',
        duration : 2
    },
    {
        procedure: 'Adenosine',
        theatre : 'Operating Room 1',
        recovery : 'No',
        duration : 3
    }
]

const CustomProceduresTab = ({modal}) => {

    const recordsPerPage = 10;
    
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageListMin, setCurrentPageListMin] = useState(0);
    const [currentPageListMax, setCurrentPageListMax] = useState(recordsPerPage);
    const [currentPagePosition, setCurrentPagePosition] = useState(1);

    const [isFloatingActionDisabled, setIsFloatingActionDisabled] = useState(false);

    const data = testData.map( item =>{
        return {
            procedure : item.procedure,
            theatre : item.theatre,
            recovery : item.recovery,
            duration : item.duration,
        }
    })

    useEffect(()=>{
        setTotalPages(Math.ceil(data.length / recordsPerPage))
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

    const toggleActionButton = () => {
        setIsFloatingActionDisabled(true);
        modal.openModal("ActionContainerModal",
            {
                actions: getFloatingActions(),
                title: "PHYSICIAN ACTIONS",
                onClose: () => {
                    setIsFloatingActionDisabled(false)
                }
            })
    }

    const getFloatingActions = () =>{
        const deleteAction =
            <LongPressWithFeedback pressTimer={700} onLongPress={() => {}}>
                <ActionItem title={"Hold to Delete"} icon={<WasteIcon/>} onPress={() => {}} touchable={false}/>
            </LongPressWithFeedback>;
        const assignActionCase = <ActionItem title={"Assign Case"} icon={<AssignIcon/>} onPress={()=>{}}/>;
        const createActionWorkItem = <ActionItem title={"Add Work Item"} icon={<AddIcon/>} onPress={()=>{}}/>;
        const createActionPhysician = <ActionItem title={"Add Physician"} icon={<AddIcon/>} onPress={()=>{}}/>;


    return <ActionContainer
        floatingActions={[
            deleteAction,
            assignActionCase,
            createActionPhysician,
            createActionWorkItem
        ]}
        title={"PHYSICIAN ACTIONS"}
    />
    }

    const listItemFormat = (item) => <>
        <View style={{flexDirection: 'row', borderBottomColor:'#E3E8EF', borderBottomWidth:1, marginBottom:15, paddingBottom:15}}>
            <View style={{flex:1}}>
                <Text style={{fontSize:16, color:'#3182CE'}}>{item.procedure}</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-start"}}>
                <Text style={{fontSize:16, color:'#3182CE'}}>{item.theatre}</Text>
            </View>
            <View style={{flex:1, alignItems:'center'}}>
                <Text style={{fontSize:14, color: item.recovery === 'Yes'?'#38A169':'#ED8936'}}>{item.recovery}</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
                <Text style={{fontSize:16, color:'#323843'}}>{`${item.duration} hrs`}</Text>
            </View>
        </View>
    </>

    let dataToDisplay = [...data];
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
                <FloatingActionButton
                    isDisabled = {isFloatingActionDisabled}
                    toggleActionButton = {toggleActionButton}
                />
            </View>
        </>
    )
}

export default withModal(CustomProceduresTab)

const styles = StyleSheet.create({
    footer:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 20,
        marginRight: 30,
    }
})